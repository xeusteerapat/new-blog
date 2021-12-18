import fs from "fs";
import matter from "gray-matter";
// @ts-ignore
import mdxPrism from "mdx-prism";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import readingTime from "reading-time";
import remarkAutoLinkHeadings from "remark-autolink-headings";
import remarkSlug from "remark-slug";
import MDXComponents from "../../components/MDXComponent";
import BlogLayout from "../../layout/blog";

const root = process.cwd();

export default function Blog({ mdxSource, frontMatter }: any) {
  return (
    <BlogLayout frontMatter={frontMatter}>
      <MDXRemote {...mdxSource} components={MDXComponents} />
    </BlogLayout>
  );
}

export async function getStaticPaths() {
  const posts = fs.readdirSync(path.join(root, "data", "blog"));

  return {
    paths: posts.map((post: any) => ({
      params: {
        slug: post.replace(/\.mdx/, ""),
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
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
