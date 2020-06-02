/**
 * Uses built-in Next.js "fetch" lib and attempt to transform response as JSON
 *
 * Meant to be used from the server side.
 * Fetching from the client side should rather use SWR hook.
 *
 * @example Server-side use "fetchJSON"
 * @see https://github.com/vercel/swr/blob/master/examples/server-render/pages/%5Bpokemon%5D.js#L40
 *
 * @example Client-side use "useSWR" with "initialData" pre-fetched from getServerSideProps
 * @see https://github.com/vercel/swr/blob/master/examples/server-render/pages/%5Bpokemon%5D.js#L9
 *
 * @param args
 * @see https://nextjs.org/blog/next-9-4#improved-built-in-fetch-support
 */
const fetchJSON: <JSON = any>(
  input: RequestInfo,
  init?: RequestInit,
) => Promise<JSON> = async (...args) => {
  const res = await fetch(...args);
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
};

export default fetchJSON;
