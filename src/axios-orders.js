import axios from 'axios';

const instance=axios.create({
    baseURL:'Enter your firebase Url'
});

export default instance;