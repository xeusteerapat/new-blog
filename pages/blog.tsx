import React, { useState } from "react";
import Head from "next/head";
import {
  Heading,
  Flex,
  Stack,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import Container from "../components/Container";
import BlogPost from "../components/BlogPost";
import { getAllFilesFrontMatter } from "../lib/mdx";
import { Post, Posts, FrontMatterType } from "../types/PostsTypes";
import { NextPage } from "next";

const Blog: NextPage<Posts> = ({ posts }: Posts) => {
  const [searchValue, setSearchValue] = useState("");

  const filteredPosts = posts
    .sort((a: Post, b: Post) => {
      return Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt));
    })
    .filter((frontmatter: Post) => {
      return frontmatter.title
        .toLowerCase()
        .includes(searchValue.toLowerCase());
    });

  return (
    <>
      <Head>
        <title>Blog | Hello, World</title>
      </Head>
      <Container>
        <Stack
          as='main'
          spacing={8}
          justifyContent='center'
          alignItems='flex-start'
          m='0 auto 4rem auto'
          maxWidth='750px'
        >
          <Flex
            flexDirection='column'
            justifyContent='flex-start'
            alignItems='flex-start'
            maxWidth='750px'
            minWidth='650px'
            px={4}
          >
            <Heading letterSpacing='tight' mb={2} as='h1' size='2xl'>
              Blog ({posts.length} posts)
            </Heading>
            <InputGroup mt={4} mb={4} mr={4} w='100%'>
              <Input
                aria-label='Search by title'
                placeholder='Search by title'
                onChange={e => setSearchValue(e.target.value)}
              />
              <InputRightElement>
                <SearchIcon color='gray.300' />
              </InputRightElement>
            </InputGroup>
            {!filteredPosts.length && "No posts found :("}
            {filteredPosts.map((frontMatter: any) => (
              <BlogPost key={frontMatter.title} {...frontMatter} />
            ))}
          </Flex>
        </Stack>
      </Container>
    </>
  );
};

export default Blog;

export async function getStaticProps() {
  const posts: Post[] = await getAllFilesFrontMatter("blog");

  return {
    props: { posts },
  };
}
