import { Route, Routes, NavLink } from 'react-router-dom'
import Home from './pages/Home'
import LoginDemo from './pages/LoginDemo'
import Overview from './pages/Overview'
import Diagrams from './pages/Diagrams'

function NavBar() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      isActive
        ? 'bg-primary text-white'
        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
    }`
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-950/70 backdrop-blur">
      <div className="container-responsive flex items-center justify-between h-14">
        <div className="flex items-center gap-2 font-semibold">
          <span className="h-2 w-2 rounded-full bg-primary" />
          <span>SSO Demo</span>
        </div>
        <nav className="flex items-center gap-1">
          <NavLink to="/" className={linkClass} end>Home</NavLink>
          <NavLink to="/overview" className={linkClass}>Overview</NavLink>
          <NavLink to="/diagrams" className={linkClass}>Diagrams</NavLink>
          <NavLink to="/login-demo" className={linkClass}>Login Demo</NavLink>
        </nav>
      </div>
    </header>
  )
}

export default function App() {
  return (
    <div className="min-h-dvh flex flex-col">
      <NavBar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/diagrams" element={<Diagrams />} />
          <Route path="/login-demo" element={<LoginDemo />} />
        </Routes>
      </main>
      <footer className="border-t border-gray-200/60 dark:border-gray-800/60 py-6 text-center text-sm text-gray-500">
        <div className="container-responsive">© {new Date().getFullYear()} SSO Demo</div>
      </footer>
    </div>
  )
}
