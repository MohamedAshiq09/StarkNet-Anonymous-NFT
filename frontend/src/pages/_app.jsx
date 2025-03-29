import { StarknetConfig, InjectedConnector } from '@starknet-react/core';

export default function App({ Component, pageProps }) {
  const connectors = [new InjectedConnector()];

  return (
    <StarknetConfig connectors={connectors} autoConnect>
      <Component {...pageProps} />
    </StarknetConfig>
  );
}