'use client'

import React, { useState } from "react";
import { pipeline, type Pipeline } from "@xenova/transformers";
import AttentionHeatmap from "./AttentionHeatmap";
import AttentionArcs from "./AttentionArcs";
import EmbeddingsView from "./EmbeddingsView";
import { motion } from "framer-motion";

type AttentionData = number[][][][]; // [layer][head][from_token][to_token]
type EmbeddingsData = number[][]; // [token][embedding_dim]

export default function Playground() {
  const [text, setText] = useState("AI is amazing");
  const [generatedText, setGeneratedText] = useState("");
  const [attention, setAttention] = useState<AttentionData | null>(null);
  const [embeddings, setEmbeddings] = useState<EmbeddingsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [currentLayer, setCurrentLayer] = useState(0);
  const [numLayers, setNumLayers] = useState(2);
  const [selectedHead, setSelectedHead] = useState("all");
  const [viewMode, setViewMode] = useState<"heatmap" | "arcs" | "embeddings">("heatmap");
  
  interface GenerationOutput {
    generated_text?: string;
  }

  // Text generation function
  const generateNextLine = async () => {
    try {
      setGenerating(true);
      const generator = await pipeline("text-generation", "Xenova/gpt2");
      const output = await generator(text, {
        max_new_tokens: 30,
        temperature: 0.7,
        return_full_text: false // Only return the generated text, not the input
      }) as GenerationOutput | GenerationOutput[];
      
      // Extract text from the output
      let result = "";
      if (Array.isArray(output)) {
        console.log('Generation output (array):', output);
        // Get the first result if it's an array
        const firstOutput = output[0];
        result = firstOutput?.generated_text || "";
      } else {
        console.log('Generation output (single):', output);
        // Handle single output
        result = output?.generated_text || "";
      }
      
      setGeneratedText(result || "No text was generated. Please try again.");
    } catch (error) {
      console.error("Error generating text:", error);
      setGeneratedText("Error generating text. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  const runTransformer = async () => {
    try {
      setLoading(true);
      const extractor = await pipeline("text-classification", "Xenova/distilbert-base-uncased");
      
      // Generate mock attention patterns for visualization
      const tokens = text.split(' ');
      const numHeads = 8;
      const numLayers = 6;
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
      className="p-4 max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg text-sm"
    >
      {/* Input Section */}
      <div className="mb-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 
                     dark:text-white focus:ring-2 focus:ring-primary text-sm"
          rows={3}
          placeholder="Enter text to analyze..."
        />

        <div className="flex flex-wrap gap-4 mt-4">
          <button
            onClick={runTransformer}
            disabled={loading}
            className="px-4 py-1.5 bg-primary text-white rounded-lg hover:bg-primary/90 text-xs
                       disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : "Run Transformer"}
          </button>

          <button
            onClick={generateNextLine}
            disabled={generating || !text}
            className="px-4 py-1.5 bg-secondary text-white rounded-lg hover:bg-secondary/90 text-xs
                       disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {generating ? "Generating..." : "Predict Next Line"}
          </button>

          {/* Controls */}
          <select
            value={numLayers}
            onChange={(e) => setNumLayers(Number(e.target.value))}
            className="px-3 py-1.5 border rounded-lg bg-gray-50 dark:bg-gray-700 text-xs"
          >
            {[2, 3, 4, 5, 6].map(num => (
              <option key={num} value={num}>Layers: {num}</option>
            ))}
          </select>

          <select
            value={selectedHead}
            onChange={(e) => setSelectedHead(e.target.value)}
            className="px-3 py-1.5 border rounded-lg bg-gray-50 dark:bg-gray-700 text-xs"
          >
            <option value="all">All Heads</option>
            {[...Array(8)].map((_, i) => (
              <option key={i} value={i}>Head {i + 1}</option>
            ))}
          </select>

          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("heatmap")}
              className={`px-3 py-1.5 rounded-lg text-xs ${
                viewMode === "heatmap" 
                  ? "bg-primary text-white" 
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              Heatmap
            </button>
            <button
              onClick={() => setViewMode("arcs")}
              className={`px-3 py-1.5 rounded-lg text-xs ${
                viewMode === "arcs" 
                  ? "bg-primary text-white" 
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              Arcs
            </button>
            <button
              onClick={() => setViewMode("embeddings")}
              className={`px-3 py-1.5 rounded-lg text-xs ${
                viewMode === "embeddings" 
                  ? "bg-primary text-white" 
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              Embeddings
            </button>
          </div>
        </div>
      </div>

      {/* Generated Text Section */}
      {generatedText && (
        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
          <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Generated Continuation:</h3>
          <div className="space-y-1.5">
            <div className="text-gray-500 dark:text-gray-400 text-xs">
              <span className="font-medium">Input:</span> {text}
            </div>
            <div className="text-gray-900 dark:text-gray-100 text-xs">
              <span className="font-medium text-secondary dark:text-secondary/80">→</span>{" "}
              <span className="text-secondary dark:text-secondary/80">{generatedText}</span>
            </div>
          </div>
        </div>
      )}

      {/* Visualization Section */}
      <div className="mt-8 border rounded-lg p-4 min-h-[300px] bg-gray-50 dark:bg-gray-700">
        {loading ? (
          <div className="flex items-center justify-center h-[300px]">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500" />
          </div>
        ) : attention ? (
          <div>
            {viewMode === "heatmap" && (
              <AttentionHeatmap 
                attention={attention} 
                layer={currentLayer}
                selectedHead={selectedHead}
                text={text}
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
                className="px-3 py-1.5 rounded-lg bg-gray-200 dark:bg-gray-600 text-xs
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
                className="px-3 py-1.5 rounded-lg bg-gray-200 dark:bg-gray-600 text-xs
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next Layer
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-[300px] text-gray-400 text-xs">
            Run the transformer to see visualizations
          </div>
        )}
      </div>
    </motion.div>
  );
}
