import type { Metadata } from 'next'
import Link from 'next/link'
import LegalPage, { type LegalSection } from '@/components/LegalPage'

export const metadata: Metadata = {
  title: 'Terms of Service - QRDX',
  description: 'Terms governing your use of qrdx.org, trade.qrdx.org, the QRDX Wallet, and related QRDX interfaces. All use is at your own risk.',
}

const sections: LegalSection[] = [
  {
    id: 'acceptance',
    title: 'Acceptance of These Terms',
    content: (
      <>
        <p>
          These Terms of Service (&quot;Terms&quot;) govern your access to and use of the following
          (together, the &quot;Interfaces&quot;):
        </p>
        <ul>
          <li>the website at <strong>qrdx.org</strong> and its subpages;</li>
          <li>the trading interface at <strong>trade.qrdx.org</strong>, including swap, pool, stake, and bridge features;</li>
          <li>the <strong>QRDX Wallet</strong> browser extension and mobile applications;</li>
          <li>the block explorer at <strong>explorer.qrdx.org</strong>, the documentation at <strong>docs.qrdx.org</strong>, and any other interface published by the QRDX contributors.</li>
        </ul>
        <p>
          By accessing or using any Interface, you agree to these Terms. If you do not agree, do not use the Interfaces.
          &quot;QRDX&quot;, &quot;we&quot;, &quot;us&quot;, and &quot;our&quot; refer to the QRDX Foundation and the
          contributors who develop and publish the Interfaces.
        </p>
      </>
    ),
  },
  {
    id: 'nature-of-protocol',
    title: 'Decentralized Protocol, Not a Service Provider',
    content: (
      <>
        <p>
          The QRDX blockchain and its smart contracts (the &quot;Protocol&quot;) form a decentralized, permissionless
          network run by independent node operators and validators. QRDX does not own, operate, or control the
          Protocol. The Interfaces are software that let you read data from and submit transactions to the Protocol.
        </p>
        <p>
          QRDX is not a broker, exchange, custodian, money transmitter, bank, financial institution, or fiduciary.
          We do not execute trades, match orders, hold funds, or act on your behalf. When you use an Interface, you
          interact directly with the Protocol and with other users through it.
        </p>
        <p>
          Other parties can build their own interfaces to the Protocol. These Terms cover only the Interfaces we publish.
        </p>
      </>
    ),
  },
  {
    id: 'own-risk',
    title: 'Use at Your Own Risk',
    content: (
      <>
        <p>
          <strong>
            You use the Interfaces, the QRDX Wallet, and the Protocol entirely at your own risk.
          </strong>{' '}
          Digital assets and decentralized finance carry substantial risk, and you can lose some or all of your assets.
          You accept the following risks, among others:
        </p>
        <ul>
          <li>
            <strong>Irreversible transactions.</strong> Blockchain transactions are final once confirmed. Nobody,
            including QRDX, can reverse, cancel, or refund a transaction, including one sent to the wrong address or
            with the wrong amount.
          </li>
          <li>
            <strong>Smart contract risk.</strong> Smart contracts, including those for trading, liquidity pools,
            staking, and asset shielding or bridging (such as qETH and qBTC), can contain bugs or vulnerabilities that
            lead to loss of funds. Audits reduce this risk but do not remove it.
          </li>
          <li>
            <strong>Cryptographic risk.</strong> QRDX uses post-quantum cryptography. Cryptographic research continues,
            and no algorithm is guaranteed secure against every present or future attack, classical or quantum. Assets on
            other chains, and assets held through bridges, stay subject to the security of those chains.
          </li>
          <li>
            <strong>Market risk.</strong> Digital asset prices are volatile. Liquidity providers face impermanent loss.
            Trades can fail or execute at a worse price because of slippage, front-running, or network congestion.
          </li>
          <li>
            <strong>Network risk.</strong> The Protocol or connected networks can halt, fork, reorganize, or change
            through governance in ways that affect your assets.
          </li>
          <li>
            <strong>Software risk.</strong> The Interfaces can contain errors, show inaccurate prices or balances, or
            become unavailable without notice.
          </li>
          <li>
            <strong>Regulatory risk.</strong> Laws on digital assets change and vary by jurisdiction, and can restrict or
            prohibit your use of the Protocol.
          </li>
        </ul>
        <p>
          Test networks and test tokens have no monetary value. Do not send real assets to a testnet address.
        </p>
      </>
    ),
  },
  {
    id: 'wallet',
    title: 'QRDX Wallet and Self-Custody',
    content: (
      <>
        <p>
          The QRDX Wallet is non-custodial software. Your private keys, recovery phrase, and password are generated and
          stored on your device and never sent to QRDX. As a result:
        </p>
        <ul>
          <li>You alone control your assets and are solely responsible for securing your keys, recovery phrase, password, and device.</li>
          <li>QRDX cannot access, freeze, recover, or move your assets, and cannot reset your password or recover a lost recovery phrase.</li>
          <li>Anyone who obtains your recovery phrase or private keys can take your assets. QRDX staff will never ask for them.</li>
          <li>Losing your recovery phrase can mean permanent loss of your assets.</li>
        </ul>
        <p>
          You are responsible for reviewing every transaction before you sign it, including the recipient address,
          amount, network, fees, and any contract permissions you grant.
        </p>
      </>
    ),
  },
  {
    id: 'eligibility',
    title: 'Eligibility and Your Responsibilities',
    content: (
      <>
        <p>You represent and agree that:</p>
        <ul>
          <li>you are at least 18 years old, or the age of majority where you live, and can form a binding contract;</li>
          <li>you are not subject to sanctions and are not located in, or a resident of, a country or region subject to comprehensive sanctions;</li>
          <li>your use of the Interfaces complies with all laws that apply to you, including laws on securities, commodities, taxes, sanctions, and anti-money-laundering;</li>
          <li>you are solely responsible for determining and paying any taxes on your transactions;</li>
          <li>you understand how blockchains, wallets, and decentralized finance work, and the risks described in these Terms.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'prohibited-use',
    title: 'Prohibited Use',
    content: (
      <>
        <p>You agree not to use the Interfaces to:</p>
        <ul>
          <li>break any law, or facilitate fraud, money laundering, terrorist financing, or sanctions evasion;</li>
          <li>manipulate markets, including wash trading, spoofing, or pump-and-dump schemes;</li>
          <li>attack, overload, or disrupt the Interfaces or the Protocol, or access them in an unauthorized way;</li>
          <li>infringe the intellectual property or other rights of others;</li>
          <li>impersonate QRDX or any other person, or distribute malware or phishing content.</li>
        </ul>
        <p>
          We can block access to the Interfaces from any address, region, or user at our discretion. This does not affect
          your ability to interact with the Protocol through other means.
        </p>
      </>
    ),
  },
  {
    id: 'no-advice',
    title: 'No Advice',
    content: (
      <p>
        Nothing on the Interfaces is investment, financial, legal, or tax advice, or a recommendation to buy, sell, or
        hold any asset. Prices, yields, statistics, and other data shown on the Interfaces are for information only,
        can be wrong or out of date, and come in part from third parties. Do your own research and consult qualified
        professionals before making decisions.
      </p>
    ),
  },
  {
    id: 'third-parties',
    title: 'Third-Party Services and Assets',
    content: (
      <p>
        The Interfaces connect to or link to services we do not control, including RPC node providers, block explorers,
        price data providers, other blockchains, bridges, and tokens created by third parties. Anyone can create a token
        or liquidity pool on the Protocol. QRDX does not review, endorse, or take responsibility for any third-party token,
        pool, service, or content, and your use of them is governed by their own terms.
      </p>
    ),
  },
  {
    id: 'fees',
    title: 'Fees',
    content: (
      <p>
        Transactions on the Protocol and other networks require network fees (gas), paid to validators and not to QRDX.
        The Protocol can also charge fees, such as swap fees paid to liquidity providers, set by the smart contracts or by
        governance. The Interfaces display estimated fees before you sign. Final fees depend on network conditions.
      </p>
    ),
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual Property and Open Source',
    content: (
      <p>
        Source code for the Protocol and Interfaces is published under the open-source licenses in each repository at{' '}
        <a href="https://github.com/qrdx-org" target="_blank" rel="noopener noreferrer">github.com/qrdx-org</a>, and those
        licenses govern your use of that code. The QRDX name, logo, and branding remain the property of the QRDX Foundation.
        Do not use them in a way that suggests endorsement or that could confuse users.
      </p>
    ),
  },
  {
    id: 'disclaimer',
    title: 'Disclaimer of Warranties',
    content: (
      <p className="uppercase text-sm">
        The Interfaces, the QRDX Wallet, and the Protocol are provided &quot;as is&quot; and &quot;as available&quot;,
        without warranties of any kind, express or implied, including warranties of merchantability, fitness for a
        particular purpose, title, non-infringement, accuracy, security, or uninterrupted availability. QRDX does not
        warrant that the Interfaces or the Protocol will be free of errors, vulnerabilities, or harmful components, or
        that any data shown is accurate.
      </p>
    ),
  },
  {
    id: 'limitation-of-liability',
    title: 'Limitation of Liability',
    content: (
      <>
        <p className="uppercase text-sm">
          To the fullest extent permitted by law, QRDX, the QRDX Foundation, and its contributors, developers, validators,
          and affiliates are not liable for any indirect, incidental, special, consequential, exemplary, or punitive damages,
          or for any loss of digital assets, funds, profits, revenue, data, or goodwill, arising from or related to your use
          of, or inability to use, the Interfaces, the QRDX Wallet, or the Protocol, whatever the legal theory and even if
          advised of the possibility of such damages.
        </p>
        <p className="uppercase text-sm">
          To the fullest extent permitted by law, our total liability for any claim arising from these Terms or the
          Interfaces shall not exceed one hundred US dollars (US$100).
        </p>
        <p>
          Some jurisdictions do not allow certain exclusions or limitations of liability. In those jurisdictions, these
          limitations apply to the fullest extent the law allows.
        </p>
      </>
    ),
  },
  {
    id: 'indemnification',
    title: 'Indemnification',
    content: (
      <p>
        You agree to indemnify and hold harmless QRDX, the QRDX Foundation, and its contributors from any claims, losses,
        damages, and expenses, including reasonable legal fees, arising from your use of the Interfaces, your breach of
        these Terms, or your violation of any law or the rights of any third party.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to These Terms and the Interfaces',
    content: (
      <p>
        We can update these Terms at any time by posting a new version on this page and changing the &quot;Last
        updated&quot; date. Your continued use of the Interfaces after an update means you accept the new Terms. We can
        change, suspend, or discontinue any Interface at any time without notice.
      </p>
    ),
  },
  {
    id: 'general',
    title: 'General',
    content: (
      <p>
        If a court finds any provision of these Terms unenforceable, the remaining provisions stay in effect. Our failure
        to enforce a provision does not waive it. These Terms, together with our{' '}
        <Link href="/privacy">Privacy Policy</Link>, form the entire agreement between you and QRDX about the Interfaces.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Contact',
    content: (
      <p>
        Send questions about these Terms to{' '}
        <a href="mailto:support@mail.qrdx.org">support@mail.qrdx.org</a> or through our{' '}
        <Link href="/contact">contact page</Link>.
      </p>
    ),
  },
]

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      lastUpdated="October 3, 2026"
      summary={
        <>
          <p className="font-semibold text-foreground">Summary (the full Terms below control)</p>
          <p>
            QRDX is a decentralized blockchain. qrdx.org, trade.qrdx.org, and the QRDX Wallet are non-custodial software
            you use <strong>entirely at your own risk</strong>. We never hold your funds or keys, cannot reverse
            transactions, and cannot recover lost assets. Everything is provided as is, with no warranties.
          </p>
        </>
      }
      sections={sections}
    />
  )
}
