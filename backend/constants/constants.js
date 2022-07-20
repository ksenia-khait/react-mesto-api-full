const regExLink = /http(s?):\/\/(www\.)?[0-9a-zA-Z-]+\.[a-zA-Z]+([0-9a-zA-Z-._~:?#[\]@!$&'()*+,;=]+)/;
const regExEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const allowedCors = [
  'https://mesto-ksenia.students.nomoredomains.xyz',
  'http://mesto-ksenia.students.nomoredomains.xyz',
  'http://localhost:3000',
  'http://localhost:3001',
];

module.exports = {
  regExLink,
  regExEmail,
  allowedCors,
};
