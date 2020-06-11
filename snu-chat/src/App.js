import React, {useEffect, useState} from 'react';

import './App.css';
import Api from './Api';
import { Chat } from './Chat';
import { Button } from '@material-ui/core';
const api = new Api();

//props => const 
//useState

let loadMessageInterval = null;

function App() {
  const [user, setUser] = useState(null);
  const [signupUserName, setSignupUserName] = useState('');
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
    if(loadMessageInterval) {
      clearInterval(loadMessageInterval);
    }
    if (currentRoom!=null)
      loadMessageInterval = setInterval(() => {
        reloadChats(currentRoom._id);
      }, 3000);
  }, [currentRoom]);

  useEffect(() => {
    const key = localStorage.getItem('key');
    if(!key) return;
      
    api.login()
    .then(res => {
      if(res.success)
        setUser({name: res.name});
      else
        localStorage.removeItem('key');
    })
    .catch(err => console.log(err));
  }, []);

  const onSignup = (e) => {
    e.preventDefault();
    api.signup(signupUserName)
    .then(res => {
      console.log(res);
      if(res.error){
        alert(`이미 사용 중인 닉네임 입니다. 다른 이름으로 설정해주세요! ${res.error}`);
        return;
      }
      setUser(res);
      localStorage.setItem('name', res.name);
      localStorage.setItem('key', res.key);
    });
  }

  const onLogout = (e) => {
    e.preventDefault();
    setUser(null);
  }

  const onCreateRoom = (e) => {
    e.preventDefault();
    api.createRoom(roomName)
    .then(() => {
      reloadRooms();
    });
  }

  const joinRoom = async (room) => {
    await api.getRoom(room._id);
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
                {user.name} 님 반갑습니다.
                <br />
                <Button onClick={onLogout}>로그아웃</Button>
              </div>
              : 
              <div>
                <form>
                    <input type="text" value={signupUserName} onChange={e => setSignupUserName(e.target.value)}/>
                    <input type="submit" value="가입" onClick={onSignup}/>
                </form>
              </div>
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
