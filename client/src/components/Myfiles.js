import React, { Component } from 'react';

import withAuthorization from './withAuthorization';
import { db, auth } from '../firebase';
import { upload } from '../helpers/upload';
import { getDownloadInfo } from '../helpers/download';
import "./MyFiles.css";

class Myfiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      users: null,
      files: null,
    };
  }

  componentDidMount() {
    let owner = auth.getUserData()['uid'];
    let files = null
    db.getUserFiles(owner).then(snapshot => {
      files = snapshot.val()
    })
    db.onceGetUsers().then(snapshot =>
      this.setState(() => ({
        user: owner,
        users: snapshot.val(),
        files: files
      }))
    );
  }

  render() {
    const { users } = this.state;
    const { files } = this.state;
    const { user } = this.state;
    console.log(user);
    return (
      <div>
        <div className="file-section">
          <h1>My Files Page</h1>

          {!!files && <FileList files={files} user={user} />}
        </div>

      </div>
    );
  }
}

function downloadFile(event) {
  event.preventDefault();
  console.log(event.target.getAttribute("data-user"));
  let downloadUrl = getDownloadInfo(event.target.id,event.target.getAttribute("data-user"));
  
}


const FileList = ({ files ,user }) =>
  <div>
    <h3>Your Files</h3>

    {Object.keys(files).map(key =>
      <div className="file-link" key={key}>{files[key].filename}<button data-user={user} id={files[key].filename} onClick={downloadFile}>Download</button></div>
    )}
  </div>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(Myfiles);