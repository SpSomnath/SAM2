import axios from 'axios';
import { Platform } from 'react-native';

export const ADDRESS = Platform.OS === 'ios' ? 'localhost:8000' : '192.168.247.114:8000'

const api = axios.create({
    baseURL: 'http://'+ ADDRESS,
    headers: {
        'content_type': 'application/json'
    }
})
export default api;