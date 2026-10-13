import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Lock, ShieldCheck, Check, Clock, Bike, Zap } from 'lucide-react'
import { useModals } from '../../context/ModalContext'

const shifts = [
  { id: 'morning', label: 'Morning Surge', time: '06:00 - 14:00', icon: Clock },
  { id: 'evening', label: 'Evening Peak (Active)', time: '14:00 - 22:00', icon: Clock },
  { id: 'night', label: 'Late Night Shift', time: '22:00 - 06:00', icon: Clock },
  { id: 'fullday', label: 'Full Day Lock (24h)', time: '06:00 - 06:00 (+1)', icon: Zap },
]

const platforms = ['Swiggy', 'Zomato', 'Zepto', 'Blinkit', 'Uber Moto']

export default function LockPlanModal() {
  const { isLockPlanOpen, closeLockPlan, showToast } = useModals()
  const [selectedShift, setSelectedShift] = useState('evening')
  const [selectedPlatform, setSelectedPlatform] = useState('Swiggy')
  const [tier, setTier] = useState<'standard' | 'pro'>('standard')

  if (!isLockPlanOpen) return null

  const handleLock = () => {
    closeLockPlan()
    showToast(`Daily Protection Locked for ${selectedPlatform} (${selectedShift.toUpperCase()})`)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeLockPlan}
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
              <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-center">
                <Lock size={18} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Lock Daily Protection Plan</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Lock your parametric guarantee before starting your shift</p>
              </div>
            </div>
            <button
              onClick={closeLockPlan}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div className="p-6 space-y-5">
            {/* Shift selection */}
            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-2">
                1. Select Shift Window
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {shifts.map((s) => {
                  const active = selectedShift === s.id
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSelectedShift(s.id)}
                      className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                        active
                          ? 'border-blue-500 bg-blue-50/60 dark:bg-blue-500/10 ring-2 ring-blue-500/10'
                          : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-bold ${active ? 'text-blue-600 dark:text-blue-400' : 'text-slate-800 dark:text-slate-200'}`}>
                          {s.label}
                        </span>
                        {active && <Check size={14} className="text-blue-500" />}
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono">{s.time}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Platform selection */}
            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-2">
                2. Active Gig Platform
              </label>
              <div className="flex flex-wrap gap-2">
                {platforms.map((p) => {
                  const active = selectedPlatform === p
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setSelectedPlatform(p)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                        active
                          ? 'border-blue-500 bg-blue-500 text-white shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      {p}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Coverage Tier */}
            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-2">
                3. Choose Coverage Tier
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setTier('standard')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    tier === 'standard'
                      ? 'border-blue-500 bg-blue-50/60 dark:bg-blue-500/10 ring-2 ring-blue-500/10'
                      : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">Standard Shield</span>
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400">₹5/day</span>
                  </div>
                  <span className="text-[11px] text-slate-400 block">Up to ₹300 payout per event</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTier('pro')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    tier === 'pro'
                      ? 'border-blue-500 bg-blue-50/60 dark:bg-blue-500/10 ring-2 ring-blue-500/10'
                      : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">Shield Pro Max</span>
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400">₹8/day</span>
                  </div>
                  <span className="text-[11px] text-slate-400 block">Up to ₹600 payout + Heatwave cover</span>
                </button>
              </div>
            </div>

            {/* Micro guarantee notice */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-2.5 text-xs text-slate-500">
              <ShieldCheck size={18} className="text-emerald-500 shrink-0" />
              <span>Deducted automatically from your weekly ₹30 balance pool. Zero advance card charges.</span>
            </div>

            {/* Confirm button */}
            <button
              onClick={handleLock}
              className="w-full bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10 active:scale-[0.99] transition-all"
            >
              <Lock size={16} />
              <span>Confirm & Lock Plan for Shift</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
