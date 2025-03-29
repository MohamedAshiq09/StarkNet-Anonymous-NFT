import { useStarknet } from '@starknet-react/core';

export default function Navbar() {
  const { account, connect, disconnect } = useStarknet();

  return (
    <nav>
      <h1>Anonymous NFT Market</h1>
      {account ? (
        <button onClick={disconnect}>Disconnect {account.slice(0, 6)}...</button>
      ) : (
        <button onClick={() => connect(new InjectedConnector())}>
          Connect Wallet
        </button>
      )}
    </nav>
  );
}