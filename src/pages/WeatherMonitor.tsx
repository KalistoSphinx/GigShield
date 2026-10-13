import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  CloudLightning, MapPin, Radio, Waves, ArrowUpRight,
  TrendingUp, AlertTriangle, ShieldCheck, RefreshCw, Eye, Wind, Droplets
} from 'lucide-react'
import { useModals } from '../context/ModalContext'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
}

const precincts = [
  { id: 1, name: 'Nagpur East (Sitabuldi - Sector 04)', rain: 24, status: 'TRIGGER MET', active: true, lossHours: 4 },
  { id: 2, name: 'Nagpur West (Dharampeth / Ramnagar)', rain: 12, status: 'Normal', active: false, lossHours: 0 },
  { id: 3, name: 'Nagpur Central (Sadar Bazar)', rain: 18, status: 'Approaching Threshold', active: false, lossHours: 1 },
  { id: 4, name: 'Nagpur South (Lakadganj Commercial)', rain: 26, status: 'TRIGGER MET', active: true, lossHours: 3 },
  { id: 5, name: 'Nagpur South-West (Wardha Road Hub)', rain: 8, status: 'Clear', active: false, lossHours: 0 },
]

export default function WeatherMonitor() {
  const [selectedPrecinct, setSelectedPrecinct] = useState(1)
  const { showToast } = useModals()

  const handleRefresh = () => {
    showToast('IMD Doppler Radar Telemetry refreshed. Sync: Latency 84ms.')
  }

  return (
    <motion.div initial="initial" animate="animate" className="flex flex-col gap-6 lg:gap-8">
      {/* Header */}
      <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-500 mb-1">
            <Radio size={18} className="animate-pulse" />
            <span className="text-xs font-bold tracking-wider uppercase">Live Meteorological Radar Feed</span>
          </div>
          <h1 className="text-2xl lg:text-[2rem] font-bold text-slate-900 dark:text-white tracking-tight">
            Weather Monitor
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Live telemetry synced with India Meteorological Department (IMD) Nagpur Sub-Station 04.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/60 shadow-sm transition-all"
          >
            <RefreshCw size={15} />
            <span>Sync Radar Feed</span>
          </button>
        </div>
      </motion.div>

      {/* Main Grid: Radar Sweep + Telemetry Panel */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Doppler Radar Visualizer */}
        <div className="lg:col-span-7 bg-slate-950 rounded-3xl p-6 relative overflow-hidden border border-slate-800 shadow-2xl flex flex-col justify-between min-h-[380px]">
          {/* Radar Screen grid background */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

          {/* Radar Circles */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full border border-blue-500/20 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] rounded-full border border-blue-500/20 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140px] h-[140px] rounded-full border border-blue-500/30 pointer-events-none" />

          {/* Rotating Radar Sweep Cone */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full pointer-events-none animate-spin [animation-duration:8s] [background:conic-gradient(from_0deg,transparent_0deg,transparent_270deg,rgba(59,130,246,0.35)_360deg)]" />

          {/* Hotspots / Rain Clouds */}
          <div className="absolute top-[38%] left-[45%] w-16 h-16 rounded-full bg-blue-500/30 blur-lg animate-pulse" />
          <div className="absolute top-[42%] left-[48%] w-8 h-8 rounded-full bg-teal-400/40 blur-md animate-pulse" />
          <div className="absolute top-[40%] left-[50%] flex items-center gap-1.5 bg-blue-500/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-white shadow-lg border border-blue-400/40">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            Nagpur East (24 mm/hr)
          </div>

          {/* Top Info Bar */}
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono font-bold text-slate-300">DOPPLER BAND C • FREQ 5.6 GHz</span>
            </div>
            <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded border border-blue-500/20">
              RANGE: 40 KM RADIAL
            </span>
          </div>

          {/* Bottom Controls */}
          <div className="relative pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-4 font-mono text-[11px]">
              <span>LAT: 21.1458° N</span>
              <span>LON: 79.0882° E</span>
              <span>ALT: 310m MSL</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-slate-300 text-[11px]">Rainfall Cloud Density: High</span>
            </div>
          </div>
        </div>

        {/* Live Weather Metrics Card */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700/60 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Selected Sector</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">Sitabuldi / Sector 04</h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">Your Current Active Rider Geofence</span>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-200 dark:border-teal-500/20">
                <span className="w-2 h-2 rounded-full bg-teal-500" />
                TRIGGER MET
              </span>
            </div>

            {/* Metrics 3-box */}
            <div className="grid grid-cols-3 gap-3 my-5">
              <div className="p-3 bg-slate-50 dark:bg-slate-700/40 rounded-xl border border-slate-200/60 dark:border-slate-600/40">
                <div className="flex items-center gap-1 text-slate-400 text-xs font-semibold mb-1">
                  <Droplets size={13} />
                  <span>Rain Rate</span>
                </div>
                <span className="text-xl font-bold text-blue-600 dark:text-blue-400 tabular-nums">24</span>
                <span className="text-[10px] text-slate-400 block">mm / hour</span>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-700/40 rounded-xl border border-slate-200/60 dark:border-slate-600/40">
                <div className="flex items-center gap-1 text-slate-400 text-xs font-semibold mb-1">
                  <Wind size={13} />
                  <span>Wind Gust</span>
                </div>
                <span className="text-xl font-bold text-slate-800 dark:text-slate-200 tabular-nums">38</span>
                <span className="text-[10px] text-slate-400 block">km / hour</span>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-700/40 rounded-xl border border-slate-200/60 dark:border-slate-600/40">
                <div className="flex items-center gap-1 text-slate-400 text-xs font-semibold mb-1">
                  <Waves size={13} />
                  <span>Inundation</span>
                </div>
                <span className="text-xl font-bold text-amber-500 tabular-nums">High</span>
                <span className="text-[10px] text-slate-400 block">Underpass shut</span>
              </div>
            </div>

            {/* Threshold Gauge */}
            <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                <span>Threshold Status</span>
                <span className="text-blue-600 dark:text-blue-400">24 mm/hr vs 20 mm/hr trigger</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full transition-all duration-500" style={{ width: '85%' }} />
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 leading-tight">
                Parametric rules automatically release compensation when rainfall stays above 20 mm/hr for 3 consecutive hours.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 mt-4 flex items-center justify-between text-xs text-slate-400">
            <span>IMD Radar Node: Station #04</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Active Sensor Heartbeat</span>
          </div>
        </div>
      </motion.div>

      {/* Precinct Status Table */}
      <motion.div variants={fadeUp} className="bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700/60 p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Nagpur Precinct Telemetry</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">Live readings across high-density delivery routes</p>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700/60">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-700/40 border-b border-slate-200 dark:border-slate-700/60 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Precinct Name</th>
                <th className="py-3 px-4">Rainfall (mm/hr)</th>
                <th className="py-3 px-4">Trigger State</th>
                <th className="py-3 px-4">Impact on Shift</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/40">
              {precincts.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-700/20 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <MapPin size={15} className="text-blue-500" />
                    <span>{p.name}</span>
                  </td>
                  <td className="py-3.5 px-4 font-bold tabular-nums text-slate-800 dark:text-slate-200">
                    <span className={p.rain >= 20 ? 'text-blue-600 dark:text-blue-400' : ''}>{p.rain} mm/hr</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        p.active
                          ? 'bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-200 dark:border-teal-500/20'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400">
                    {p.lossHours > 0 ? `${p.lossHours} hrs potential cover` : 'Normal delivery routes'}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => {
                        setSelectedPrecinct(p.id)
                        showToast(`Switched view to ${p.name}`)
                      }}
                      className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      View Live
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  )
}
