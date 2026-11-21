export type SectionId =
  | "home"
  | "timeline"
  | "tree"
  | "alphabets"
  | "atlas"
  | "artifacts"
  | "sources";

export interface NavigationIntent {
  section: SectionId;
  itemId?: string;
}
