import express from 'express';
import cors from 'cors';
import canonize from './canonize';

const app = express();
app.use(cors());
app.get('/', (req, res) => {
  res.json({
    hello: 'JS World',
  });
});

app.get('/canonize', (req, res) => {
  const errorMessage = 'Invalid username';
  try {
    const nameParse = canonize(req.query.username);
    if (!nameParse) {
      return res.send(errorMessage);
    }
    res.send('@' + nameParse);
  } catch (e) {
    res.send(errorMessage);
  }
});
app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
