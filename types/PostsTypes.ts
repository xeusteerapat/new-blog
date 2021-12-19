export type Post = {
  title: string;
  publishedAt: string;
  summary: string;
  slug: string;
};

export type Posts = {
  posts: Post[];
};

export type FrontMatterType = {
  wordCount: number;
  readingTime: ReadingTime;
  slug: string;
  title: string;
  publishedAt: string;
  summary: string;
};

export type ReadingTime = {
  text: string;
  minutes: number;
  time: number;
  words: number;
};
