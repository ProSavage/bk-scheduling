import { Button, Flex, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <Flex flexDir={"column"} width={"100%"} padding={3}>
      <Flex flexDir={"row"} width={"100%"} justifyContent={"space-between"} alignItems={"center"}>
        <Text fontSize={"3xl"} fontWeight={"bold"}>Home</Text>
        <Button onClick={() => router.push("/schedules/new")}>New Schedule</Button>
      </Flex>
    </Flex>
  )
}

export default Home
