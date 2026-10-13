import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Wallet, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, Building2, Smartphone } from 'lucide-react'
import { useModals } from '../../context/ModalContext'

export default function WithdrawModal() {
  const { isWithdrawOpen, closeWithdraw, showToast } = useModals()
  const [amount, setAmount] = useState('600')
  const [stage, setStage] = useState<'input' | 'processing' | 'success'>('input')
  const [stepIndex, setStepIndex] = useState(0)

  if (!isWithdrawOpen) return null

  const handleWithdraw = () => {
    setStage('processing')
    setStepIndex(1)
    setTimeout(() => {
      setStepIndex(2)
      setTimeout(() => {
        setStepIndex(3)
        setTimeout(() => {
          setStage('success')
          showToast(`₹${amount} successfully transferred to rahul.sharma@okhdfcbank`)
        }, 800)
      }, 900)
    }, 900)
  }

  const handleReset = () => {
    setStage('input')
    setStepIndex(0)
    closeWithdraw()
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleReset}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden z-10"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Wallet size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Instant UPI Withdrawal</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Zero fee • Dispatched via NPCI Instant Rail</p>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div className="p-6">
            {stage === 'input' && (
              <div className="space-y-5">
                {/* Available Balance Card */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50/50 dark:from-slate-800 dark:to-slate-800/50 border border-blue-100 dark:border-slate-700/80 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                      Available Claim Balance
                    </span>
                    <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 tabular-nums mt-0.5">
                      ₹900<span className="text-sm font-medium text-slate-400">.00</span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 px-2.5 py-1 rounded-full">
                    Active & Ready
                  </span>
                </div>

                {/* Amount input */}
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-2">
                    Withdrawal Amount (₹)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-lg font-bold text-slate-400">₹</span>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      max={900}
                      min={50}
                      className="w-full pl-9 pr-24 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-lg font-bold text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setAmount('900')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 hover:bg-blue-100 px-2.5 py-1.5 rounded-lg transition-colors"
                    >
                      Max (₹900)
                    </button>
                  </div>

                  {/* Preset chips */}
                  <div className="flex gap-2 mt-2.5">
                    {['300', '600', '900'].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setAmount(preset)}
                        className={`text-xs font-semibold px-3 py-1 rounded-lg border transition-all ${
                          amount === preset
                            ? 'bg-blue-50 dark:bg-blue-500/20 border-blue-500 text-blue-600 dark:text-blue-400'
                            : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        ₹{preset}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Payout Destination */}
                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                      <Smartphone size={18} />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
                        <span>rahul.sharma@okhdfcbank</span>
                        <ShieldCheck size={14} className="text-emerald-500" />
                      </div>
                      <span className="text-[11px] text-slate-400">HDFC Bank • Account ending in ••8201</span>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-500/10 px-2 py-0.5 rounded border border-teal-200 dark:border-teal-500/20">
                    Primary
                  </span>
                </div>

                {/* Action button */}
                <button
                  onClick={handleWithdraw}
                  disabled={!amount || Number(amount) <= 0 || Number(amount) > 900}
                  className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 active:scale-[0.99] transition-all"
                >
                  <span>Transfer ₹{amount || 0} to UPI</span>
                  <ArrowRight size={17} />
                </button>
              </div>
            )}

            {stage === 'processing' && (
              <div className="py-6 flex flex-col items-center text-center space-y-6">
                <div className="relative flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border-4 border-blue-100 dark:border-blue-900 border-t-blue-500 animate-spin" />
                  <Sparkles size={24} className="absolute text-blue-500 animate-pulse" />
                </div>

                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    Processing 90-Second Instant Disbursal
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Direct NPCI link to HDFC Bank UPI Network
                  </p>
                </div>

                {/* Stepper */}
                <div className="w-full space-y-2 text-left bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                    <span>Instant Parametric Balance Verified</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    {stepIndex >= 2 ? (
                      <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin shrink-0" />
                    )}
                    <span>Routing through NPCI UPI Settlement Switch</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    {stepIndex >= 3 ? (
                      <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-slate-300 dark:border-slate-600 shrink-0" />
                    )}
                    <span>Depositing into rahul.sharma@okhdfcbank</span>
                  </div>
                </div>
              </div>
            )}

            {stage === 'success' && (
              <div className="py-4 flex flex-col items-center text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 size={36} />
                </div>

                <div>
                  <h4 className="text-xl font-extrabold text-slate-900 dark:text-white">
                    ₹{amount}.00 Transferred!
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Funds deposited into HDFC Bank Account (••8201)
                  </p>
                </div>

                <div className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2 text-left text-xs font-mono">
                  <div className="flex justify-between text-slate-500">
                    <span>UTR Reference:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">#UPI-982173049182</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Timestamp:</span>
                    <span className="text-slate-800 dark:text-slate-200">{new Date().toLocaleTimeString()} IST</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Remaining Balance:</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">₹{900 - Number(amount)}.00</span>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="w-full bg-slate-900 dark:bg-slate-700 text-white font-semibold py-2.5 px-4 rounded-xl text-sm hover:bg-slate-800 transition-colors"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
