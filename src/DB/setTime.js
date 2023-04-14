const MongoClient = require("mongodb").MongoClient;
const mongourl = process.env['mongodb']
const mongoClient = new MongoClient(mongourl);

async function setLastSaleTime(time){
    let result = await mongoClient.connect();
    let db = result.db("mf");
    let collection = db.collection('time');
    
    let data = await collection.findOne({number:1});
    if(!data){
        await collection.insertOne({number:1,time:time})
        data = await collection.findOne({number:1});
    } else {
      await collection.findOneAndUpdate({ number:1 },{$set:{time:time}})
    }
    
    data = await collection.findOne({ number:1 });
    return data?.time;
}

async function getLastSaleTime(){
    let result = await mongoClient.connect();
    let db = result.db("mf");
    let collection = db.collection('time');
    
    let data = await collection.findOne({number:1});
    return data?.time
}

module.exports = {setLastSaleTime,getLastSaleTime}
