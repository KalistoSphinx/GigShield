import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, X } from 'lucide-react'
import { useModals } from '../../context/ModalContext'

export default function ToastNotification() {
  const { toast } = useModals()

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-4 py-3 rounded-xl shadow-2xl border border-slate-700/50 dark:border-slate-200"
        >
          <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 dark:text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 size={16} />
          </div>
          <span className="text-xs font-semibold">{toast}</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
