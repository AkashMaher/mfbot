const MongoClient = require("mongodb").MongoClient;
const mongourl = process.env['mongodb']
const mongoClient = new MongoClient(mongourl);

async function ogCount(){
    let result = await mongoClient.connect();
    let db = result.db("mf");
    let collection = db.collection('og_wallets').countDocuments({});

  return collection;
}

module.exports = {ogCount}