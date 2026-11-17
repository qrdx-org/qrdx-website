/**
 * What shipped, newest first, for /changelog. Each entry comes from a release note or a
 * commit in the product's own repository; add one when something reaches users, with the
 * date it did. Nothing planned goes here: that is the roadmap's job.
 */

export type Product = 'Node' | 'Testnet' | 'Trade' | 'Wallet' | 'Explorer' | 'Docs' | 'Website'

export interface Release {
  date: string
  product: Product
  title: string
  points?: string[]
  href?: string
}

export const RELEASES: Release[] = [
  {
    date: '2026-11-17',
    product: 'Trade',
    title: 'Terms before trading',
    points: ['A first visit to trade.qrdx.org asks you to accept the Terms of Service and acknowledge the risks of trading, once per browser and again when the Terms change.'],
  },
  {
    date: '2026-11-17',
    product: 'Website',
    title: 'Network page and this changelog',
    points: ['qrdx.org/network shows validators, delegation, governance and the Doomsday Protocol live from testnet.'],
    href: '/network',
  },
  {
    date: '2026-11-17',
    product: 'Docs',
    title: 'Guides for account control, QRDX names and quantum migration',
    points: ['Multisigs, controllers, delays and recovery guardians; registering and resolving name.qrdx; binding a post-quantum successor to a classic key.'],
    href: 'https://docs.qrdx.org/docs/guides/account-control',
  },
  {
    date: '2026-11-16',
    product: 'Trade',
    title: 'Sub-accounts, and spot trades in your PnL',
    points: [
      'Pick the account you trade as from the top bar; create a sub-account and fund it in one approval; move funds between accounts.',
      'The portfolio chart and PnL include spot trades, priced from your own swaps and fills.',
    ],
    href: 'https://docs.qrdx.org/docs/guides/sub-accounts',
  },
  {
    date: '2026-11-16',
    product: 'Website',
    title: 'qrdx.org redesigned around live chain data',
    points: ['Blocks arriving every 250 ms, a validator’s real ML-DSA-65 key, live markets and the testnet endpoints.'],
  },
  {
    date: '2026-11-15',
    product: 'Explorer',
    title: 'Sub-accounts, vaults, multisigs and protocol accounts',
    points: ['Address pages say what an account is: a sub-account and its master, a vault and its leader, a 0xPQMS multisig, or one of the protocol’s own accounts.'],
  },
  {
    date: '2026-11-15',
    product: 'Wallet',
    title: 'New wallet.qrdx.org, with extension downloads',
    points: ['CI builds the Chrome and Firefox extensions; download them from wallet.qrdx.org.'],
  },
  {
    date: '2026-11-14',
    product: 'Trade',
    title: 'Node 3.0.0 across the apps',
    points: ['Trade, the wallet and the explorer support token perpetuals, the new proof operations and the 1 QRDX fee reserve.'],
  },
  {
    date: '2026-11-13',
    product: 'Testnet',
    title: 'Regenesis on node 3.0.0',
    points: ['Testnet restarted from a new genesis on node 3.0.0, chain id 7620, 250 ms slots.'],
    href: 'https://docs.qrdx.org/docs/get-started/networks',
  },
  {
    date: '2026-10-27',
    product: 'Node',
    title: 'qrdx-node 3.0.0',
    points: [
      'Validators: slashing protection in the running node, encrypted keystores, and a check for a second copy of the same validator before signing.',
      'Quantum migration and the Doomsday Protocol: classic accounts bind a post-quantum successor; a proven canary switches ECDSA off.',
      'Bridge deposits proven with storage proofs, refunds, per-asset mint limits and a governance mint pause.',
      'Post-quantum smart accounts in the EVM and a TypeScript SDK.',
      'About twice the block pipeline per core: some 4,450 transfers a second through proposing and importing a block.',
    ],
    href: 'https://docs.qrdx.org/docs/roadmap',
  },
  {
    date: '2026-10-26',
    product: 'Trade',
    title: 'One-click trading, vaults and a leaderboard',
    points: ['Approve a trading key once and orders need no wallet prompt; it can trade but never withdraw. Sub-accounts, vaults with leaders and depositors, and a public leaderboard.'],
  },
  {
    date: '2026-10-26',
    product: 'Wallet',
    title: 'Names and account control',
    points: ['Register and renew name.qrdx, send to names, bind controllers and multisigs, set a delay and recovery guardians.'],
  },
  {
    date: '2026-10-25',
    product: 'Trade',
    title: 'Advanced orders',
    points: ['Stop and take-profit triggers, TWAP orders, modifying resting orders, atomic batches and swaps routed through several markets.'],
  },
  {
    date: '2026-10-19',
    product: 'Trade',
    title: 'An NFT market',
    points: ['Create collections, list and buy NFTs for QRDX on testnet.'],
  },
  {
    date: '2026-10-14',
    product: 'Trade',
    title: 'Order editing, depth chart and price alerts',
    points: ['Edit or cancel all orders, a depth chart, price alerts, CSV exports and staking history.'],
  },
  {
    date: '2026-10-14',
    product: 'Explorer',
    title: 'Bridge and governance pages',
    points: ['Bridged assets and deposits, and shareable governance proposals.'],
  },
  {
    date: '2026-10-13',
    product: 'Testnet',
    title: '250 ms blocks and delegation',
    points: ['Testnet moved to 250 ms slots on chain id 7620. Delegate QRDX to a validator from Trade or the wallet.'],
  },
  {
    date: '2026-10-08',
    product: 'Docs',
    title: 'New documentation',
    points: ['docs.qrdx.org rewritten, with examples that run against testnet in the page.'],
  },
  {
    date: '2026-10-07',
    product: 'Trade',
    title: 'Portfolio PnL and public profiles',
    points: ['A PnL chart and per-market PnL; verified public profiles for accounts and tokens.'],
  },
  {
    date: '2026-10-05',
    product: 'Trade',
    title: 'Trading on the native exchange',
    points: ['Spot order books, pools, a token launchpad and the trade API on testnet, with phone wallets connected by QR code.'],
  },
  {
    date: '2026-10-04',
    product: 'Wallet',
    title: 'Browser extension and iPhone app',
    points: ['A dApp provider in the browser extension, and biometric unlock in the iPhone app.'],
  },
]
