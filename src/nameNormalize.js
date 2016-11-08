export default function nameNormalize(str) {
  let result = str.
    replace(/\s{2,}/ig, " ").
    replace(/([.!?]+)(?=\S)/ig, "$1 ").
    replace(/^\s/g, "").
    toLowerCase().
    replace(/^(.)|\s(.)/g, function ( $1 ) { return $1.toUpperCase ( );});
  return result;
}
