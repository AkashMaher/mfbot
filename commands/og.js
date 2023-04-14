const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('og')
		.setDescription('og message!'),
	async execute(interaction) {
		// await interaction.reply('Pong!');
	},
};