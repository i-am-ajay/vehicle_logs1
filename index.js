const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;
let index = 0;
app.use(express.static('static'));

function jsonLogs(iteration){
  latLngArray = [{"pos":{"lat":1,"lang":1}},{"pos":{"lat":2,"lang":2}},
  {"pos":{"lat":3,"lang":3}},{"pos":{"lat":4,"lang":4}}]
  result = {
    "AIS":{
        "MMSI":227441980,
        "TIMESTAMP":"2017-08-11 11:17:37 UTC",
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
        }}
result["AIS"]["LATITUDE"] = latLngArray[index].pos.lat
result["AIS"]["LONGITUDE"] = latLngArray[index].pos.lang
return result
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
