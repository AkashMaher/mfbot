const { SlashCommandBuilder } = require('discord.js');



module.exports = {
	data: new SlashCommandBuilder()
		.setName('add-wallet')
		.setDescription('add users wallet address!')
		.addUserOption(option =>
            option.setName('select_user')
                .setDescription('select user')
                .setRequired(true)
                
        )
    .addStringOption(option =>
            option.setName('wallet_address')
                .setDescription('User wallet address')
                .setRequired(true)
                
        ),
  
	async execute(interaction) {
		await interaction.reply({content:'add address', ephemeral:true});
	},
};