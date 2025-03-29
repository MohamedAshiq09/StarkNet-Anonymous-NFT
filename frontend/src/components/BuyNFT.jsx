const BuyNFT = ({ listingId }) => {
    const { invoke } = useStarknetInvoke({ contract: MARKET_ADDRESS });
  
    const purchase = async () => {
      const proof = await generateZKProof(secret);
      await invoke({
        method: 'purchase_nft',
        args: [listingId, proof]
      });
    };

  };