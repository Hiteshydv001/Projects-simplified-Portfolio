'use client'

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default function EmbeddingsView({ embeddings, text }) {
  const svgRef = useRef();

  useEffect(() => {
    if (!embeddings || !svgRef.current) return;

    const tokens = text.split(' ');
    const width = 800;
    const height = 400;
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const tokenSpacing = (width - margin.left - margin.right) / tokens.length;
    const barWidth = tokenSpacing * 0.8;

    // Scale for the bar heights
    const yScale = d3.scaleLinear()
      .domain([d3.min(embeddings.flat()), d3.max(embeddings.flat())])
      .range([height - margin.bottom, margin.top]);

    // Draw bars for each token's embedding
    tokens.forEach((token, i) => {
      const tokenEmbedding = embeddings[i];

      // Draw mini bar chart for each token's embedding values
      tokenEmbedding.forEach((value, j) => {
        const barHeight = height - margin.bottom - yScale(value);
        const x = margin.left + i * tokenSpacing + (j / tokenEmbedding.length) * barWidth;

        svg.append('rect')
          .attr('x', x)
          .attr('y', yScale(value))
          .attr('width', barWidth / tokenEmbedding.length)
          .attr('height', barHeight)
          .attr('fill', 'rgba(59, 130, 246, 0.5)') // blue-500 with opacity
          .attr('opacity', 0)
          .transition()
          .duration(500)
          .attr('opacity', 1);
      });

      // Add token labels
      svg.append('text')
        .attr('x', margin.left + i * tokenSpacing + barWidth / 2)
        .attr('y', height - margin.bottom + 20)
        .attr('text-anchor', 'middle')
        .attr('class', 'text-sm')
        .text(token);
    });

  }, [embeddings, text]);

  return (
    <div className="flex justify-center items-center">
      <svg ref={svgRef}></svg>
    </div>
  );
}
