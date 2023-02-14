const PORT = process.env.PORT || 6600
const axios = require('axios')
const express = require('express')
const cheerio = require('cheerio')

const app = express()
const sources = []

const urls = [
  {
    address: 'https://old.reddit.com/r/LaptopDeals/new/',
  },
]

urls.forEach((url) => {
  axios.get(url.address).then((response) => {
    const html = response.data
    const $ = cheerio.load(html)

    $('a:contains("$")', html).each(function () {
      const title = $(this).text()
      const url = $(this).attr('href')
      sources.push({
        title,
        url,
      })
    })
  })
})

app.get('/', function (req, res) {
  res.json(sources)
})

app.listen(PORT, () => console.log(`Server opened at PORT ${PORT}`))
