import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Shield, CloudLightning, FlaskConical,
  FileText, User, Headphones, Settings, Lock, Menu, X, ShieldCheck
} from 'lucide-react'
import { useModals } from '../../context/ModalContext'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Overview' },
  { to: '/protection', icon: Shield, label: 'My Protection' },
  { to: '/weather', icon: CloudLightning, label: 'Weather Monitor' },
  { to: '/simulator', icon: FlaskConical, label: 'Claim Simulator' },
  { to: '/claims', icon: FileText, label: 'Claims History' },
  { to: '/profile', icon: User, label: 'Profile' },
]

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { openLockPlan } = useModals()

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between">
      <div className="p-4 flex flex-col gap-5">
        {/* Brand */}
        <div className="flex items-center gap-3 px-2 pt-1">
          <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <ShieldCheck size={22} />
          </div>
          <div>
            <div className="text-[1.1rem] font-bold text-blue-600 dark:text-blue-400 tracking-tight leading-none">GigShield</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Income Protection Pro</div>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => {
            setMobileOpen(false)
            openLockPlan()
          }}
          className="w-full flex items-center justify-center gap-2 bg-slate-900 dark:bg-slate-700 text-white font-semibold text-sm py-2.5 px-3 rounded-lg shadow-sm hover:bg-slate-800 dark:hover:bg-slate-600 transition-all active:scale-[0.98]"
        >
          <Lock size={15} />
          <span>Lock Daily Plan</span>
        </button>

        {/* Nav */}
        <nav className="flex flex-col gap-0.5">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold border-l-[3px] border-blue-500 -ml-[3px] pl-[calc(0.75rem+3px)]'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`
              }
            >
              <Icon size={19} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-700/60 flex flex-col gap-2">
        <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors">
          <Headphones size={17} />
          <span>Support</span>
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors">
          <Settings size={17} />
          <span>Settings</span>
        </a>
        <div className="pt-2 mt-1 border-t border-slate-200 dark:border-slate-700/60 flex items-center gap-3 px-2">
          <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-sm font-bold text-blue-600 dark:text-blue-400 shrink-0">
            RS
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">Rahul Sharma</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate leading-tight">Food Delivery Partner, Nagpur</div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block h-screen w-64 fixed left-0 top-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700/60 z-40 shadow-sm">
        {sidebarContent}
      </aside>

      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700"
      >
        <Menu size={20} className="text-slate-700 dark:text-slate-300" />
      </button>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="lg:hidden fixed left-0 top-0 h-screen w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 z-50 shadow-xl"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X size={18} className="text-slate-500" />
              </button>
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
