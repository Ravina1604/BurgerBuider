import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://react-my-burger-e1855.firebaseio.com/'
});

export default instance;