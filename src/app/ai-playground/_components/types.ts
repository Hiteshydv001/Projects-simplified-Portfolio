export interface TransformerOutput {
    attentions?: number[][][];
    hidden_states?: number[][];
}

export interface CommonProps {
    text: string;
}

export interface AttentionProps extends CommonProps {
    attention: number[][][];
    layer: number;
    selectedHead: string | number;
}

export interface EmbeddingsProps extends CommonProps {
    embeddings: number[][];
}
