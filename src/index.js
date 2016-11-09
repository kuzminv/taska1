import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Promise from 'bluebird';
import bodyParser from 'body-parser';
import saveDataInDb from './saveDataInDb';
import Pet from './models/Pet';
import User from './models/User';

mongoose.Promise = Promise;
mongoose.connect('mongodb://publicdb.mgbeta.ru/kuzminv_skb3');

const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get('/users', async (req, res) => {
  const users = await User.find();
  return res.json(users);
});
app.get('/pets', async (req, res) => {
  const pets = await Pet.find().populate('owner');
  return res.json(pets);
});
app.post('/data', async (req, res) => {
  const data = req.body;
  // console.log(data);
  return res.json(await saveDataInDb(data));










  // return res.json(data);




  // console.log(data);
  // return res.json({
  //   data,
  // });

  // const data = {
  //   user: {
  //     name: 'kuzminv2',
  //   },
  //   pets: [
  //     {
  //       name: 'Zildjian2',
  //       type: 'cat',
  //     },
  //     {
  //       name: 'Doge2',
  //       type: 'dog',
  //     },
  //   ],
  // };



});



app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
