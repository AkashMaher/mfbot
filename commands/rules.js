const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rules')
		.setDescription('rules!'),
	async execute(interaction) {
		// await interaction.reply('Pong!');
	},
};