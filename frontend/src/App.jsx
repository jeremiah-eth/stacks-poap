import Navbar from './components/Navbar'
import Button from './components/Button'
import CollectionGrid from './components/CollectionGrid'
import { useStacks } from './context/StacksContext'
import { useMint } from './hooks/useMint'
import { useSupply } from './hooks/useSupply'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

function App() {
  const { isConnected, connectWallet } = useStacks();
  const { mint, isMinting } = useMint();
  const { supply, refresh: refreshSupply } = useSupply();

  const handleMint = async () => {
    if (!isConnected) {
      connectWallet();
      return;
    }
    await mint();
    toast.success('Minting started! Check your wallet.');
    // In a real app, we'd wait for tx confirmation here
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
        <section className="text-center py-20 pb-32">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-cyber-500/10 border border-cyber-500/20 text-cyber-400 text-xs font-bold uppercase tracking-widest mb-6"
          >
            Mainnet Live
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-7xl md:text-8xl mb-6 max-w-4xl mx-auto leading-[1] md:leading-[0.9]"
          >
            Prove You Were <span className="text-gradient">There.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Claim your unique Proof of Attendance badges on the Stacks blockchain. Fast, permanent, and free to mint.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button
              onClick={handleMint}
              disabled={isMinting}
              className={isMinting ? 'animate-pulse' : ''}
            >
              {isMinting ? 'Minting...' : 'Mint My Badge'}
            </Button>
            <a href="#collection">
              <Button variant="secondary">
                View Collection
              </Button>
            </a>
          </motion.div>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-12 border-t border-white/5 mb-32">
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

        <Section id="collection" className="min-h-screen pt-20 pb-20">
          <Container>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                  Your Collection
                </h2>
                <p className="text-slate-400 mt-2 text-sm md:text-base">
                  Badges earned through your Stacks journey
                </p>
              </div>
            </div>

            <CollectionGrid />
          </Container>
        </Section>
      </main>




      <footer className="py-12 px-6 border-t border-white/5 text-center text-slate-500 text-sm">
        <p>&copy; 2024 Stacks POAP. Built with Stacks Nakamoto (Clarity 4).</p>
      </footer>
    </div>
  )
}

export default App
