import React from 'react';


export const Chat = ({ chat }) => {
    return <li className="chat" key={chat._id}>{chat.userName}: 
    {chat.message.split('\n').map((c, i) => <div key={i}>{c}</div>)}</li>;
};