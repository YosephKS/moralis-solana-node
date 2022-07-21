const axios = require("axios");
const express = require("express");
const Moralis = require("moralis/node");
require("dotenv").config();
const app = express();
const port = 3000;

/**
 * @description Using Moralis SDK to call Solana API
 */
app.get("/sdk", async (_, res) => {
  await Moralis.start({
    serverUrl: process.env.MORALIS_DAPP_URL,
    appId: process.env.MORALIS_APP_ID,
  });
  // get devnet SOL balance for a given address
  const options = {
    network: "devnet",
    address: "6XU36wCxWobLx5Rtsb58kmgAJKVYmMVqy4SHXxENAyAe",
  };
  const solBalance = await Moralis.SolanaAPI.account.balance(options);
  res.status(200).send(solBalance);
});

/**
 * @description Using REST API to call Solana API
 */
app.get("/rest", async (_, res) => {
  const { data } = await axios.get(
    "https://solana-gateway.moralis.io/account/devnet/6XU36wCxWobLx5Rtsb58kmgAJKVYmMVqy4SHXxENAyAe/balance",
    {
      headers: {
        "X-API-Key": process.env.MORALIS_SOLANA_API_KEY,
      },
    }
  );
  res.status(200).send(data);
});

app.listen(port, () => {
  console.log(
    `Moralis Solana Express app listening on http://localhost:${port} 🚀`
  );
});
