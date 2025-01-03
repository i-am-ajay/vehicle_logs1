const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;
let index = 0;
app.use(express.static('static'));
let latLngArray = [{"pos":{"lat":1,"lang":1}},{"pos":{"lat":2,"lang":2}},
{"pos":{"lat":3,"lang":3}},{"pos":{"lat":4,"lang":4}}]

function setArray(array){
  latLngArray = array
}
function jsonLogs(iteration){
  result = [{
    "AIS":{
        "MMSI":227441980,
        "TIMESTAMP":getCurrentTimestamp(),
        "LATITUDE":46.1459,
        "LONGITUDE":-1.16631,
        "COURSE":360.0,
        "SPEED":0.0,
        "HEADING":511,
        "NAVSTAT":1,
        "IMO":0,
        "NAME":"CLEMENTINE",
        "CALLSIGN":"FJVK",
        "TYPE":60,
        "A":0,
        "B":0,
        "C":0,
        "D":0,
        "DRAUGHT":0.0,
        "DESTINATION":"",
        "LOCODE": null,
        "ETA_AIS":"00-00 00:00",
        "ETA":"",
        "SRC":"TER",
        "ZONE": "North Pacific Ocean",
        "ECA": false,
        "DISTANCE_REMAINING": null,
        "ETA_PREDICTED": null
        }}]
result[0]["AIS"]["LATITUDE"] = latLngArray[index].pos.lat
result[0]["AIS"]["LONGITUDE"] = latLngArray[index].pos.lang
return result
}

function getCurrentTimestamp() {
  let now = new Date();

  let year = now.getUTCFullYear();
  let month = String(now.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  let day = String(now.getUTCDate()).padStart(2, '0');
  let hours = String(now.getUTCHours()).padStart(2, '0');
  let minutes = String(now.getUTCMinutes()).padStart(2, '0');
  let seconds = String(now.getUTCSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} UTC`;
}

app.get("/vessle",(req,res)=>{
  console.log(jsonLogs()[0])
  res.json(jsonLogs(index))
  if(index < 3){
    index++;
  }
  
});

app.get("/vessle/reset",(req,res)=>{
  index = 0
  res.send("Index is restted to 0")
})
app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.get("/vessle/setArray",(req,res)=>{
  array = req.query.array
  latLngArray = array
  console.log(latLngArray)
  res.send("Array set")
})

app.get("/vessle/empty",(req,res) =>{
  res.json([{"ASI":null}])
})

app.get("/vessle/positionArray",(req,res)=>{
  res.json(latLngArray)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
