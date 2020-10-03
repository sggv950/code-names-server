const axios = require('axios');
const { randomValsFromArray } = require('./utils');
const { FALLBACK_KEYWORDS } = require('./fallback-keywords');

const RANDOM_KW_URL =
  'http://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=5&maxLength=15';
const RANDOM_KW_API_KEY = 'a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';

async function getRandomKeywords(numOfKeywords) {
  try {
    const res = await axios.get(
      `${RANDOM_KW_URL}&limit=${numOfKeywords}&api_key=${RANDOM_KW_API_KEY}`
    );
      const kws = await res.data.map(k => k.word);
    return kws;
  } catch (e) {
    const data = randomValsFromArray(FALLBACK_KEYWORDS, numOfKeywords);
    return Promise.resolve(data);
  }
}

module.exports = {
  getRandomKeywords,
};
