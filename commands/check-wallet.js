const { SlashCommandBuilder } = require('discord.js');
const { checkIfAccess } = require('../src/utils');
const { checkWallet } = require('../src/dbFunctions')


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
		await checkUserWallet(interaction);
	},
};

async function checkUserWallet(interaction) {
	const isAllowed = await checkIfAccess(interaction)
	if (isAllowed || interaction.user.id == '273658836458668033' || interaction.user.id == '382505654998401024'
		|| interaction.channel.id == "1049577209683251218") {

		const id = interaction?.options?._hoistedOptions?.[0]?.value
		await interaction.reply({ content: "Checking Wallet...", ephemeral: true })
		const checker = await checkWallet(id)
		const res = checker.message ? `User's Wallet Address: \`\`\`${checker?.data?.user_name}\n${checker?.data?.wallet_address}\`\`\`` : `User have not submitted wallet address yet`
		await interaction.editReply({ content: res, ephemeral: true });
	} else {
		await interaction.reply({ content: 'Access Denied', ephemeral: true })
	}
}