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
  {
    address:
      'https://old.reddit.com/r/LaptopDeals/new/?count=25&after=t3_s30zwj',
  },
  {
    address:
      'https://old.reddit.com/r/LaptopDeals/new/?count=50&after=t3_s1s0pl',
  },
  {
    address:
      'https://old.reddit.com/r/LaptopDeals/new/?count=75&after=t3_s0de14',
  },
  {
    address:
      'https://old.reddit.com/r/LaptopDeals/new/?count=100&after=t3_rz7xco',
  },
  {
    address:
      'https://old.reddit.com/r/LaptopDeals/new/?count=125&after=t3_rxhehi',
  },
  {
    address:
      'https://old.reddit.com/r/LaptopDeals/new/?count=150&after=t3_rvx44h',
  },
  {
    address:
      'https://old.reddit.com/r/LaptopDeals/new/?count=175&after=t3_ruh56o',
  },
  {
    address:
      'https://old.reddit.com/r/LaptopDeals/new/?count=200&after=t3_rsucgn',
  },
  {
    address:
      'https://old.reddit.com/r/LaptopDeals/new/?count=225&after=t3_rrtlfk',
  },
  {
    address:
      'https://old.reddit.com/r/LaptopDeals/new/?count=250&after=t3_rqdpcp',
  },
  {
    address:
      'https://old.reddit.com/r/LaptopDeals/new/?count=275&after=t3_rnm7aw',
  },
  {
    address:
      'https://old.reddit.com/r/LaptopDeals/new/?count=300&after=t3_rmfmxf',
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
