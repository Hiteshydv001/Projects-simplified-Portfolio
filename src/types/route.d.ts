import 'next'

declare module 'next' {
  interface PageConfig {
    api?: {
      bodyParser?: {
        sizeLimit?: string
      }
    }
  }
}
