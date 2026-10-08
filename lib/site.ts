/** Where everything lives. One place, so the nav, footer and pages agree. */

export const apps = {
  trade: 'https://trade.qrdx.org',
  explorer: 'https://explorer.qrdx.org',
  wallet: 'https://wallet.qrdx.org',
  docs: 'https://docs.qrdx.org',
}

/** docs.qrdx.org pages the site links to. */
export const docs = {
  home: `${apps.docs}/docs`,
  quickstart: `${apps.docs}/docs/get-started/quickstart`,
  networks: `${apps.docs}/docs/get-started/networks`,
  wallet: `${apps.docs}/docs/guides/wallet`,
  spot: `${apps.docs}/docs/guides/spot-trading`,
  liquidity: `${apps.docs}/docs/guides/liquidity`,
  perps: `${apps.docs}/docs/guides/perpetuals`,
  launch: `${apps.docs}/docs/guides/launch-a-token`,
  explorer: `${apps.docs}/docs/guides/explorer`,
  postQuantum: `${apps.docs}/docs/concepts/post-quantum`,
  accounts: `${apps.docs}/docs/concepts/accounts`,
  tokens: `${apps.docs}/docs/concepts/native-tokens`,
  exchange: `${apps.docs}/docs/concepts/exchange`,
  perpsEngine: `${apps.docs}/docs/concepts/perpetuals`,
  consensus: `${apps.docs}/docs/concepts/consensus`,
  build: `${apps.docs}/docs/build`,
  rpc: `${apps.docs}/docs/build/json-rpc`,
  tradeApi: `${apps.docs}/docs/build/trade-api`,
  walletIntegration: `${apps.docs}/docs/build/wallet-integration`,
  security: `${apps.docs}/docs/security/post-quantum-cryptography`,
  walletSecurity: `${apps.docs}/docs/security/wallet-security`,
  reporting: `${apps.docs}/docs/security/reporting`,
  roadmap: `${apps.docs}/docs/roadmap`,
}

export const social = {
  x: 'https://x.com/qrdx_org',
  github: 'https://github.com/qrdx-org',
  telegram: 'https://t.me/qrdx_official',
}

export const contact = {
  support: 'support@mail.qrdx.org',
  security: 'security@qrdx.org',
  research: 'research@mail.qrdx.org',
}

/** Testnet, the network that is live. */
export const testnet = {
  node: 'https://test.qrdx.org',
  rpc: 'https://test.qrdx.org/rpc',
  ws: 'wss://test.qrdx.org/ws',
  tradeApi: 'https://trade.qrdx.org/api/v1-test',
}
