
async function ogBtn(OGRole){
    return embedMsg(OGRole);
}

async function embedMsg(OGRole) {
    
    // let userAvatar = user.displayAvatarURL({ size: 1024, dynamic: true });
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
  // image:{
  //   url:'https://i.imgur.com/xHLOSqU.png'
  // },
	// timestamp: new Date().toISOString(),
	footer: {
		text: "Movin Frens",
		icon_url: 'https://www.movinfrens.com/images/team/ak.gif',
	},
};
return dataEmbed
}


module.exports = {ogBtn}