const axios = require('axios');
const shortenString = (
  value,
  leftDigits,
  rightDigits,
) => {
  let shortenedString = ''
  if (value) {
    shortenedString =
      value?.substring(0, leftDigits) +
      '...' +
      value?.substring(value?.length - rightDigits)
  }
  return shortenedString
}


const checkIfListed = (owner_address, sales) => {
    console.log(sales)
    sales?.filter((a) => {
        if(a?.maker?.address == owner_address) {
            return true
        } else return false
    })
}

async function raffleEmbed(token_id) {



//   let isListed
//   let sales = asset?.seaport_sell_orders
//   let owner_address = asset?.top_ownerships[0]?.owner?.address
// //   console.log(asset?.top_ownerships[0]?.owner?.address)
//   let result = await sales?.filter((a) => {
//         if(a?.maker?.address == owner_address) {
//             return a
//         }
//     })
//     // console.log(result)
//     if(result?.length>0) {
//         isListed = true
//     } else {
//         isListed = false
//     }
//     console.log("isListed : ",isListed)

let d = new Date();
// console.log(d)

  const dataEmbed = {
	color: 0x4df85f,
	title: '',
	description: `**Movin Frens #${token_id} is won the raffle!**`,
	thumbnail: {
		url: `https://ipfs.io/ipfs/QmZUr8iaH9aqg1ofTLu65FjWGSeXVE1d2WSc7wUJG4qdyk/${token_id}.gif`,
	},
	fields: [
        {
			name: `\u200b`,
			value: `[**__View On Opensea__**](https://opensea.io/assets/ethereum/0x5b80a9383ea914ad8eed822a5db1bd330baf2f6b/${token_id})`,
			inline: false
		}
	],
	timestamp: d.toISOString(),
    // image:{
    // url:`https://ipfs.io/ipfs/QmZUr8iaH9aqg1ofTLu65FjWGSeXVE1d2WSc7wUJG4qdyk/${token_id}.gif`,
    // }
	// footer: {
	// 	text: timePlaced,
	// 	icon_url: 'https://www.movinfrens.com/images/team/ak.gif',
	// },
};
return dataEmbed
}

module.exports = {raffleEmbed}