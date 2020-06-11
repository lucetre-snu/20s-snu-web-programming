import React, {useEffect, useState} from 'react';

import './App.css';
import Api from './Api';
import { Chat } from './Chat';
import { Button } from '@material-ui/core';
const api = new Api();

//props => const 
//useState

function App(props) {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState('');
  const [rooms, setRooms] = useState([]);
  const [roomName, setRoomName] = useState('');
  const [currentRoom, setCurrentRoom] = useState(null);
  const [chats, setChats] = useState([]);

  const [chatMessage, setChatMessage] = useState('');
  const users = [];

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
    const login = localStorage.getItem('login');
    if(login && key && name) {
      setUser({name, key});
    }
  }, []);

  const onSignup = (e) => {
    e.preventDefault();
    api.signup(userName)
    .then(res => {
      if(res.error){
        alert(`${userName}는 이미 사용 중입니다. 다른 이름으로 설정해주세요!`);
        return;
      }
      setUser(res);
      localStorage.setItem('name', res.name);
      localStorage.setItem('key', res.key);
      localStorage.setItem('login', true);
    });
  }

  const onLogin = (e) => {
    e.preventDefault();
    api.login()
    .then(res => {
      setUser(res);
      localStorage.setItem('login', true);
    });
  }

  const onLogout = (e) => {
    e.preventDefault();
    setUser(null);
    localStorage.setItem('login', false);
    // localStorage.removeItem('name');
    // localStorage.removeItem('key');
  }

  const onCreateRoom = (e) => {
    e.preventDefault();
    api.createRoom(roomName)
    .then(res => {
      reloadRooms();
    });
  }

  const joinRoom = async (room) => {
    await reloadChats(room._id);
    setCurrentRoom(room);
  }

  const reloadChats = async (roomId) => {
    const chats = await api.getChats(roomId);
    setChats(chats);
  }

  const sendMessage = async (e) => {
    e.preventDefault();
    await api.sendMessage(currentRoom._id, chatMessage);
    setChatMessage('');
    reloadChats(currentRoom._id);
  }
  
  return (
    <div className="App">
      <h2>채팅프로그램입니다.</h2>
      <div>
        <div style={{ display: 'flex', flexDirection: 'row'}}>
          <div style={{width: '300px'}}>
            <div style={{ border: '1px solid black'}}>
              { user ?
                <div>
                  {user.name} 님 안녕하세요
                  <br />
                  <input type="submit" value="로그아웃" onClick={onLogout}/>
                </div>
              : 
              <form>
                <input type="text" value={userName} onChange={e => setUserName(e.target.value)}/>
                <br />
                <input type="submit" value="회원가입" onClick={onSignup}/>
                <input type="submit" value="로그인" onClick={onLogin}/>
              </form>
              }
            </div>
            <div style={{ border: '1px solid black'}}>
              <h3>방리스트</h3>
              <ul>
                { rooms.length === 0 ? <h4>개설된 방이 없습니다</h4> :
                 rooms.map(room => <Button color="primary" variant="outlined" key={room._id} onClick={() => joinRoom(room)}>  {room.name} </Button>)}
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
                users.map(user => <div key={user._id}> {user.name} </div>)}
              </ul>
            </div>
          </div>
          <div id="chatRoom" style={{ width: '800px', border: '1px solid black', flexDirection: 'column', justifyContent: 'space-around', display: 'flex'}}>
            { currentRoom ? 
            <div>
              <h3>{currentRoom.name} 채팅</h3>
              <ul id="chats">
                { chats.map(chat => <Chat chat={chat} key={chat.id} />)}
              </ul>
              <form>
                <textarea type="text" placeholder="채팅 내용을 입력하세요." value={chatMessage} onChange={e => setChatMessage(e.target.value)}>
                  {chatMessage}
                </textarea>
                <input type="submit" value="입력" onClick={ sendMessage }/>
              </form>
            </div>
            : <div><h3>방에 입장해주세요</h3></div> }
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;