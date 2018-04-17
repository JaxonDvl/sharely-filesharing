import React, { Component } from 'react';

import withAuthorization from './withAuthorization';
import { db,auth } from '../firebase';
import {upload} from '../helpers/upload';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      users: null,
      form :{
        files: [],
        
      }
    };
  }
  _onFileAdded = (event) => {
    let files = [];
    let addedFiles = event.target.files.length;
    for(let i=0 ; i< addedFiles; i++){
      files.push(event.target.files[i]);
    }
    console.log(files);
    this.setState({
      form: {
        files: files
      }
    })

  }

  _onSubmit = (event) => {
   event.preventDefault();
   let data = this.state.form;
   let owner = auth.getUserData()['uid'];
   upload(data,owner);
   console.log(data);
   db.addFile(owner,data["files"][0].name);

  }
  componentDidMount() {
    
    db.onceGetUsers().then(snapshot =>
      this.setState(() => ({ 
        user: auth.currentUser,
        users: snapshot.val()
       }))
    );
  }

  render() {
    const { users } = this.state;
    return (
      <div>
        <h1>Upload Files</h1>
        <form onSubmit={this._onSubmit}>
        <label htmlFor={'input-file'}>
            <input onChange={this._onFileAdded} id={'input-file'} type="file" multiple={true}/>
        </label>
        <br/>

        <button type={'submit'} >Send</button>
        </form>
        { !!users && <UserList users={users} /> }
      </div>
    );
  }
}

const UserList = ({ users }) =>
<div>
  <h2>List of Usernames of User</h2>

  {Object.keys(users).map(key =>
    <div key={key}>{users[key].email}</div>
  )}
</div>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);