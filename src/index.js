import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.get('/', (req, res) => {
  res.json({
    hello: 'JS World',
  });
});

function nameNormalize(str) {
  let result = str.
    replace(/\s{2,}/ig, " ").
    replace(/([.!?]+)(?=\S)/ig, "$1 ").
    replace(/^\s/g, "").
    toLowerCase().
    replace(/^(.)|\s(.)/g, function ( $1 ) { return $1.toUpperCase ( );});
  return result;
}

function parseFullName(fullName) {
  const nameRe = new RegExp('^[a-zа-яàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.\'-]+$', 'i');
  const newFullName = fullName.match(nameRe);
  if (newFullName) {
    const fio = fullName.split(' ');
    if (fio.length == 3) {
      return fio[2] + ' ' + fio[0][0] + '. ' + fio[1][0] + '.';
    } else if (fio.length == 2) {
      return fio[1] + ' ' + fio[0][0] + '.';
    } else if (fio.length == 1) {
      return fio[0]
    } else {
      return 'Invalid fullname'
    }
  } else {
    return 'Invalid fullname';
  }
}

app.get('/task2b', (req, res) => {
  const name = req.query.fullname;
  res.send(parseFullName(nameNormalize(name)));
})

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
