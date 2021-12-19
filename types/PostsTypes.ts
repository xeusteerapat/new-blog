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

export type Params = {
  params: {
    slug: string;
  };
};

export type MDXSource = {
  compiledSource: string;
};

export type IndividualPostProps = {
  mdxSource: MDXSource;
  frontMatter: FrontMatterType;
};
