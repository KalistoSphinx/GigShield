import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useModals } from '../context/ModalContext'
import {
  Zap, Shield, Wallet, TrendingUp, CloudLightning, MapPin,
  Verified, Sparkles, ArrowRight, Download, ChevronRight,
  CloudRain, Waves, Lock
} from 'lucide-react'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
}

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } },
}

function MetricCard({ label, value, description, icon: Icon, accentColor, pill }: {
  label: string; value?: string; description: string; icon: React.ElementType;
  accentColor: string; pill?: { text: string; color: string }
}) {
  const borderMap: Record<string, string> = {
    blue: 'border-t-blue-500', navy: 'border-t-slate-900 dark:border-t-slate-500',
    teal: 'border-t-teal-500',
  }
  const iconBgMap: Record<string, string> = {
    blue: 'bg-blue-50 dark:bg-blue-500/10 text-blue-500',
    navy: 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300',
    teal: 'bg-teal-50 dark:bg-teal-500/10 text-teal-500',
  }
  return (
    <motion.div
      variants={fadeUp}
      className={`bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700/60 p-5 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between border-t-2 ${borderMap[accentColor]}`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">{label}</span>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconBgMap[accentColor]}`}>
          <Icon size={18} />
        </div>
      </div>
      {pill ? (
        <div className="flex items-baseline gap-2 mb-2">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${pill.color}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            {pill.text}
          </span>
        </div>
      ) : (
        <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums mb-1">{value}</div>
      )}
      <p className="text-xs text-slate-400 dark:text-slate-500">{description}</p>
    </motion.div>
  )
}

function RainfallBar({ height, label, value, highlight }: {
  height: string; label: string; value?: string; highlight?: 'high' | 'medium'
}) {
  const bgMap = {
    high: 'bg-blue-500',
    medium: 'bg-blue-400/70 dark:bg-blue-400/50',
    default: 'bg-slate-300 dark:bg-slate-600',
  }
  return (
    <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
      <div className={`w-full rounded-t-sm relative transition-all duration-500 ${bgMap[highlight || 'default']}`} style={{ height }}>
        {value && (
          <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-bold text-blue-600 dark:text-blue-400 whitespace-nowrap">{value}</span>
        )}
      </div>
      <span className="text-[10px] text-slate-400 dark:text-slate-500">{label}</span>
    </div>
  )
}

export default function Overview() {
  const navigate = useNavigate()
  const { showToast } = useModals()

  return (
    <motion.div className="flex flex-col gap-6 lg:gap-8" initial="initial" animate="animate" variants={stagger}>
      {/* Greeting */}
      <motion.section variants={fadeUp} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-[2rem] font-bold text-slate-900 dark:text-white tracking-tight">
            Good morning, Rahul 👋
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-[0.95rem]">Your financial safety net, all in one place.</p>
        </div>
        <button
          onClick={() => navigate('/simulator')}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm px-4 py-2.5 rounded-lg shadow-sm shadow-blue-500/20 hover:shadow-blue-500/30 transition-all active:scale-[0.98]"
        >
          <Zap size={18} />
          <span>Simulate Disruption</span>
        </button>
      </motion.section>

      {/* Metric Cards */}
      <motion.section variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5">
        <MetricCard label="Protection Status" icon={Shield} accentColor="blue" description="Demo plan enabled"
          pill={{ text: 'Active', color: 'bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-200 dark:border-teal-500/20' }} />
        <MetricCard label="Weekly Premium" value="₹30" icon={Wallet} accentColor="navy" description="Illustrative plan price" />
        <MetricCard label="Weekly Coverage Limit" value="₹1,500" icon={Lock} accentColor="blue" description="Hypothetical max benefit" />
        <MetricCard label="Simulated Benefits" value="₹600" icon={TrendingUp} accentColor="teal" description="Example claim history (2 claims)" />
      </motion.section>

      {/* Weather + Protection */}
      <motion.section variants={stagger} className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
        {/* Weather Card */}
        <motion.div variants={fadeUp} className="bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700/60 p-5 lg:p-6 shadow-sm flex flex-col">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <CloudLightning size={20} className="text-blue-500" />
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Weather Monitoring</h2>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 mt-1">
                <MapPin size={14} className="text-slate-400" />
                <span>Nagpur, Maharashtra</span>
              </div>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-200 dark:border-teal-500/20">
              <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500" /></span>
              Trigger Met
            </div>
          </div>

          {/* Params */}
          <div className="grid grid-cols-3 gap-3 bg-slate-50 dark:bg-slate-700/40 rounded-lg p-3.5 mb-5 border border-slate-200/60 dark:border-slate-600/40">
            {[
              { label: 'Scenario', value: 'Heavy Rainfall', color: '' },
              { label: 'Intensity', value: '22 mm/hour', color: 'text-blue-600 dark:text-blue-400' },
              { label: 'Duration', value: '4 hours', color: '' },
            ].map(p => (
              <div key={p.label}>
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 block">{p.label}</span>
                <span className={`text-sm font-semibold text-slate-800 dark:text-slate-200 ${p.color}`}>{p.value}</span>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="mb-4 flex-1">
            <div className="flex justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
              <span>Rainfall Threshold vs Recorded</span>
              <span className="text-blue-600 dark:text-blue-400">Trigger: 15 mm/hr</span>
            </div>
            <div className="h-24 w-full bg-slate-50 dark:bg-slate-700/30 rounded-lg border border-slate-200/60 dark:border-slate-600/40 p-2 flex items-end justify-between gap-1.5">
              <RainfallBar height="30%" label="10:00" />
              <RainfallBar height="45%" label="11:00" />
              <RainfallBar height="75%" label="12:00" value="18mm" highlight="medium" />
              <RainfallBar height="92%" label="13:00" value="22mm" highlight="high" />
              <RainfallBar height="70%" label="14:00" highlight="medium" />
              <RainfallBar height="35%" label="15:00" />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
            <span className="text-xs text-slate-400 italic">Simulated demo weather conditions</span>
            <button
              onClick={() => navigate('/weather')}
              className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-semibold transition-colors"
            >
              Open Weather Monitor <ArrowRight size={15} />
            </button>
          </div>
        </motion.div>

        {/* Protection Card */}
        <motion.div variants={fadeUp} className="bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700/60 p-5 lg:p-6 shadow-sm flex flex-col">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <Verified size={20} className="text-blue-500" />
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Protection Overview</h2>
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Plan Tier: <span className="font-semibold text-slate-800 dark:text-slate-200">GigShield Essential</span>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">Active (Demo)</span>
          </div>

          {/* Coverage Breakdown */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { label: 'Weekly Limit', value: '₹1,500', color: 'text-slate-900 dark:text-white' },
              { label: 'Used Benefits', value: '₹600', color: 'text-teal-600 dark:text-teal-400' },
              { label: 'Remaining', value: '₹900', color: 'text-blue-600 dark:text-blue-400' },
            ].map(m => (
              <div key={m.label} className="p-3 bg-slate-50 dark:bg-slate-700/40 rounded-lg border border-slate-200/60 dark:border-slate-600/40">
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 block">{m.label}</span>
                <span className={`text-lg font-bold tabular-nums ${m.color}`}>{m.value}</span>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="space-y-2 mb-5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-500 dark:text-slate-400">Claim Utilization</span>
              <span className="text-blue-600 dark:text-blue-400">40% utilized</span>
            </div>
            <div className="h-2.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden flex">
              <div className="bg-teal-500 h-full rounded-l-full transition-all duration-700" style={{ width: '40%' }} />
              <div className="bg-blue-500/15 h-full rounded-r-full" style={{ width: '60%' }} />
            </div>
            <div className="flex justify-between text-[11px] text-slate-400 dark:text-slate-500">
              <span>₹600 claimed</span><span>₹900 buffer remaining</span>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-700/40 rounded-lg border border-slate-200/60 dark:border-slate-600/40 flex items-center gap-3 flex-1">
            <Sparkles size={18} className="text-blue-500 shrink-0" />
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Parametric payout trigger automatically calculated via GPS location in Nagpur micro-zone 4.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-700/60 flex items-center justify-between mt-4">
            <span className="text-xs text-slate-400">Refreshes every Monday</span>
            <button
              onClick={() => navigate('/protection')}
              className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-semibold transition-colors"
            >
              View Protection <ArrowRight size={15} />
            </button>
          </div>
        </motion.div>
      </motion.section>

      {/* Income Comparison */}
      <motion.section variants={fadeUp} className="bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700/60 p-5 lg:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Income Protection Comparison</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Shift earnings with and without GigShield automated payouts</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
            {[
              { color: 'bg-slate-500', label: 'Normal Day' },
              { color: 'bg-red-400', label: 'Disrupted (Unprotected)' },
              { color: 'bg-blue-500', label: 'Protected with GigShield' },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-1.5">
                <span className={`w-3 h-3 rounded-sm ${l.color}`} />
                <span className="text-slate-500 dark:text-slate-400">{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {/* Normal */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-slate-700 dark:text-slate-300">Regular Shift (8 hrs)</span>
              <span className="font-bold text-slate-900 dark:text-white tabular-nums">₹750</span>
            </div>
            <div className="h-7 w-full bg-slate-100 dark:bg-slate-700/50 rounded-md overflow-hidden">
              <div className="bg-slate-500 dark:bg-slate-500 h-full rounded-md flex items-center justify-end pr-2.5 text-white text-[11px] font-bold" style={{ width: '75%' }}>₹750 Base</div>
            </div>
          </div>
          {/* Disrupted */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-slate-700 dark:text-slate-300">Heavy Rain Day (Unprotected)</span>
              <span className="font-bold text-red-500 tabular-nums">₹250 (-66% income loss)</span>
            </div>
            <div className="h-7 w-full bg-slate-100 dark:bg-slate-700/50 rounded-md overflow-hidden">
              <div className="bg-red-400 h-full rounded-md flex items-center justify-end pr-2.5 text-white text-[11px] font-bold" style={{ width: '25%' }}>₹250</div>
            </div>
          </div>
          {/* Protected */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-slate-700 dark:text-slate-300">Heavy Rain + GigShield Micro-Payout</span>
              <span className="font-bold text-blue-600 dark:text-blue-400 tabular-nums">₹550 (₹250 + ₹300 Shield)</span>
            </div>
            <div className="h-7 w-full bg-slate-100 dark:bg-slate-700/50 rounded-md overflow-hidden flex">
              <div className="bg-slate-400 dark:bg-slate-500 h-full flex items-center justify-end pr-2 text-white text-[11px] font-bold" style={{ width: '25%' }}>₹250</div>
              <div className="bg-blue-500 h-full flex items-center justify-end pr-2 text-white text-[11px] font-bold" style={{ width: '30%' }}>+ ₹300</div>
            </div>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-400 gap-2">
          <span>Illustrative data for simulation only</span>
          <span className="text-slate-500 dark:text-slate-400 font-medium">Automatic disbursement to UPI within 12 minutes of rain trigger</span>
        </div>
      </motion.section>

      {/* Recent Claims Table */}
      <motion.section variants={fadeUp} className="bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700/60 p-5 lg:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Recent Claims</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Automated parametric payouts executed for disruption events</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => showToast('Demo Claims Statement (Oct 2026) downloaded successfully!')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              <Download size={15} /> Download Demo Statement
            </button>
            <button
              onClick={() => navigate('/claims')}
              className="inline-flex items-center gap-0.5 text-blue-600 dark:text-blue-400 text-sm font-semibold hover:underline"
            >
              View All Claims <ChevronRight size={15} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700/60">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-700/40 border-b border-slate-200 dark:border-slate-700/60 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Claim ID</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Disruption</th>
                <th className="py-3 px-4">Hours</th>
                <th className="py-3 px-4">Benefit</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/40 text-sm">
              {[
                { id: 'GS-1001', date: '12 Oct 2026', type: 'Heavy Rain', icon: CloudRain, iconColor: 'text-blue-500', hours: '4 hours', benefit: '₹300' },
                { id: 'GS-1002', date: '04 Oct 2026', type: 'Waterlogging', icon: Waves, iconColor: 'text-teal-500', hours: '4 hours', benefit: '₹300' },
              ].map(row => (
                <tr key={row.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-700/20 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-blue-600 dark:text-blue-400">{row.id}</td>
                  <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300">{row.date}</td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5">
                      <row.icon size={15} className={row.iconColor} />
                      <span className="text-slate-700 dark:text-slate-300">{row.type}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400">{row.hours}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white tabular-nums">{row.benefit}</td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-200 dark:border-teal-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500" /> Simulated
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>
    </motion.div>
  )
}
