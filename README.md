# qrdx.org

The QRDX website: what QRDX is, what runs on testnet today, and the way into QRDX Trade, QRDX Wallet, QRDX Explorer and the docs. The whitepaper is read here too.

Next.js 16 (App Router, static export), Tailwind CSS v4 and the QRDX design tokens shared with trade.qrdx.org, explorer.qrdx.org and docs.qrdx.org.

```bash
pnpm install
pnpm dev                 # http://localhost:3000 (Bun + Turbopack)
pnpm build:nobun         # static site in out/, without Bun
pnpm build               # the same with Bun; prebuild also renders the whitepaper PDFs (pandoc)
```

## Live data

Numbers on the site are read **in the visitor's browser** from testnet: the node (`https://test.qrdx.org`, JSON-RPC, REST and the block stream at `wss://test.qrdx.org/ws`) and the trade API (`https://trade.qrdx.org/api/v1-test`). Both allow cross-origin requests, so there is no server and nothing is cached or made up: a value that cannot be read shows as a dash.

`lib/live.ts` is one store per tab. The navigation's block height, the home page's block list, statistics, markets and validator key all share one poll (every 15 s) and one WebSocket, open while any of them is on screen.

## Layout

| Path | |
| --- | --- |
| `app/page.tsx` | Home: live blocks, a validator's ML-DSA-65 public key against secp256k1 to scale, the exchange and its markets, the apps, status, testnet endpoints |
| `app/{trade,pools,stake,explorer,wallet,get-started,about,docs,contact}` | Product and information pages |
| `app/whitepaper` | Reader for `public/QRDX-Whitepaper-v3.2.md` |
| `app/{terms,privacy}` | Legal (`components/LegalPage.tsx`) |
| `components/site/blocks.tsx` | Shared blocks: `PageHero`, `Section`, `Feature`, `Note`, `ButtonLink`, `LiveTiles`, `LiveMarkets` |
| `components/site/home.tsx` | The home page's live pieces |
| `lib/site.ts` | Every link: apps, docs pages, socials, contact addresses, testnet endpoints |

## Content rules

- Say what is real. *Live* means live on testnet; mainnet has not launched. Features that exist only in the whitepaper are marked planned. Check claims against the node's docs, qrdx-trade, qrdx-wallet and docs.qrdx.org.
- No generated or placeholder figures.
- Links come from `lib/site.ts`.

Deployment: [DEPLOYMENT.md](DEPLOYMENT.md).
