"use client"
import { useEffect, useState } from 'react'
import { Center, HStack, VStack, Text, Button, Heading, Divider, Image } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
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


} from '@chakra-ui/react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

export default function Home() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()

  const [tokenList, setTokenList] = useState([{address:"0xaddy", chainId: "420", name: "Dai", img: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png" }, {address:"0xaddy", chain: "8453", name: " USDbC", img: "https://ethereum-optimism.github.io/data/USDC/logo.png" }])
  const [sendToken, setSendToken] = useState("Select Token")
  const [receiveToken, setReceiveToken] = useState("Select Token")
  const [receiveAmount, setReceiveAmount] = useState(0.0)
  const [sendAmount, setSendAmount] = useState(0.0)
  let JSONData: { sourceChainId: string; destinationChainId: string; amountSourceToken: number; minDestinationTokenAmount: number; expirationTimestamp: number; sourceAddress: `0x${string}` | undefined; destinationAddress: `0x${string}` | undefined; sourceTokenAddress: string; destinationTokenAddress: string }[] = [];

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

  const Swap = () => {
    // open up json modal, and send json data

    const placeHolder = "8483"

    let tempData = [{"sourceChainId": placeHolder,
      "destinationChainId": placeHolder,
      "amountSourceToken": sendAmount,
      "minDestinationTokenAmount": receiveAmount,
      "expirationTimestamp": Date.now(),
      "sourceAddress": address,
      "destinationAddress": address,
      "sourceTokenAddress": placeHolder,
      "destinationTokenAddress": placeHolder,
      }]

      tokenList.forEach((token) => {
        if (sendToken == token.name && token.chainId!= undefined){
          tempData[0].sourceChainId = token.chainId
          tempData[0].sourceTokenAddress = token.address
        }
  
        if (receiveToken == token.name && token.chainId!= undefined){
          tempData[0].destinationChainId = token.chainId
          tempData[0].destinationTokenAddress = token.address
        }
      }) 
    // make JSON data HERE!!
    JSONData = tempData;

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
              <Text style={{ float: "right" }} align={'right'}>Connected to {address}

              </Text>
              <br></br>
              <br></br>
              <Button style={{ float: "right" }} outlineColor={"black"} onClick={() => disconnect()}>Disconnect</Button>

            </>
          ) : (
            <Button style={{ float: "right" }} outlineColor={"lightblue"} onClick={() => connect()}>Connect Wallet</Button>
          )}

        </Box>
      </Flex>

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
