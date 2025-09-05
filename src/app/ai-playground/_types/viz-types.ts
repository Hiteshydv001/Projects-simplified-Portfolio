export type AttentionMatrix = number[][];
export type AttentionHead = AttentionMatrix[];
export type AttentionLayer = AttentionHead[];
export type AttentionData = AttentionLayer[];
export type EmbeddingsData = number[][];

export interface BaseProps {
    text: string;
}

export interface AttentionProps extends BaseProps {
    attention: AttentionData;
    layer: number;
    selectedHead: string | number;
}

export interface EmbeddingsProps extends BaseProps {
    embeddings: EmbeddingsData;
}

export interface HeadVisualizationProps extends BaseProps {
    attention: AttentionMatrix;
}
