const MongoClient = require("mongodb").MongoClient;
const mongourl = process.env['mongodb']
const mongoClient = new MongoClient(mongourl);

async function submit(user,response){
    let result = await mongoClient.connect();
    let db = result.db("mf");
    let collection = db.collection('og_wallets');
    
    let data = await collection.findOne({ user_id: user?.id });
    if(!data){
        await collection.insertOne({user_id:user.id,user_name:user.tag, wallet_address:response})
        data = await collection.findOne({ user_id: user.id });
    } else {
      await collection.findOneAndUpdate({ user_id: user?.id },{$set:{wallet_address:(response)}})
    }
    
    data = await collection.findOne({ user_id: user.id });
    return data;
}

// async function embedMsgTask(data) {
    
//     const dataEmbed = {
// 	color: 0x00ffef,
// 	title: 'Wallet Submitted',
// 	description: `${data?.user_name}`,
// 	thumbnail: {
// 		url: 'https://www.movinfrens.com/images/team/ak.gif',
// 	},
// 	fields: [
    
// 		{
// 			name: 'Your Wallet Address',
// 			value: `${data.wallet_address}`,
// 			inline: true,
// 		}
// 	],
// 	timestamp: new Date().toISOString(),
// 	footer: {
// 		text: data.user_name,
// 		icon_url: 'https://www.movinfrens.com/images/team/ak.gif',
// 	},
// };
// return dataEmbed;
// }

module.exports = {submit}
