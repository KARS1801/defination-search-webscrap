var bodyParser = require('body-parser')
const axios = require("axios");
const cheerio = require("cheerio");
const express = require('express')
const path = require("path");
const port = 3000;

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



async function fetchData(searchstring){
    //console.log(searchstring)
   const siteUrl = "https://en.wikipedia.org/wiki/" + searchstring;
   //console.log(siteUrl);
   const req = await axios.get(siteUrl);
   const $ = await cheerio.load(req.data);
   //const result = await $('p[class="mw-empty-elt"]').first().next().text();
   const result = await $('div[class="shortdescription nomobile noexcerpt noprint searchaux"]').text();
   //console.log(result);
   return result;
   //shortdescription nomobile noexcerpt noprint searchaux
  
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.post('/getdata',async (request, response) => {
    //console.log("api called");
    const { searchstring } = request.body;
    //console.log(searchstring);
    const result =  await fetchData(searchstring);
    //console.log("yo");
    //console.log(result);
    response.send(result);
})


app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })


