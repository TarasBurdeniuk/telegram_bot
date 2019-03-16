const {uri, dbName} = require('./config');

const MongoClient = require('mongodb').MongoClient;

exports.checkConnection = async () => {
    const connection = await MongoClient.connect(uri, {useNewUrlParser: true});
    console.log('connected');

    connection.close();
};

exports.getUser = async () => {
    let client = await MongoClient.connect(uri, {useNewUrlParser: true});
    console.log('connected successful');

    const currentDb = client.db(dbName);
    const usersCol = currentDb.collection('users');
    const users = await usersCol.find({}).toArray();
    client.close();
    return users;
};

exports.addUser = async (userId) => {
    let client = null;
    try {
        client = await MongoClient.connect(uri, {useNewUrlParser: true});
        const currentDb = client.db(dbName);
        const usersCol = currentDb.collection('users');

        const isNewUser = !((await usersCol.find({userId}).toArray()).length);

        if (isNewUser) {
            const addUser = await usersCol.insertOne({userId});
            console.log('new user added');
        } else {
            console.log('user already exist');
        }
        console.log(userId);
    } catch (e) {
        console.error(e);
    }
    client.close();
};