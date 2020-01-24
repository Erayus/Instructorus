import axios from 'axios';

const instance = axios.create({
   baseURL: "https://instructorus-cea64.firebaseio.com/"
});


export default instance;
