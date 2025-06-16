interface Feature {
  feature: string;
  text: string;
}

interface IdeaContent {
  overview: string;
  features: Feature[];
}

interface StackContent {
  stack: string[];
}

type SectionContent = IdeaContent | StackContent;

interface Section {
  id: string;
  label: string;
  content: SectionContent;
}

interface ProjectMeta {
  title: string;
  tagline: string;
  link: string;
}

interface ProjectData {
  meta: ProjectMeta;
  content: Section[];
}

interface ProjectSeedType {
  [key: string]: ProjectData;
}

declare const ProjectSeed: ProjectSeedType;
export default ProjectSeed; 