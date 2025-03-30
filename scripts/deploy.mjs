import { Account, Provider, ec, json } from 'starknet';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const compileContract = async (name) => {
  const content = fs.readFileSync(`contracts/${name}_compiled.json`);
  return json.parse(content);
};

async function main() {
  const provider = new Provider({ network: 'goerli-alpha' });
  const account = new Account(
    provider,
    process.env.STARKNET_ACCOUNT_ADDRESS,
    process.env.STARKNET_PRIVATE_KEY
  );

  // Compile contracts using Docker
  const [nftContract, marketContract] = await Promise.all([
    compileContract('AnonymousNFT'),
    compileContract('Marketplace')
  ]);

  
  const nftDeclare = await account.declare({ contract: nftContract });
  const nft = await account.deploy({ classHash: nftDeclare.class_hash });

  
  const marketDeclare = await account.declare({ contract: marketContract });
  const marketplace = await account.deploy({
    classHash: marketDeclare.class_hash,
    constructorCalldata: [nft.address]
  });

  console.log('Deployed Contracts:');
  console.log('NFT:', nft.address);
  console.log('Marketplace:', marketplace.address);
}

main().catch(console.error);