import Image from "next/image";
import { Inter } from "next/font/google";
import { parseCryptoSymbols, splitTextWithCryptoTickers } from "@/utils";

const inter = Inter({ subsets: ["latin"] });

const Article = () => {
  const text = `A brand new meme cryptocurrency called Pepe (PEPE) has taken the crypto world by storm. Launched just a few days ago, it has already gone viral, gaining over 21,000% in the past three days, outperforming well-established cryptocurrencies like Dogecoin (DOGE) and Shiba Inu (SHIB). The rapid ascent of Pepe in the market has caught the attention of investors and traders alike, eager to capitalize on its meteoric rise.

  As a meme-based cryptocurrency, Pepe is inspired by internet culture and trends. The creators of this digital currency have cleverly harnessed the power of social media, using popular memes to generate buzz and attract a loyal following. This strategy has paid off handsomely, as the coin's market capitalization has skyrocketed, with millions of dollars pouring in from all corners of the globe.
  
  However, as with any investment, it's essential to exercise caution and conduct thorough research before jumping on the bandwagon. Meme cryptocurrencies are notorious for their volatility, and the rapid rise of Pepe could be followed by an equally swift fall. Investors must weigh the potential rewards against the risks and make informed decisions based on their individual risk tolerance and investment goals.
  
  Despite the inherent risks, the success of Pepe illustrates the power of viral trends and social media in shaping the cryptocurrency landscape. As more and more people become interested in digital assets, it's likely that we'll continue to see the rise of new and innovative cryptocurrencies, each vying for their share of the lucrative market. Whether Pepe can maintain its upward trajectory remains to be seen, but for now, it's certainly making waves in the world of crypto.`;

  const symbols = parseCryptoSymbols(text);
  const content = splitTextWithCryptoTickers(text, symbols);

  return (
    <div>
      <h1 className="text-lg font-semibold">Latest news on Crypto</h1>
      <p className="mt-2 leading-relaxed">{content}</p>
    </div>
  );
};

export default function Home() {
  return (
    <div className="p-2">
      <Article />
    </div>
  );
}
