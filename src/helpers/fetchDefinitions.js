const axios = require("axios");
const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

/**
 * gets word definition data from freeDictionaryAPI
 * @param {string} word
 * @returns {object[]}
 */
async function fetchDefinitions(word) {
  const { data } = await axios.get(API_URL + word);
  const defData = {};
  data.forEach(({ meanings }) => {
    meanings.forEach(({ partOfSpeech, definitions }) => {
      if (!defData[partOfSpeech]) defData[partOfSpeech] = [];
      defData[partOfSpeech].push(
        ...definitions.map(({ definition, example }) => ({ definition, example }))
      );
    });
  });
  return defData;
}

module.exports = fetchDefinitions;