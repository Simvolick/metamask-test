import { MoralisNextApi } from '@moralisweb3/next';
import { env } from "../../../env/server.mjs";

export default MoralisNextApi({
  apiKey: env.MORALIS_API_KEY,
  authentication: {
    domain: 'fundefi.io',
    uri: env.NEXTAUTH_URL,
    timeout: 120,
  },
});