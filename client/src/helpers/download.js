import axios from 'axios'
import { getApiUrl } from "../constants/config";


export const getDownloadInfo = async(id,userId) => {

    const url = `${getApiUrl()}/download/${userId}/${id}`;
    console.log(url);

    return window.open(url);
}