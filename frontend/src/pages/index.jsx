import { useStarknet, useStarknetInvoke } from '@starknet-react/core';

export default function Home() {
  const { account } = useStarknet();
  const { invoke: mintNFT } = useStarknetInvoke({
    contract: process.env.NEXT_PUBLIC_NFT_ADDRESS,
    method: 'mint_anonymous'
  });

  const handleMint = async () => {
    const commitment = generateCommitment();
    const proof = await generateZKProof();
    
    await mintNFT({
      args: [commitment, proof]
    });
  };

  return (
    <div>
      <h1>Anonymous NFT Market</h1>
      {account ? (
        <button onClick={handleMint}>Mint Private NFT</button>
      ) : (
        <p>Connect your StarkNet wallet</p>
      )}
    </div>
  );
}