const mongoService = require("./mongo-service");
const ObjectId = require("mongodb").ObjectId;

module.exports = {
  getById,
  update,
  add,
};

function getById(gameId) {
  gameId = new ObjectId(gameId);
  return mongoService.connectToDB().then((dbConn) => {
    const gamesCollection = dbConn.collection("games");
    return gamesCollection.findOne({ _id: gameId });
  });
}

function update(game) {
  const gameId = new ObjectId(game._id);
  delete game._id;
  return mongoService.connectToDB().then((dbConn) => {
    const gamesCollection = dbConn.collection("games");
    return gamesCollection.findOneAndReplace({ _id: gameId }, game, { "returnNewDocument": true });
  });
}

function add(game) {
  return mongoService.connectToDB().then((dbConn) => {
    const gamesCollection = dbConn.collection("games");
    return gamesCollection.insertOne(game);
  });
}
