import axios from "axios";

export default async function handler(req, res) {
  const { symbol } = req.query;

  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${symbol}&order=market_cap_desc&per_page=1&page=1&sparkline=true`
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching crypto data" });
  }
}
