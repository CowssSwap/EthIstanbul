"use client"
import { Center, HStack, VStack, Text, Button, Heading } from '@chakra-ui/react'
import Image from 'next/image'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
export default function Home() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()
 
  return (
    <Center mt={"5rem"}>
      <VStack>
        {isConnected ? (
          <>
            <Heading size={"xl"}>Connected to {address}</Heading>
            <Button   outlineColor={"black"}onClick={() => disconnect()}>Disconnect</Button>
          </>
        ) : (
          <Button outlineColor={"black"}  onClick={() => connect()}>Connect Wallet</Button>
        )}
      </VStack>
    </Center>
  )
}
