// This is the Vercel Serverless Function to handle airdrop requests
// The client-side code will fetch to this endpoint: /api/airdrop

// We need to import the web3 library and a proxy agent
const { Connection, PublicKey } = require('@solana/web3.js');
const { HttpsProxyAgent } = require('https-proxy-agent');
const { SocksProxyAgent } = require('socks-proxy-agent');

// This function will be the entry point for Vercel
module.exports = async (req, res) => {
    // Only accept POST requests
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }

    try {
        // Parse the request body
        const { address, amount, rpc, proxy } = req.body;
        
        // Input validation
        if (!address || !amount || !rpc) {
            res.status(400).json({ message: 'Missing required parameters: address, amount, or rpc.' });
            return;
        }

        let connection;
        let connectionOptions = { commitment: 'confirmed' };
        
        // Check for a proxy and configure the fetch agent
        if (proxy) {
            let agent;
            if (proxy.startsWith('socks')) {
                agent = new SocksProxyAgent(proxy);
            } else if (proxy.startsWith('http')) {
                agent = new HttpsProxyAgent(proxy);
            }

            if (agent) {
                // The HttpsProxyAgent works with the native Node.js fetch, but for RPC calls,
                // we need to set up a custom connection with a fetch agent.
                // The @solana/web3.js library doesn't have a direct agent option,
                // so we will manually make the fetch call here.
                connectionOptions.fetch = (url, options) => {
                    options.agent = agent;
                    return fetch(url, options);
                };
            }
        }
        
        // This is a manual JSON RPC call that will use the agent
        const requestPayload = {
            "jsonrpc": "2.0",
            "id": 1,
            "method": "requestAirdrop",
            "params": [
                address,
                amount
            ]
        };

        const response = await fetch(rpc, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestPayload),
            agent: connectionOptions.fetch ? connectionOptions.fetch.options.agent : null
        });

        if (!response.ok) {
            const errorBody = await response.json();
            throw new Error(errorBody.error?.message || `HTTP Error: ${response.status}`);
        }
        
        const responseData = await response.json();

        if (responseData.error) {
            throw new Error(responseData.error.message);
        }

        // Return the signature to the client
        res.status(200).json({ signature: responseData.result });

    } catch (e) {
        console.error('Airdrop failed:', e);
        res.status(500).json({ message: e.message });
    }
};

