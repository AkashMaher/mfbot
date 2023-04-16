const { SlashCommandBuilder } = require('discord.js');



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
		await interaction.reply({content:'NFT Rarity', ephemeral:true});
	},
};