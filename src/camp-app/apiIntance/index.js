import axios from 'axios';
import { CONFIG } from '../config';


const { DEV_BASE_URL, PROD_BASE_URL, LOCAL_BASE_URL } = CONFIG;

const Axios = async ({ method, contentType, data, url }) => {
  const accessToken = localStorage.getItem('camptoken');
  const req = await axios.request({
    method,
    baseURL: `${LOCAL_BASE_URL}${url}`,
    data,
    timeout: 500000,
    headers: {
      'Content-Type': contentType ?? 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return req?.data;
};
export default Axios;
