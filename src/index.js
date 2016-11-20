import express from 'express';
import cors from 'cors';
import PcModel from './models/Pc';

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.json({
    hello: 'JS World',
  });
});

const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';
let pc = {};
fetch(pcUrl)
    .then(async (res) => {
        pc = await res.json();
    })
    .catch(err => {
        console.log('Чтото пошло не так:', err);
    });

app.get('/task3A/volumes', async(req, res) => {

    const pcModel = new PcModel(pc);
    res.json(pcModel.volumes());

});

app.get('/task3A*', async(req, res) => {

    const modelPath = req.params[0];
    if (!modelPath) {
        res.sendStatus(404);
    };

    const pcModel = new PcModel(pc);
    const property = pcModel.findProperty(modelPath);
    if (property === undefined) {
        res.sendStatus(404);
    };
    res.json(property);

});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
