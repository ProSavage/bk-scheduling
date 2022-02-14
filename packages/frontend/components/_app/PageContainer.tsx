import { Flex } from "@chakra-ui/react";
import React, { ReactChildren, ReactNode } from "react"
import { Navbar } from "./Navbar";

interface PageContainerProps {
      children: ReactNode
}

export const PageContainer: React.FC<PageContainerProps> = ({ children }) => {




      return (
            <Flex color={"white"} bg={"gray.800"} width={"100%"} height={"100vh"} flexDir={"column"} >
                  <Navbar />
                  <Flex height={"100%"} flexGrow={1}>
                        {children}
                  </Flex>
            </Flex>
      );
}