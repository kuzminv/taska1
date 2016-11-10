export default function canonoze(url) {
  const re = new RegExp('@?(https?:)?(\/\/)?((www.)?([а-яёa-z0-9])[^\/]*\/)?@?([a-zA-Z0-9._-]*)', 'i');
  const username = url.match(re);
  return username[6];
}
