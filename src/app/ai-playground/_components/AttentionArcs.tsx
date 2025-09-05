'use client'

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default function AttentionArcs({ attention, layer, selectedHead, text }) {
  const svgRef = useRef();

  useEffect(() => {
    if (!attention || !svgRef.current) return;

    const tokens = text.split(' ');
    const width = 800;
    const height = 400;
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const attentionMatrix = attention[layer][selectedHead === "all" ? 0 : selectedHead];

    const tokenSpacing = (width - margin.left - margin.right) / (tokens.length - 1);

    // Draw tokens
    tokens.forEach((token, i) => {
      svg.append('text')
        .attr('x', margin.left + i * tokenSpacing)
        .attr('y', height - margin.bottom)
        .attr('text-anchor', 'middle')
        .attr('class', 'text-sm')
        .text(token);
    });

    // Create arcs
    tokens.forEach((_, i) => {
      tokens.forEach((_, j) => {
        if (i !== j && attentionMatrix[i][j] > 0.1) { // Only show strong connections
          const x1 = margin.left + i * tokenSpacing;
          const x2 = margin.left + j * tokenSpacing;
          const y1 = height - margin.bottom;
          const y2 = height - margin.bottom;

          // Calculate control point for the curve
          const xmid = (x1 + x2) / 2;
          const ymid = Math.min(y1 - 100, y1 - Math.abs(x2 - x1) / 2);

          // Create path
          svg.append('path')
            .attr('d', `M ${x1} ${y1} Q ${xmid} ${ymid} ${x2} ${y2}`)
            .attr('fill', 'none')
            .attr('stroke', 'rgba(59, 130, 246, 0.5)') // blue-500 with opacity
            .attr('stroke-width', attentionMatrix[i][j] * 5)
            .attr('opacity', 0)
            .transition()
            .duration(500)
            .attr('opacity', 1);
        }
      });
    });

  }, [attention, layer, selectedHead, text]);

  return (
    <div className="flex justify-center items-center">
      <svg ref={svgRef}></svg>
    </div>
  );
}
