export default function() {
  let locale = navigator.language.split("-");
  return locale > 0 ? locale[0] : "ko";
}
