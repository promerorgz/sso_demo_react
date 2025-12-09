import React from "react";
import { Link } from "react-router-dom";
import Tabs, { Tab } from "../components/Tabs";

const sections = [
  {
    title: "Goals of this demo",
    content: [
      "Understand what SSO is and how it works.",
      "Benefits of using SSO within an organization",
      "Become familiar with common SSO protocols and identity providers.",
      "How SSO fits into SageAI",
    ],
    component: <></>,
  },
  {
    title: "SSO 101",
    content: [
      "SSO is an identity solution that allows users to use the same set of credentials for multiple applications",
      "Users authenticate once and gain access to multiple systems without re-entering credentials for every app",
      "Easier for users, reduces password fatigue, improves security by minimizing attack surface",
      "Ensures security policies are consistently applied across applications via policy enforcement with an Identity Provider (IdP)",
    ],
    component: <></>,
  },
  {
    title: "Authentication vs Authorization vs Identity Management",
    content: [
      "Authentication deals with veryfing the user is who they say they are. AKA Login process.",
      "Authorization is about determining what resources and actions the authenticated user is allowed to access.",
      "Identity Management encompasses the overall processes and technologies used to manage user identities, authentication, and authorization within an organization.",
    ],
    component: <></>,
  },

  {
    title: "Identity Federation",
    content: [
      "Identity Federation offers single access to multiple applications across various domains, usually within one Org.",
      "Single Sign-On enables a user to log in and access multiple applications through a centralized authentication server.",
    ],

    component: <></>,
  },
  {
    title: "Identity Protocols and Providers",
    content: [
      "There are different ways to implement SSO, many with pros and cons and use cases, used with different types of applications and identity providers.",
    ],
    component: (
      <>
        <Tabs>
          <Tab title={"SAML"}>
            <ul className="list-disc">
              <li>Security Assertion Markup Language</li>
              <li>
                The SAML protocol exchanges authorization and authentication
                data in XML format
              </li>
              <li>
                Roles defined: User (Principal), Identity Provider, Service
                Provider
              </li>
              <li>
                User requests a resource from Service Provider &gt; SP checks
                with IdP for access &gt; IdP verifies identity via auth &gt; IdP
                asserts back to the SP that the user should have access
              </li>
              <img src="/public/images/Screenshot 2025-12-09 at 01.23.24.png" />
            </ul>
          </Tab>
          <Tab title={"OAuth 2.0 / OIDC"}>
            <ul className="list-disc">
              <li>OpenID Connect (OIDC) is based on OAuth specs</li>
              <li>
                Delivers authentication via JSON web tokens (JWTs) delivered
                through the Oauth2.0 protocol
              </li>
              <li>
                OIDC is often used by social networks such as login with
                Facebook or Google
              </li>
              <li>
                OIDC differs from SAML in that it redirect the user to the
                provider, authenticate, then return the IdP will return the
                identity to the app
              </li>
              <li>
                JWT contains the identity information in a JSON format which is
                verifid by the client. it consists of three parts: the header,
                payload, and signature.
              </li>
              <img src="/public/images/Screenshot 2025-12-09 at 01.39.51.png" />
            </ul>
          </Tab>
        </Tabs>
      </>
    ),
  },
  {
    title: "Identity Providers (IdPs)",
    content: [
      "IdPs manage and contain user identities, handle authentication requests, and provide identity information to service providers.",
      "Common identity providers include:",
    ],
    component: (
      <ul>
        <li>Local Database</li>
        <li>Microsoft AD/Entra</li>
        <li>Social Networks such as Facebook or Google</li>
        <li>Auth0 by Okta</li>
      </ul>
    ),
  },
  {
    title: "Diagrams",
    content: "",
    component: (
      <>
        <Tabs>
          <Tab title={"Non-SSO Flow"}>
            <div className="bg-white p-4 rounded-md">
              <img src="/public/images/eNqVkMFOhDAQhu8-xbwA2TsxJHRIjIknjd6HMtFGtrDt4PPbQakbhKC9tNN-_8yXRr5M7C03jl4DnW8gLZpk8NO55TCXIwVx1o3kBZ7jxmU9jjVQ1L13lsQNHuotyqwps0XhmsJfVENCLUVexkJ924ZTpXbwJEPg3cSiAOaviUUHcJ2YI1oXVaV_UMKj_maUxFvLMc6AviQgK5eAb2zfAQN37MVR_8VloMjtXqh3HZzg3n_o.svg" />
            </div>
          </Tab>
          <Tab title={"OIDC SSO Flow (JWT)"}>
            <div className="bg-white p-4 rounded-md">
              <img src="/public/images/eNptkk1vwjAMhu_8Cp-momnijiakrjCp-6wKbOesNcVaSbok3ab9-jkfQBnjUhzbrx-_icGPHmWFcxKNFrsR8E_0Vsl-94bah53QlirqhLSwNv8cLosUhIG061qqhCUlIclaQk5NXHJ81pH2dutb-Ks0_YSmJepP1JDkdXHecqPV13_D0yJ3SiUa1esKDyJ8Ph75asd8NZsxyBSexCc1wiJY5Xh9nhOcjvpTVqpJY2V9ieMM.svg" />
            </div>
          </Tab>
          <Tab title={"SAML SSO Flow"}>
            <div className="bg-white p-4 rounded-md">
              <img src="/public/images/eNptkcFOwzAMhu97Cp_QduAFdphUQEKTmIgI454lZkRak-I4Q7w9TlJ1m2gvUePPv3__SfidMVh88uZIpl-AfCZzDLk_INXfwRB76wcTGPZp5lIrMAk00tlbBEXx7B0SLLVa_WMfKP7MaWxdFdk6DOz590pFKqtF5cvw-81GqzW8FduJ5Uwxk8Va10qq44CCOE9oGThW9aXudi_QZf4KY3dzNzZIq1BrWSO4dIO14VIUZF-l.svg" />
            </div>
          </Tab>
        </Tabs>
      </>
    ),
  },

  {
    title: "Live Demo",
    content: "Walkthrough of redirect → Auth0 → SAML assertion → app session.",
    component: (
      <Link to="/login-demo" className="underline text-yellow-300">
        <button className="p-4 border-red-500">Try the Login Demo</button>
      </Link>
    ),
  },
  {
    title: "Q&A",
    content: "",
    component: <></>,
  },
];
export default sections;
