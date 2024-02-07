const axios = require('axios')
require('dotenv').config({ path: '.env' })
const oskey = process.env['OSKEY']
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
  try {



    const options = {
      method: 'GET',
      url: `https://api.opensea.io/api/v2/chain/ethereum/contract/0x5b80a9383ea914ad8eed822a5db1bd330baf2f6b/nfts/${token_id}`,
      headers: { 'X-API-KEY': oskey }
    };

    const response = await axios.request(options)
    const nftInfo = response?.data?.nft

    let d = new Date();

    let traits = []
    let tt = nftInfo?.traits
    for (let i = 0; i < tt?.length; i++) {
      let trait = {
        name: `${tt[i]?.trait_type}`,
        value: `${tt[i]?.value}`
      }
      await traits?.push(trait)
    }

    const owner = nftInfo?.owners?.[0]?.address

    // console.log(d)

    const image = token_id == 5 ? `https://ipfs.io/ipfs/QmZUr8iaH9aqg1ofTLu65FjWGSeXVE1d2WSc7wUJG4qdyk/${token_id}.gif` : nftInfo?.image_url

    const imageUrl = token_id == 5 ? nftInfo?.animation_url : image?.split('?')[0]


    const dataEmbed = {
      color: 0x4df85f,
      title: nftInfo?.name,
      description: `**Rarity Rank #${nftInfo?.rarity?.rank}**\n**Owner :** [**${shortenString(owner, 4, 4)}**](https://opensea.io/${owner})`,
      thumbnail: {
        url: `${image}`,
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
          value: `[**View On Opensea**](${nftInfo?.opensea_url})`,
          inline: false
        },
        {
          name: `\u200b`,
          value: `[**Download Gif**](${imageUrl})`,
          inline: false
        }

      ],
      timestamp: d.toISOString(),
      image: {
        url: `${image}`,
      }
      // footer: {
      // 	text: timePlaced,
      // 	icon_url: 'https://www.movinfrens.com/images/team/ak.gif',
      // },
    };
    return dataEmbed;
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = { rarityEmbed }