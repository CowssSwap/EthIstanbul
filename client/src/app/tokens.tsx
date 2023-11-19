export const Chains = {
    "Sepolia": { 
        id: 11155111, 
        img: "https://chainlist.org/unknown-logo.png",
        tokens: 
        {
            "UNI": {
                "address": "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
                "chainId": 11155111,
                "name": "Uniswap",
                "img": "data:image/png;base64,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"
            },
            "WETH": {
                "address": "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14",
                "chainId": 11155111,
                "name": "Wrapped Ether",
                "img": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png"
        
            }
        } },
    "Base Testnet": { id: 84531, img: "https://icons.llamao.fi/icons/chains/rsz_base.jpg", tokens: {
        "USDC": {
            "address": "0xF175520C52418dfE19C8098071a252da48Cd1C19",
            "chainId": 84531,
            "name": "USDCoin",
            "img": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png"
        },
        "WETH": {
            "address": "0x4200000000000000000000000000000000000006",
            "chainId": 84531,
            "name": "Wrapped Ether",
            "img": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png"
        },
       
    } },

    "Gnosis ": { id: 100, img: "https://icons.llamao.fi/icons/chains/rsz_xdai.jpg", tokens: {
        "USDC": {
            "address": "0xddafbb505ad214d7b80b1f830fccc89b60fb7a83",
            "chainId": 100,
            "name": "USDCoin",
            "img": "https://ethereum-optimism.github.io/data/USDC/logo.png"
        },
        "LINK": {
            "address": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
            "chainId": 100,
            "name": "ChainLink",
            "img": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png"
    
        }
    } 


    },

    "Ethereum Mainnet ": { id: 1, img: "https://icons.llamao.fi/icons/chains/rsz_ethereum.jpg", tokens: {
        "API3": {
            "address": "0x0b38210ea11411557c13457D4dA7dC6ea731B88a",
            "chainId": 1,
            "name": "API3",
            "img": "https://assets.coingecko.com/coins/images/13256/thumb/api3.jpg?1606751424"
        },
        "ARB": {
            "address": "0xB50721BCf8d664c30412Cfbc6cf7a15145234ad1",
            "chainId": 1,
            "name": "Arbitrum",
            "img": "https://arbitrum.foundation/logo.png"
    
        },
        "BUSD": {
            "address": "0x4Fabb145d64652a948d72533023f6E7A623C7C53",
            "chainId": 1,
            "name": "Binance USD",
            "img": "https://assets.coingecko.com/coins/images/9576/thumb/BUSD.png?1568947766"
    
        },
        "CTSI": {
            "address": "0x491604c0FDF08347Dd1fa4Ee062a822A5DD06B5D",
            "chainId": 1,
            "name": "Cartesi",
            "img": "https://assets.coingecko.com/coins/images/11038/thumb/cartesi.png?1592288021"
    
        },
        "DAI": {
            "address": "0x6B175474E89094C44Da98b954EedeAC495271d0F",
            "chainId": 1,
            "name": "Dai Stablecoin",
            "img": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png"
    
        },
        "WETH": {
            "address": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
            "chainId": 1,
            "name": "Wrapped Ether",
            "img": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png"
    
        }
    } },

    "Neon EVM MainNet ": { id: 245022934, img: "https://icons.llamao.fi/icons/chains/rsz_neon.jpg", tokens: {
        "wNEON": {
            "address": "0x202C35e517Fa803B537565c40F0a6965D7204609",
            "chainId": 245022934,
            "name": "wNEON",
            "img": "https://raw.githubusercontent.com/neonlabsorg/token-list/master/assets/wrapped-neon-logo.svg"
        },
        "wSOL": {
            "address": "0x5f38248f339Bf4e84A2caf4e4c0552862dC9F82a",
            "chainId": 245022934,
            "name": "wNEON",
            "img": "https://raw.githubusercontent.com/neonlabsorg/token-list/master/assets/solana-wsol-logo.svg"
        },

        "USDC": {
            "address": "0xEA6B04272f9f62F997F666F07D3a974134f7FFb9",
            "chainId": 245022934,
            "name": "USDC",
            "img": "https://raw.githubusercontent.com/neonlabsorg/token-list/master/assets/usd-coin-usdc-logo.svg"
        },

        "USDT": {
            "address": "0x5f0155d08eF4aaE2B500AefB64A3419dA8bB611a	",
            "chainId": 245022934,
            "name": "USDT",
            "img": "https://raw.githubusercontent.com/neonlabsorg/token-list/master/assets/tether-usdt-logo.svg"
        },

        "BTC": {
            "address": "0x54EcEC9D995A6CbFF3838F6a8F38099E518805d7	",
            "chainId": 245022934,
            "name": "BTC (Sollet)",
            "img": "https://raw.githubusercontent.com/neonlabsorg/token-list/master/assets/sollet-wbtc-logo.svg"
        },

        "BTC": {
            "address": "0xcFFd84d468220c11be64dc9dF64eaFE02AF60e8A	",
            "chainId": 245022934,
            "name": "BTC (Sollet)",
            "img": "https://raw.githubusercontent.com/neonlabsorg/token-list/master/assets/wormhole-weth-logo.svg"
        },
       
    } 


    },

    "Gnosis Chiado Testnet": { id: 10200, img: "https://gnosisscan.io/images/svg/brands/main.svg?v=23.11.2.1", tokens: {
        "USDC": {
            "address": "0x7aDD3eEe9B233d15A31C45809C3B92178D017d2D",
            "chainId": 10200,
            "name": "USDCoin",
            "img": "https://raw.githubusercontent.com/neonlabsorg/token-list/master/assets/usd-coin-usdc-logo.svg"
        },
        "WETH": {
            "address": "0x014A442480DbAD767b7615E55E271799889FA1a7",
            "chainId": 10200,
            "name": "Wrapped Ether",
            "img": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png"
    
        }
    } 


    },

     "Mantle": { id: 5000, img: "https://assets.coingecko.com/coins/images/30983/standard/mantle.jpeg?1696529822", tokens: {
        "USDT": {
            "address": "0x201eba5cc46d216ce6dc03f6a759e8e766e956ae",
            "chainId": 5000,
            "name": "Tether",
            "img": "https://assets.coingecko.com/coins/images/325/standard/Tether.png?1696501661"
        },
        "WMNT": {
            "address": "0x78c1b0c915c4faa5fffa6cabf0219da63d7f4cb8",
            "chainId": 5000,
            "name": "Wrapped Mantle",
            "img": "https://assets.coingecko.com/coins/images/30983/standard/mantle.jpeg?1696529822"
    
        }
    } 


    },

    "Celo": { id: 42220, img: "https://icons.llamao.fi/icons/chains/rsz_celo.jpg", tokens: {
        "BTC": {
            "address": "0xD629eb00dEced2a080B7EC630eF6aC117e614f1b",
            "chainId": 5000,
            "name": "Wrapped Bitcoin",
            "img": "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_WBTC.png"
        },
        "CELO": {
            "address": "0x471EcE3750Da237f93B8E339c536989b8978a438",
            "chainId": 5000,
            "name": "Celo",
            "img": "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_CELO.png"
    
        },
        "WETH": {
            "address": "0x2DEf4285787d58a2f811AF24755A8150622f4361",
            "chainId": 5000,
            "name": "Wrapped Ether",
            "img": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png"
    
        }
    } 

    


    },

    "Arbitrum One": { id: 42161, img: "https://icons.llamao.fi/icons/chains/rsz_arbitrum.jpg", tokens: {
        "1INCH": {
            "address": "0x6314C31A7a1652cE482cffe247E9CB7c3f4BB9aF",
            "chainId": 42161,
            "name": "1inch",
            "img": "https://assets.coingecko.com/coins/images/13469/thumb/1inch-token.png?1608803028"
        },
        "AAVE": {
            "address": "0xba5DdD1f9d7F570dc94a51479a000E3BCE967196",
            "chainId": 42161,
            "name": "Aave",
            "img": "https://assets.coingecko.com/coins/images/12645/thumb/AAVE.png?1601374110"
    
        },
        "API3": {
            "address": "0xF01dB12F50D0CDF5Fe360ae005b9c52F92CA7811",
            "chainId": 42161,
            "name": "API3",
            "img": "https://assets.coingecko.com/coins/images/13256/thumb/api3.jpg?1606751424"
    
        },
        "ARB": {
            "address": "0x912CE59144191C1204E64559FE8253a0e49E6548",
            "chainId": 42161,
            "name": "Arbitrum",
            "img": "https://arbitrum.foundation/logo.png"
    
        },
        "BUSD": {
            "address": "0x31190254504622cEFdFA55a7d3d272e6462629a2",
            "chainId": 42161,
            "name": "Binance USD",
            "img": "https://assets.coingecko.com/coins/images/9576/thumb/BUSD.png?1568947766"
    
        },
        "cbETH": {
            "address": "0x1DEBd73E752bEaF79865Fd6446b0c970EaE7732f",
            "chainId": 42161,
            "name": "Coinbase Wrapped Staked ETH",
            "img": "https://assets.coingecko.com/coins/images/27008/large/cbeth.png"
    
        },
        "CELO": {
            "address": "0x4E51aC49bC5e2d87e0EF713E9e5AB2D71EF4F336",
            "chainId": 42161,
            "name": "Celo native asset (Wormhole)",
            "img": "https://raw.githubusercontent.com/wormhole-foundation/wormhole-token-list/main/assets/celo_wh.png"
    
        }
    } 

    


    },


}

