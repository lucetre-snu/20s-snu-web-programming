import React from 'react';
import './Chat.css';

export const Chat = ({ chat, user }) => {
  // console.log(chat);
  if(chat.userName) {
    if(user && user.name === chat.userName) {
      return <div className="outgoing" key={chat._id}>
        <div className="bubble">
          {chat.message.split('\n').map((c, i) => <div key={i}>{c}</div>)}
        </div>
      </div>;
    }
    else {
      return <div className="ingoing" key={chat._id}>
        <div className="bubble">
          {chat.userName}: 
          {chat.message.split('\n').map((c, i) => <div key={i}>{c}</div>)}
        </div>
      </div>;
    }
  }
  else {
    const chatLog = chat.message.split('::');
    let logMessage = '';
    if(chatLog[0] === 'CREATE') {
      logMessage = chatLog[1] + ' 님이 채팅방을 개설하였습니다.';
    }
    else if(chatLog[0] === 'JOIN') {
      logMessage = chatLog[1] + ' 님이 입장하였습니다.';
    }
    return <div className="chat" key={chat._id}><div class="log">{logMessage}</div></div>;
  }
};