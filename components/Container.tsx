import { useColorMode, Button, Flex, Box } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import styled from "@emotion/styled";
import DarkModeSwitch from "./DarkModeSwitch";

const Container = ({ children }: any) => {
  const { colorMode } = useColorMode();

  const backgroundColor = {
    light: "white",
    dark: "#171717",
  };

  const color = {
    light: "black",
    dark: "white",
  };

  const navHoverBg = {
    light: "gray.600",
    dark: "gray.300",
  };

  const StickyNav = styled(Flex)/* CSS */ `
    position: sticky;
    z-index: 10;
    top: 0;
    backdrop-filter: saturate(180%) blur(20px);
    transition: height 0.5s, line-height 0.5s;
  `;

  return (
    <>
      <StickyNav
        flexDirection='row'
        justifyContent='space-between'
        alignItems='center'
        maxWidth='800px'
        minWidth='356px'
        width='100%'
        bg={backgroundColor[colorMode]}
        as='nav'
        px={[2, 6, 6]}
        py={2}
        mt={8}
        mb={[0, 0, 8]}
        mx='auto'
      >
        <Box>
          <NextLink href='/' passHref>
            <Button
              as='a'
              variant='ghost'
              p={[1, 2, 4]}
              _hover={{
                backgroundColor: navHoverBg[colorMode],
              }}
            >
              Home
            </Button>
          </NextLink>
          <NextLink href='/blog' passHref>
            <Button
              as='a'
              variant='ghost'
              p={[1, 2, 4]}
              _hover={{
                backgroundColor: navHoverBg[colorMode],
              }}
            >
              Blog
            </Button>
          </NextLink>
        </Box>
        <DarkModeSwitch />
      </StickyNav>
      <Flex
        as='main'
        justifyContent='center'
        flexDirection='column'
        bg={backgroundColor[colorMode]}
        color={color[colorMode]}
        px={[0, 4, 4]}
        mt={[4, 8, 8]}
      >
        {children}
      </Flex>
    </>
  );
};

export default Container;
