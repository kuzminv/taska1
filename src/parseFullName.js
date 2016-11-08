export default function parseFullName(fullName) {
  const nameRe = new RegExp('^[a-zа-яàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.\'-]+$', 'i');
  if (fullName.match(nameRe)) {
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
