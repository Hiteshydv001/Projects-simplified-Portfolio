import type { TextGenerationPipeline } from '@huggingface/transformers'

let generatorPromise: Promise<TextGenerationPipeline> | null = null

export function getTextGenerator(): Promise<TextGenerationPipeline> {
  if (!generatorPromise) {
    generatorPromise = import('@huggingface/transformers').then(({ pipeline, env }) => {
      env.allowLocalModels = false
      // GPT-2 publishes model_int8.onnx, but has no model_quantized.onnx.
      return pipeline('text-generation', 'Xenova/gpt2', {
        device: 'wasm',
        dtype: 'int8',
      })
    }).catch(error => {
      generatorPromise = null
      throw error
    })
  }
  return generatorPromise
}
