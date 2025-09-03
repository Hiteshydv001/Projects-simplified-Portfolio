export interface ResearchPaper {
    id: string;
    title: string;
    conference: string;
    publisher?: string;
    authors: string[];
    doi?: string;
    status?: string;
    domain?: string;
    technologies?: string[];
    overview: string;
    content: {
        sections: {
            title: string;
            content: string;
        }[];
    };
}
