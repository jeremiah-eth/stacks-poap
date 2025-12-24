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

## 🌍 Deployment

### Frontend (Vercel / Netlify)
1. Connect your GitHub repository.
2. Set the **Root Directory** to `frontend`.
3. Build Command: `npm run build`.
4. Output Directory: `dist`.

### Smart Contract
The contract is already deployed on Mainnet. If you wish to deploy your own version:
1. Update `Clarinet.toml` with your settings.
2. Run `clarinet deploy --mainnet`.

## ✅ License
MIT
