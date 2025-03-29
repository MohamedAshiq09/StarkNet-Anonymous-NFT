%lang starknet
%builtins pedersen

from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.hash import hash2

@storage_var
func commitment_owner(commitment: felt) -> (owner: felt) {
}

@external
func mint_anonymous{
    syscall_ptr: felt*,
    pedersen_ptr: HashBuiltin*,
    range_check_ptr
}(commitment: felt, proof: felt*) {
    // ZK proof verification placeholder
    let (is_valid) = ZKVerifier.verify_proof(proof);
    assert is_valid = 1;

    commitment_owner.write(commitment, caller_address);
    return ();
}

@view
func get_owner{
    syscall_ptr: felt*,
    pedersen_ptr: HashBuiltin*,
    range_check_ptr
}(commitment: felt) -> (owner: felt) {
    return commitment_owner.read(commitment);
}