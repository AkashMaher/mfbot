const { SlashCommandBuilder } = require('discord.js');
const { checkIfAccess } = require('../src/utils');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('faqs')
		.setDescription('faqs!'),
	async execute(interaction) {
		await faqs(interaction);
	},
};

async function faqs(interaction) {
	const client = interaction.client;
	const isAllowed = await checkIfAccess(interaction)
	if (!isAllowed) return interaction.reply({ content: '<#1080694927090008094>', ephemeral: true });
	const faq = await faqEmbed();
	const messageId = '1080859407455363122';
	const channelId = '1080694927090008094'
	const message = await client.channels.cache.get(channelId).messages.fetch(messageId);
	await message.edit({ embeds: [faq] })
	return interaction.reply({ content: 'updated', ephemeral: true })
}


async function faqEmbed() {

	const dataEmbed = {
		color: 0x4df85f,
		title: '__Frequently Asked Questions (FAQs)__',
		description: "",
		fields: [
			{
				name: `**Wen Mint?**`,
				value: `\n\`\`\`fix\n${"Whitelist: March 30th 12 PM EST\nPublic: March 30th 6 PM EST"}\`\`\` \n`,
				inline: false
			},
			{
				name: `**How much is the mint price?**`,
				value: `\n\`\`\`fix\n${"0.025 ETH"}\`\`\` \n`,
				inline: false
			},
			{
				name: `**How much is the total supply?**`,
				value: `\n\`\`\`fix\n${"5000 MF"}\`\`\` \n`,
				inline: false
			},
			{
				name: `**I'm an OG, when will I receive my airdrop?**`,
				value: `\n\`\`\`fix\n${"Approximately after the Whitelist Mint Phase ends, We will begin the Airdrop Phase. All OG’s who have submitted their address before March 30th, will be eligible for an airdrop."}\`\`\` \n`,
				inline: false
			},
			{
				name: '**Wen reveal?**',
				value: `\n\`\`\`fix\n${"24 hours after Public mint. Time may vary and it’s possible we may reveal Movin Frens earlier."}\`\`\` \n`,
				inline: false,
			},
			{
				name: '**What are our goals?**',
				value: `\n\`\`\`fix\n${"Through weekly NFT giveaways, We hope to provide an opportunity for all Movin Frens holders to join larger communities such as The Plague NFT."}\`\`\` \n`,
				inline: false,
			}
		],
		footer: {
			text: "You can ask us if you have any more questions",
			icon_url: 'https://www.movinfrens.com/images/team/ak.gif',
		},
	};
	return dataEmbed
}
