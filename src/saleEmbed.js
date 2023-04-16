const axios = require("axios")
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


async function saleEmbed(...sale) {
const asset = sale[0]
const tokenId = asset?.asset?.token_id
const options = {
  method: 'GET',
  url: `https://api.opensea.io/api/v1/asset/0x5b80a9383ea914ad8eed822a5db1bd330baf2f6b/${tokenId}`,
  headers: {'X-API-KEY': ''}
};

const response = await axios.request(options)
const rank = response?.data?.rarity_data?.rank
//   console.log(asset)
// console.log(`${asset?.transaction?.timestamp}.000Z`)
let d = new Date(`${asset?.transaction?.timestamp}.000Z`);
// console.log(d)

  const dataEmbed = {
	color: 0x4df85f,
	title: '',
	description: `[**${asset?.asset?.name} Sold!**](https://opensea.io/assets/ethereum/0x5b80a9383ea914ad8eed822a5db1bd330baf2f6b/${asset?.asset?.token_id})\n**Rarity Rank: ${rank}**\n
    **Price: ${(parseInt(asset?.total_price)/(1000000000000000000)).toFixed(4)} ${asset?.payment_token?.symbol}** | $${((parseInt(asset?.total_price)/(1000000000000000000))*(parseInt(asset?.payment_token?.usd_price))).toFixed(2)} USD`,
	thumbnail: {
		url: asset?.asset?.image_url,
	},
	fields: [
        {
			name: `Buyer`,
			value: `[${asset?.winner_account?.user?.username?asset?.winner_account?.user?.username:shortenString(asset?.winner_account?.address,4,4)}](https://opensea.io/${asset?.winner_account?.address})`,
			inline: true
		},
		{
			name: `Seller`,
			value: `[${asset?.seller?.user?.username?asset?.seller?.user?.username:shortenString(asset?.seller?.address,4,4)}](https://opensea.io/${asset?.seller?.address})`,
			inline: true
		},
     {
			name: `Txn`,
			value: `[${shortenString(asset?.transaction?.transaction_hash,4,4)}](https://etherscan.io/tx/${asset?.transaction?.transaction_hash})`,
			inline: true
		}
	],
	timestamp: d.toISOString(),
	// footer: {
	// 	text: timePlaced,
	// 	icon_url: 'https://www.movinfrens.com/images/team/ak.gif',
	// },
};
return dataEmbed
}

module.exports = {saleEmbed}