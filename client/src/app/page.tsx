"use client"
import { useEffect, useState } from 'react'
import { Center, HStack, VStack, Text, Button, Heading, Divider, Image } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { Order } from '@sharedtypes/myTypes'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  InputGroup,
  InputLeftAddon,
  Input,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInput,



} from '@chakra-ui/react'
import { useAccount, useConnect, useDisconnect, useWalletClient } from 'wagmi'
import { signTypedData } from "@wagmi/core"
import { InjectedConnector } from 'wagmi/connectors/injected'
export default function Home() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()

  const [tokenList, setTokenList] = useState([{ chain: "Optimism", name: "Dai", img: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png" }, { chain: "Gnosis", name: " USDbC", img: "https://ethereum-optimism.github.io/data/USDC/logo.png" }])
  const [sendToken, setSendToken] = useState("Select Token")
  const [receiveToken, setReceiveToken] = useState("Select Token")
  const [receiveAmount, setReceiveAmount] = useState(0.0)
  const [sendAmount, setSendAmount] = useState(0.0)

  // updates send token name
  const updateSendToken = (val: string) => {
    setSendToken(val)
  }

  const updateReceiveToken = (val: string) => {
    setReceiveToken(val)
  }

  const updateSendAmount = (valueAsString: String, valueasNumber: GLfloat) => {

    if (valueAsString != "") {
      setSendAmount(valueasNumber)
      if (receiveToken != "Select Token") {
        // set the amount they will receive 
        // TODO: get the translation from am API call???
        setReceiveAmount(valueasNumber * 100)
      }

    }


  }

  const Swap = async () => {
    const domain = {
      name: 'CowssChain order',
      version: '1',
      chainId: 80001,
      verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
    } as const

    const types = {
      Order: [
        { name: "sourceChainId", type: "uint256" },
        { name: "destinationChainId", type: "uint256" },
        { name: "nonce", type: "uint256" },
        { name: "amountSourceToken", type: "uint256" },
        { name: "minDestinationTokenAmount", type: "uint256" },
        { name: "expirationTimestamp", type: "uint256" },
        { name: "stakeOrder", type: "uint256" },
        { name: "sourceAddress", type: "address" },
        { name: "destinationAddress", type: "address" },
        { name: "sourceTokenAddress", type: "address" },
        { name: "destinationTokenAddress", type: "address" }
      ]
    } as const;

    const message = {
      sourceChainId: 80001,
      destinationChainId: 1,
      nonce: 1,
      amountSourceToken: 1,
      minDestinationTokenAmount: 1,
      expirationTimestamp: 1,
      stakeOrder: 1,
      sourceAddress: "0x0000000000000000000000000000000000000000",
      destinationAddress: "0x0000000000000000000000000000000000000000",
      sourceTokenAddress: "0x0000000000000000000000000000000000000000",
      destinationTokenAddress: "0x0000000000000000000000000000000000000000"
    } as const;
    
    console.log("swap")

    try {
      const signature = await signTypedData({
        domain,
        message,
        primaryType: 'Order',
        types,
      })
      console.log(signature)
    } catch (err) {
      console.log(err)
    }
  }


  useEffect(() => {
    // Update the document title using the browser API
    // src={

    //   () => {
    //     tokenList.forEach( (token) => {
    //       if (token.name == sendToken.name){
    //         return sendToken
    //       }
    //     })
    //   }


    // }


  }, []);


  return (
    <div>
      <div className="flex items-center p-5">

        <Image src='logo.png' alt='logo' width='100px' height='100px' />
        <Heading>CowssChain</Heading>

      </div>
      <Center mt={"5rem"}>
        <VStack>

          <Card>
            <CardBody >
              <Card minW="md" >
                <CardBody >
                  <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                      {/* <Image
                          boxSize='2rem'
                          borderRadius='full'
                          src="https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png"
                          alt='Simon the pensive'
                          mr='12px'
                        /> */}
                      {sendToken}
                    </MenuButton>
                    <MenuList>
                      {tokenList.map((token) =>
                        <MenuItem minH='40px' onClick={() => updateSendToken(token.name)}>
                          <Image
                            boxSize='2rem'
                            borderRadius='full'
                            src={token.img}
                            alt='Simon the pensive'
                            mr='12px'
                          />
                          <span>{token.name}</span>
                        </MenuItem>
                      )}
                    </MenuList>
                  </Menu>

                  <br></br> <br></br> <br></br>



                  <InputGroup>
                    <InputLeftAddon children={sendToken} />


                    <NumberInput defaultValue={0} min={0} clampValueOnBlur={false} placeholder='enter token amount'
                      onChange={updateSendAmount} >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>



                  </InputGroup>


                </CardBody>
              </Card>

              <br></br>
              <Card minW="md" >
                <CardBody>

                  <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                      {receiveToken}
                    </MenuButton>
                    <MenuList>
                      {tokenList.map((token) =>
                        <MenuItem minH='40px' onClick={() => updateReceiveToken(token.name)}>
                          <Image
                            boxSize='2rem'
                            borderRadius='full'
                            src={token.img}
                            alt='Simon the pensive'
                            mr='12px'
                          />
                          <span>{token.name}</span>
                        </MenuItem>
                      )}
                    </MenuList>
                  </Menu>

                  <br></br> <br></br> <br></br>

                  <Heading>
                    {receiveAmount}
                  </Heading>

                </CardBody>
              </Card>



            </CardBody>
            {isConnected ? (
              <>
                {/* <Heading size={"xl"}>Connected to {address}</Heading>
            <Button outlineColor={"black"} onClick={() => disconnect()}>Disconnect</Button> */}

                <Button outlineColor={'blue'} onClick={() => Swap()}>Swap</Button>
              </>
            ) : (
              <Button outlineColor={"lightblue"} onClick={() => connect()}>Connect Wallet</Button>
            )}
          </Card>

        </VStack>

      </Center>
    </div>
  )
}
