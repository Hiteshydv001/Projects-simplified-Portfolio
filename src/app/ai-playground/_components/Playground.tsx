'use client'

import React, { useState } from "react";
import { getTextGenerator } from '@/lib/text-generator';

import dynamic from 'next/dynamic';
const chartLoading = () => <p role="status">Opening visualization…</p>;
const AttentionHeatmap = dynamic(() => import('./AttentionHeatmap'), { loading: chartLoading });
const AttentionArcs = dynamic(() => import('./AttentionArcs'), { loading: chartLoading });
const EmbeddingsView = dynamic(() => import('./EmbeddingsView'), { loading: chartLoading });
import { motion } from "framer-motion";

type AttentionData = number[][][][]; // [layer][head][from_token][to_token]
type EmbeddingsData = number[][]; // [token][embedding_dim]

export default function Playground() {
  const [text, setText] = useState("AI is amazing");
  const [analyzedText, setAnalyzedText] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [attention, setAttention] = useState<AttentionData | null>(null);
  const [embeddings, setEmbeddings] = useState<EmbeddingsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generationError, setGenerationError] = useState('');
  const [currentLayer, setCurrentLayer] = useState(0);
  const [numLayers, setNumLayers] = useState(2);
  const [selectedHead, setSelectedHead] = useState("all");
  const [viewMode, setViewMode] = useState<"heatmap" | "arcs" | "embeddings">("heatmap");

  interface GenerationOutput {
    generated_text?: string;
  }

  // Text generation function
  const generateNextLine = async () => {
    if (generating || !text.trim()) return;
    try {
      setGenerating(true);
      setGenerationError('');
      setGeneratedText('');
      const generator = await getTextGenerator();
      const output = await generator(text, {
        max_new_tokens: 30,
        temperature: 0.7,
        do_sample: true,
        return_full_text: false // Only return the generated text, not the input
      }) as GenerationOutput | GenerationOutput[];

      // Extract text from the output
      let result = "";
      if (Array.isArray(output)) {
        // Get the first result if it's an array
        const firstOutput = output[0];
        result = firstOutput?.generated_text || "";
      } else {
        // Handle single output
        result = output?.generated_text || "";
      }

      setGeneratedText(result || "No text was generated. Please try again.");
    } catch {
      setGenerationError('Text generation could not load or run. Check your connection and try again.');
    } finally {
      setGenerating(false);
    }
  };

  const runTransformer = async () => {
    try {
      setLoading(true);


      // Generate mock attention patterns for visualization
      const tokens = text.trim().split(/\s+/).slice(0, 24);
      const numHeads = 8;

      const seqLength = tokens.length;

      const attentionData: AttentionData = Array.from({ length: numLayers }, () =>
        Array.from({ length: numHeads }, () =>
          Array.from({ length: seqLength }, () =>
            Array.from({ length: seqLength }, () => Math.random())
          )
        )
      );

      const embeddingsData: EmbeddingsData = Array.from({ length: seqLength }, () =>
        Array.from({ length: 768 }, () => Math.random() * 2 - 1)
      );

      setCurrentLayer(0);
      setAnalyzedText(tokens.join(" "));
      setAttention(attentionData);
      setEmbeddings(embeddingsData);
    } catch (error) {
      console.error("Error running transformer:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 max-w-5xl mx-auto bg-white/80 dark:bg-white/5 border border-border/15 rounded-2xl shadow-[0_18px_60px_-30px_rgba(0,0,0,0.35)] backdrop-blur-md text-sm"
    >
      <p className="mb-4 text-sm text-muted-foreground">An interactive learning experiment. Attention and embeddings are simulated examples, not extracted model outputs. Text generation runs locally in your browser and downloads a model on first use.</p>
      {/* Input Section */}
      <div className="mb-4">
        <textarea
          aria-label="Text to explore"
          maxLength={500}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-3 rounded-xl border border-border/20 bg-white/80 dark:bg-black/30 text-foreground dark:text-white placeholder:text-muted-foreground focus:ring-2 focus:ring-accent/40 focus:border-transparent text-sm shadow-inner"
          rows={3}
          placeholder="Enter text to analyze..."
        />

        <div className="flex flex-wrap gap-4 mt-4">
          <button
            onClick={runTransformer}
            disabled={loading || !text.trim()}
            className="px-4 py-2 rounded-full bg-accent text-white text-xs font-semibold shadow-md shadow-accent/25 hover:bg-accent/90 disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : "Explore attention"}
          </button>

          <button
            onClick={generateNextLine}
            disabled={generating || !text.trim()}
            className="px-4 py-2 rounded-full bg-orange-500 text-white text-xs font-semibold shadow-md shadow-orange-500/25 hover:bg-orange-500/90 disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed"
          >
            {generating ? "Generating..." : "Predict Next Line"}
          </button>

          {/* Controls */}
          <select
            aria-label="Number of layers"
            value={numLayers}
            onChange={(e) => { setNumLayers(Number(e.target.value)); setAttention(null); setEmbeddings(null); setCurrentLayer(0); }}
            className="px-3 py-2 border border-border/20 rounded-full bg-white/80 dark:bg-zinc-900/80 text-xs text-foreground dark:text-white/90 shadow-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
          >
            {[2, 3, 4, 5, 6].map(num => (
              <option key={num} value={num} className="bg-white text-foreground dark:bg-zinc-900 dark:text-white">Layers: {num}</option>
            ))}
          </select>

          <select
            aria-label="Attention head"
            value={selectedHead}
            onChange={(e) => setSelectedHead(e.target.value)}
            className="px-3 py-2 border border-border/20 rounded-full bg-white/80 dark:bg-zinc-900/80 text-xs text-foreground dark:text-white/90 shadow-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
          >
            <option value="all" className="bg-white text-foreground dark:bg-zinc-900 dark:text-white">Head 1 (default)</option>
            {[...Array(8)].map((_, i) => (
              <option key={i} value={i} className="bg-white text-foreground dark:bg-zinc-900 dark:text-white">Head {i + 1}</option>
            ))}
          </select>

          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("heatmap")}
              className={`px-3 py-1.5 rounded-lg text-xs ${
                viewMode === "heatmap" 
                  ? "bg-accent text-white shadow-md shadow-accent/25" 
                  : "bg-white/80 dark:bg-white/5 border border-border/20 text-foreground/80"
              }`}
            >
              Heatmap
            </button>
            <button
              onClick={() => setViewMode("arcs")}
              className={`px-3 py-1.5 rounded-lg text-xs ${
                viewMode === "arcs" 
                  ? "bg-accent text-white shadow-md shadow-accent/25" 
                  : "bg-white/80 dark:bg-white/5 border border-border/20 text-foreground/80"
              }`}
            >
              Arcs
            </button>
            <button
              onClick={() => setViewMode("embeddings")}
              className={`px-3 py-1.5 rounded-lg text-xs ${
                viewMode === "embeddings" 
                  ? "bg-accent text-white shadow-md shadow-accent/25" 
                  : "bg-white/80 dark:bg-white/5 border border-border/20 text-foreground/80"
              }`}
            >
              Embeddings
            </button>
          </div>
        </div>
      </div>

      {/* Generated Text Section */}
      {generationError && <p role="alert" className="mt-4 text-sm text-destructive">{generationError}</p>}
      {generatedText && (
        <div className="mt-4 p-4 bg-white/80 dark:bg-white/5 rounded-xl border border-border/20 shadow-inner">
          <h3 className="text-xs font-medium text-muted-foreground mb-2">Generated Continuation:</h3>
          <div className="space-y-1.5">
            <div className="text-muted-foreground text-xs">
              <span className="font-medium">Input:</span> {text}
            </div>
            <div className="text-foreground text-xs">
              <span className="font-medium text-accent">→</span>{" "}
              <span className="text-accent">{generatedText}</span>
            </div>
          </div>
        </div>
      )}

      {/* Visualization Section */}
      <div className="mt-8 border border-border/15 rounded-2xl p-4 min-h-[320px] bg-white/80 dark:bg-white/5 shadow-inner">
        {loading ? (
          <div className="flex items-center justify-center h-[300px]">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-accent border-t-transparent" />
          </div>
        ) : attention ? (
          <div>
            {viewMode === "heatmap" && (
              <AttentionHeatmap 
                attention={attention} 
                layer={currentLayer}
                selectedHead={selectedHead}
                text={analyzedText}
              />
            )}
            {viewMode === "arcs" && (
              <AttentionArcs 
                attention={attention}
                layer={currentLayer}
                selectedHead={selectedHead}
                text={text}
              />
            )}
            {viewMode === "embeddings" && (
              <EmbeddingsView 
                embeddings={embeddings}
                text={text}
              />
            )}

            {/* Layer Navigation */}
            <div className="flex justify-center mt-4 gap-2">
              <button
                onClick={() => setCurrentLayer(l => Math.max(0, l - 1))}
                disabled={currentLayer === 0}
                className="px-3 py-1.5 rounded-full bg-white/70 dark:bg-white/5 text-xs
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous Layer
              </button>
              <span className="px-3 py-1.5 text-xs">
                Layer {currentLayer + 1} of {numLayers}
              </span>
              <button
                onClick={() => setCurrentLayer(l => Math.min(numLayers - 1, l + 1))}
                disabled={currentLayer === numLayers - 1}
                className="px-3 py-1.5 rounded-full bg-white/70 dark:bg-white/5 text-xs
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next Layer
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-[300px] text-muted-foreground text-xs">
            Enter a short sentence and explore the simulated attention patterns
          </div>
        )}
      </div>
    </motion.div>
  );
}
