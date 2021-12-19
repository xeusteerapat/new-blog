import fs from "fs";
import matter from "gray-matter";
// @ts-ignore
import mdxPrism from "mdx-prism";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import React from "react";
import readingTime from "reading-time";
import remarkAutoLinkHeadings from "remark-autolink-headings";
import remarkSlug from "remark-slug";
import MDXComponents from "../../components/MDXComponent";
import BlogLayout from "../../layout/blog";
import { Params, IndividualPostProps } from "../../types/PostsTypes";

const root = process.cwd();

const Blog: React.FC<IndividualPostProps> = ({ mdxSource, frontMatter }) => {
  return (
    <BlogLayout frontMatter={frontMatter} mdxSource={mdxSource}>
      <MDXRemote {...mdxSource} components={MDXComponents} />
    </BlogLayout>
  );
};

export default Blog;

export async function getStaticPaths() {
  const listOfPosts = fs.readdirSync(path.join(root, "data", "blog"));

  return {
    paths: listOfPosts.map((postName: string) => {
      return {
        params: {
          slug: postName.replace(/\.mdx/, ""),
        },
      };
    }),
    fallback: false,
  };
}

export async function getStaticProps({ params }: Params) {
  const type = "blog";
  const slug = params.slug;

  const source = slug
    ? fs.readFileSync(path.join(root, "data", type, `${slug}.mdx`), "utf-8")
    : fs.readFileSync(path.join(root, "data", `${type}.mdx`), "utf-8");

  const { data, content } = matter(source);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkAutoLinkHeadings, remarkSlug],
      rehypePlugins: [mdxPrism],
    },
  });

  const post = {
    mdxSource,
    frontMatter: {
      wordCount: content.split(/\s+/gu).length,
      readingTime: readingTime(content),
      slug: slug || null,
      ...data,
    },
  };

  return { props: post };
}
