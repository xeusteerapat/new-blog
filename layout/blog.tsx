import {
  Avatar,
  Flex,
  Heading,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { format, parseISO } from "date-fns";
import Head from "next/head";
import React from "react";
import Container from "../components/Container";
import { IndividualPostProps } from "../types/PostsTypes";

const BlogLayout: React.FC<IndividualPostProps> = ({
  children,
  frontMatter,
}) => {
  const { colorMode } = useColorMode();

  const textColor = {
    light: "gray.700",
    dark: "gray.400",
  };

  return (
    <Container>
      <Head>
        <title>{frontMatter.title} - Blog | Teerapat Prommarak</title>
      </Head>
      <Stack
        as='article'
        spacing={8}
        justifyContent='center'
        alignItems='flex-start'
        m='0 auto 4rem auto'
        maxWidth='750px'
        w='100%'
        px={2}
      >
        <Flex
          flexDirection='column'
          justifyContent='flex-start'
          alignItems='flex-start'
          maxWidth='750px'
          w='100%'
        >
          <Heading letterSpacing='tight' mb={2} as='h1' size='2xl'>
            {frontMatter.title}
          </Heading>
          <Flex
            justify='space-between'
            align={["initial", "center"]}
            direction={["column", "row"]}
            mt={2}
            w='100%'
            mb={4}
          >
            <Flex align='center'>
              <Avatar
                size='xs'
                name='Teerapat Prommarak'
                src='../images/portrait.jpeg'
                mr={2}
              />
              <Text fontSize='sm' color={textColor[colorMode]}>
                {"Teerapat Prommarak / "}
                {format(parseISO(frontMatter.publishedAt), "MMMM dd, yyyy")}
              </Text>
            </Flex>
            <Text fontSize='sm' color='gray.500' minWidth='100px' mt={[2, 0]}>
              {frontMatter.readingTime.text}
            </Text>
          </Flex>
        </Flex>
        {children}
      </Stack>
    </Container>
  );
};

export default BlogLayout;
