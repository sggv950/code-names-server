const express = require('express');
const app = express();
const http = require('http').createServer(app);
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const io = require('socket.io')(http);
const port = process.env.PORT || 5000;

const { createBoard } = require('./services/card-name-service');
const { getRandomKeywords } = require('./services/keywords-service');
const { getById, update, add } = require('./services/game-service');

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/client/build')));

app.post('/api/creategame', (req, res) => {
  const { keywords } = req.body;
  const newGame = createBoard(keywords);
  add(newGame).then(result => {
    res.json({ gameId: result.insertedId });
  });
});

app.get('/api/keywords', (req, res) => {
  const numOfKw = +req.query.num || 25;
  getRandomKeywords(numOfKw).then(kws => {
    res.json({ kws });
  });
});

//DEV FUNCTION
app.get('/api/gamedata/:id', (req, res) => {
  const id = req.params.id;
  getById(id).then(game => {
    res.json(game);
  });
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

io.on('connection', async socket => {
  console.log('a user connected');

  socket.on('disconnect', reason => {
    console.log('user disconnected');
  });

  socket.on('game', async data => {
    console.log('game join: ', data);
    socket.join(data.game);
    getById(data.game).then(game => {
      const gameStr = JSON.stringify(game);
      socket.emit('game updated', gameStr);
    });
  });

  socket.on('leave game', data => {
    console.log('leaving game');
    socket.leave(data.game);
  });

  socket.on('update game', async data => {
    console.log('game update: ', data);
    const gameState = JSON.parse(data.gameStateStr);
    update(gameState).then(res => {
      socket.broadcast
        .to(res.value._id)
        .emit('game updated', JSON.stringify(gameState));
    });
  });
});

http.listen(port, () => {
  console.log(`listening on *:${port}`);
});
