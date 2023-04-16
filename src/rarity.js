const axios = require('axios')

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
async function rarityEmbed(token_id) {

    
    // const response = await axios.get(`https://api.opensea.io/api/v1/asset/0x5b80a9383ea914ad8eed822a5db1bd330baf2f6b/${token_id}`)

    // console.log(response?.data)

    const axios = require('axios');

const options = {
  method: 'GET',
  url: `https://api.opensea.io/api/v1/asset/0x5b80a9383ea914ad8eed822a5db1bd330baf2f6b/${token_id}`,
  headers: {'X-API-KEY': ''}
};

const response = await axios.request(options)
// console.log(response?.data)
const nftInfo = response?.data

let d = new Date();

let traits = []
let tt = nftInfo?.traits
for(let i = 0;i<tt?.length;i++){
    let trait = {
        name:`${tt[i]?.trait_type}`,
        value:`${tt[i]?.value}`
    }
    await traits?.push(trait)
}

const ownerUsername = nftInfo?.top_ownerships[0]?.owner?.user?.username

// console.log(d)


  const dataEmbed = {
	color: 0x4df85f,
	title: nftInfo?.name,
	description: `**Rarity Rank #${nftInfo?.rarity_data?.rank}**\n**Owner :** [**__${ownerUsername? ownerUsername:shortenString(nftInfo?.top_ownerships[0]?.owner?.address,4,4)}__**](https://opensea.io/${nftInfo?.top_ownerships[0]?.owner?.address})`,
	thumbnail: {
		url: `${token_id==5?`https://ipfs.io/ipfs/QmZUr8iaH9aqg1ofTLu65FjWGSeXVE1d2WSc7wUJG4qdyk/${token_id}.gif`:nftInfo?.image_url}`,
	},
	fields: [
        // {
		// 	name: `\u200b`,
		// 	value: `Owner : [**__${ownerUsername? ownerUsername:shortenString(nftInfo?.top_ownerships[0]?.owner?.address,4,4)}__**](https://opensea.io/${nftInfo?.top_ownerships[0]?.owner?.address})`,
		// 	inline: false
		// },
        {
			name: `\u200b`,
			value: `**Traits**`,
			inline: false
		}, ...traits,
        {
			name: `\u200b`,
			value: `[**__View On Opensea__**](https://opensea.io/assets/ethereum/0x5b80a9383ea914ad8eed822a5db1bd330baf2f6b/${token_id})`,
			inline: false
		}

	],
	timestamp: d.toISOString(),
    image:{
    url:`${token_id==5?`https://ipfs.io/ipfs/QmZUr8iaH9aqg1ofTLu65FjWGSeXVE1d2WSc7wUJG4qdyk/${token_id}.gif`:nftInfo?.image_url}`,
    }
	// footer: {
	// 	text: timePlaced,
	// 	icon_url: 'https://www.movinfrens.com/images/team/ak.gif',
	// },
};
return dataEmbed
}

module.exports = {rarityEmbed}