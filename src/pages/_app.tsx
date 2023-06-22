import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Head from "next/head";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta property="twitter:image" content="/main_image.png" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:title"
          content="Unofficial preparation exam for Cervantes CCSE Exam"
        />
        <meta property="twitter:description" content="Test your knowledge!" />
        <meta property="og:image" content="/main_image.png" />
        <meta
          property="og:title"
          content="Unofficial preparation exam for Cervantes CCSE Exam"
        />
        <meta property="og:description" content="Test your knowledge!" />
        <meta property="og:url" content="https://ccse.facundogordillo.com" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default api.withTRPC(MyApp);
