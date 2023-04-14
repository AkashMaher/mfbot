
async function rules(){
    return embedMsg();
}

async function embedMsg() {
    
    // let userAvatar = user.displayAvatarURL({ size: 1024, dynamic: true });
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
	// thumbnail: {
	// 	url: 'https://www.movinfrens.com/images/team/ak.gif',
	// },
// 	fields: [
//     {
// 			name: '\u200b',
// 			value: '**Before proceeding, please read all of <#1080694927090008094>**',
// 			inline: false,
// 		},
//         {
// 			name: `\u200b`,
// 			value: `\n\`\`\`fix\n${"Treat everyone with respect. Absolutely no harassment, witch hunting, sexism, racism, or hate speech will be tolerated."}\`\`\` \n
//    `,
// 			inline: false
// 		},
// 		{
// 			name: `\u200b`,
// 			value: `\n\`\`\`fix\n${"No spam or self-promotion. This includes DMing fellow members."}\`\`\` \n
//         `,
// 			inline: false
// 		},
		
// 		{
// 			name: '\u200b',
// 			value: `\n\`\`\`fix\n${"If you see something against the rules or something that makes you feel unsafe, let staff know. We want this server to be a welcoming space!"}\`\`\` \n
//     `,
// 			inline: false,
// 		},
//         {
// 			name: '\u200b',
// 			value: `\n\`\`\`fix\n${"No NSFW or obscene content. This includes text, images, or links."}\`\`\` \n
//    `,
// 			inline: false,
// 		},
// 		{
// 			name: `\u200b`,
// 			value: `\n\`\`\`fix\n${"You may not impersonate individuals, groups, or organizations in a manner that misleads, confuses, or deceives others."}\`\`\` \n
//    `,
// 			inline: false
// 		},
// 		{
// 			name: `\u200b`,
// 			value: `\n\`\`\`fix\n${"Shilling in any channel will result in an instant ban"}\`\`\` \n
// `,
// 			inline: false
// 		},
// // 		{
// // 			name: `\u200b`,
// // 			value: `\n\`\`\`fix\n${"Breaching any of the rules above will result in an instant ban from the server."}\`\`\` \n
// // `,
// // 			inline: false
// // 		},
//     {
// 			name: `\u200b`,
// 			value: `\n\`\`\`fix\n${"・By reacting and verifying, you agree that your safety is your own responsibility.\n・We will not do any stealth mints.\n・Turn off your DMs, staff will NEVER DM first.\n・We are not liable for any damages or consequences."}\`\`\` \n
// `,
// 			inline: false
// 		}
// 	],
  // image:{
  //   url:'https://i.imgur.com/xHLOSqU.png'
  // },
	// timestamp: new Date().toISOString(),
	footer: {
		text: "Breaching any of the rules above will result in an instant ban from the server.",
		icon_url: 'https://www.movinfrens.com/images/team/ak.gif',
	},
};
return dataEmbed
}

module.exports = {rules}