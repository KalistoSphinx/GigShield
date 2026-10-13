import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import WithdrawModal from '../modals/WithdrawModal'
import LockPlanModal from '../modals/LockPlanModal'
import ToastNotification from '../modals/ToastNotification'

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Sidebar />
      <div className="lg:ml-64 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 p-4 lg:p-8 max-w-[1400px] mx-auto w-full">
          <Outlet />
        </main>
      </div>

      {/* Global Interactive Modals and Notifications */}
      <WithdrawModal />
      <LockPlanModal />
      <ToastNotification />
    </div>
  )
}
