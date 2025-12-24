import { useState } from 'react'
import Navbar from './components/Navbar'
import Button from './components/Button'
import { useStacks } from './context/StacksContext'
import { useMint } from './hooks/useMint'
import { useSupply } from './hooks/useSupply'
import toast from 'react-hot-toast'

function App() {
  const { isConnected, connectWallet } = useStacks();
  const { mint, isMinting } = useMint();
  const { supply } = useSupply();

  const handleMint = async () => {
    if (!isConnected) {
      connectWallet();
      return;
    }
    await mint();
    toast.success('Minting started! Check your wallet.');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
        <section className="text-center py-20 pb-32">
          <div className="inline-block px-4 py-1.5 rounded-full bg-cyber-500/10 border border-cyber-500/20 text-cyber-400 text-xs font-bold uppercase tracking-widest mb-6">
            Mainnet Live
          </div>
          <h1 className="text-6xl md:text-8xl mb-6 max-w-4xl mx-auto leading-[0.9]">
            Prove You Were <span className="text-gradient">There.</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Claim your unique Proof of Attendance badges on the Stacks blockchain. Fast, permanent, and free to mint.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              onClick={handleMint}
              disabled={isMinting}
              className={isMinting ? 'animate-pulse' : ''}
            >
              {isMinting ? 'Minting...' : 'Mint My Badge'}
            </Button>
            <Button variant="secondary">
              View Collection
            </Button>
          </div>
        </section>

        <div className="grid md:grid-cols-3 gap-6 pt-12 border-t border-white/5">
          {[
            { label: 'Network', value: 'Stacks Mainnet', color: 'text-cyber-500' },
            { label: 'Total Minted', value: supply.toString(), color: 'text-cyber-400' },
            { label: 'Standard', value: 'Nakamoto (Clarity 4)', color: 'text-indigo-400' }
          ].map((stat) => (
            <div key={stat.label} className="p-6 rounded-2xl glass">
              <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-1">{stat.label}</p>
              <p className={`text-3xl font-display font-black ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>
      </main>



      <footer className="py-12 px-6 border-t border-white/5 text-center text-slate-500 text-sm">
        <p>&copy; 2024 Stacks POAP. Built with Stacks Nakamoto (Clarity 4).</p>
      </footer>
    </div>
  )
}

export default App
