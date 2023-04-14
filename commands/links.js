const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('links')
		.setDescription('official links!'),
	async execute(interaction) {
		// await interaction.reply('Pong!');
	},
};