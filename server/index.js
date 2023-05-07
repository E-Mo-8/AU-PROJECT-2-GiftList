const express = require('express');
const verifyProof = require('../utils/verifyProof');
const MerkleTree = require('../utils/MerkleTree');
const niceList = require('../utils/niceList.json');

const port = 1225;

const app = express();
app.use(express.json());

app.post('/gift', (req, res) => {

  const bodyObj = req.body;
  const jsonObj = JSON.parse(JSON.stringify(bodyObj));
  const dataObj = JSON.parse(jsonObj.body).giftTo;

  const treeObj = new MerkleTree(niceList);
  const rootObj = treeObj.getRoot();

  const indexObj = niceList.findIndex(n => n === dataObj);
  
  const proofObj = treeObj.getProof(indexObj);

  const isInTheList = verifyProof(proofObj,dataObj,rootObj);

  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
