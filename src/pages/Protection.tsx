import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ShieldCheck, CheckCircle2, Zap, ArrowRight, Download, Sparkles,
  QrCode, AlertCircle, RefreshCw, Smartphone, Layers, Lock, MapPin
} from 'lucide-react'
import { useModals } from '../context/ModalContext'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
}

const tiers = [
  {
    id: 'basic',
    name: 'GigShield Starter',
    price: '₹15',
    cap: '₹750 / week',
    hourly: '₹50 / hr',
    features: ['Rainfall > 25 mm/hr trigger', '2 eligible claims per week', 'Standard UPI settlement (15 min)'],
    recommended: false,
  },
  {
    id: 'essential',
    name: 'GigShield Essential',
    price: '₹30',
    cap: '₹1,500 / week',
    hourly: '₹75 / hr',
    features: [
      'Rainfall > 20 mm/hr trigger',
      'Waterlogging & low underpass closure',
      'Instant UPI payout in 90 seconds',
      'Priority GPS precinct monitoring',
    ],
    recommended: true,
    active: true,
  },
  {
    id: 'pro',
    name: 'GigShield Pro Max',
    price: '₹50',
    cap: '₹2,500 / week',
    hourly: '₹110 / hr',
    features: [
      'Rainfall > 15 mm/hr sensitive trigger',
      'Extreme Heatwave (> 42°C) protection',
      'Curfew & civil disruption coverage',
      'Instant UPI in 45 seconds',
      'Family safety hospital emergency cash',
    ],
    recommended: false,
  },
]

export default function Protection() {
  const [selectedTier, setSelectedTier] = useState('essential')
  const { openLockPlan, showToast } = useModals()

  const handleDownload = () => {
    showToast('Policy Certificate PDF generated & downloaded successfully!')
  }

  return (
    <motion.div initial="initial" animate="animate" className="flex flex-col gap-6 lg:gap-8">
      {/* Header */}
      <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-500 mb-1">
            <ShieldCheck size={18} />
            <span className="text-xs font-bold tracking-wider uppercase">Active Policy Guarantee</span>
          </div>
          <h1 className="text-2xl lg:text-[2rem] font-bold text-slate-900 dark:text-white tracking-tight">
            My Protection
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Institutional income security powered by automated meteorological triggers.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/60 shadow-sm transition-all"
          >
            <Download size={16} />
            <span>Download Certificate</span>
          </button>
          <button
            onClick={openLockPlan}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all"
          >
            <Lock size={16} />
            <span>Lock Daily Plan</span>
          </button>
        </div>
      </motion.div>

      {/* Holographic Metal Policy Card + Telemetry */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Fintech Virtual Card */}
        <div className="lg:col-span-7 relative overflow-hidden rounded-3xl p-7 text-white shadow-2xl bg-gradient-to-tr from-slate-950 via-slate-900 to-blue-950 border border-slate-800 flex flex-col justify-between min-h-[300px]">
          {/* Subtle glowing orb background effect */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top of Card */}
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <ShieldCheck size={22} className="text-white" />
              </div>
              <div>
                <span className="font-bold text-lg tracking-tight">GigShield Pro Pass</span>
                <span className="block text-[11px] text-slate-400 font-mono">PARAMETRIC LEDGER ID</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500" />
              </span>
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider font-mono">COVERAGE ACTIVE</span>
            </div>
          </div>

          {/* Middle chip & NFC */}
          <div className="relative my-6 flex items-center gap-4">
            <div className="w-12 h-9 rounded-lg bg-gradient-to-br from-amber-200 via-amber-300 to-amber-400 shadow-sm border border-amber-100/40 relative overflow-hidden flex items-center justify-center">
              <div className="w-8 h-6 border border-amber-600/40 rounded flex flex-col justify-around p-0.5">
                <div className="border-b border-amber-600/40" />
                <div className="border-b border-amber-600/40" />
              </div>
            </div>
            <span className="text-xs text-slate-400 font-mono tracking-widest">
              GS • 8506 • 0822 • 7412 • 2026
            </span>
          </div>

          {/* Bottom Card details */}
          <div className="relative flex items-end justify-between pt-4 border-t border-slate-800/80">
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Insured Partner</span>
              <span className="font-bold text-base tracking-wide">RAHUL SHARMA</span>
              <span className="text-xs text-slate-400 block mt-0.5">Nagpur East Delivery Hub</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Weekly Benefit Pool</span>
              <span className="font-mono text-xl font-extrabold text-blue-400">₹1,500.00</span>
              <span className="text-[11px] text-slate-400 block">Cap refills in 5 days</span>
            </div>
          </div>
        </div>

        {/* Policy Telemetry & Zone Info */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700/60 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">Geofenced Micro-Precinct</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Continuous telemetry binding to your partner delivery app</p>

            <div className="mt-4 space-y-3">
              <div className="p-3 bg-slate-50 dark:bg-slate-700/40 rounded-xl border border-slate-200/60 dark:border-slate-600/40 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <MapPin size={18} className="text-blue-500" />
                  <div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">Nagpur East Sector 04</span>
                    <span className="text-[11px] text-slate-400">Sitabuldi, Lakadganj, Mahal corridor</span>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded">
                  GPS LOCKED
                </span>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-700/40 rounded-xl border border-slate-200/60 dark:border-slate-600/40 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Smartphone size={18} className="text-teal-500" />
                  <div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">Registered UPI Target</span>
                    <span className="text-[11px] text-slate-400">rahul.sharma@okhdfcbank</span>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-500/10 px-2 py-0.5 rounded">
                  VERIFIED
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 mt-4 flex items-center justify-between text-xs text-slate-500">
            <span>Policy Status: <strong className="text-emerald-600 dark:text-emerald-400">Protected</strong></span>
            <span>Auto-renew: <strong className="text-slate-700 dark:text-slate-300">Enabled (Every Mon)</strong></span>
          </div>
        </div>
      </motion.div>

      {/* Plan Tiers Selection */}
      <motion.div variants={fadeUp} className="bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700/60 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Choose Protection Tier</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Flexible weekly plans customized for food & grocery gig riders</p>
          </div>
          <span className="text-xs font-medium text-slate-400 bg-slate-50 dark:bg-slate-700/60 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
            Switch anytime • Zero lock-in
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {tiers.map((t) => {
            const active = selectedTier === t.id
            return (
              <div
                key={t.id}
                onClick={() => {
                  setSelectedTier(t.id)
                  showToast(`Selected ${t.name}! Plan will update on next renewal.`)
                }}
                className={`relative rounded-2xl p-5 border-2 cursor-pointer transition-all flex flex-col justify-between ${
                  active
                    ? 'border-blue-500 bg-blue-50/40 dark:bg-blue-500/5 shadow-md shadow-blue-500/5 ring-2 ring-blue-500/10'
                    : 'border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-800/50 hover:border-blue-300 dark:hover:border-blue-500/30'
                }`}
              >
                {t.recommended && (
                  <span className="absolute -top-3 left-6 bg-blue-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                    Current Active Tier
                  </span>
                )}

                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-base text-slate-900 dark:text-white">{t.name}</h4>
                      <div className="flex items-baseline gap-1 mt-1">
                        <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">{t.price}</span>
                        <span className="text-xs text-slate-400">/ week</span>
                      </div>
                    </div>
                    {active && <CheckCircle2 size={20} className="text-blue-500" />}
                  </div>

                  <div className="my-4 py-3 border-y border-slate-100 dark:border-slate-700/60 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Weekly Pool Cap:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{t.cap}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Disruption Hourly Rate:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{t.hourly}</span>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {t.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                        <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  className={`w-full py-2.5 rounded-xl font-semibold text-xs transition-colors ${
                    active
                      ? 'bg-blue-500 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {active ? 'Active Plan' : 'Select Plan'}
                </button>
              </div>
            )
          })}
        </div>
      </motion.div>
    </motion.div>
  )
}
