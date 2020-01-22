import axios from 'axios';

const instance = axios.create({
   baseURL: "https://tutorayus.firebaseio.com/"
});


export default instance;
