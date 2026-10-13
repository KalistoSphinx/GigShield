import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { ModalProvider } from './context/ModalContext'
import Layout from './components/layout/Layout'
import Overview from './pages/Overview'
import ClaimSimulator from './pages/ClaimSimulator'
import Protection from './pages/Protection'
import WeatherMonitor from './pages/WeatherMonitor'
import ClaimsHistory from './pages/ClaimsHistory'
import Profile from './pages/Profile'

export default function App() {
  return (
    <ThemeProvider>
      <ModalProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Overview />} />
              <Route path="/protection" element={<Protection />} />
              <Route path="/weather" element={<WeatherMonitor />} />
              <Route path="/simulator" element={<ClaimSimulator />} />
              <Route path="/claims" element={<ClaimsHistory />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ModalProvider>
    </ThemeProvider>
  )
}
