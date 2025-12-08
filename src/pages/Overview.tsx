import AnimatedSection from '../components/AnimatedSection'

const bullets = [
  {
    title: 'Identity Provider (IdP)',
    text: 'Handles user authentication (e.g., Okta, Azure AD, Auth0). Issues ID and access tokens.'
  },
  {
    title: 'Service Provider (SP) / Relying Party (RP)',
    text: 'Our app trusts the IdP; it validates tokens and establishes a session.'
  },
  {
    title: 'Protocols',
    text: 'OpenID Connect (OIDC) on top of OAuth 2.0, or SAML 2.0 in legacy ecosystems.'
  },
  {
    title: 'Flows',
    text: 'Authorization Code with PKCE recommended for SPAs and native apps.'
  },
]

export default function Overview() {
  return (
    <div className="container-responsive py-12 sm:py-16">
      <AnimatedSection>
        <h2 className="text-3xl font-bold tracking-tight">SSO Overview</h2>
        <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-3xl">
          Single Sign-On (SSO) lets users authenticate with a trusted identity provider and then seamlessly access multiple applications without repeatedly entering credentials.
        </p>
      </AnimatedSection>

      <div className="mt-10 grid md:grid-cols-2 gap-6">
        {bullets.map((b) => (
          <AnimatedSection key={b.title} className="card">
            <h3 className="text-lg font-semibold">{b.title}</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">{b.text}</p>
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection className="mt-12 card">
        <h3 className="text-lg font-semibold">Recommended SPA Flow: Authorization Code with PKCE</h3>
        <ol className="mt-3 list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li>App redirects user to IdP authorize endpoint with PKCE challenge.</li>
          <li>User authenticates at IdP; consent if required.</li>
          <li>IdP redirects back with authorization code.</li>
          <li>App exchanges code + verifier for tokens via back-end or secure token endpoint.</li>
          <li>App stores short-lived access token in memory; uses refresh flow if applicable.</li>
        </ol>
      </AnimatedSection>
    </div>
  )
}
