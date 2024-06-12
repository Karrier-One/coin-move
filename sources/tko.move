module karrier::tko {
    use sui::coin;
    use sui::url;
    use std::ascii;  
    /// Make sure that the name of the type matches the module's name.
    public struct TKO has drop {}

    /// Module initializer is called once on module publish. A treasury
    /// cap is sent to the publisher, who then controls minting and burning
    fun init(witness: TKO, ctx: &mut TxContext) {
        let (treasury, metadata) = coin::create_currency(witness, 9, b"TKO", b"Test Token", b"An example test token", 
        option::some(url::new_unsafe(ascii::string(b"https://karrier.one/tko.png"))),
         ctx);
        transfer::public_freeze_object(metadata);
        transfer::public_transfer(treasury, tx_context::sender(ctx))
    }

    public fun mint(
        treasury_cap: &mut coin::TreasuryCap<TKO>, 
        amount: u64, 
        recipient: address, 
        ctx: &mut TxContext,
    ) {
        coin::mint_and_transfer(treasury_cap, amount, recipient, ctx);
    }

    public fun burn(treasury_cap: &mut coin::TreasuryCap<TKO>, coin: coin::Coin<TKO>) {
        coin::burn(treasury_cap, coin);
    }

    #[test_only]
    /// Wrapper of module initializer for testing
    public fun test_init(ctx: &mut TxContext) {
        init(TKO {}, ctx)
    }
}