import Image from "next/image";
import { Inter } from "next/font/google";
import { parseCryptoSymbols, splitTextWithCryptoTickers } from "@/utils";

const inter = Inter({ subsets: ["latin"] });

const Article = () => {
  const text = `A brand new meme cryptocurrency called Pepe (PEPE), launched just a few days ago, has already gone viral, gaining over 21,000% in the past three days, outperforming Dogecoin (DOGE) and Shiba Inu (SHIB).`;

  const symbols = parseCryptoSymbols(text);
  const content = splitTextWithCryptoTickers(text, symbols);

  return (
    <div>
      <h1>Article</h1>
      <p>{content}</p>
    </div>
  );
};

export default function Home() {
  return (
    <div>
      <Article />
    </div>
  );
}
