const axios = require('axios');
// import axios from 'axios'
const postData = {
  key1: 'value1',
  key2: 'value2',
};

axios.post('http://192.168.2.27:5000/api/hello', postData)
  .then(response => {
    console.log('Response:', response.data);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
