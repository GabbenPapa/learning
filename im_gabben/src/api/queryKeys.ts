export const movieKeys = {
  all: ["movies"] as const,
  popular: () => [...movieKeys.all, "popular"] as const,
  nowPlaying: () => [...movieKeys.all, "nowPlaying"] as const,
  upcoming: () => [...movieKeys.all, "upcoming"] as const,
  topRated: () => [...movieKeys.all, "topRated"] as const,
  details: (id: number) => [...movieKeys.all, "details", id] as const,
  search: (query: string) => [...movieKeys.all, "search", query] as const,
};
