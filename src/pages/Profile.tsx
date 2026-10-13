import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  User, ShieldCheck, Smartphone, Building2, CheckCircle2,
  Bike, Award, Phone, Globe, Edit3, HeartHandshake, Lock
} from 'lucide-react'
import { useModals } from '../context/ModalContext'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
}

export default function Profile() {
  const { showToast } = useModals()
  const [lang, setLang] = useState('English')

  const handleSave = () => {
    showToast('Profile & UPI settings updated successfully!')
  }

  return (
    <motion.div initial="initial" animate="animate" className="flex flex-col gap-6 lg:gap-8">
      {/* Header */}
      <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-500 mb-1">
            <User size={18} />
            <span className="text-xs font-bold tracking-wider uppercase">Worker Identity & Credentials</span>
          </div>
          <h1 className="text-2xl lg:text-[2rem] font-bold text-slate-900 dark:text-white tracking-tight">
            Partner Profile
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Verified institutional KYC records and connected gig delivery platform telemetry.
          </p>
        </div>
      </motion.div>

      {/* Main Grid */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Profile Card + Linked Platforms */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Identity Card */}
          <div className="bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700/60 p-6 shadow-sm flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 text-white flex items-center justify-center text-2xl font-extrabold shadow-lg shadow-blue-500/25 mb-4">
              RS
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Rahul Sharma</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Delivery Partner • Nagpur, Maharashtra</p>

            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
              <ShieldCheck size={14} />
              <span>IRDAI Tier-1 KYC Verified</span>
            </div>

            <div className="w-full mt-6 pt-5 border-t border-slate-100 dark:border-slate-700/60 space-y-2.5 text-xs text-left">
              <div className="flex justify-between">
                <span className="text-slate-400">Worker ID:</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">GIG-MH31-84920</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Joined GigShield:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">April 2026</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Payouts Protected:</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">₹3,600.00</span>
              </div>
            </div>
          </div>

          {/* Linked Delivery Platforms */}
          <div className="bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700/60 p-6 shadow-sm">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Linked Platform Accounts</h4>
            <p className="text-xs text-slate-400 mb-4">Telemetry API automatically detects shift check-in</p>

            <div className="space-y-3">
              {[
                { name: 'Swiggy Delivery Partner', orders: '1,420 orders', rating: '★ 4.92', active: true },
                { name: 'Zomato Delivery Fleet', orders: '890 orders', rating: '★ 4.88', active: true },
                { name: 'Zepto Rider Network', orders: '120 orders', rating: '★ 4.95', active: false },
              ].map((p, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200/60 dark:border-slate-600/40 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Bike size={18} className="text-blue-500" />
                    <div>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">{p.name}</span>
                      <span className="text-[11px] text-slate-400">{p.orders} • {p.rating}</span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${p.active ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 border border-emerald-200' : 'bg-slate-100 text-slate-400'}`}>
                    {p.active ? 'SYNCED' : 'STANDBY'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: KYC, Bank Details & Preferences */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Government Identification & KYC */}
          <div className="bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700/60 p-6 shadow-sm">
            <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">Identity & Regulatory KYC</h4>
            <p className="text-xs text-slate-400 mb-5">Mandated by IRDAI Sandbox for automated parametric disbursements</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-700/30 flex items-start justify-between">
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Aadhaar Card (Masked)</span>
                  <span className="font-mono font-bold text-sm text-slate-900 dark:text-white mt-1 block">XXXX-XXXX-4812</span>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1 inline-flex items-center gap-1">
                    <CheckCircle2 size={12} /> UIDAI Aadhaar e-KYC Verified
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-700/30 flex items-start justify-between">
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Driving License (Transport)</span>
                  <span className="font-mono font-bold text-sm text-slate-900 dark:text-white mt-1 block">MH-31-2021-0049281</span>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1 inline-flex items-center gap-1">
                    <CheckCircle2 size={12} /> Sarathi Parivahan Verified
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bank & Instant UPI Routing */}
          <div className="bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700/60 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">Registered UPI & Bank Details</h4>
                <p className="text-xs text-slate-400 mt-0.5">Instant compensation is routed directly to this VPA address</p>
              </div>
              <button
                onClick={handleSave}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <Edit3 size={13} /> Edit UPI
              </button>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50/80 to-indigo-50/40 dark:from-slate-700/50 dark:to-slate-700/20 border border-blue-100 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                  <Smartphone size={20} />
                </div>
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block">Primary UPI Virtual Payment Address (VPA)</span>
                  <span className="font-mono font-bold text-sm text-slate-900 dark:text-white">rahul.sharma@okhdfcbank</span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">HDFC Bank Limited • IFSC: HDFC0001824</span>
                </div>
              </div>
              <span className="self-start sm:self-center text-xs font-bold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 border border-emerald-200 dark:border-emerald-500/20 px-3 py-1 rounded-full">
                Active Rail
              </span>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700/60 p-6 shadow-sm">
            <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">Preferences & Language</h4>
            <p className="text-xs text-slate-400 mb-4">Select your preferred app display language</p>

            <div className="flex gap-2">
              {['English', 'हिन्दी (Hindi)', 'मराठी (Marathi)'].map((l) => (
                <button
                  key={l}
                  onClick={() => {
                    setLang(l)
                    showToast(`Language set to ${l}`)
                  }}
                  className={`text-xs font-semibold px-4 py-2 rounded-xl border transition-all ${
                    lang.startsWith(l.split(' ')[0])
                      ? 'border-blue-500 bg-blue-500 text-white shadow-sm'
                      : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
