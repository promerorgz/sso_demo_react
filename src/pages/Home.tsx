import AnimatedSection from '../components/AnimatedSection'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <section className="relative">
        <div className="container-responsive py-20 sm:py-28">
          <AnimatedSection className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Enterprise SSO Demo
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              A lightweight, interactive site to present how Single Sign-On integrates with our enterprise application.
            </p>
            <div className="mt-8 flex gap-3">
              <Link to="/login-demo" className="btn-primary">Try the Login Demo</Link>
              <Link to="/overview" className="inline-flex items-center px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900">Read the Overview</Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <AnimatedSection className="container-responsive py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'Standards Based',
              body: 'OIDC/OAuth 2.0 and SAML supported patterns for identity providers.',
            },
            {
              title: 'Token Security',
              body: 'Short-lived access tokens, refresh tokens, and secure storage guidance.',
            },
            {
              title: 'Seamless UX',
              body: 'Redirect and popup based flows designed for minimal user friction.',
            },
          ].map((f) => (
            <div key={f.title} className="card">
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">{f.body}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </div>
  )
}
