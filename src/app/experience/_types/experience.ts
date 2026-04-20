import React from "react";

export interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
  image: string;
  companyUrl?: string;
  certificateUrl?: string;
  additionalCertificateUrl?: string;
  lorUrl?: string;
  githubUrl?: string;
  deploymentUrl?: string;
  frenchWebsiteUrl?: string;
  slug: string;
  content?: React.ReactNode;
}
