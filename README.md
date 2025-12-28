# Stacks POAP

A decentralized Proof of Attendance Protocol built on the Stacks blockchain. Users can connect their wallets and mint unique, permanent badges to prove their participation in events.

## 🚀 Live on Mainnet
- **Contract Address**: `SP95KYNT2QWA2EXJS2WZT666ZVXDA4QV4AZZ2T5G.stacks-poap`
- **Network**: Stacks Mainnet (Clarity 4 / Nakamoto)

## 💻 Tech Stack
- **Smart Contract**: Clarity 4
- **Frontend**: React (Vite) + Tailwind CSS + Framer Motion
- **Wallet**: @stacks/connect (Leather, Xverse)

## 🛠️ Local Development

### Prerequisites
- Node.js (v18+)
- Clarinet (for contract testing)

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/jeremiah-eth/stacks-poap.git
   cd stacks-poap
   ```

2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

## 🚀 Deployment

### Vercel (Recommended)
1. Fork this repository.
2. Import project into Vercel.
3. Set environment variables (if any, e.g. `VITE_STACKS_NETWORK` for testnet override).
4. Deploy.

### Netlify
1. Drag and drop the `dist` folder after running `npm run build`.
2. Or connect your Git repo and use build command `npm run build` and publish directory `dist`.

## 🛠 Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, Framer Motion
- **Blockchain**: Stacks.js, Clarity
- **Styling**: Glassmorphism, Premium Dark UI

### Smart Contract
The contract is already deployed on Mainnet. If you wish to deploy your own version:
1. Update `Clarinet.toml` with your settings.
2. Run `clarinet deploy --mainnet`.

## ✅ License
MIT
