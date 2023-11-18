"use client"
import { useEffect, useState, useRef } from 'react'
import { Center, HStack, VStack, Text, Button, Heading, Divider, Image } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { ChevronDownIcon, AddIcon } from '@chakra-ui/icons'
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
  Flex,
  Box,
  Spacer,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
  FormLabel,
  Select,
  InputRightAddon,
  Textarea



} from '@chakra-ui/react'
import { useAccount, useConnect, useDisconnect, useWalletClient } from 'wagmi'
import { signTypedData } from "@wagmi/core"
import { InjectedConnector } from 'wagmi/connectors/injected'
import { Chains, Tokens } from './tokens'


export default function Home() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()

  const [sendToken, setSendToken] = useState("Select Token")
  const [receiveToken, setReceiveToken] = useState("Select Token")
  const [sendChain, setSendChain] = useState("Select Chain")
  const [receiveChain, setReceiveChain] = useState("Select Chain")
  const [receiveAmount, setReceiveAmount] = useState(0.0)
  const [sendAmount, setSendAmount] = useState(0.0)

  const [loadingState, setLoadingState] = useState(0) //0 = not loading, 1 = awaiting signature, 2 = awaiting response

  let JSONData: { sourceChainId: string; destinationChainId: string; amountSourceToken: number; minDestinationTokenAmount: number; expirationTimestamp: number; sourceAddress: `0x${string}` | undefined; destinationAddress: `0x${string}` | undefined; sourceTokenAddress: string; destinationTokenAddress: string }[] = [];

  const { isOpen, onOpen, onClose } = useDisclosure()
  const firstField = useRef()

  const [swapsData, setSwapsData] = useState([])


  // updates send token name
  const updateSendToken = (val: string) => {
    setSendToken(val)
  }

  const updateReceiveToken = (val: string) => {
    setReceiveToken(val)
  }

  const updateSendChain = (val: string) => {
    setSendChain(val)
  }

  const updateReceiveChain = (val: string) => {
    setReceiveChain(val)
  }


  const updateSwapData = (val: string) => {

  }



  const updateSendAmount = (valueAsString: String, valueasNumber: GLfloat) => {
    if (valueAsString != "") {
      setSendAmount(valueasNumber)
      if (receiveToken != "Select Token") {
        // set the amount they will receive 
        // TODO: get the translation from an API call???

        setReceiveAmount(valueasNumber * 100)
      }

    }


  }

  const Swap = async () => {

    const currentTimestamp = Date.now(); // Current timestamp in milliseconds
    const tenMinutes = 10 * 60 * 1000; // 10 minutes in milliseconds
    const expirationTimestamp = currentTimestamp + tenMinutes;



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

    console.log(sendChain)

    const message = {
      sourceChainId: Chains[sendChain].id,//TODO: update dynamically
      destinationChainId: Chains[receiveChain].id,//TODO: update dynamically
      nonce: 1,
      amountSourceToken: sendAmount,
      minDestinationTokenAmount: receiveAmount,
      expirationTimestamp: expirationTimestamp,
      stakeOrder: 1,
      sourceAddress: address,
      destinationAddress: address, //maybe let user input this for more modularity
      sourceTokenAddress: Tokens[sendToken].address, // TODO: update dynamically
      destinationTokenAddress: Tokens[receiveToken].address, // TODO: update dynamically
    } as const;

    console.log("swap")

    setLoadingState(1);
    try {
      const signature = await signTypedData({
        domain,
        message,
        primaryType: 'Order',
        types,
      })
      console.log(signature)
      setLoadingState(2);
    } catch (err) {
      console.log(err)
      setLoadingState(0);
    }


    let tempSwapsData = swapsData
    const toAdd = {
      "swapAddress": domain.verifyingContract,
      "sourceChainId": message.sourceChainId,
      "destinationChainId": message.destinationChainId,
      "sourceTokenAddress": message.sourceTokenAddress,
      "timeout": message.expirationTimestamp
    }
    tempSwapsData.push(toAdd)
    setSwapsData(tempSwapsData)
  }




  useEffect(() => {


  }, []);


  return (
    <div>

      <Flex>
        <Box p='4' >
          <div className="flex items-center p-5" style={{ width: "100%" }}>
            <Image src='logo.png' alt='logo' width='75px' height='75px' marginRight={6} />
            <Heading >CowssChain</Heading>

          </div>

        </Box>

        <Spacer />
        <Box p='4' >
          {isConnected ? (
            <>
              {/* <Text style={{ float: "right" }} align={'right'}>Connected to {address}
              </Text> */}

              <Button style={{ float: "right" }} outlineColor={"black"} onClick={() => disconnect()}>Disconnect</Button>

            </>
          ) : (
            <Button style={{ float: "right" }} outlineColor={"lightblue"} onClick={() => connect()}>Connect Wallet</Button>
          )}

        </Box>
        <Box p='4'>
          <Button outlineColor={"black"} onClick={onOpen}>
            Running Swaps
          </Button>
        </Box>
      </Flex>

      <Center mt={"5rem"}>
        <VStack>

          <Card>
            <CardBody >
              <Card minW="md" >
                <CardBody >


                  <Flex>

                    <Box p='4' >

                      <Menu>

                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>


                          <Text>
                            {sendChain}

                          </Text>


                        </MenuButton>

                        <MenuList>
                          {
                            Object.keys(Chains).map((key, index) => (
                              
                              <MenuItem minH='40px' onClick={() => updateSendChain(key)}>

                                <span>{key}</span>
                              </MenuItem>
                            ))
                          }
                        </MenuList>
                      </Menu>




                    </Box>

                    <Spacer />

                    <Box p='4' >
                      {sendChain != "Select Chain" ?
                        <Menu>

                          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                            <Flex>
                              <Box p='2' >
                                {sendToken != "Select Token" ?
                                  <Image
                                    boxSize='1.5rem'
                                    borderRadius='full'
                                    src={Chains[sendChain]["tokens"][sendToken].img}

                                  /> : <></>
                                }

                              </Box>
                              <Spacer />
                              <Box p='2' >
                                <Text>
                                  {sendToken}
                                </Text>
                              </Box>
                            </Flex>
                          </MenuButton>
                          <MenuList>
                            {
                              Object.keys(Chains[sendChain]["tokens"]).map((key, index) => (
                                <MenuItem minH='40px' onClick={() => updateSendToken(key)}>
                                  <Image
                                    boxSize='2rem'
                                    borderRadius='full'
                                    src={Chains[sendChain]["tokens"][key].img}
                                    alt='Simon the pensive'
                                    mr='12px'
                                  />
                                  <span>{Chains[sendChain]["tokens"][key].name}</span>
                                </MenuItem>
                              ))
                            }
                          </MenuList>
                        </Menu> : <></>
                      }


                    </Box>


                  </Flex>





                  <br></br> <br></br> <br></br>



                  <InputGroup>
                    <InputLeftAddon>{sendToken}</InputLeftAddon>


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
    <Flex>
      <Box p='4' >
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            <Text>{receiveChain}</Text>
          </MenuButton>
          <MenuList>
            {Object.keys(Chains).map((key, index) => (
              <MenuItem minH='40px' key={index} onClick={() => updateReceiveChain(key)}>
                <span>{key}</span>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Box>
      <Spacer />
      {receiveChain != "Select Chain" &&
        <Box p='4'>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Flex>
                <Box p='2'>
                  {receiveToken != "Select Token" ?
                    <Image
                      boxSize='1.5rem'
                      borderRadius='full'
                      src={Chains[receiveChain]["tokens"][receiveToken].img}
                    /> : <></>
                  }
                </Box>
                <Spacer />
                <Box p='2'>
                  <Text>{receiveToken}</Text>
                </Box>
              </Flex>
            </MenuButton>
            <MenuList>
              {Object.keys(Chains[receiveChain]["tokens"]).map((key, index) => (
                <MenuItem minH='40px' key={index} onClick={() => updateReceiveToken(key)}>
                  <Image
                    boxSize='2rem'
                    borderRadius='full'
                    src={Chains[receiveChain]["tokens"][key].img}
                    alt={Chains[receiveChain]["tokens"][key].name}
                    mr='12px'
                  />
                  <span>{Chains[receiveChain]["tokens"][key].name}</span>
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Box>
      }
    </Flex>
    {/* ... Rest of the card content */}
  </CardBody>
</Card>




            </CardBody>
            {isConnected ? (
              <>
                <Button outlineColor={'blue'} onClick={() => Swap()} isDisabled={sendChain == receiveChain || sendChain == "Select Chain" || receiveChain == "Select Chain" || sendToken=="Select Token" || receiveToken == "Select Token"}>Swap</Button>
              </>
            ) : (
              <Button outlineColor={"lightblue"} onClick={() => connect()}>Connect Wallet</Button>
            )}
          </Card>
          <div className="flex justify-center items-center p-5">
            {loadingState === 2 ? (
              <Image src='nouns_anim.gif' alt='Nouns Animation' width="160px" height="60px" />
            ) : loadingState === 1 ? (
              <Image src='signing_awaiting.gif' alt='Signing Awaiting' width="160px" height="60px" />
            ) : null}
          </div>

        </VStack>

      </Center>




      <Drawer
        isOpen={isOpen}
        placement='right'
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px'>
            Create a new account
          </DrawerHeader>

          <DrawerBody>

            { }

          </DrawerBody>
        </DrawerContent>
      </Drawer>


    </div>
  )
}
