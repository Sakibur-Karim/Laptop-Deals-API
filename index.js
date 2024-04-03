const axios = require('axios');

const apiUrl = 'https://www.reddit.com/r/LaptopDeals/new.json';
const headers = {
  'User-Agent': 'Test' // Replace with your app's name
};

async function fetchHeadersAndLinks() {
  try {
    const response = await axios.get(apiUrl, {
      headers: headers,
      params: {
        limit: 10 // Number of posts to fetch
      }
    });

    const posts = response.data.data.children;
    const results = posts.map(post => {
      return {
        header: post.data.title,
        link: post.data.url
      };
    });

    console.log(results);
  } catch (error) {
    console.error('Error fetching Reddit data:', error);
  }
}

fetchHeadersAndLinks();
