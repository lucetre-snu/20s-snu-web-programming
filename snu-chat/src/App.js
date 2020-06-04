import React, {useEffect, useState} from 'react';

import './App.css';

class Api {
  constructor() {
    this.BASE_URL = 'http://snu-chat2.herokuapp.com';
    this.key = localStorage.getItem('key');
  }
  signup(name) {
    return fetch(this.BASE_URL + '/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `name=${name}`
    }).then(res => res.json());
  }
  getRooms() {
    return fetch(this.BASE_URL + '/rooms').then(res => res.json());
  };

  createRoom(name) {
    return fetch(this.BASE_URL + '/rooms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Key ${this.key}`
      },
      body: `name=${name}`
    }).then(res => res.json());
  }

  getRoom(roomId) {
    return fetch(`${this.BASE_URL}/rooms/${roomId}`).then(res => res.json());
  };
}

const api = new Api();



function App() {
  const [user, setUser] = useState(null);
  const [signupUserName, setSignupUserName] = useState('');
  const [rooms, setRooms] = useState([]);
  const [roomName, setRoomName] = useState('');
  const users = [];
  const chats = [];

  const reloadRooms = () => {
    api.getRooms()
    .then( _rooms => setRooms(_rooms));
  }

  useEffect(() => {
    reloadRooms();
  }, []);

  useEffect(() => {
    const name = localStorage.getItem('name');
    const key = localStorage.getItem('key');
    if(key && name) {
      setUser({name, key});
    }
  }, []);

  const onSignup = (e) => {
    e.preventDefault();
    api.signup(signupUserName)
    .then(res => {
      setUser(res);
      localStorage.setItem('name', res.name);
      localStorage.setItem('key', res.key);
      api.key = res.key;
    });
  }

  const onCreateRoom = (e) => {
    e.preventDefault();
    api.createRoom(roomName)
    .then(res => {
      reloadRooms();
    });
  }
  
  return (
    <div className="App">
      <h2>채팅프로그램입니다.</h2>
      <div>
        <div style={{ display: 'flex', flexDirection: 'row'}}>
          <div style={{width: '300px'}}>
            <div style={{ border: '1px solid black'}}>
              { user ? <div>{user.name} 님 안녕하세요</div>
              : 
              <form>
                <input type="text" value={signupUserName} onChange={e => setSignupUserName(e.target.value)}/>
                <input type="submit" value="회원가입" onClick={onSignup}/>
              </form>
              }
            </div>

            <div style={{ border: '1px solid black'}}>
              <h3>방리스트</h3>
              <ul>
                { rooms.length === 0 ? <h4>개설된 방이 없습니다</h4> :
                 rooms.map(room => <div> {room.name} </div>)}
              </ul>

              <form>
                <input type="text" value={roomName} onChange={e => setRoomName(e.target.value)}/>
                <input type="submit" value="방만들기" onClick={onCreateRoom}/>
              </form>
            </div>
            <div style={{ border: '1px solid black'}}>
              <h3>유저리스트</h3>
              <ul>
                { users.length === 0 ? <h4>참가한 유저가 없습니다.</h4> :
                users.map(user => <div> {user.name} </div>)}
              </ul>
            </div>
          </div>
          <div id="chatRoom" style={{ width: '800px', border: '1px solid black', flexDirection: 'column', justifyContent: 'space-around', display: 'flex'}}>
            <h3>채팅</h3>
            <ul id="chats">
              { chats.map(room => <div> {room.name} </div>)}
            </ul>
            <form>
              <input type="text" placeholder="채팅 내용을 입력하세요." />
              <input type="submit" value="입력" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
