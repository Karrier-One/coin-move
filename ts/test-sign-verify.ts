import { getFullnodeUrl, SuiClient } from "@mysten/sui.js/client";
import { TransactionBlock, TransactionObjectArgument } from "@mysten/sui.js/transactions"
import { fromB64 } from "@mysten/bcs";
import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";
import dotenv from 'dotenv';
dotenv.config(); 
import {
    SuiFeatures,
    SuiSignPersonalMessageMethod,
    SuiSignTransactionBlockMethod,
    SuiSignAndExecuteTransactionBlockMethod,
  } from "@mysten/wallet-standard";
import { verifyPersonalMessage } from "@mysten/sui.js/verify";
export const raw = fromB64(process.env.SUI_PRIVATE_KEY!); 
export const keypair = Ed25519Keypair.fromSecretKey(raw.slice(1));
function stringBytesToUint8Array(bytes: string) {
    return Uint8Array.from(atob(bytes), c => c.charCodeAt(0))
  }
async function sign_personal_message() {
    let data = await keypair.signPersonalMessage(Buffer.from("aHello, Worldy!"));
    console.log(keypair.toSuiAddress());
    console.log(keypair.getPublicKey());
    console.log(data);
    console.log('----------');
    let result = await verifyPersonalMessage(Buffer.from("aHello, Worldy!"), data.signature);
    console.log(result);
    // console.log(atob(data.bytes));
    // console.log(Buffer.from("aHello, Worldy!"));
    // console.log(Buffer.from(atob(data.bytes).slice(1))); //.slice(1) //first character of the signature appears to be the lenth, eg 0x0D or 0x0F.  so after decoding base64, we need to slice it off.
    // console.log(Uint8Array.from(atob(data.bytes).slice(1), c => c.charCodeAt(0)));
    let result2 = await verifyPersonalMessage(Uint8Array.from(atob(data.bytes).slice(1), c => c.charCodeAt(0)), data.signature);
    console.log(result2);    
  }

  sign_personal_message()
    .then(console.log)
    .catch(console.error);

sign_personal_message()
    .then(console.log)
    .catch(console.error);    