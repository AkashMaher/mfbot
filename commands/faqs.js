const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('faqs')
		.setDescription('faqs!'),
	async execute(interaction) {
		// await interaction.reply('Pong!');
	},
};