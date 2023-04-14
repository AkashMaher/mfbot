const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ogcount')
		.setDescription('og counts!'),
	async execute(interaction) {
		// await interaction.reply('Pong!');
	},
};