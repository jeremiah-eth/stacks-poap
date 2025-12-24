import { useState } from 'react'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="h-16 border-b border-white/5 flex items-center px-6 glass sticky top-0 z-50">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyber-500 to-cyber-400 flex items-center justify-center font-bold text-cyber-950">P</div>
            <span className="text-xl font-display tracking-tight font-black uppercase">Stacks<span className="text-cyber-400">POAP</span></span>
          </div>
          <button className="px-5 py-2 rounded-full bg-cyber-500/10 border border-cyber-500/20 text-cyber-400 font-medium hover:bg-cyber-500/20 transition-all text-sm">
            Connect Wallet
          </button>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
        <section className="text-center py-20 pb-32">
          <div className="inline-block px-4 py-1.5 rounded-full bg-cyber-500/10 border border-cyber-500/20 text-cyber-400 text-xs font-bold uppercase tracking-widest mb-6">
            Mainnet Live
          </div>
          <h1 className="text-6xl md:text-8xl mb-6 max-w-4xl mx-auto leading-[0.9]">
            Prove You Were <span className="text-gradient">There.</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Claims your unique Proof of Attendance badges on the Stacks blockchain. Fast, permanent, and free to mint.
          </p>
          <div className="flex justify-center gap-4">
            <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyber-500 to-cyber-400 text-cyber-950 font-bold text-lg hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all transform hover:-translate-y-1">
              Mint My Badge
            </button>
            <button className="px-8 py-4 rounded-xl glass font-bold text-lg hover:bg-white/10 transition-all">
              View Collection
            </button>
          </div>
        </section>

        <div className="grid md:grid-cols-3 gap-6 pt-12 border-t border-white/5">
          {[
            { label: 'Network', value: 'Stacks Mainnet', color: 'text-cyber-500' },
            { label: 'Total Minted', value: '0', color: 'text-cyber-400' },
            { label: 'Standard', value: 'SIP-009', color: 'text-indigo-400' }
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
