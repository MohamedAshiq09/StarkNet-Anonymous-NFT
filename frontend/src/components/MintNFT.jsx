import { useStarknetInvoke } from '@starknet-react/core';
import { generateCommitment } from '../utils/zk';
import { NFT_ADDRESS } from '../../scripts/constants.mjs';

export default function MintNFT() {
  const { invoke } = useStarknetInvoke({ contract: NFT_ADDRESS });
  const [secret, setSecret] = useState('');

  const handleMint = async () => {
    const commitment = generateCommitment(secret);
    const proof = await generateZKProof(secret, commitment);
    
    await invoke({
      method: 'mint_anonymous',
      args: [commitment, proof]
    });
  };

  return (
    <div>
      <input
        type="password"
        value={secret}
        onChange={(e) => setSecret(e.target.value)}
        placeholder="Enter secret"
      />
      <button onClick={handleMint}>Mint Private NFT</button>
    </div>
  );
}