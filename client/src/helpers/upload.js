import { getApiUrl } from "../constants/config";
import axios from 'axios'
export const upload = async(form, owner,murl, callback = () => { }) => {


    const url = `${murl}/upload`;

    let files = form["files"];
    console.log(files, url, owner);
    let data = new FormData();
    for (let file of files) {
        data.append('files', file);
    }
    console.log(data.get("files"));
    data.append("owner", owner);

    const config = {
        onUploadProgress: (event) => {
            console.log("Upload event", event);
            return callback({
                type: 'onUploadProgress',
                payload: event,
            })
        },
        headers:{
            owner:owner
        }
    }

    axios.post(url, data, config).then((response) => {


        // upload successful.

        return callback({
            type: 'success',
            payload: response.data
        })

    }).catch((err) => {

        return callback({
            type: 'error',
            payload: err
        })
    });

};