%lang starknet

from starkware.cairo.common.merkle_check import verify_merkle
from starkware.cairo.common.hash import hash2

struct Listing {
    token_id: felt,
    price: felt,
    commitment: felt,
}

@storage_var
func listings(listing_id: felt) -> (listing: Listing) {
}

@storage_var
func sold_tokens(token_id: felt) -> (is_sold: felt) {
}

@external
func list_nft{
    syscall_ptr: felt*,
    pedersen_ptr: HashBuiltin*,
    range_check_ptr
}(listing_id: felt, token_id: felt, price: felt, proof: felt*) {
    // Verify ZK proof of ownership
    // (Implementation would use a ZK verifier)
    
    let commitment = AnonymousNFT.get_commitment(token_id);
    listings.write(listing_id, Listing(token_id, price, commitment));
    return ();
}

@external
func purchase{
    syscall_ptr: felt*,
    pedersen_ptr: HashBuiltin*,
    range_check_ptr
}(listing_id: felt, proof: felt*) {
    let (listing) = listings.read(listing_id);
    
    // Verify buyer's ZK proof
    // (Implementation would use a ZK verifier)
    
    sold_tokens.write(listing.token_id, 1);
    return ();
}