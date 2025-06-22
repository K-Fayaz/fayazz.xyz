export interface Feature {
  feature: string;
  text: string;
}

export interface IdeaContent {
  overview: string;
  features: Feature[];
}

export interface StackContent {
  stack: string[];
}

export type SectionContent = IdeaContent | StackContent;

export interface Section {
  id: string;
  label: string;
  content: SectionContent;
}

export interface ProjectMeta {
  title: string;
  tagline: string;
  link: string;
}

export interface ProjectData {
  meta: ProjectMeta;
  content: Section[];
}

export interface ProjectSeedType {
  [key: string]: ProjectData;
}

declare const ProjectSeed: ProjectSeedType;
export default ProjectSeed; 