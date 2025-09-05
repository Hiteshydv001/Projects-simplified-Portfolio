'use client'

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { AttentionProps } from './types';

export default function AttentionHeatmap({ attention, layer, selectedHead, text }: AttentionProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!attention || !svgRef.current) return;

    const tokens = text.split(' ');
    const width = 500;
    const height = 500;
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const attentionMatrix = attention[layer][selectedHead === "all" ? 0 : selectedHead];

    // Create color scale
    const colorScale = d3.scaleLinear()
      .domain([0, d3.max(attentionMatrix.flat())])
      .range(['white', 'red']);

    const cellSize = Math.min(
      (width - margin.left - margin.right) / tokens.length,
      (height - margin.top - margin.bottom) / tokens.length
    );

    // Create heatmap cells
    const heatmap = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Add cells
    tokens.forEach((_, i) => {
      tokens.forEach((_, j) => {
        heatmap.append('rect')
          .attr('x', i * cellSize)
          .attr('y', j * cellSize)
          .attr('width', cellSize)
          .attr('height', cellSize)
          .attr('fill', colorScale(attentionMatrix[i][j]))
          .attr('stroke', '#ccc')
          .on('mouseover', function() {
            d3.select(this)
              .attr('stroke', '#000')
              .attr('stroke-width', 2);
          })
          .on('mouseout', function() {
            d3.select(this)
              .attr('stroke', '#ccc')
              .attr('stroke-width', 1);
          });
      });
    });

    // Add token labels
    tokens.forEach((token, i) => {
      // X-axis labels
      svg.append('text')
        .attr('x', margin.left + i * cellSize + cellSize / 2)
        .attr('y', margin.top - 10)
        .attr('text-anchor', 'middle')
        .attr('class', 'text-sm')
        .text(token);

      // Y-axis labels
      svg.append('text')
        .attr('x', margin.left - 10)
        .attr('y', margin.top + i * cellSize + cellSize / 2)
        .attr('text-anchor', 'end')
        .attr('dominant-baseline', 'middle')
        .attr('class', 'text-sm')
        .text(token);
    });

  }, [attention, layer, selectedHead, text]);

  return (
    <div className="flex justify-center items-center">
      <svg ref={svgRef}></svg>
    </div>
  );
}
