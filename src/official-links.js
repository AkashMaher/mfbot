
async function official_links(){
    return embedMsg();
}

async function embedMsg() {
    
    // let userAvatar = user.displayAvatarURL({ size: 1024, dynamic: true });
    const dataEmbed = {
	color: 0x4df85f,
	title: 'Official Links',
	// description: "",
	thumbnail: {
		url: 'https://www.movinfrens.com/images/team/ak.gif',
	},
	fields: [
        {
			name: `\u200b`,
			value: `**__Website__ : https://movinfrens.com**`,
			inline: false
		},
		{
			name: `\u200b`,
			value: `**__Twitter__** : [**@movinfrens**](https://twitter.com/movinfrens)`,
			inline: false
		},
     {
			name: `\u200b`,
			value: `**__Medium__** : [**@movinfrens**](https://www.medium.com/@movinfrens)`,
			inline: false
		},
    {
			name: `\u200b`,
			value: `**__Opensea__** : [**movinfrens**](https://opensea.io/collection/movinfrens)`,
			inline: false
		},
    {
			name: `\u200b`,
			value: `**__Smart Contract__** : [**Smart Contract**](https://etherscan.io/address/0x5b80a9383ea914ad8eed822a5db1bd330baf2f6b)`,
			inline: false
		},
    {
			name: `\u200b`,
			value: `**__MultiSig__** : [**Multi Sig**](https://app.safe.global/home?safe=eth:0xE90EE6D4aa63DDaA030F1Bd1F5Af20bd423a3534)`,
			inline: false
		},
		
		{
			name: '\u200b',
			value: '=========================',
			inline: false,
		},
        {
			name: '\u200b',
			value: '**_Team/Moderators Socials_**',
			inline: false,
		},
		{
			name: `\u200b`,
			value: `<a:amos:1086023311143743639> <@382505654998401024> : [**@arfarfans**](https://twitter.com/arfarfans)`,
			inline: false
		},
		{
			name: `\u200b`,
			value: `<a:mekanik:1086023385504555038> <@711214015551897640> : [**@cryptomekanik**](https://twitter.com/cryptomekanik)`,
			inline: false
		},
		{
			name: `\u200b`,
			value: `<a:kat:1086023368857358356> <@273658836458668033> : [**@jpegkat**](https://twitter.com/jpegkat)`,
			inline: false
		},
        {
			name: `\u200b`,
			value: `<a:geoastra:1086023358463889488> <@704065488161865738> : [**@geoastramusic**](https://twitter.com/geoastramusic)`,
			inline: false
		},
		// {
		// 	name: `\u200b`,
		// 	value: `<@981585292026859550> : https://twitter.com/mikehhh14`,
		// 	inline: false
		// },
		{
			name: `\u200b`,
			value: `<a:sealsenpai:1086023445688627220> <@539444131051601948> : [**@seal_megalodon**](https://twitter.com/seal_megalodon)`,
			inline: false
		},
		// {
		// 	name: `\u200b`,
		// 	value: `<@964835755723743272> : https://twitter.com/cryptoempire11`,
		// 	inline: false
		// },
		{
			name: `\u200b`,
			value: `<a:zack:1086023473807237120> <@898314244477583360> : [**@nftzakcrypto**](https://twitter.com/nftzakcrypto)`,
			inline: false
		},
    {
			name: `\u200b`,
			value: `<a:ak:1086023303728201808> <@783030521755730022> : [**@akashmaher20**](https://twitter.com/akashmaher20)`,
			inline: false
		},
    {
			name: `\u200b`,
			value: `<a:0xp:1086020950581059604> <@871878238522179676> : [**@ph03nxx**](https://twitter.com/ph03nxx)`,
			inline: false
		},
	],
	// timestamp: new Date().toISOString(),
	footer: {
		text: "We Will Never Direct Message You",
		icon_url: 'https://www.movinfrens.com/images/team/ak.gif',
	},
};
return dataEmbed
}

module.exports = {official_links}