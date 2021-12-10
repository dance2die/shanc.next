import { Story } from "#types/index";
import { cacheTopStories, getCachedTopStories } from "cache";
import Head from "next/head";
import { CACHE_EXPIRATION } from "utils/constants";
import { getTopStories } from "utils/story";

export async function getStaticProps() {
  let start = Date.now();
  const { cachedStories, cachedDate } = await getCachedTopStories();
  let data = {};

  if (cachedStories) {
    data = {
      stories: cachedStories,
      type: "cache",
      latency: Date.now() - start,
      cachedDate,
    };
  } else {
    start = Date.now();
    const stories: Story[] = await getTopStories();

    cacheTopStories(stories);

    data = { stories, type: "api", latency: Date.now() - start, cachedDate };
  }

  return { props: { data }, revalidate: CACHE_EXPIRATION / 10 };
}

export default function Home({ data }) {
  console.log({ data });
  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <h1 className="">Welcome to my website</h1>

        <p className="">
          Get started by editing <code>pages/index.js</code>
        </p>

        {/* <p className="">
          View Count: <b>{count}</b>
        </p> */}

        {/* <button type="button" onClick={increment}>
          Manual Increment (+1)
        </button> */}
      </main>

      <footer className="">
        <a
          href="https://vercel.com/integrations/upstash"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <b>Vercel</b> and <b>Upstash</b>
        </a>
      </footer>
    </div>
  );
}
