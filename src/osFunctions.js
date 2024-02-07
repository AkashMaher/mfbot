const axios = require('axios')
require('dotenv').config({ path: '.env' })
const oskey = process.env['OSKEY']


async function getNftInfo(token_id) {
    try {
        const options = {
            method: 'GET',
            url: `https://api.opensea.io/api/v2/chain/ethereum/contract/0x5b80a9383ea914ad8eed822a5db1bd330baf2f6b/nfts/${token_id}`,
            headers: { 'X-API-KEY': oskey }
        };

        const response = await axios.request(options)
        return response?.data?.nft
    } catch (error) {
        console.error(error)
        return null
    }
}




async function saleEmbed(...sale) {
    try {
        const asset = sale[0]
        const tokenId = asset?.nft?.identifier

        const nftInfo = await getNftInfo(tokenId)

        let d = new Date(asset?.event_timestamp * 1000);
        console.log(asset?.event_timestamp, d.toISOString())

        const dataEmbed = {
            color: 0x4df85f,
            title: '',
            description: `[**${asset?.nft?.name} Sold!**](${nftInfo?.opensea_url})
		\n**Rarity Rank: ${nftInfo?.rarity?.rank}**
		\n**Price: ${(parseInt(asset?.payment?.quantity) / (1000000000000000000)).toFixed(4)} ${asset?.payment?.symbol}**`,
            thumbnail: {
                url: asset?.nft?.image_url,
            },
            fields: [
                {
                    name: `Buyer`,
                    value: `[${shortenString(asset?.buyer, 4, 4)}](https://opensea.io/${asset?.buyer})`,
                    inline: true
                },
                {
                    name: `Seller`,
                    value: `[${shortenString(asset?.seller, 4, 4)}](https://opensea.io/${asset?.seller})`,
                    inline: true
                },
                {
                    name: `Txn`,
                    value: `[${shortenString(asset?.transaction, 4, 4)}](https://etherscan.io/tx/${asset?.transaction?.transaction_hash})`,
                    inline: true
                }
            ],
            timestamp: d.toISOString()
        };
        return dataEmbed
    } catch (error) {
        console.error(error)
        return null
    }
}

module.exports = { getNftInfo, saleEmbed }