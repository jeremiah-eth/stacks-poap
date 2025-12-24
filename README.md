# Stacks POAP

A simple Proof of Attendance Protocol (POAP) smart contract on Stacks blockchain.

## 📋 Overview

This contract allows anyone to mint free NFT badges as proof of attendance. Each badge is unique and permanently recorded on the blockchain.

## 🎯 Features

- **Free Minting**: No cost to claim (only network gas fees)
- **Unique Tokens**: Each badge has a unique ID
- **Permanent**: Immutable proof on the blockchain
- **Simple**: Minimal, easy-to-understand contract

## 📦 Contract Details

- **Token Name**: `poap-badge`
- **Token ID Type**: `uint` (1, 2, 3...)
- **Network**: Stacks Mainnet
- **Contract Address**: `SP95KYNT2QWA2EXJS2WZT666ZVXDA4QV4AZZ2T5G.stacks-poap`

## 🚀 Deployment

### Prerequisites
- [Clarinet](https://github.com/hirosystems/clarinet) installed
- Stacks wallet with STX for deployment fees (~6.73 STX)

### Deploy to Mainnet

1. **Review the deployment plan:**
   ```bash
   cat deployments/default.mainnet-plan.yaml
   ```

2. **Deploy the contract:**
   ```bash
   clarinet deployments apply -p deployments/default.mainnet-plan.yaml
   ```

3. **Confirm the transaction** in your Stacks wallet

## 🔧 Usage

### Minting a Badge

Call the `mint` function from your Stacks wallet or dApp:

```clarity
(contract-call? .stacks-poap mint)
```

Returns: `(ok uint)` - The token ID of your new badge

### Example with Stacks.js

```javascript
import { openContractCall } from '@stacks/connect';

await openContractCall({
  contractAddress: 'SP95KYNT2QWA2EXJS2WZT666ZVXDA4QV4AZZ2T5G',
  contractName: 'stacks-poap',
  functionName: 'mint',
  functionArgs: [],
  network: 'mainnet',
});
```

## 📝 Contract Code

```clarity
(define-non-fungible-token poap-badge uint)

(define-data-var last-token-id uint u0)

(define-public (mint)
    (let
        (
            (token-id (+ (var-get last-token-id) u1))
        )
        (try! (nft-mint? poap-badge token-id tx-sender))
        (var-set last-token-id token-id)
        (ok token-id)
    )
)
```

## 🧪 Testing

```bash
# Check contract syntax
clarinet check

# Run tests
npm install
npm test
```

## 📄 License

MIT

## 🤝 Contributing

Contributions welcome! Please open an issue or PR.

---

**Built with ❤️ on Stacks**
