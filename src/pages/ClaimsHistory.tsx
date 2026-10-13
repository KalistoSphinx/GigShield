import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileText, Download, Search, CheckCircle2, CloudRain, Waves,
  ChevronRight, X, ExternalLink, Calendar, MapPin, Smartphone,
  ShieldCheck, ArrowUpRight
} from 'lucide-react'
import { useModals } from '../context/ModalContext'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
}

interface Claim {
  id: string
  date: string
  disruption: string
  intensity: string
  hours: number
  amount: number
  status: 'Simulated' | 'Paid to UPI'
  utr: string
  precinct: string
  platform: string
}

const mockClaims: Claim[] = [
  {
    id: 'GS-1001',
    date: '12 Oct 2026',
    disruption: 'Heavy Rainfall',
    intensity: '22 mm/hr',
    hours: 4,
    amount: 300,
    status: 'Simulated',
    utr: 'UPI-982173049182',
    precinct: 'Nagpur East Sector 04',
    platform: 'Swiggy',
  },
  {
    id: 'GS-1002',
    date: '04 Oct 2026',
    disruption: 'Waterlogging & Route Closure',
    intensity: '32 mm/hr + Stagnation',
    hours: 4,
    amount: 300,
    status: 'Simulated',
    utr: 'UPI-884019283711',
    precinct: 'Nagpur South Lakadganj',
    platform: 'Zomato',
  },
  {
    id: 'GS-0994',
    date: '28 Sep 2026',
    disruption: 'Monsoon Flash Downpour',
    intensity: '28 mm/hr',
    hours: 6,
    amount: 450,
    status: 'Paid to UPI',
    utr: 'UPI-771920384719',
    precinct: 'Nagpur Central Sadar',
    platform: 'Zepto',
  },
  {
    id: 'GS-0988',
    date: '19 Sep 2026',
    disruption: 'Severe Thunderstorm & Wind',
    intensity: '42 km/h Wind + 24 mm/hr',
    hours: 4,
    amount: 300,
    status: 'Paid to UPI',
    utr: 'UPI-661902834192',
    precinct: 'Nagpur East Sector 04',
    platform: 'Swiggy',
  },
]

export default function ClaimsHistory() {
  const [filter, setFilter] = useState<'All' | 'Simulated' | 'Paid'>('All')
  const [search, setSearch] = useState('')
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null)
  const { showToast } = useModals()

  const filtered = mockClaims.filter((c) => {
    if (filter === 'Simulated' && c.status !== 'Simulated') return false
    if (filter === 'Paid' && c.status !== 'Paid to UPI') return false
    if (search && !c.id.toLowerCase().includes(search.toLowerCase()) && !c.disruption.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const handleDownloadStatement = () => {
    showToast('Demo Claims Statement (Oct 2026) exported successfully!')
  }

  return (
    <motion.div initial="initial" animate="animate" className="flex flex-col gap-6 lg:gap-8">
      {/* Header */}
      <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-500 mb-1">
            <FileText size={18} />
            <span className="text-xs font-bold tracking-wider uppercase">Parametric Ledger & Payouts</span>
          </div>
          <h1 className="text-2xl lg:text-[2rem] font-bold text-slate-900 dark:text-white tracking-tight">
            Claims History
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Transparent records of automated micro-payouts triggered by weather disruptions.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleDownloadStatement}
            className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/60 shadow-sm transition-all"
          >
            <Download size={15} />
            <span>Export Statement</span>
          </button>
        </div>
      </motion.div>

      {/* Overview Stat Cards */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-5 bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Total Disbursed (FY26)</span>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white tabular-nums mt-1">₹1,350.00</div>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1 block">4 Automated Settlements</span>
        </div>
        <div className="p-5 bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Average Payout Time</span>
          <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tabular-nums mt-1">82 seconds</div>
          <span className="text-xs text-slate-400 block mt-1">Direct to UPI • Zero adjuster paperwork</span>
        </div>
        <div className="p-5 bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Dispute Rate</span>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white tabular-nums mt-1">0.0%</div>
          <span className="text-xs text-slate-400 block mt-1">Objective radar consensus trigger</span>
        </div>
      </motion.div>

      {/* Filters & Table */}
      <motion.div variants={fadeUp} className="bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700/60 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          {/* Tabs */}
          <div className="flex gap-2">
            {(['All', 'Simulated', 'Paid'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                  filter === tab
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {tab === 'Paid' ? 'Paid to UPI' : tab}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Filter by Claim ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-400"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700/60">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-700/40 border-b border-slate-200 dark:border-slate-700/60 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Claim ID</th>
                <th className="py-3 px-4">Event Date</th>
                <th className="py-3 px-4">Disruption Trigger</th>
                <th className="py-3 px-4">Impacted Shift</th>
                <th className="py-3 px-4">Calculated Benefit</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/40">
              {filtered.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => setSelectedClaim(c)}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-700/20 cursor-pointer transition-colors"
                >
                  <td className="py-3.5 px-4 font-bold text-blue-600 dark:text-blue-400 font-mono">
                    {c.id}
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300 font-medium">
                    {c.date}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <CloudRain size={16} className="text-blue-500" />
                      <div>
                        <span className="font-semibold text-slate-800 dark:text-slate-200 block">{c.disruption}</span>
                        <span className="text-[11px] text-slate-400">{c.intensity}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">
                    {c.hours} hours ({c.platform})
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white tabular-nums">
                    ₹{c.amount}.00
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        c.status === 'Paid to UPI'
                          ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20'
                          : 'bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-200 dark:border-teal-500/20'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {c.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="inline-flex items-center text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                      View <ChevronRight size={14} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Claim Detail Modal */}
      <AnimatePresence>
        {selectedClaim && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedClaim(null)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 z-10 space-y-5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
                    <FileText size={17} />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white">Claim {selectedClaim.id}</h3>
                    <span className="text-[11px] text-slate-400">Parametric Settlement Receipt</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedClaim(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Big Payout Metric */}
              <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 uppercase tracking-wider block">Net Compensation</span>
                  <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">₹{selectedClaim.amount}.00</div>
                </div>
                <span className="text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200 px-3 py-1 rounded-full">
                  NPCI Dispatched
                </span>
              </div>

              {/* Breakdown */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400">Event Trigger:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedClaim.disruption}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400">Recorded Intensity:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedClaim.intensity}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400">Geofence Precinct:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedClaim.precinct}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400">Calculation Formula:</span>
                  <span className="font-mono text-slate-800 dark:text-slate-200">{selectedClaim.hours} hrs × ₹75/hr = ₹{selectedClaim.amount}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400">NPCI UTR Ref:</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{selectedClaim.utr}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedClaim(null)
                  showToast(`Tax invoice PDF for ${selectedClaim.id} downloaded!`)
                }}
                className="w-full bg-slate-900 dark:bg-slate-700 text-white font-semibold py-2.5 rounded-xl text-xs hover:bg-slate-800 transition-colors"
              >
                Download Official Tax Invoice (PDF)
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
