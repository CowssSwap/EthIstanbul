"use client"
import { useEffect, useState,useRef } from 'react'
import { Center, HStack, VStack, Text, Button, Heading, Divider, Image } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { ChevronDownIcon, AddIcon } from '@chakra-ui/icons'
<<<<<<< HEAD
import { Order } from '@sharedtypes/myTypes'
import axios from 'axios';

=======
>>>>>>> 441c2362862691cd3a1cd5f1b1ab2ebf417273db
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
import { Chains } from './tokens'
import postCreateOrder from '@/utils/postCreateOrder'

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

  const [swapsData, setSwapsData] = useState<Swap>([])

    // calls 1inch API
   const fetchPrices = async (sendAmount: any) => {
     
       // Define the headers you want to include in the request
       const headers = {
        'Authorization': 'Bearer I7DR5uSnBavmXxZQlWx0wOfGsHIi1Xki', // Include any authentication token if required
      };
      let url = "https://cors-anywhere.herokuapp.com/https://api.1inch.dev/price/v1.1/1/" +  Chains[sendChain]["tokens"][sendToken].address + "," + Chains[receiveChain]["tokens"][receiveToken].address 
      
      try {
         const response = await axios.get(url, {headers});
         const prices = response.data;
         const a = (Chains[receiveChain]["tokens"][receiveToken].address).toLowerCase()
         const b = Chains[sendChain]["tokens"][sendToken].address.toLowerCase()
         let factor = prices[b] / prices[a]
        let y = factor * sendAmount *0.97
         setReceiveAmount(y.toFixed(5))
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
   }


  // updates send token name
  const updateSendToken = (val: string) => {
    setSendToken(val)
  }

  const updateReceiveToken = (val: string) => {
    setReceiveToken(val)
  }

  const updateSendChain = (val: string) => {
    setSendToken("Select Token")
    setSendChain(val)
  }

  const updateReceiveChain = (val: string) => {
    setReceiveToken("Select Token")
    setReceiveChain(val)
  }

  

  const updateSendAmount = (valueAsString: String, valueasNumber: GLfloat) => {
    if (valueAsString != "") {
      setSendAmount(valueasNumber)
      if (receiveToken != "Select Token" && sendToken != "Select Token" && valueasNumber != 0.0) {
        // set the amount they will receive 
        // TODO: get the translation from an API call???
        fetchPrices(valueasNumber)


        // setReceiveAmount(valueasNumber * 100)
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
    if(address == undefined) return;
    const message = {
      sourceChainId: 80001,//TODO: update dynamically
      destinationChainId: 1,//TODO: update dynamically
      nonce: 1,
      amountSourceToken: sendAmount,
      minDestinationTokenAmount: receiveAmount,
      expirationTimestamp: expirationTimestamp,
      stakeOrder: 1,
      sourceAddress: address.toString(),
      destinationAddress: address.toString(), //maybe let user input this for more modularity
      sourceTokenAddress: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",//TODO: update dynamically
      destinationTokenAddress: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",//TODO: update dynamically
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
      await postCreateOrder(message,address,signature)
      console.log(signature)
setLoadingState(2);
    } catch (err) {
      console.log(err)
setLoadingState(0);
    }




    let tempSwapsData = swapsData
    const toAdd = {
      "swapAddress": domain.verifyingContract,
      "sourceChainId" : message.sourceChainId,
      "destinationChainId" : message.destinationChainId,
      "sourceTokenAddress" : message.sourceTokenAddress,
      "timeout" : message.expirationTimestamp
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
        {isConnected ? (
        <Box p='4'>
          <Button outlineColor={"black"}  onClick={onOpen}>
          Running Swaps
        </Button>
        </Box>
        ):<></>}
      </Flex>

      <Center mt={"5rem"}>
        <VStack>

          <Card>
            <CardBody >
              <Card minW="md" >
                <CardBody >


                  <Flex>
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
                                <MenuItem key={index} minH='40px'  onClick={() => updateSendToken(key)}>
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

                    <Spacer />
                    <Box p='4' >

                      <Menu>

                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>

                        <Flex>
                              <Box p='2' >
                              {sendChain != "Select Chain" ?
                          
                          <Image
                            boxSize='1.5rem'
                            borderRadius='full'
                            src={Chains[sendChain]["img"]}

                          /> : <></>
                        }
                              </Box>
                              <Spacer />
                              <Box p='2' >
                              <Text>
                            {sendChain}

                          </Text>
                              </Box>
                            </Flex>


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

                      {receiveChain != "Select Chain" ?
                        <Menu>
                          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                          <Flex>
                              <Box p='2' >
                                {receiveToken != "Select Token" ?
                                  <Image
                                    boxSize='1.5rem'
                                    borderRadius='full'
                                    src={Chains[receiveChain]["tokens"][receiveToken].img}

                                  /> : <></>
                                }

                              </Box>
                              <Spacer />
                              <Box p='2' >
                                <Text>
                                {receiveToken}
                                </Text>
                              </Box>
                            </Flex>
                           
                          </MenuButton>
                          <MenuList>
                            {
                              Object.keys(Chains[receiveChain]["tokens"]).map((key, index) => (
                                <MenuItem minH='40px' onClick={() => updateReceiveToken(key)}>
                                  <Image
                                    boxSize='2rem'
                                    borderRadius='full'
                                    src={Chains[receiveChain]["tokens"][key].img}
                                    alt='Simon the pensive'
                                    mr='12px'
                                  />
                                  <span>{Chains[receiveChain]["tokens"][key].name}</span>
                                </MenuItem>
                              ))
                            }
                          </MenuList>
                        </Menu>
                        : <></>
                      }

                    </Box>

                    <Spacer />
                    <Box p='4' >
                      <Menu>

                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>

                        <Flex>
                              <Box p='2' >
                              {receiveChain != "Select Chain" ?
                          
                          <Image
                            boxSize='1.5rem'
                            borderRadius='full'
                            src={Chains[receiveChain]["img"]}

                          /> : <></>
                        }
                              </Box>
                              <Spacer />
                              <Box p='2' >
                              <Text>
                            {receiveChain}

                          </Text>
                          
                              </Box>
                            </Flex>
                        

                          


                        </MenuButton>

                        <MenuList>
                          {
                            Object.keys(Chains).map((key, index) => (
                              <MenuItem minH='40px' onClick={() => updateReceiveChain(key)}>

                                <span>{key}</span>

                              </MenuItem>
                            ))
                          }
                        </MenuList>
                      </Menu>




                    </Box>
                  </Flex>




                  <br></br> 
                    <Flex>
                      <Spacer/>
                      <Box p='4'>
                      <Heading>
                    {receiveAmount}
                  </Heading>
                  {receiveChain}
                      </Box>
                    
               

                  </Flex>   

                </CardBody>
              </Card>



            </CardBody>
            {isConnected ? (
              <>
                <Button outlineColor={'blue'} onClick={() => Swap()}>Swap</Button>
              </>
            ) : (
              <Button outlineColor={"lightblue"} onClick={() => connect()}>Connect Wallet</Button>
            )}
          </Card>
<div className="flex justify-center items-center p-5">
            {loadingState === 2 ? (
              <Image src='nouns_anim.gif' alt='Nouns Animation' width="160px" height="60px"/>
            ) : loadingState === 1 ? (
              <Image src='signing_awaiting.gif' alt='Signing Awaiting' width="160px" height="60px" />
            ) : null}
          </div>

        </VStack>

      </Center>



      
      <Drawer
      size="lg"
        isOpen={isOpen}
        placement='right'

        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px'>
            Your Swaps
          </DrawerHeader>

          <DrawerBody>
          

            {swapsData.map((singleSwap:any) => (
              <>
                <Card>
                  <CardBody>
                  <Heading>{singleSwap.swapAddress}</Heading>
                <Divider></Divider>
                 <Text>Source:</Text> 
                  <Flex>
                    <Box p='4'>
                      ChainID: {singleSwap.sourceChainId}
                    </Box>
                    <Box  p='4'>
                      TokenAddress: {singleSwap.sourceTokenAddress}
                    </Box>
                  </Flex>

                  <Text>Destination:</Text> 
                  <Flex>
                    <Box p='4'>
                      ChainID: {singleSwap.destinationChainId}
                    </Box>
                    <Box  p='4'>
                      TokenAddress: {singleSwap.destinationTokenAddress}
                    </Box>
                  </Flex>


                  </CardBody>
               
              </Card>
               
              </>

            ))}
          
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
