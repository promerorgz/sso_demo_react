import AnimatedSection from '../components/AnimatedSection'

function Arrow() {
  return <span className="mx-2 text-gray-400">→</span>
}

export default function Diagrams() {
  return (
    <div className="container-responsive py-12 sm:py-16">
      <AnimatedSection>
        <h2 className="text-3xl font-bold tracking-tight">SSO Sequence (High Level)</h2>
        <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-3xl">
          The diagram below outlines a typical Authorization Code + PKCE flow for a SPA using an enterprise IdP.
        </p>
      </AnimatedSection>

      <AnimatedSection className="mt-8">
        <div className="card">
          <div className="overflow-x-auto">
            <div className="min-w-[720px]">
              <div className="flex items-center flex-wrap text-sm">
                <span className="font-semibold">User</span>
                <Arrow />
                <span className="font-semibold">App</span>
                <Arrow />
                <span className="font-semibold">IdP (Authorize)</span>
                <Arrow />
                <span className="font-semibold">App</span>
                <Arrow />
                <span className="font-semibold">IdP (Token)</span>
              </div>
              <ol className="mt-4 space-y-2 list-decimal pl-6">
                <li>App creates PKCE challenge/verifier and redirects to IdP authorize.</li>
                <li>User authenticates at IdP.</li>
                <li>IdP redirects to App with an authorization code.</li>
                <li>App exchanges code+verifier for tokens at IdP token endpoint.</li>
                <li>App stores access token in memory and uses it on API requests.</li>
              </ol>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  )
}
