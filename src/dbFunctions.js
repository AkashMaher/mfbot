const { MongoClient } = require("mongodb");

const mongourl = process.env['mongodb']
const client = new MongoClient(mongourl, { useNewUrlParser: true, useUnifiedTopology: true });

async function connect() {
    // console.log("Client keys", client?.topology?.s?.state);
    if (client?.topology?.s?.state !== "connected") {
        await client.connect();
        console.log("Connected to MongoDB");
    }
}

async function getMongoClient() {
    await connect();
    return client;
}

async function ogCount() {
    const db = (await getMongoClient()).db("mf");
    const collection = db.collection('og_wallets');
    return collection.countDocuments({});
}

async function submitWallet(user, response) {
    const db = (await getMongoClient()).db("mf");
    const collection = db.collection('og_wallets');

    let data = await collection.findOne({ user_id: user?.id });
    if (!data) {
        await collection.insertOne({ user_id: user.id, user_name: user.tag, wallet_address: response });
        data = await collection.findOne({ user_id: user.id });
    } else {
        await collection.updateOne({ user_id: user?.id }, { $set: { wallet_address: response } });
    }

    return data;
}

async function setLastSaleTime(time) {
    const db = (await getMongoClient()).db("mf");
    const collection = db.collection('time');

    let data = await collection.findOne({ number: 1 });
    if (!data) {
        await collection.insertOne({ number: 1, time: time });
    } else {
        await collection.updateOne({ number: 1 }, { $set: { time: time } });
    }

    return time;
}

async function getLastSaleTime() {
    const db = (await getMongoClient()).db("mf");
    const collection = db.collection('time');
    const data = await collection.findOne({ number: 1 });
    return data?.time;
}

async function checkWallet(userId) {
    const db = (await getMongoClient()).db("mf");
    const collection = db.collection('og_wallets');
    const data = await collection.findOne({ user_id: userId });
    return {
        message: !!data,
        data: data
    };
}


module.exports = {
    ogCount,
    submitWallet,
    setLastSaleTime,
    getLastSaleTime,
    checkWallet,
    getMongoClient
};
