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
            "chainId": 1,
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

    "Starknet ": { id: 100, img: "https://s2.coinmarketcap.com/static/img/coins/200x200/22691.png", tokens: {
        "USDC": {
            "address": "0xddafbb505ad214d7b80b1f830fccc89b60fb7a83",
            "chainId": 100,
            "name": "USDCoin",
            "img": "https://s2.coinmarketcap.com/static/img/coins/200x200/22691.png"
        },
        "LINK": {
            "address": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
            "chainId": 1,
            "name": "ChainLink",
            "img": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png"
    
        }
    } 


    },


}
