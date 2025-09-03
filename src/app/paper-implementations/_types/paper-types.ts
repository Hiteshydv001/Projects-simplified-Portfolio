export interface Paper {
    id: string;
    slug: string;
    title: string;
    description: string;
    publishedAt: string;
    authors: string[];
    tags: string[];
    isNew?: boolean;
    content?: string;
    paperLink?: string;
    githubLink?: string;
    previewImage?: string;
}
