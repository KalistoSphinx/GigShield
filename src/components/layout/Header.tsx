import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Search, Bell, HelpCircle, ChevronDown, Wallet, Sun, Moon, CheckCircle2, CloudRain, ShieldCheck, X } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { useModals } from '../../context/ModalContext'
import { motion, AnimatePresence } from 'framer-motion'

const routeNames: Record<string, string> = {
  '/': 'Overview',
  '/protection': 'My Protection',
  '/weather': 'Weather Monitor',
  '/simulator': 'Claim Simulator',
  '/claims': 'Claims History',
  '/profile': 'Profile',
}

const mockNotifications = [
  {
    id: 1,
    title: 'Parametric Trigger Met',
    desc: '22 mm/hr rainfall recorded in Nagpur East. ₹300 payout generated.',
    time: '12m ago',
    icon: CloudRain,
    color: 'text-blue-500 bg-blue-50 dark:bg-blue-500/10',
    unread: true,
  },
  {
    id: 2,
    title: 'UPI Transfer Settled',
    desc: '₹300 credited to rahul.sharma@okhdfcbank via instant IMPS.',
    time: '2h ago',
    icon: CheckCircle2,
    color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10',
    unread: true,
  },
  {
    id: 3,
    title: 'Weekly Protection Active',
    desc: '₹1,500 weekly safety pool locked for Oct 12-18, 2026.',
    time: '1d ago',
    icon: ShieldCheck,
    color: 'text-teal-500 bg-teal-50 dark:bg-teal-500/10',
    unread: false,
  },
]

export default function Header() {
  const { isDark, toggleTheme } = useTheme()
  const { openWithdraw } = useModals()
  const location = useLocation()
  const [notifOpen, setNotifOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  const currentPage = routeNames[location.pathname] || 'Dashboard'

  return (
    <header className="h-16 px-4 lg:px-8 flex items-center justify-between sticky top-0 z-30 bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800">
      <div className="flex items-center gap-4 lg:gap-6">
        {/* Dynamic Breadcrumb */}
        <div className="hidden sm:flex items-center gap-2 text-sm font-medium">
          <span className="text-slate-400 dark:text-slate-500">Dashboard</span>
          <span className="text-slate-300 dark:text-slate-600">/</span>
          <span className="text-blue-600 dark:text-blue-400 font-semibold">{currentPage}</span>
        </div>

        {/* Search */}
        <div className="relative w-48 sm:w-72 lg:w-80">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Search policies, claims, or weather..."
            className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/10 transition-all"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 lg:gap-3">
        {/* Demo Badge */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span>Demo Mode Active</span>
        </div>

        {/* Withdraw Balance Button */}
        <button
          onClick={openWithdraw}
          className="flex items-center gap-1.5 bg-slate-900 dark:bg-slate-700 text-white text-xs font-semibold px-3 py-2 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-600 active:scale-[0.98] transition-all shadow-sm"
        >
          <Wallet size={14} />
          <span>Withdraw Balance</span>
        </button>

        <div className="flex items-center gap-0.5 border-l border-slate-200 dark:border-slate-800 pl-2 lg:pl-3 relative">
          {/* Dark Mode Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Toggle theme (Light / Dark)"
          >
            {isDark ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
          </motion.button>

          {/* Notifications Trigger */}
          <div className="relative">
            <button
              onClick={() => {
                setNotifOpen(!notifOpen)
                setProfileOpen(false)
              }}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 relative transition-colors"
              title="Notifications"
            >
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
            </button>

            {/* Notification Popover Dropdown */}
            <AnimatePresence>
              {notifOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 top-12 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-4 z-50 overflow-hidden"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">Notifications</span>
                      <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">
                        Mark all as read
                      </span>
                    </div>

                    <div className="divide-y divide-slate-100 dark:divide-slate-800/60 mt-2 max-h-72 overflow-y-auto">
                      {mockNotifications.map((n) => (
                        <div key={n.id} className="py-2.5 flex items-start gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/40 p-2 rounded-xl transition-colors">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${n.color}`}>
                            <n.icon size={16} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h5 className="text-xs font-bold text-slate-900 dark:text-white truncate">{n.title}</h5>
                              <span className="text-[10px] text-slate-400 shrink-0">{n.time}</span>
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">{n.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Help */}
          <button className="hidden sm:block p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <HelpCircle size={18} />
          </button>
        </div>

        {/* User Avatar & Dropdown */}
        <div className="relative">
          <div
            onClick={() => {
              setProfileOpen(!profileOpen)
              setNotifOpen(false)
            }}
            className="flex items-center gap-1.5 pl-1 lg:pl-2 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-500/20 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-xs font-bold text-blue-600 dark:text-blue-400">
              RS
            </div>
            <ChevronDown size={14} className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors hidden sm:block" />
          </div>

          {/* Profile Quick Popover */}
          <AnimatePresence>
            {profileOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-12 w-64 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-4 z-50 text-left"
                >
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm">
                      RS
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">Rahul Sharma</div>
                      <div className="text-[11px] text-slate-400">Nagpur Food Delivery</div>
                    </div>
                  </div>
                  <div className="py-2 space-y-1 text-xs">
                    <div className="flex justify-between py-1 text-slate-600 dark:text-slate-400">
                      <span>KYC Status</span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">Aadhaar Verified</span>
                    </div>
                    <div className="flex justify-between py-1 text-slate-600 dark:text-slate-400">
                      <span>Plan</span>
                      <span className="font-semibold text-blue-600 dark:text-blue-400">GigShield Essential</span>
                    </div>
                    <div className="flex justify-between py-1 text-slate-600 dark:text-slate-400">
                      <span>UPI ID</span>
                      <span className="font-mono text-[10px] text-slate-800 dark:text-slate-200">rahul.sharma@okhdfcbank</span>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}
