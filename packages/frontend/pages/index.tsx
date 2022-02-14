import { Flex, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <Flex flexDir={"column"} alignItems={"center"}>
      <Text>Bk-Scheduling Home.</Text>
    </Flex>
  )
}

export default Home
