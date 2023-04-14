const MongoClient = require("mongodb").MongoClient;
const mongourl = process.env['mongodb']
const mongoClient = new MongoClient(mongourl);

async function check(user){
    let result = await mongoClient.connect();
    let db = result.db("mf");
    let collection = db.collection('og_wallets');
    
    let data = await collection.findOne({ user_id: user?.id });
    if(!data){
        return {
          message:false
        }
    }
    return {
      message:true,
      data:data
    }
}

module.exports = {check}
