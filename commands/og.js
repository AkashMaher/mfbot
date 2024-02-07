const { SlashCommandBuilder } = require('discord.js');
const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const { checkIfAccess, getOgRole } = require('../src/utils');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('og')
		.setDescription('og message!'),
	async execute(interaction) {
		await og(interaction);
	},
};

async function og(interaction) {
	const isAllowed = await checkIfAccess(interaction)
	if (isAllowed) {
		const ogRole = getOgRole()
		const ogRoleMsg = await ogEmbed(ogRole);
		const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('submit_wallet')
					.setLabel('Submit Wallet!')
					.setStyle(ButtonStyle.Primary),
			)
			.addComponents(
				new ButtonBuilder()
					.setCustomId('check_wallet')
					.setLabel('Check Wallet!')
					.setStyle(ButtonStyle.Primary),
			)
			;
		await interaction.channel.send({ embeds: [ogRoleMsg], components: [row] })
		return interaction.reply({ content: 'updated', ephemeral: true })
	} return interaction.reply({ content: '<#1049577209469345826>', ephemeral: true });
}



async function ogEmbed(OGRole) {
	const dataEmbed = {
		color: 0x4df85f,
		title: '__Movin Frens OG Wallet Submission__',
		description: `Click the buttons below to submit and check your wallet.`,
		thumbnail: {
			url: 'https://www.movinfrens.com/images/team/ak.gif',
		},
		fields: [
			{
				name: 'Roles Allowed to Submit',
				value: `<@&${OGRole}>`,
				inline: false,
			}
		],
		footer: {
			text: "Movin Frens",
			icon_url: 'https://www.movinfrens.com/images/team/ak.gif',
		},
	};
	return dataEmbed
}
