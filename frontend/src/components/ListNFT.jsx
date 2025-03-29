const ListNFT = ({ commitment }) => {
    const { invoke } = useStarknetInvoke({ contract: MARKET_ADDRESS });
  
    const listNFT = async (price) => {
      const proof = await generateZKProof(secret);
      await invoke({
        method: 'list_nft',
        args: [Date.now(), commitment, price, proof]
      });
    };

  };