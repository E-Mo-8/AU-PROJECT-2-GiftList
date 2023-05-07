const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  const name = 'Norman Block'; //check: Norman Block1
  const data = {
    giftTo: name,
  };

  const { data: giftTo } = await axios.post(`${serverUrl}/gift`, {
    body: JSON.stringify(data),
  });

  console.log({ giftTo });
}

main();