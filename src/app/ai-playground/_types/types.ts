export interface VisualizationProps {
    attention?: number[][][];
    embeddings?: number[][];
    layer: number;
    selectedHead: string | number;
    text: string;
}
