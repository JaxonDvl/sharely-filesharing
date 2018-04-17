import axios from 'axios'
import { apiUrl } from "../constants/config";


export const getDownloadInfo = (id,userId) => {

    const url = `${apiUrl}/download/${userId}/${id}`;
    console.log(url);

    return window.open(url);
}