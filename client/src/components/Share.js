import React, { Component } from 'react';

import withAuthorization from './withAuthorization';
import { db, auth } from '../firebase';
import { upload } from '../helpers/upload';
import { getDownloadInfo } from '../helpers/download';
import "./Share.css";

class Share extends Component {
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

  setShareUser = (shareWith) => 
    this.setState({
      shareWith: shareWith
    })
  

  render() {
    const { users } = this.state;
    const { files } = this.state;
    const { user } = this.state;
    return (
      <div>
        <div className="file-section">
          <h1>My Files Page</h1>

          {!!files && <FileList files={files} user={user} users={users} setShare={this.setShareUser} />}
        </div>
        <div>
          {!!users && <UserList users={users} />}
        </div>
      </div>
    );
  }
}

function shareFileToUser(event,setShare,user,key) {
  event.preventDefault();

  let selecttarget= document.querySelector("select"+"#"+event.target.id);

  let toUser = selecttarget.options[selecttarget.selectedIndex].value;
  let fromUser = user;
  let fileKey = key;
  db.shareFile(toUser,fromUser,key);

}
function handleShare(event) {
  console.log(event.target.value);
}
const UserList = ({ users }) =>
  <div>
    <h3>List of users</h3>

    {Object.keys(users).map(key =>
      <div key={key}>{users[key].email}</div>
    )}
  </div>

const ShareList = ({ id,users,user}) =>
  <div className="share-list">
    <b>Share with: </b>
    <select id={id} onChange={handleShare}>
    {Object.keys(users).map(key => {
    if(user!== key){
      return <option key={key} value={key}>{users[key].email}</option>
      
    }
  }
    )}
    </select>
  </div>

const FileList = ({ files ,user,users,setShare }) =>
  <div>
    <h3>Share Files</h3>

    {Object.keys(files).map(key =>
      <div className="file-link" key={key}><span className="flink">{files[key].filename} </span>
      {!!users && <ShareList id={key} users={users} user={user} />}
      <button data-user={user} id={key} onClick={(event)=>shareFileToUser(event,setShare,user,key)}>Share</button>
      </div>
    )}
  </div>



const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(Share);