import { useState } from 'react'
import AnimatedSection from '../components/AnimatedSection'
import { fetchProfile, login, logout } from '../lib/api/auth'
import { useAsync } from '../hooks/useAsync'

type Step = 'idle' | 'redirect' | 'callback' | 'exchanging' | 'authorized'

export default function LoginDemo() {
  const [step, setStep] = useState<Step>('idle')
  const [username, setUsername] = useState('presenter')
  const [password, setPassword] = useState('password')
  const { run: runLogin, loading: loggingIn, value: token } = useAsync(login)
  const { run: runProfile, loading: loadingProfile, value: profile } = useAsync(fetchProfile<any>)

  const startFlow = async () => {
    setStep('redirect')
    // simulate redirect to IdP
    await wait(700)
    setStep('callback')
    await wait(500)
    setStep('exchanging')
    // pretend to exchange auth code and receive token
    await runLogin({ username, password })
    setStep('authorized')
    await runProfile()
  }

  const reset = () => {
    logout()
    setStep('idle')
  }

  return (
    <div className="container-responsive py-12 sm:py-16">
      <AnimatedSection>
        <h2 className="text-3xl font-bold tracking-tight">Interactive Login Demo</h2>
        <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-3xl">
          Walk through an Authorization Code-style login. This is a simulated flow for presentation purposes; no real credentials are sent.
        </p>
      </AnimatedSection>

      <div className="mt-8 grid lg:grid-cols-2 gap-6">
        <AnimatedSection className="card">
          <h3 className="text-lg font-semibold">Credentials (Mock)</h3>
          <div className="mt-4 grid sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm text-gray-500">Username</span>
              <input
                className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="text-sm text-gray-500">Password</span>
              <input
                type="password"
                className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <div className="mt-4 flex gap-3">
            <button className="btn-primary" onClick={startFlow} disabled={loggingIn || loadingProfile || step !== 'idle'}>
              {loggingIn ? 'Exchanging…' : 'Start Login Flow'}
            </button>
            <button className="inline-flex items-center px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900" onClick={reset}>
              Reset
            </button>
          </div>
        </AnimatedSection>

        <AnimatedSection className="card">
          <h3 className="text-lg font-semibold">Flow Status</h3>
          <ol className="mt-3 space-y-2 list-decimal pl-6">
            <li className={mark(step, 'idle')}>Init: ready to authenticate</li>
            <li className={mark(step, 'redirect')}>Redirect to IdP (authorize)</li>
            <li className={mark(step, 'callback')}>Callback with authorization code</li>
            <li className={mark(step, 'exchanging')}>Exchange code for tokens</li>
            <li className={mark(step, 'authorized')}>Authorized: token stored in memory</li>
          </ol>
          {token && (
            <div className="mt-4 text-xs text-gray-500 break-all">
              token: {token.token}
            </div>
          )}
        </AnimatedSection>
      </div>

      <AnimatedSection className="mt-8 card">
        <h3 className="text-lg font-semibold">Profile (Mock API)</h3>
        {loadingProfile && <p className="mt-2 text-gray-600 dark:text-gray-400">Loading profile…</p>}
        {!loadingProfile && profile && (
          <pre className="mt-2 text-sm bg-gray-950/80 text-gray-100 p-4 rounded-md overflow-auto">
{JSON.stringify(profile, null, 2)}
          </pre>
        )}
        {!loadingProfile && !profile && (
          <p className="mt-2 text-gray-600 dark:text-gray-400">No profile yet. Start the login flow to fetch.</p>
        )}
      </AnimatedSection>
    </div>
  )
}

function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

function mark(current: Step, cmp: Step) {
  const reached = order(current) >= order(cmp)
  return reached ? 'text-green-600 dark:text-green-400' : 'text-gray-400'
}

function order(s: Step) {
  switch (s) {
    case 'idle': return 0
    case 'redirect': return 1
    case 'callback': return 2
    case 'exchanging': return 3
    case 'authorized': return 4
  }
}
