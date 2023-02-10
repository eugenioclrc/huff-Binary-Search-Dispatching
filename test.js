import createHuffTemplate from './src/lib/createHuffTemplate.js';

const iface = [
  // Constructor
  "constructor(string symbol, string name)",
  "function allowance(address,address) view returns (uint256)",

  "function approve(address,uint256)",
  "function balanceOf(address) view returns (uint256)",
  "function DOMAIN_SEPARATOR() view returns (bytes32)",
  "function nonces(address) view returns (uint256)",
  "function permit(address,address,uint256,uint256,uint8,bytes32,bytes32)",
  "function totalSupply() view returns (uint256)",
  "function transfer(address,uint256)",
  "function transferFrom(address,address,uint256)",
  "function decimals()  returns (uint256)",
  "function name()  returns (string)",
  "function symbol()  returns (string)",
];

let iface2

console.log(createHuffTemplate([
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            },
            {
                "name": "_spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    }
]));


/* OUTPUT */
/*

// Define Interface
#define function allowance(address,address) view returns (uint256)
#define function approve(address,uint256) returns ()
#define function balanceOf(address) view returns (uint256)
#define function DOMAIN_SEPARATOR() view returns (bytes32)
#define function nonces(address) view returns (uint256)
#define function permit(address,address,uint256,uint256,uint8,bytes32,bytes32) returns ()
#define function totalSupply() view returns (uint256)
#define function transfer(address,uint256) returns ()
#define function transferFrom(address,address,uint256) returns ()
#define function decimals() nonpayable returns (uint256)
#define function name() nonpayable returns (string)
#define function symbol() nonpayable returns (string)

// Function Dispatching
#define macro MAIN() = takes (1) returns (1) {
    // Identify which function is being called.
    // [func sig]
    0x00 calldataload 0xE0 shr
    

    // pivot0 cut on function balanceOf(address) view returns (uint256)
    dup1 0x70a08231 lt pivot0 jumpi
      
      // pivot00 cut on function transferFrom(address,address,uint256)
      dup1 0x23b872dd lt pivot00 jumpi
                // function name() returns (string)
        dup1 0x06fdde03  eq nameJump                      jumpi;

        // function approve(address,uint256)
        dup1 0x095ea7b3  eq approveJump                   jumpi;

        // function totalSupply() view returns (uint256)
        dup1 0x18160ddd  eq totalSupplyJump               jumpi;


        not_found jump

      pivot00:
                // function transferFrom(address,address,uint256)
        dup1 0x23b872dd  eq transferFromJump              jumpi;

        // function decimals() returns (uint256)
        dup1 0x313ce567  eq decimalsJump                  jumpi;

        // function DOMAIN_SEPARATOR() view returns (bytes32)
        dup1 0x3644e515  eq DOMAIN_SEPARATORJump          jumpi;


        not_found jump


    pivot0:
      
      // pivot01 cut on function transfer(address,uint256)
      dup1 0xa9059cbb lt pivot01 jumpi
                // function balanceOf(address) view returns (uint256)
        dup1 0x70a08231  eq balanceOfJump                 jumpi;

        // function nonces(address) view returns (uint256)
        dup1 0x7ecebe00  eq noncesJump                    jumpi;

        // function symbol() returns (string)
        dup1 0x95d89b41  eq symbolJump                    jumpi;


        not_found jump

      pivot01:
                // function transfer(address,uint256)
        dup1 0xa9059cbb  eq transferJump                  jumpi;

        // function permit(address,address,uint256,uint256,uint8,bytes32,bytes32)
        dup1 0xd505accf  eq permitJump                    jumpi;

        // function allowance(address,address) view returns (uint256)
        dup1 0xdd62ed3e  eq allowanceJump                 jumpi;


        not_found jump



    not_found:
      // Revert if no match is found.
      0x00 dup1 revert
    

    // function name() returns (string) 
    nameJump:
       NAME()


    // function approve(address,uint256) 
    approveJump:
       APPROVE()


    // function totalSupply() view returns (uint256) 
    totalSupplyJump:
       TOTAL_SUPPLY()


    // function transferFrom(address,address,uint256) 
    transferFromJump:
       TRANSFER_FROM()


    // function decimals() returns (uint256) 
    decimalsJump:
       DECIMALS()


    // function DOMAIN_SEPARATOR() view returns (bytes32) 
    DOMAIN_SEPARATORJump:
       DOMAIN_SEPARATOR()


    // function balanceOf(address) view returns (uint256) 
    balanceOfJump:
       BALANCE_OF()


    // function nonces(address) view returns (uint256) 
    noncesJump:
       NONCES()


    // function symbol() returns (string) 
    symbolJump:
       SYMBOL()


    // function transfer(address,uint256) 
    transferJump:
       TRANSFER()


    // function permit(address,address,uint256,uint256,uint8,bytes32,bytes32) 
    permitJump:
       PERMIT()


    // function allowance(address,address) view returns (uint256) 
    allowanceJump:
       ALLOWANCE()

      */