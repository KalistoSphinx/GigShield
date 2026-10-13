import React, { createContext, useContext, useState, ReactNode } from 'react'

interface ModalContextType {
  isWithdrawOpen: boolean
  openWithdraw: () => void
  closeWithdraw: () => void
  isLockPlanOpen: boolean
  openLockPlan: () => void
  closeLockPlan: () => void
  toast: string | null
  showToast: (msg: string) => void
}

const ModalContext = createContext<ModalContextType>({
  isWithdrawOpen: false,
  openWithdraw: () => {},
  closeWithdraw: () => {},
  isLockPlanOpen: false,
  openLockPlan: () => {},
  closeLockPlan: () => {},
  toast: null,
  showToast: () => {},
})

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false)
  const [isLockPlanOpen, setIsLockPlanOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => {
      setToast(null)
    }, 3500)
  }

  return (
    <ModalContext.Provider
      value={{
        isWithdrawOpen,
        openWithdraw: () => setIsWithdrawOpen(true),
        closeWithdraw: () => setIsWithdrawOpen(false),
        isLockPlanOpen,
        openLockPlan: () => setIsLockPlanOpen(true),
        closeLockPlan: () => setIsLockPlanOpen(false),
        toast,
        showToast,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export const useModals = () => useContext(ModalContext)
