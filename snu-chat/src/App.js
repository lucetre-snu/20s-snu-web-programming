import React, {useEffect, useState} from 'react';

import './App.css';
import Api from './Api';
import { Chat } from './Chat';
import { Button, Paper } from '@material-ui/core';

const api = new Api();

let loadMessageInterval = null;

function App() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [signupUserName, setSignupUserName] = useState('');
  const [rooms, setRooms] = useState([]);
  const [roomName, setRoomName] = useState('');
  const [currentRoom, setCurrentRoom] = useState(null);
  const [lastCreatedAt, setLastCreatedAt] = useState(0);
  const [chats, setChats] = useState([]);
  const [chatMessage, setChatMessage] = useState('');
  const [join, setJoin] = useState(false);
  const [cannotJoin, setCannotJoin] = useState(false);

  const reloadRooms = () => {
    api.getRooms()
    .then( res => {
      if(res.error){
        console.log(res.error);
        alert(`서버에 연결할 수 없습니다.`);
        setCannotJoin(true);
        return;
      }
      setRooms(res)
    });
  }

  useEffect(() => {
    reloadRooms();
  }, []);

  useEffect(() => {
    if(loadMessageInterval) {
      clearInterval(loadMessageInterval);
    }
    if (currentRoom!=null) {
      loadMessageInterval = setInterval(() => {
        getChats(currentRoom._id);
      }, 3000);
      const chatScrollDom = document.getElementById('chat-scroll');
      if(chatScrollDom)
        chatScrollDom.scrollTop = 2000;
    } // eslint-disable-next-line
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
      if(res.error){
        console.log(res.error);
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
    setJoin(false);
  }

  const onCreateRoom = (e) => {
    e.preventDefault();
    for(let i = 0; i < rooms.length; i++) {
      console.log(rooms[i]);
      if(rooms[i].name === roomName) {
        alert(`이미 사용 중인 채팅방 입니다. 다른 이름으로 설정해주세요! Local Error`);
        return;
      }
    }

    api.createRoom(roomName)
    .then((res) => {
      console.log(res);
      if(res.error){
        alert(`이미 사용 중인 채팅방 입니다. 다른 이름으로 설정해주세요! ${res.error}`);
        return;
      }
      reloadRooms();
      setRoomName('');
      
      const roomScrollDom = document.getElementById('room-scroll');
      if(roomScrollDom) {
        roomScrollDom.scrollTop = 2000;
      }
    });
  }

  const joinRoom = async (room) => {
    setLastCreatedAt(0);
    await api.getRoom(room._id);
    await getChats(room._id);
    setCurrentRoom(room);
  }

  const updateUsers = (chats) => {
    const userSet = new Set([]);
    for(let i = 0; i < chats.length; i++)
      if(chats[i].userName != null)
        userSet.add(chats[i].userName);
    setUsers(Array.from(userSet));
  }

  const getChats = async (roomId) => {
    if(lastCreatedAt !== 0) {
      const chats = await api.reloadChats(roomId, lastCreatedAt);
      chats.reverse();
      setChats(chats);
      updateUsers(chats);
    }
    else {
      const chats = await api.getChats(roomId);
      chats.reverse();
      setChats(chats);
      updateUsers(chats);
    }
  }

  const reloadChats = async (roomId, createdAt) => {
    const chats = await api.reloadChats(roomId, createdAt);
    chats.reverse();
    setChats(chats);
    updateUsers(chats);
  }

  const chatScroll = async () => {
    const chatScrollDom = document.getElementById('chat-scroll');
    if(chatScrollDom) {
      if(chatScrollDom.scrollTop === 0) {
        if(chats[0] && !(chats[0].userName === null && chats[0].message.split('::')[0] === 'CREATE')) {
          clearInterval(loadMessageInterval);
          const createAt = (chats[15]) ? chats[15].createdAt : Date.now();
          setLastCreatedAt(createAt);
          await reloadChats(currentRoom._id, createAt);
          chatScrollDom.scrollTop = 2000;
        }
      }
    }
  }

  const sendMessage = async (e) => {
    e.preventDefault();
    setLastCreatedAt(0);
    await api.sendMessage(currentRoom._id, chatMessage);
    const temp = currentRoom;
    setCurrentRoom(null);
    setCurrentRoom(temp);
    setChatMessage('');
    getChats(currentRoom._id);
  }

  const onEnterPress = (e) => {
    if(e.keyCode === 13 && e.shiftKey === false) {
      sendMessage(e);
    }
  }
  
  return (
    <div className="App">
      <h2>벤처창업 웹프로그래밍2 오픈채팅방</h2>
      
      <Paper style={{height: '85%'}}>
        <div style={{ display: 'flex', flexDirection: 'row', height:'100%'}}>
          <Paper style={{width: '300px'}}>
            <Paper style={{ display: 'table', width:'100%', height:'10%'}}>
              { user ?
              <div style={{ paddingTop:'0.3em', display: 'table-cell', verticalAlign: 'middle'}}>
                {user.name} 님 반갑습니다.
                <br />
                <Button onClick={onLogout}>로그아웃</Button>
              </div>
              : 
              <div style={{ display: 'table-cell', verticalAlign: 'middle'}}>
                { join ?
                <div>
                  <span>채팅을 위해<br />로그인 해주세요.</span>
                  <form>
                      <input type="text" value={signupUserName} onChange={e => setSignupUserName(e.target.value)}/>
                      <input type="submit" value="로그인" onClick={onSignup}/>
                  </form>
                </div>
                :
                <div>
                  <span>SNU-CHAT에 오신<br />것을 환영합니다.</span>
                  <form>
                      {cannotJoin?
                      <input type="submit" disabled value="회원가입" onClick={()=>setJoin(true)}/>
                      :
                      <input type="submit" value="회원가입" onClick={()=>setJoin(true)}/>
                      }

                  </form>
                </div>
                }

              </div>
              }
            </Paper>

            <Paper style={{ height:'45%'}}>
              <h3 style={{ marginBlockStart:'0.3em', marginBlockEnd:'0.3em'}}>채팅 리스트</h3>

              <div id='room-scroll' style={{height: '80%', maxHeight: '100%', overflow: 'auto', overflowX:'hidden'}}>
                <ul>
                  { rooms.length === 0 ? <h4>개설된 방이 없습니다</h4> :
                  rooms.map(room => <Button color="primary" style={{textTransform: "none"}} variant="outlined" key={room._id} onClick={() => joinRoom(room)}>  {room.name} </Button>)}
                </ul>
              </div>

              { user ?
                <form>
                  <input type="text" value={roomName} onChange={e => setRoomName(e.target.value)}/>
                  <input type="submit" value="생성" onClick={onCreateRoom}/>
                </form>
              : <div></div>
              }
            </Paper>
            <Paper style={{ height:'45%'}}>
              <h3>유저 리스트</h3>
              <ul>
                { users.length === 0 ? <h4>현재 채팅방에 참가한 유저가 없습니다.</h4> :
                users.map(user => <div key={user}> {user} </div>)}
              </ul>
            </Paper>
          </Paper>
          <Paper id="chatRoom" style={{ width: '100%', padding:'1px', border: '1px solid #0070C0', flexDirection: 'column', display: 'flex'}}>
            { currentRoom ? 
            <div style={{ height:'100%'}}>
              <Paper style={{ height:'5%'}}>
                <h3 style={{ marginBlockStart:'0.0em', marginBlockEnd:'0.0em'}}>{currentRoom.name}</h3>
              </Paper>
              <Paper id='chat-scroll' style={{ height:'85%', maxHeight: '85%', overflow: 'auto', overflowX:'hidden'}} onScroll={ chatScroll }>
              <ul id="chats">
                { chats.map(chat => <Chat chat={chat} user={user} key={chat.id} />)}
              </ul>
              </Paper>
              
              { user ?
              <Paper style={{ height: '10%', border:'none' }}>
                <form>
                  <textarea type="text" placeholder="채팅 내용을 입력하세요." value={chatMessage} onChange={e => setChatMessage(e.target.value)} onKeyDown={onEnterPress}>
                    {chatMessage}
                  </textarea>
                  <Button className="send" type="submit" onClick={ sendMessage }>
                    전송
                  </Button>
                </form>
              </Paper>
              : <div></div>}
            </div>
            :
            <div>
              <h3>방에 입장해주세요</h3>
              
            </div> }
          </Paper>
        </div>
      </Paper>
    </div>
  );
}

export default App;
