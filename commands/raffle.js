const { SlashCommandBuilder } = require('discord.js');
const { checkIfAccess, randomPicker } = require('../src/utils');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('raffle')
		.setDescription('raffle and announce the winner!'),
	async execute(interaction) {
		await raffle(interaction);
	},
};

async function raffle(interaction) {
	const isAllowed = await checkIfAccess(interaction)

	if (isAllowed) {
		let winningNumber = await randomPicker(62, 1511)
		await interaction.deferReply({ content: 'Raffling winner...' })
		const result = await raffleEmbed(winningNumber)
		return await interaction.editReply({ embeds: [result] })
	} else {
		await interaction.reply({ content: 'Access Denied', ephemeral: true })
	}
}


async function raffleEmbed(token_id) {

	let d = new Date();

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
	};
	return dataEmbed
}