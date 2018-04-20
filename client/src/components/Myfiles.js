import React, { Component } from 'react';

import withAuthorization from './withAuthorization';
import { db, auth } from '../firebase';
import { upload } from '../helpers/upload';
import { getDownloadInfo } from '../helpers/download';
import "./MyFiles.css";

import { getApiUrl } from "../constants/config";

class Myfiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      users: null,
      files: null,
      sharedFiles: null,
    };
  }

  async componentDidMount() {
    let owner = auth.getUserData()['uid'];
    let files = null;
    let sharedFiles = null;
    db.getUserFiles(owner).then(snapshot => {
      files = snapshot.val();
    });
    try {
      sharedFiles = await db.getUserSharedFiles(owner);
      console.log(sharedFiles);

    } finally {
      db.onceGetUsers().then(snapshot => {
        console.log(sharedFiles);
        this.setState(() => ({
          user: owner,
          users: snapshot.val(),
          files: files,
          sharedFiles: sharedFiles
        }))
      }
      );
    }
  }

  render() {
    const { users } = this.state;
    const { files } = this.state;
    const { user } = this.state;
    const { sharedFiles } = this.state;
    return (
      <div>
        <div className="file-section">
          <h1>My Files Page</h1>

          {!!files && <FileList files={files} user={user} />}

          {!!sharedFiles && <SharedFiles files={sharedFiles} user={user} users={users} />}
        </div>

      </div>
    );
  }
}

function downloadFile(event) {
  event.preventDefault();
  let ownerFile = event.target.getAttribute("data-user");
  let downloadUrl = getDownloadInfo(event.target.id, ownerFile);

};



const FileList = ({ files, user }) =>
  <div>
    <h3>Your Files</h3>

    {Object.keys(files).map(key =>
      <div className="file-link" key={key}>{files[key].filename}<button data-user={user} id={files[key].filename} onClick={downloadFile}>Download</button></div>
    )}
  </div>

const SharedFiles = ({ files, user, users }) =>
  <div>
    <h3>Shared Files</h3>

    {Object.keys(files).map(key =>
    {
      let ownerName = users[files[key].owner].email;
      return <div className="file-link" key={key}>{files[key].filename}  <button data-user={files[key].owner} id={files[key].filename} onClick={downloadFile}>Download</button> <span className="shared-via"> {" shared via "+ownerName} </span></div>
    }
    )}
  </div>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(Myfiles);