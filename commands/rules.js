const { SlashCommandBuilder } = require('discord.js');

const { checkIfAccess } = require('../src/utils');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rules')
		.setDescription('rules!'),
	async execute(interaction) {
		// await interaction.reply('Pong!');
		await rules(interaction);
	},
};


async function rules(interaction) {
	const isAllowed = await checkIfAccess(interaction)
	if (isAllowed) {
		const rule = await ruleEmbed();
		const messageId = '1081192929802072064';
		const channelId = '1049577209469345826'
		const client = interaction.client;
		const message = await client.channels.cache.get(channelId).messages.fetch(messageId);
		await message.edit({ embeds: [rule] })
		return interaction.reply({ content: 'updated', ephemeral: true })
	} return interaction.reply({ content: '<#1049577209469345826>', ephemeral: true });
}



async function ruleEmbed() {

	const dataEmbed = {
		color: 0x4df85f,
		title: '__Rules__',
		description: `**By entering this Discord, you agree to abide by all the rules below.**\n
**Before proceeding, please read all of <#1080694927090008094>**\n
    \`\`\`fix\n${`1) Treat everyone with respect. Absolutely no harassment, witch hunting, sexism, racism, or hate speech will be tolerated.\n
2) No spam or self-promotion. This includes DMing fellow members.\n
3) If you see something against the rules or something that makes you feel unsafe, let staff know. We want this server to be a welcoming space!\n
4) No NSFW or obscene content. This includes text, images, or links.\n
5) You may not impersonate individuals, groups, or organizations in a manner that misleads, confuses, or deceives others.\n
6) Shilling in any channel will result in an instant ban.\n
・By reacting and verifying, you agree that your safety is your own responsibility.\n
・We will not do any stealth mints.\n
・Turn off your DMs, staff will NEVER DM first.\n
・We are not liable for any damages or consequences.`}\`\`\` 
      `,
		footer: {
			text: "Breaching any of the rules above will result in an instant ban from the server.",
			icon_url: 'https://www.movinfrens.com/images/team/ak.gif',
		},
	};
	return dataEmbed
}