const { SlashCommandBuilder } = require('discord.js');
const { getNftInfo } = require('../src/osFunctions');
const { shortenString } = require('../src/utils');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('rarity')
		.setDescription('Get rarity of nft!')
		.addIntegerOption(option =>
			option.setName('token_id')
				.setDescription('Enter Token Id')
				.setRequired(true)

		),
	async execute(interaction) {
		await rarity(interaction);
	},
};

async function rarity(interaction) {
	const token_id = interaction?.options?._hoistedOptions?.[0]?.value;
	if (token_id <= 0 || token_id > 1511) return await interaction.reply({ content: 'invalid token id', ephemeral: true })
	await interaction.deferReply({ content: 'Fetching details', ephemeral: false })
	let res = await rarityEmbed(token_id);
	if (!res) return await interaction.editReply({ content: 'invalid token id', ephemeral: true })
	await interaction.editReply({ embeds: [res], ephemeral: false })
}


async function rarityEmbed(token_id) {
	try {
		const nftInfo = await getNftInfo(token_id)

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
		};
		return dataEmbed;
	} catch (error) {
		console.error(error);
		return null;
	}
}