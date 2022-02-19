import type { AppProps } from 'next/app'
import { ChakraProvider, Flex } from '@chakra-ui/react'
import Head from "next/head";
import { PageContainer } from '../components/_app/PageContainer';
import theme from '../theme';
import { useEffect } from 'react';
import { axiosClient, setToken } from '../api/axios';

function MyApp({ Component, pageProps }: AppProps) {


  useEffect(() => {
    setToken(window.localStorage.getItem("token")?.toString() || "")
  }, [])
  
  return <ChakraProvider resetCSS theme={theme}>
    <Head>
      <title>BK-Scheduling</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <PageContainer>
      <Component {...pageProps} />
    </PageContainer>
  </ChakraProvider>
}

export default MyApp
