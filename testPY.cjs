const axios = require('axios');
exports.aaa = async ()=>{
  // import axios from 'axios'
  const postData = {
    key1: 'value1',
    key2: 'value2',
  };
  console.log(22222);
  axios.post('http://127.0.0.1:5000/api/hello', postData)
    .then(response => {
      console.log('Response:', response.data);
    })
    .catch(error => {
      console.error('Error:', error.message);
    });
}
