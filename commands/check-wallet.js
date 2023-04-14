const { SlashCommandBuilder } = require('discord.js');



module.exports = {
	data: new SlashCommandBuilder()
		.setName('check-wallet')
		.setDescription('check users wallet!')
		.addUserOption(option =>
            option.setName('select_user')
                .setDescription('select user')
                .setRequired(true)
                
        ),
	async execute(interaction) {
		await interaction.reply({content:'check wallet', ephemeral:true});
	},
};