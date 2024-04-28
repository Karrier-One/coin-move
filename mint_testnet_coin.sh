#!/bin/bash
# Store the current date in yyyy-mm-dd format in a variable
current_date=$(date +%F)
# sui client call --function mint --module mycoin --package <PACKAGE-ID> --args <TREASURY-CAP-ID> <COIN-AMOUNT> <RECIPIENT-ADDRESS> --gas-budget <GAS-AMOUNT>
sui client call --package 0xe245a51bb36b4427fcc5153357a602d534354e33a24ef173e6e0dbc0542959e9 --module tko --function mint \
--args "0x691b27ce3db299abf46026d4c360420f4de7585d551ae6bfef3161d855d57c42" 100000000000 \
"0xf87ea7d2d19df780f45519845f2772eab35b6dcdfbfcd504f6d28931bdb50aac" --gas-budget 50000000 \
| tee "mint_testnet_coin.${current_date}.txt"