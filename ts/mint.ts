import { getFullnodeUrl, SuiClient } from "@mysten/sui.js/client";
import { TransactionBlock, TransactionObjectArgument } from "@mysten/sui.js/transactions"
import { fromB64 } from "@mysten/bcs";
import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";
import dotenv from 'dotenv';
dotenv.config(); 

export const raw = fromB64(process.env.SUI_PRIVATE_KEY!); 
export const keypair = Ed25519Keypair.fromSecretKey(raw.slice(1));

async function mint_kone(address: string) {
    const client = new SuiClient({url: getFullnodeUrl("testnet")});
    const txb = new TransactionBlock();
  
    txb.moveCall({
        target: `0xe245a51bb36b4427fcc5153357a602d534354e33a24ef173e6e0dbc0542959e9::tko::mint`,
        arguments: [        
            txb.object('0x691b27ce3db299abf46026d4c360420f4de7585d551ae6bfef3161d855d57c42'),
            txb.pure.u64(100000000000),
            txb.pure.address(address),
        ],

    });
  
    const tx = await client.signAndExecuteTransactionBlock({
        signer: keypair,
        transactionBlock: txb,
        options: {
            showObjectChanges: true,
        }        
    });
    const resp = await client.waitForTransactionBlock({
        digest: tx.digest,
    });
    return tx.digest;
  }

  mint_kone("0xf87ea7d2d19df780f45519845f2772eab35b6dcdfbfcd504f6d28931bdb50aac")
    .then(console.log)
    .catch(console.error);