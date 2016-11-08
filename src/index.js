import express from 'express';
import cors from 'cors';
import nameNormalize from './nameNormalize';
import parseFullName from './parseFullName';

const app = express();
app.use(cors());
app.get('/', (req, res) => {
  res.json({
    hello: 'JS World',
  });
});

app.get('/task2A', (req, res) => {
  const sum = (+req.query.a || 0) + (+req.query.b || 0);
  res.send(sum.toString());
});

app.get('/task2B', (req, res) => {
  const name = req.query.fullname;
  res.send(parseFullName(nameNormalize(name)));
})

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
