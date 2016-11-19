import express from 'express';
import cors from 'cors';
import fetch from 'isomorphic-fetch';
const app = express();
app.use(cors());

const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';

async function getPath() {
  const data = await fetch(pcUrl);
  const pc = await data.json();
  return  pc;
}

app.get('/*', async(req, res) => {
  let url = req.url;
  let path = url.replace(/^\/|\/$/g, '');
  let pathArr = path.split('/');
  let pathArrLength = pathArr.length;
  let pc = await getPath();
  for (var i = 0; i != pathArrLength; i++){
    for(var key in pc){
      if(pathArr[i] === key){
        pc = pc[key];
        break;
      }
    }
  }
  if(key === pathArr[--i] || path === ''){
    res.send(JSON.stringify(pc));
    console.log(pc);
  }else if(path === 'volumes'){
    var volume = {
      "C:":"41943040B",
      "D:":"16777216B"
    }
    res.send(JSON.stringify(volume));
    console.log(volume);
  }else{
    res.status(404).send('Not Found');
  }
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
