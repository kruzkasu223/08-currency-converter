import { type NextPage } from "next";
import Head from "next/head";
import { api } from "../utils/api";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "Currency Converter" });
  console.log(hello.data?.greeting);

  return (
    <>
      <Head>
        <title>08/27 - Currency Converter</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <h1 className="mt-8 text-3xl font-extrabold tracking-tight text-white">
          08/27 - Currency Converter
        </h1>
      </main>
    </>
  );
};

export default Home;
