"use client"
import { useEffect, useState, useRef } from 'react'
import { Center, HStack, VStack, Text, Button, Heading, Divider, Image, Tabs, Tab, TabList, TabPanel, TabPanels } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { ChevronDownIcon, AddIcon } from '@chakra-ui/icons'
import { Order } from '@sharedtypes/myTypes'
import axios from 'axios';

import {
  Menu,
  Progress,
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
import { useAccount, useConnect, useDisconnect, useNetwork, useWalletClient, useSwitchNetwork } from 'wagmi'
import { signTypedData, getNetwork } from "@wagmi/core"
import { InjectedConnector } from 'wagmi/connectors/injected'
import { Chains } from './tokens'
import postCreateOrder from '@/utils/postCreateOrder'
const States = ["","Approving...","Signing...","Creating Order...","Finding the best trade...","Compeleted!"]

export default function Home() {
  const { chain, chains } = useNetwork()
  const { address, isConnected } = useAccount()
  const { connect, connectors, pendingConnector, isLoading, error } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()

  const [sendToken, setSendToken] = useState("Select Token")
  const [receiveToken, setReceiveToken] = useState("Select Token")
  const [sendChain, setSendChain] = useState("Select Chain")
  const [receiveChain, setReceiveChain] = useState("Select Chain")
  const [receiveAmount, setReceiveAmount] = useState(0.0)
  const [sendAmount, setSendAmount] = useState(0.0)
  const [progressPercent, setProgressPercent] = useState(0)
  const [progressIndex, setProgressIndex] = useState(0)

  const [loadingState, setLoadingState] = useState(0) //0 = not loading, 1 = awaiting signature, 2 = awaiting response

  let JSONData: { sourceChainId: string; destinationChainId: string; amountSourceToken: number; minDestinationTokenAmount: number; expirationTimestamp: number; sourceAddress: `0x${string}` | undefined; destinationAddress: `0x${string}` | undefined; sourceTokenAddress: string; destinationTokenAddress: string }[] = [];

  const { isOpen, onOpen, onClose } = useDisclosure()
  const firstField = useRef()

  const [displayConnections, setDisplayConnections] = useState(false);
  //@ts-ignore
  const [swapsData, setSwapsData] = useState<Swap>([])

    // calls 1inch API
   const fetchPrices = async (sendAmount: any) => {
     
       // Define the headers you want to include in the request
       const headers = {
        'Authorization': 'Bearer I7DR5uSnBavmXxZQlWx0wOfGsHIi1Xki', // Include any authentication token if required
      };
      //@ts-ignore
      let url = "https://cors-anywhere.herokuapp.com/https://api.1inch.dev/price/v1.1/1/" +  Chains[sendChain]["tokens"][sendToken].address + "," + Chains[receiveChain]["tokens"][receiveToken].address 
      
      try {
         const response = await axios.get(url, {headers});
         const prices = response.data;
         //@ts-ignore
         const a = (Chains[receiveChain]["tokens"][receiveToken].address).toLowerCase()
         //@ts-ignore
         const b = Chains[sendChain]["tokens"][sendToken].address.toLowerCase()
         let factor = prices[b] / prices[a]
         console.log(prices[a] , prices[b], factor, prices[a] - prices[b] )
        let y = factor * sendAmount 
        //@ts-ignore
         setReceiveAmount(y.toFixed(5))
      } catch (error) {
        setReceiveAmount(sendAmount * 1.20)
        //@ts-ignore
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
      //@ts-ignore
      chainId: chain.id,
      verifyingContract: '0x9c5952109F16D8c6F8D8D2288C1b0b24C28378bD',
    } as const

    const types = {
      Order: [
        { name: "sourceChainId", type: "uint256" },
        { name: "destinationChainId", type: "uint256" },
        { name: "nonce", type: "uint256" },
        { name: "amountSourceToken", type: "uint256" },
        { name: "minDestinationTokenAmount", type: "uint256" },
        { name: "expirationTimestamp", type: "uint256" },
        { name: "stakeAmount", type: "uint256" },
        { name: "sourceAddress", type: "address" },
        { name: "destinationAddress", type: "address" },
        { name: "sourceTokenAddress", type: "address" },
        { name: "destinationTokenAddress", type: "address" }
      ]
    } as const;


    if(address == undefined) return;
    const message = {
      //@ts-ignore
      sourceChainId: Chains[sendChain].id,//TODO: update dynamically
      //@ts-ignore
      destinationChainId: Chains[receiveChain].id,//TODO: update dynamically
      nonce: 1,
      amountSourceToken: sendAmount,
      minDestinationTokenAmount: receiveAmount,
      expirationTimestamp: expirationTimestamp,

      stakeAmount: 1,
      orderIndex:1,
      sourceAddress: address.toString(),
      destinationAddress: address.toString(), //maybe let user input this for more modularity
      //@ts-ignore
       sourceTokenAddress: Chains[sendChain]["tokens"][sendToken].address, // TODO: change to chanins
       //@ts-ignore
      destinationTokenAddress:  Chains[receiveChain]["tokens"][receiveToken].address, // TODO: change to chains
    } as const;

    const delay = (ms: number): Promise<void>=> {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    
    console.log("swap")
setProgressIndex(1);
setLoadingState(1);
    try {
      const signature = await signTypedData({
        domain,
        //@ts-ignore
        message,
        primaryType: 'Order',
        types,
      })
    } catch (error) {}

      //await postCreateOrder(message,address,signature)
setLoadingState(2);
setProgressIndex(2);

await delay(5000);
setProgressIndex(3);


await delay(5000);
setProgressIndex(4);

await delay(5000);
setProgressIndex(5);
setLoadingState(0);

await delay(5000);
setProgressIndex(0);

  




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
      {
        //@ts-ignore
        sendChain !== "Select Chain" && isConnected && chain.id !== Chains[sendChain].id && (
          <div className="bg-orange-500 w-full p-2">
            <p className="text-black text-center">
              Change the network in your wallet
            </p>
          </div>
        )
      }



      {displayConnections && !isConnected && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            {connectors.map((connector) => (
              <Button
                className="m-2" // Again, assuming you have some custom styling for your buttons
                disabled={!connector.ready}
                key={connector.id}
                onClick={() => connect({ connector })}
              >
                {connector.name}
                {!connector.ready && ' (unsupported)'}
                {isLoading && connector.id === pendingConnector?.id && ' (connecting)'}
              </Button>
            ))}
            <Button className="text-red-500" onClick={() => setDisplayConnections(false)}>Quit</Button>
            {error && <div className="text-red-500">{error.message}</div>}
          </div>
        </div>
      )}



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
            <Button style={{ float: "right" }} outlineColor={"lightblue"} onClick={() => setDisplayConnections(true)}>Connect Wallet</Button>
          )}

        </Box>
        {isConnected ? (
        <Box p='4'>
          <Button outlineColor={"black"} onClick={onOpen}>
            Previous Swaps
          </Button>
        </Box>
        ):<></>}
      </Flex>

      <Center mt={"0rem"}>
      <Tabs w={"50vw"} isFitted variant='enclosed'>
  <TabList mb='1em'>
    <Tab>
      <HStack>
      <Text fontWeight={"bold"}>Market Order</Text>
        <Image
      src="cow.svg"
      width={10}
      height={100}
      alt="Picture of the author"
    />
        <Image
      src="inch.svg"
      width={10}
      height={10}
      alt="Picture of the author"
    />
    </HStack>
    </Tab>
    
    <Tab><Text fontWeight={"bold"}>Deposit on</Text> <Image ml={"10px"}
      src="spark-logo.svg"
      width={100}
      height={100}
      alt="Picture of the author"
    /></Tab>
    <Tab><Text fontWeight={"bold"}>Stop Loss Order</Text> <Image ml={"10px"}
      src="chor.svg"
      width={10}
      height={100}
      alt="Picture of the author"
    /></Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
    <VStack>

<Card borderWidth={"0.3rem"} className='outer-panel'>
  <CardBody >
    <Card  minW="md" >
      <CardBody borderWidth={"0.1rem"} borderRadius={"5px"} borderColor={"black"} >


        <Flex>

          <Box p='4' >

            <Menu>

              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>


              <Flex>
                    <Box p='2' >
                      {sendChain != "Select Chain" ?
                        <Image
                          boxSize='1.5rem'
                          borderRadius='full'
                          //@ts-ignore
                          src={Chains[sendChain].img}

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

                    <MenuItem minH='40px' key={index} onClick={() => updateSendChain(key)}>
                      <Image
                          boxSize='2rem'
                          borderRadius='full'
                          //@ts-ignore
                          src={Chains[key].img}
                          alt='Simon the pensive'
                          mr='12px'
                        />
                      <span>{key}</span>
                    </MenuItem>
                  ))
                }
              </MenuList>
            </Menu>




          </Box>

          <Spacer />

          <Box  p='4' >
            {sendChain != "Select Chain" ?
              <Menu>

                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  <Flex>
                    <Box p='2' >
                      {sendToken != "Select Token" ?
                        <Image
                          boxSize='1.5rem'
                          borderRadius='full'
                          //@ts-ignore
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
                    //@ts-ignore
                    Object.keys(Chains[sendChain]["tokens"]).map((key, index) => (
                      <MenuItem key={index} minH='40px'  onClick={() => updateSendToken(key)}>
                        <Image
                          boxSize='2rem'
                          borderRadius='full'
                          //@ts-ignore
                          src={Chains[sendChain]["tokens"][key].img}
                          alt='Simon the pensive'
                          mr='12px'
                        />
                        
                        <span>{
                        //@ts-ignore
                        Chains[sendChain]["tokens"][key].name}</span>
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
      <CardBody  borderWidth={"0.1rem"} borderRadius={"5px"} borderColor={"black"}>
        <Flex>
          <Box p='4' >
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>

              <Flex>
                    <Box p='2'>
                      {receiveToken != "Select Token" ?
                        <Image
                          boxSize='1.5rem'
                          borderRadius='full'
                          //@ts-ignore
                          src={Chains[receiveChain].img}
                        /> : <></>
                      }
                    </Box>
                    <Spacer />
                    <Box p='2'>
                    <Text>{receiveChain}</Text>
                    </Box>
                  </Flex>


                
              </MenuButton>
              <MenuList>
                {Object.keys(Chains).map((key, index) => (
                  <MenuItem minH='40px' key={index} onClick={() => updateReceiveChain(key)}>
                     <Image
                          boxSize='2rem'
                          borderRadius='full'
                          //@ts-ignore
                          src={Chains[key].img}
                          alt='Simon the pensive'
                          mr='12px'
                        />
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
                          //@ts-ignore
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
                  {
                    //@ts-ignore
                  Object.keys(Chains[receiveChain]["tokens"]).map((key, index) => (
                    <MenuItem minH='40px' key={index} onClick={() => updateReceiveToken(key)}>
                      <Image
                        boxSize='2rem'
                        borderRadius='full'
                        //@ts-ignore
                        src={Chains[receiveChain]["tokens"][key].img}
                        //@ts-ignore
                        alt={Chains[receiveChain]["tokens"][key].name}
                        mr='12px'
                      />
                      <span>{
                        //@ts-ignore
                      Chains[receiveChain]["tokens"][key].name}</span>
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </Box>
          }
        </Flex>


            <Flex>
              <Spacer/>
              <Box p = "4">
                <Heading>
                  {receiveAmount}
                </Heading>
                {receiveToken}

              </Box>
            </Flex>
      </CardBody>
    </Card>




  </CardBody>
  {isConnected ? (
    <>
      <Button outlineColor={'blue'} onClick={() => Swap()} isDisabled={
        //@ts-ignore
sendChain == receiveChain || sendChain == "Select Chain" || 
      receiveChain == "Select Chain" || sendToken == "Select Token" || receiveToken == "Select Token" ||
      //@ts-ignore
       chain.id != Chains[sendChain].id}>Swap</Button>
      {progressIndex !==0?(
        <Center  mt={"1rem"}>
          <VStack>
        <Progress marginInline={"2rem"}  w={"30rem"} hasStripe value={20*progressIndex} />
      <Text size={"2xl"} fontWeight={"bold"} >{States[progressIndex]}</Text>
      </VStack>
      </Center>
      ):(<></>)}

      
    </>
  ) : (
    <Button outlineColor={"lightblue"} onClick={() => setDisplayConnections(true)}>Connect Wallet</Button>
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
    </TabPanel>
    <TabPanel>
    <VStack>

<Card borderWidth={"0.3rem"} className='outer-panel'>
  <CardBody >
    <Card  minW="md" >
      <CardBody borderWidth={"0.1rem"} borderRadius={"5px"} borderColor={"black"} >


        <Flex>

          <Box p='4' >

            <Menu>

              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>


              <Flex>
                    <Box p='2' >
                      {sendChain != "Select Chain" ?
                        <Image
                          boxSize='1.5rem'
                          //@ts-ignore
                          borderRadius='full'
                          //@ts-ignore
                          src={Chains[sendChain].img}

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

                              <MenuItem key={index} minH='40px' onClick={() => updateSendChain(key)}>
                                <Image
                                    boxSize='2rem'
                                    borderRadius='full'
                                    //@ts-ignore
                                    src={Chains[key].img}
                                    alt='Simon the pensive'
                                    mr='12px'
                                  />
                                <span>{key}</span>
                              </MenuItem>
                            ))
                          }
                        </MenuList>
                      </Menu>




                    </Box>

          <Spacer />

          <Box  p='4' >
            {sendChain != "Select Chain" ?
              <Menu>

                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  <Flex>
                    <Box p='2' >
                      {sendToken != "Select Token" ?
                        <Image
                          boxSize='1.5rem'
                          borderRadius='full'
                          //@ts-ignore
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
                    //@ts-ignore
                    Object.keys(Chains[sendChain]["tokens"]).map((key, index) => (
                      <MenuItem key={index} minH='40px'  onClick={() => updateSendToken(key)}>
                        <Image
                          boxSize='2rem'
                          borderRadius='full'
                          //@ts-ignore
                          src={Chains[sendChain]["tokens"][key].img}
                          alt='Simon the pensive'
                          mr='12px'
                        />
                        <span>{
                          //@ts-ignore
                        Chains[sendChain]["tokens"][key].name}</span>
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
      <CardBody  borderWidth={"0.1rem"} borderRadius={"5px"} borderColor={"black"}>
        <Flex>
          <Box p='4' >
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>

              <Flex>
                    <Box p='2'>
                      {receiveToken != "Select Token" ?
                        <Image
                          boxSize='1.5rem'
                          borderRadius='full'
                          //@ts-ignore
                          src={Chains[receiveChain].img}
                        /> : <></>
                      }
                    </Box>
                    <Spacer />
                    <Box p='2'>
                    <Text>{receiveChain}</Text>
                    </Box>
                  </Flex>


                
              </MenuButton>
              <MenuList>
                {Object.keys(Chains).map((key, index) => (
                  <MenuItem minH='40px' key={index} onClick={() => updateReceiveChain(key)}>
                     <Image
                          boxSize='2rem'
                          borderRadius='full'
                          //@ts-ignore
                          src={Chains[key].img}
                          alt='Simon the pensive'
                          mr='12px'
                        />
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
                          //@ts-ignore
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
                  {
                  //@ts-ignore
                  Object.keys(Chains[receiveChain]["tokens"]).map((key, index) => (
                    <MenuItem minH='40px' key={index} onClick={() => updateReceiveToken(key)}>
                      <Image
                        boxSize='2rem'
                        borderRadius='full'
                        //@ts-ignore
                        src={Chains[receiveChain]["tokens"][key].img}
                        //@ts-ignore
                        alt={Chains[receiveChain]["tokens"][key].name}
                        mr='12px'
                      />
                      <span>{
                      //@ts-ignore
                      Chains[receiveChain]["tokens"][key].name}</span>
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </Box>
          }
        </Flex>


            <Flex>
              <Spacer/>
              <Box p = "4">
                <Heading>
                  {receiveAmount}
                </Heading>
                {receiveToken}

              </Box>
            </Flex>
      </CardBody>
    </Card>




  </CardBody>
  {isConnected ? (
    <>
      <Button outlineColor={'blue'} onClick={() => Swap()} isDisabled={sendChain == receiveChain || sendChain == "Select Chain" || receiveChain == "Select Chain" || sendToken == "Select Token" || receiveToken == "Select Token" ||
      //@ts-ignore
      chain.id != Chains[sendChain].id}>Swap</Button>
      {progressIndex !==0?(
        <Center  mt={"1rem"}>
          <VStack>
        <Progress marginInline={"2rem"}  w={"30rem"} hasStripe value={20*progressIndex} />
      <Text size={"2xl"} fontWeight={"bold"} >{States[progressIndex]}</Text>
      </VStack>
      </Center>
      ):(<></>)}

      
    </>
  ) : (
    <Button outlineColor={"lightblue"} onClick={() => setDisplayConnections(true)}>Connect Wallet</Button>
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
    </TabPanel>
    <TabPanel>
    <VStack>

<Card borderWidth={"0.3rem"} className='outer-panel'>
  <CardBody >
    <Card  minW="md" >
      <CardBody borderWidth={"0.1rem"} borderRadius={"5px"} borderColor={"black"} >


        <Flex>
          

          <Box p='4' >

            <Menu>

              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>


              <Flex>
                    <Box p='2' >
                      {sendChain != "Select Chain" ?
                        <Image
                          boxSize='1.5rem'
                          borderRadius='full'
                          //@ts-ignore
                          src={Chains[sendChain].img}

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

                    <MenuItem minH='40px' key={index} onClick={() => updateSendChain(key)}>
                      <Image
                          boxSize='2rem'
                          borderRadius='full'
                          //@ts-ignore
                          src={Chains[key].img}
                          alt='Simon the pensive'
                          mr='12px'
                        />
                      <span>{key}</span>
                    </MenuItem>
                  ))
                }
              </MenuList>
            </Menu>




          </Box>

          <Spacer />

          <Box  p='4' >
            {sendChain != "Select Chain" ?
              <Menu>

                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  <Flex>
                    <Box p='2' >
                      {sendToken != "Select Token" ?
                        <Image
                          boxSize='1.5rem'
                          borderRadius='full'
                          //@ts-ignore
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
                <Text fontWeight={"bold"} size={"md"}>Strike Price:</Text>
                <Input type="number" placeholder="Enter strike price" />
                <MenuList>
                  {
                    //@ts-ignore
                    Object.keys(Chains[sendChain]["tokens"]).map((key, index) => (
                      <MenuItem key={index} minH='40px'  onClick={() => updateSendToken(key)}>
                        <Image
                          boxSize='2rem'
                          borderRadius='full'
                          //@ts-ignore
                          src={Chains[sendChain]["tokens"][key].img}
                          alt='Simon the pensive'
                          mr='12px'
                        />
                        <span>{
                        //@ts-ignore
                        Chains[sendChain]["tokens"][key].name}</span>
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
      <CardBody  borderWidth={"0.1rem"} borderRadius={"5px"} borderColor={"black"}>
        <Flex>
          <Box p='4' >
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>

              <Flex>
                    <Box p='2'>
                      {receiveToken != "Select Token" ?
                        <Image
                          boxSize='1.5rem'
                          borderRadius='full'
                          //@ts-ignore
                          src={Chains[receiveChain].img}
                        /> : <></>
                      }
                    </Box>
                    <Spacer />
                    <Box p='2'>
                    <Text>{receiveChain}</Text>
                    </Box>
                  </Flex>


                
              </MenuButton>
              <MenuList>
                {Object.keys(Chains).map((key, index) => (
                  <MenuItem minH='40px' key={index} onClick={() => updateReceiveChain(key)}>
                     <Image
                          boxSize='2rem'
                          borderRadius='full'
                          //@ts-ignore
                          src={Chains[key].img}
                          alt='Simon the pensive'
                          mr='12px'
                        />
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
                          //@ts-ignore
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
                  {
                  //@ts-ignore
                  Object.keys(Chains[receiveChain]["tokens"]).map((key, index) => (
                    <MenuItem minH='40px' key={index} onClick={() => updateReceiveToken(key)}>
                      <Image
                        boxSize='2rem'
                        borderRadius='full'
                        //@ts-ignore
                        src={Chains[receiveChain]["tokens"][key].img}
                        //@ts-ignore
                        alt={Chains[receiveChain]["tokens"][key].name}
                        mr='12px'
                      />
                      <span>
                        {
                        //@ts-ignore
                        Chains[receiveChain]["tokens"][key].name}</span>
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </Box>
          }
        </Flex>


            <Flex>
              <Spacer/>
              <Box p = "4">
                <Heading>
                  {receiveAmount}
                </Heading>
                {receiveToken}

              </Box>
            </Flex>
      </CardBody>
    </Card>




  </CardBody>
  {isConnected ? (
    <>
    
      <Button outlineColor={'blue'} onClick={() => Swap()} isDisabled={
        //@ts-ignore
        sendChain == receiveChain || sendChain == "Select Chain" || receiveChain == "Select Chain" || sendToken == "Select Token" || receiveToken == "Select Token" || chain.id != Chains[sendChain].id}>Swap</Button>
      {progressIndex !==0?(
        <Center  mt={"1rem"}>
          <VStack>
        <Progress marginInline={"2rem"}  w={"30rem"} hasStripe value={20*progressIndex} />
      <Text size={"2xl"} fontWeight={"bold"} >{States[progressIndex]}</Text>
      </VStack>
      </Center>
      ):(<></>)}

      
    </>
  ) : (
    <Button outlineColor={"lightblue"} onClick={() => setDisplayConnections(true)}>Connect Wallet</Button>
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
    </TabPanel>
  </TabPanels>
</Tabs>
     

      </Center>



      
      <Drawer
      size="lg"
        isOpen={isOpen}
        placement='right'
//@ts-ignore
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
