import type { Metadata } from 'next'
import Link from 'next/link'
import LegalPage, { type LegalSection } from '@/components/LegalPage'

export const metadata: Metadata = {
  title: 'Privacy Policy - QRDX',
  description: 'How qrdx.org, trade.qrdx.org, and the QRDX Wallet handle your information. We collect as little as possible and never hold your keys.',
}

const sections: LegalSection[] = [
  {
    id: 'scope',
    title: 'Scope',
    content: (
      <>
        <p>
          This Privacy Policy explains how the QRDX Foundation and QRDX contributors (&quot;QRDX&quot;, &quot;we&quot;,
          &quot;us&quot;) handle information when you use qrdx.org, trade.qrdx.org, explorer.qrdx.org, docs.qrdx.org, and
          the QRDX Wallet browser extension and mobile applications (together, the &quot;Interfaces&quot;).
        </p>
        <p>
          It does not cover the QRDX blockchain itself, which is a public, decentralized network that no one controls, or
          third-party services you reach through the Interfaces. Your use of the Interfaces is also governed by our{' '}
          <Link href="/terms">Terms of Service</Link>, including the fact that you use them at your own risk.
        </p>
      </>
    ),
  },
  {
    id: 'what-we-do-not-collect',
    title: 'What We Do Not Collect',
    content: (
      <>
        <p>We do not require an account, and we do not collect:</p>
        <ul>
          <li>your private keys, recovery phrase, or wallet password;</li>
          <li>your name, address, government ID, or other identity documents;</li>
          <li>payment card or bank details;</li>
          <li>analytics, advertising, or cross-site tracking data. The Interfaces do not load third-party analytics or advertising scripts.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'blockchain-data',
    title: 'Public Blockchain Data',
    content: (
      <>
        <p>
          When you send a transaction, your wallet address, the transaction details, and its timestamp are published to
          the blockchain. This data is <strong>public, permanent, and visible to anyone</strong>, and the Interfaces,
          including the block explorer, display it.
        </p>
        <p>
          Blockchain data is not held by QRDX, so we cannot edit or delete it. Anyone who links your identity to an address
          can see that address&apos;s full history. Consider this before you transact.
        </p>
      </>
    ),
  },
  {
    id: 'information-we-receive',
    title: 'Information We Receive',
    content: (
      <>
        <ul>
          <li>
            <strong>Server and network logs.</strong> Our hosting and infrastructure providers, and the RPC nodes the
            Interfaces connect to, receive standard request data such as your IP address, browser user agent, requested
            URL, and time of request. We use this data only to operate, secure, and debug the Interfaces.
          </li>
          <li>
            <strong>Wallet addresses in requests.</strong> To show balances, prices, and history, the Interfaces send your
            public wallet address to blockchain nodes and data services. We do not link these addresses to your identity.
          </li>
          <li>
            <strong>Messages you send us.</strong> The contact form on qrdx.org opens your own email app with a pre-filled
            message. If you send it, we receive your name, email address, and message, and use them only to reply to you.
            The same applies when you email us directly.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'wallet',
    title: 'QRDX Wallet',
    content: (
      <>
        <p>
          The QRDX Wallet is non-custodial. Your private keys and recovery phrase are generated on your device, stored
          encrypted in your browser&apos;s extension storage or your phone&apos;s app storage, and never sent to QRDX or
          anyone else. Wallet settings, such as selected networks and display preferences, stay on your device.
        </p>
        <p>
          To work, the wallet contacts these services directly from your device. Each receives your IP address and the
          public addresses it queries:
        </p>
        <ul>
          <li>RPC nodes for each network you use, run by QRDX (for example rpc.qrdx.org) or by third parties such as Ankr and PublicNode;</li>
          <li>block explorer APIs such as Etherscan, Polygonscan, Arbiscan, Basescan, and BscScan, for transaction history;</li>
          <li>CoinGecko, for asset prices.</li>
        </ul>
        <p>
          Uninstalling the wallet or clearing its storage deletes all wallet data on that device. Back up your recovery
          phrase first, or you will lose access to your assets.
        </p>
      </>
    ),
  },
  {
    id: 'cookies',
    title: 'Cookies and Local Storage',
    content: (
      <>
        <p>
          qrdx.org does not set tracking cookies. It uses your browser&apos;s local storage to remember:
        </p>
        <ul>
          <li><strong>cookie-consent</strong>: your choice in the cookie banner;</li>
          <li><strong>theme</strong>: your light or dark mode preference.</li>
        </ul>
        <p>
          This data stays in your browser and is never sent to us. You can change your cookie choice through the
          &quot;Cookies&quot; link in the footer, or clear it at any time through your browser settings. trade.qrdx.org
          uses local storage the same way, and also stores the public wallet addresses you connect and the wallet pairings
          you create, so they persist between visits.
        </p>
      </>
    ),
  },
  {
    id: 'sharing',
    title: 'How We Share Information',
    content: (
      <>
        <p>We do not sell or rent your information. We share information only:</p>
        <ul>
          <li>with infrastructure providers, such as hosting and email providers, that process it on our behalf to run the Interfaces;</li>
          <li>when the law requires it, such as in response to a valid court order;</li>
          <li>to protect the security of the Interfaces, our users, or the public.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'third-parties',
    title: 'Third-Party Services',
    content: (
      <p>
        The Interfaces link to and connect with services we do not control, including Discord, X (Twitter), Telegram,
        GitHub, RPC providers, block explorers, price providers, other blockchains, and bridges. Their own privacy policies
        govern how they handle your data. Review them before using those services.
      </p>
    ),
  },
  {
    id: 'retention',
    title: 'Data Retention and Security',
    content: (
      <p>
        We keep server logs only as long as we need them for security and operations, and keep email correspondence only as
        long as we need it to handle your request. We use reasonable technical measures to protect the data we receive.
        No system is perfectly secure, and you share data with us at your own risk.
      </p>
    ),
  },
  {
    id: 'your-rights',
    title: 'Your Rights',
    content: (
      <>
        <p>
          Depending on where you live, you can have the right to access, correct, delete, or restrict the processing of
          personal data we hold about you, and to object to that processing. To make a request, email{' '}
          <a href="mailto:support@mail.qrdx.org">support@mail.qrdx.org</a>. You can also complain to your local data
          protection authority.
        </p>
        <p>
          These rights apply to data we hold, such as emails you sent us. They cannot apply to data on the public blockchain,
          which nobody can alter or delete.
        </p>
      </>
    ),
  },
  {
    id: 'children',
    title: 'Children',
    content: (
      <p>
        The Interfaces are not intended for anyone under 18. We do not knowingly collect information from children. If you
        believe a child has sent us personal data, contact us and we will delete it.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to This Policy',
    content: (
      <p>
        We can update this Privacy Policy by posting a new version on this page and changing the &quot;Last updated&quot;
        date. Your continued use of the Interfaces after an update means you accept the updated policy.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Contact',
    content: (
      <p>
        Send privacy questions to <a href="mailto:support@mail.qrdx.org">support@mail.qrdx.org</a> or through our{' '}
        <Link href="/contact">contact page</Link>.
      </p>
    ),
  },
]

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      lastUpdated="October 3, 2026"
      summary={
        <>
          <p className="font-semibold text-foreground">Summary (the full policy below controls)</p>
          <p>
            We collect as little as possible. There are no accounts, analytics, or ad trackers. The QRDX Wallet keeps your
            keys on your device and never sends them to us. Blockchain transactions are public and permanent. Using
            qrdx.org, trade.qrdx.org, and the QRDX Wallet is <strong>at your own risk</strong>.
          </p>
        </>
      }
      sections={sections}
    />
  )
}
