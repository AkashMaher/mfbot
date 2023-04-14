const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('raffle')
		.setDescription('raffle and announce the winner!'),
	async execute(interaction) {
		// await interaction.reply('Pong!');
	},
};