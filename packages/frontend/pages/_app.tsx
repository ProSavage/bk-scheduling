import type { AppProps } from 'next/app'
import { ChakraProvider, Flex } from '@chakra-ui/react'
import Head from "next/head";
import { PageContainer } from '../components/_app/PageContainer';
import theme from '../theme';
import { useEffect, useState } from 'react';
import { axiosClient, setToken } from '../api/axios';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {


  const router = useRouter();

  const [initialized, setInitialized] = useState(false);


  useEffect(() => {
    setToken(window.localStorage.getItem("token")?.toString() || "")
    setInitialized(true)
  }, [])

  return <ChakraProvider resetCSS theme={theme}>
    <Head>
      <title>BK-Scheduling</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <PageContainer>
      {initialized && <Component {...pageProps} />}
    </PageContainer>
  </ChakraProvider>
}

export default MyApp
