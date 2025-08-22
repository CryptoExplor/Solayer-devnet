
````markdown
# 🌊 Solayer Devnet Faucet Auto-Claimer  

![Static Badge](https://img.shields.io/badge/status-active-brightgreen)  
![Static Badge](https://img.shields.io/badge/license-MIT-blue)  
![Static Badge](https://img.shields.io/badge/solana-devnet-orange)

A lightweight **browser-based auto faucet claimer** for the [Solayer Devnet](https://explorer.solayer.org/faucet).  
This tool automatically requests SOL airdrops for multiple wallets with configurable claim modes, retry logic, and randomized delays to simulate natural usage.  

---

## ✨ Features
- 🔄 **Auto-claim loop** with random 1–5s delays  
- 🎯 **Claim modes**:
  - **Indefinite** → runs forever  
  - **Total claim limit** → shared across all wallets  
  - **Per-wallet claim limit** → stops once each wallet reaches target  
- 📊 **Live stats tracking** (total, success, errors)  
- 🔁 **Exponential retry backoff** (up to 5 retries with safe exit)  
- 💬 **Activity log** with Solayer Explorer TX links  
- 🛑 **Start / Stop controls** with safe exit  
- 📝 **Clear log & reset stats** in one click  
- 🔒 **Fully client-side** (no private keys required, only public addresses)  

---

## 🚀 Getting Started

### 1. Clone or download the repo
```bash
git clone https://github.com/<your-username>/solayer-faucet-auto.git
cd solayer-faucet-auto
````

### 2. Run locally

Just open **`index.html`** in your browser.
No build step, no install, no backend.

### 3. Usage

* Paste your **wallet addresses** (Base58, one per line).
* Configure:

  * RPC URL (default: `https://devnet-rpc.solayer.org`)
  * Claim amount (in SOL)
  * Claim mode & limits
* Click **Start Faucet Loop** → watch the live log.

---

## 🛠 Roadmap

* [ ] Adjustable delay range from UI
* [ ] Balance check before requesting airdrop
* [ ] Multi-RPC failover rotation
* [ ] Export logs as `.txt`
* [ ] Per-wallet progress tracker

---

## ⚠️ Disclaimer

This project is for **educational and testing purposes only**.

* Works **only on Solayer Devnet**.
* Do **not** use with mainnet or real funds.
* No keys are ever stored or exposed — addresses only.

---

## 📜 License

MIT © 2025 — Feel free to fork, adapt, and improve.
 
> *“Browser-based Solayer Devnet faucet auto-claimer with multi-wallet support, retries, and live logging.”*
```
