const { SlashCommandBuilder } = require('discord.js');
const { checkIfAccess } = require('../src/utils');
const { ogCount } = require('../src/dbFunctions')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ogcount')
		.setDescription('og counts!'),
	async execute(interaction) {
		await ogcount(interaction);
	},
};

async function ogcount(interaction) {
	const isAllowed = await checkIfAccess(interaction)
	if (isAllowed) {
		let count = await ogCount();
		await interaction.reply({ content: `Total OG Wallets Submitted: ${count}`, ephemeral: true })
	} else {
		await interaction.reply({ content: 'Access Denied', ephemeral: true })
	}
}