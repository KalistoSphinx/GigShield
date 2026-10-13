import { useState } from 'react'
import { motion } from 'framer-motion'
import { useModals } from '../context/ModalContext'
import {
  FlaskConical, Info, Sun, CloudRain, CloudLightning, Tornado, Waves,
  MapPin, ChevronDown, Calculator, RotateCcw, CheckCircle2, Zap,
  Save, RefreshCw, Satellite, Landmark, HeartHandshake, Gavel
} from 'lucide-react'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
}
const stagger = { animate: { transition: { staggerChildren: 0.06 } } }

const scenarios = [
  { id: 'normal', label: 'Normal Weather', icon: Sun, rate: '0 mm/hr', desc: 'Dry route operations', iconColor: 'text-slate-400' },
  { id: 'light', label: 'Light Rain', icon: CloudRain, rate: '8 mm/hr', desc: 'Standard gear usage', iconColor: 'text-slate-500' },
  { id: 'heavy', label: 'Heavy Rainfall', icon: CloudLightning, rate: '24 mm/hr', desc: 'Parametric trigger level', iconColor: 'text-blue-500' },
  { id: 'extreme', label: 'Extreme Rainfall', icon: Tornado, rate: '48 mm/hr', desc: 'Severe delivery halting', iconColor: 'text-red-500' },
  { id: 'waterlog', label: 'Local Waterlogging', icon: Waves, rate: '35 mm + Stagnation', desc: 'Route inundation & low underpass closure', iconColor: 'text-blue-400', span: true },
]

const hours = [
  { h: 2, label: '2 Hours', sub: 'Under threshold', subColor: 'text-red-400' },
  { h: 4, label: '4 Hours', sub: 'Eligible tier', subColor: 'text-white/80' },
  { h: 6, label: '6 Hours', sub: 'Eligible tier', subColor: 'text-slate-400' },
  { h: 8, label: '8 Hours', sub: 'Full shift lock', subColor: 'text-slate-400' },
]

const checks = [
  { label: 'Rainfall intensity check', value: '24 mm/hr ≥ 20 mm/hr threshold' },
  { label: 'Disruption duration check', value: '4 hrs ≥ 3 hrs min. threshold' },
  { label: 'Active policy validity', value: 'GigShield Essential Confirmed', highlight: true },
  { label: 'Within weekly cap rule', value: '₹300 ≤ ₹1,500 total cap' },
]

const faqs = [
  { icon: Satellite, title: 'What is a Parametric Trigger?', desc: 'Unlike traditional claims that demand receipts, parametric insurance pays out automatically once objective weather feeds (like IMD satellite radar exceeding 20 mm/hr in Nagpur) detect severe conditions.' },
  { icon: Landmark, title: 'How do I receive compensation?', desc: 'Once a storm passes our 3-hour minimum threshold, your locked payout is dispatched directly to your registered UPI ID (e.g. Google Pay, PhonePe) within 90 seconds. No adjusters, no delays.' },
  { icon: HeartHandshake, title: 'Does this affect my platform rating?', desc: 'No. GigShield operates independently of food delivery or ride-hailing aggregators. Protecting your earnings during red alerts safeguards your income with absolute dignity.' },
]

export default function ClaimSimulator() {
  const [selectedScenario, setSelectedScenario] = useState('heavy')
  const [rainfall, setRainfall] = useState(24)
  const [selectedHours, setSelectedHours] = useState(4)
  const { showToast } = useModals()

  const payout = selectedHours >= 3 && rainfall >= 20 ? selectedHours * 75 : 0
  const eligible = payout > 0
  const poolUsed = Math.round((payout / 1500) * 100)

  const handleEvaluate = () => {
    if (eligible) {
      showToast(`Rule engine evaluated! ₹${payout} approved for instant UPI transfer.`)
    } else {
      showToast('Threshold not met: Requires rainfall ≥ 20 mm/hr and disruption ≥ 3 hrs.')
    }
  }

  const handleReset = () => {
    setSelectedScenario('normal')
    setRainfall(0)
    setSelectedHours(2)
    showToast('Simulation parameters reset to baseline dry weather.')
  }

  const handleSaveClaim = () => {
    showToast(`Claim #GS-1003 (₹${payout}) saved to Demo Claims History!`)
  }

  const handleSimulateAnother = () => {
    setSelectedScenario('extreme')
    setRainfall(48)
    setSelectedHours(6)
    showToast('Loaded Extreme Rainfall scenario (48 mm/hr, 6 hrs disruption).')
  }

  return (
    <motion.div className="flex flex-col gap-6" initial="initial" animate="animate" variants={stagger}>
      {/* Notice Banner */}
      <motion.div variants={fadeUp} className="w-full bg-blue-50 dark:bg-blue-500/5 border border-blue-200 dark:border-blue-500/20 rounded-xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-blue-500 text-white flex items-center justify-center shrink-0">
            <Info size={16} />
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            <strong className="font-semibold text-blue-600 dark:text-blue-400">Simulation only:</strong> No real insurance coverage, claim approval, or payment is provided.
          </p>
        </div>
        <span className="text-xs font-semibold text-slate-400 bg-white dark:bg-slate-800 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700 font-mono hidden sm:block">SANDBOX v2.4</span>
      </motion.div>

      {/* Header */}
      <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-500 mb-1">
            <FlaskConical size={18} />
            <span className="text-xs font-bold tracking-wider uppercase">Parametric Engine Sandbox</span>
          </div>
          <h2 className="text-2xl lg:text-[2rem] font-bold text-slate-900 dark:text-white tracking-tight">Claim Simulator</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Explore how weather disruption could qualify for a potential benefit.</p>
        </div>
        <div className="flex items-center gap-3 bg-white dark:bg-slate-800 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm shrink-0">
          <span className="relative flex h-2.5 w-2.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" /><span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500" /></span>
          <span className="text-xs font-semibold text-teal-600 dark:text-teal-400">IMD Radar Node: Nagpur #04 Connected</span>
        </div>
      </motion.div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left: Configuration */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Step 1 */}
          <motion.section variants={fadeUp} className="bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700/60 p-5 lg:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold">1</span>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">Choose Scenario</h3>
              </div>
              <span className="text-xs text-slate-400 font-medium">Select disruption archetype</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {scenarios.map(s => {
                const active = selectedScenario === s.id
                return (
                  <motion.button
                    key={s.id}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedScenario(s.id)}
                    className={`flex flex-col p-3.5 rounded-xl border-2 text-left transition-all relative ${
                      s.span ? 'sm:col-span-2' : ''
                    } ${active
                      ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-500/5 ring-2 ring-blue-500/10 shadow-sm'
                      : 'border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-800/60 hover:border-blue-300 dark:hover:border-blue-500/30 hover:bg-slate-50 dark:hover:bg-slate-700/40'
                    }`}
                  >
                    {active && (
                      <span className="absolute -top-2.5 right-3 bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Active</span>
                    )}
                    <div className="flex items-center justify-between w-full mb-3">
                      <s.icon size={22} className={active ? 'text-blue-500' : s.iconColor} />
                      <span className={`text-xs font-mono font-semibold px-2 py-0.5 rounded ${
                        active ? 'bg-blue-100 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20'
                        : s.id === 'extreme' ? 'bg-red-50 dark:bg-red-500/10 text-red-500'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                      }`}>{s.rate}</span>
                    </div>
                    <span className={`text-sm font-semibold ${active ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-800 dark:text-slate-200'}`}>{s.label}</span>
                    <span className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{s.desc}</span>
                  </motion.button>
                )
              })}
            </div>
          </motion.section>

          {/* Step 2 */}
          <motion.section variants={fadeUp} className="bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700/60 p-5 lg:p-6 shadow-sm flex flex-col gap-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700/40">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold">2</span>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">Disruption Details</h3>
              </div>
              <span className="text-xs text-slate-400 font-medium">Fine-tune parameters</span>
            </div>

            {/* Location */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-between">
                <span>Rider Location Precinct</span>
                <span className="text-xs font-normal text-slate-400">Auto-detected via GPS</span>
              </label>
              <div className="relative">
                <MapPin size={17} className="absolute left-3 top-3 text-slate-400" />
                <select className="w-full bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-10 py-2.5 text-sm appearance-none cursor-pointer focus:border-blue-400 focus:ring-2 focus:ring-blue-500/10 transition-all">
                  <option>Nagpur, Maharashtra (Zone East - Sitabuldi / Lakadganj)</option>
                  <option>Nagpur, Maharashtra (Zone West - Dharampeth / Sadar)</option>
                  <option>Pune, Maharashtra (Zone Central - Kothrud)</option>
                  <option>Bengaluru, Karnataka (Zone South - Koramangala)</option>
                </select>
                <ChevronDown size={17} className="absolute right-3 top-3 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Rainfall Slider */}
            <div className="flex flex-col gap-2 pt-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">Rainfall Intensity</span>
                  <span className="text-xs bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-slate-500 dark:text-slate-400">Threshold: ≥ 20 mm/hr</span>
                </div>
                <div className="flex items-baseline gap-1 bg-blue-50 dark:bg-blue-500/10 px-3 py-1 rounded-lg border border-blue-200 dark:border-blue-500/20">
                  <span className="text-xl font-bold text-blue-600 dark:text-blue-400 tabular-nums">{rainfall}</span>
                  <span className="text-xs font-semibold text-blue-500">mm/hr</span>
                </div>
              </div>
              <input
                type="range" min="0" max="60" value={rainfall}
                onChange={e => setRainfall(Number(e.target.value))}
                className="w-full h-2 rounded-lg cursor-pointer"
                style={{ background: `linear-gradient(to right, #34d399, #fbbf24 40%, #ef4444)` }}
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono px-0.5">
                <span>0 mm (Clear)</span>
                <span className="font-semibold text-slate-500">20 mm (Trigger)</span>
                <span>40 mm (Severe)</span>
                <span>60 mm (Flood)</span>
              </div>
            </div>

            {/* Hours */}
            <div className="flex flex-col gap-2 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">Disrupted Working Hours</span>
                <span className="text-xs text-slate-400">Min: ≥ 3 hrs continuous</span>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {hours.map(h => {
                  const active = selectedHours === h.h
                  return (
                    <motion.button
                      key={h.h}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedHours(h.h)}
                      className={`py-2.5 px-3 rounded-xl border-2 text-sm font-semibold flex flex-col items-center transition-all ${
                        active
                          ? 'border-blue-500 bg-blue-500 text-white shadow-sm'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/40'
                      }`}
                    >
                      <span className="font-bold">{h.label}</span>
                      <span className={`text-[11px] mt-0.5 ${active ? h.subColor : h.h === 2 ? 'text-red-400' : 'text-slate-400 dark:text-slate-500'}`}>{h.sub}</span>
                    </motion.button>
                  )
                })}
              </div>
            </div>

            {/* Policy Params */}
            <div className="bg-slate-50 dark:bg-slate-700/40 rounded-xl p-4 border border-slate-200/60 dark:border-slate-600/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Gavel size={18} className="text-slate-500" />
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Active Policy Parameters</span>
                  <span className="text-xs text-slate-400">Plan: GigShield Essential (Nagpur Tier 2)</span>
                </div>
              </div>
              <div className="flex items-center gap-6 text-right">
                <div><span className="text-xs text-slate-400 block">Rate/hr</span><span className="text-sm font-bold text-slate-800 dark:text-slate-200 tabular-nums">₹75</span></div>
                <div className="border-l border-slate-200 dark:border-slate-600 pl-6">
                  <span className="text-xs text-slate-400 block">Weekly cap</span><span className="text-sm font-bold text-slate-800 dark:text-slate-200 tabular-nums">₹1,500</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleEvaluate}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm py-3 px-5 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-sm shadow-blue-500/20"
              >
                <Calculator size={18} /> Evaluate Claim
              </button>
              <button
                onClick={handleReset}
                className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-sm py-3 px-5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2"
              >
                <RotateCcw size={16} /> Reset
              </button>
            </div>
          </motion.section>
        </div>

        {/* Right: Results */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Result Card */}
          <motion.div variants={fadeUp} className="bg-white dark:bg-slate-800/80 rounded-xl border-2 border-blue-200/60 dark:border-blue-500/20 p-5 lg:p-6 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-start justify-between mb-4">
              <div>
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-2 ${
                  eligible
                    ? 'bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400'
                    : 'bg-red-50 dark:bg-red-500/10 border border-red-300 dark:border-red-500/20 text-red-700 dark:text-red-400'
                }`}>
                  <span className={`w-2 h-2 rounded-full animate-pulse ${eligible ? 'bg-emerald-500' : 'bg-red-500'}`} />
                  {eligible ? 'Eligible under demo rules' : 'Not eligible — adjust parameters'}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Simulated Compensation</h3>
              </div>
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${eligible ? 'bg-blue-100 dark:bg-blue-500/15 text-blue-500' : 'bg-slate-100 dark:bg-slate-700 text-slate-400'}`}>
                <CheckCircle2 size={24} />
              </div>
            </div>

            {/* Trigger chip */}
            <div className="bg-slate-50 dark:bg-slate-700/40 p-3 rounded-lg border border-slate-200/60 dark:border-slate-600/40 flex items-center gap-2.5 mb-5">
              <Satellite size={17} className="text-teal-500 shrink-0" />
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                Verified: <strong>Rainfall &gt; 20 mm/hr &amp; Duration ≥ 3 hrs</strong>
              </p>
            </div>

            {/* Big Metric */}
            <div className="bg-slate-50 dark:bg-slate-700/30 rounded-xl p-5 border border-slate-200/60 dark:border-slate-600/40 flex flex-col gap-3">
              <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">Projected Payout</span>
              <div className="flex items-baseline justify-between">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-slate-900 dark:text-white tabular-nums tracking-tight">₹{payout}</span>
                  <span className="text-sm text-slate-400">.00</span>
                </div>
                <span className="text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 px-2.5 py-1 rounded-lg">Instant UPI</span>
              </div>
              <div className="pt-3 border-t border-slate-200 dark:border-slate-600/40 flex items-center justify-between text-xs">
                <span className="text-slate-400">Formula</span>
                <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">{selectedHours} hrs × ₹75/hr = ₹{payout}</span>
              </div>
            </div>

            {/* Pool */}
            <div className="mt-4 p-4 rounded-xl border border-slate-200/60 dark:border-slate-600/40 bg-white dark:bg-slate-800/60 flex flex-col gap-2.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-700 dark:text-slate-300">Weekly Coverage Pool</span>
                <span className="text-blue-600 dark:text-blue-400">{poolUsed}% Used</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="bg-blue-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${poolUsed}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>Remaining: <strong className="text-slate-600 dark:text-slate-300">₹{1500 - payout}</strong></span>
                <span className="font-mono">Pool: ₹1,500</span>
              </div>
            </div>

            {/* Checklist */}
            <div className="mt-5 flex flex-col gap-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Verification Checklist ({eligible ? '4/4' : '—'} Passed)</span>
              <div className="flex flex-col gap-2">
                {checks.map((c, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-700/30 border border-slate-200/40 dark:border-slate-600/30">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 size={16} className={eligible ? 'text-emerald-500' : 'text-slate-300 dark:text-slate-600'} />
                      <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">{c.label}</span>
                    </div>
                    <span className={`text-xs font-mono ${c.highlight ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-slate-400'}`}>{c.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 mt-5 pt-4 border-t border-slate-200 dark:border-slate-700/60">
              <button
                onClick={handleSaveClaim}
                className="flex-1 bg-slate-900 dark:bg-slate-700 text-white py-2.5 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors shadow-sm"
              >
                <Save size={16} /> Save to Claims History
              </button>
              <button
                onClick={handleSimulateAnother}
                className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                <RefreshCw size={15} /> Simulate Another
              </button>
            </div>
          </motion.div>

          {/* Zero-paperwork */}
          <motion.div variants={fadeUp} className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800/80 dark:to-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-teal-50 dark:bg-teal-500/10 flex items-center justify-center text-teal-500 shrink-0">
              <Zap size={20} />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">Zero-Paperwork Guarantee</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Real claims execute automatically in 90 seconds without photos or bills when weather stations log the trigger.</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* FAQ */}
      <motion.section variants={fadeUp} className="bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700/60 p-5 lg:p-6 shadow-sm flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700/40 gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-blue-500"><Info size={18} /></div>
            <div>
              <h4 className="text-base font-semibold text-slate-900 dark:text-white">How Automated Parametric Triggers Work</h4>
              <p className="text-xs text-slate-400">Smart protection mechanisms for Indian delivery routes</p>
            </div>
          </div>
          <span className="text-xs text-slate-400 bg-slate-50 dark:bg-slate-700 px-3 py-1 rounded-md">Regulated by IRDAI Sandbox</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {faqs.map((f, i) => (
            <div key={i} className="flex flex-col gap-2 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/30 border border-slate-200/60 dark:border-slate-600/30">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-sm">
                <f.icon size={17} /> <h5>{f.title}</h5>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
        <div className="pt-3 border-t border-slate-100 dark:border-slate-700/40 flex flex-col md:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
          <p>GigShield Technologies India Pvt. Ltd. • Simulation Build 4.19.2 (Nagpur Nodes)</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-blue-500 underline">Simulation Methodology</a>
            <a href="#" className="hover:text-blue-500 underline">Weather API Docs</a>
            <a href="#" className="hover:text-blue-500 underline">Fair Payout Promise</a>
          </div>
        </div>
      </motion.section>
    </motion.div>
  )
}
