import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { ulid } from 'ulid';

import '../styles/DiscussionForum.css'; // Import the CSS file for animations


const DiscussionForum = (props) => {
  const { getEmail } = props;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [replyMessage, setReplyMessage] = useState('');
  const [replyTo, setReplyTo] = useState(null);

  useEffect(() => {
    // Fetch data from the FastAPI endpoint when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/data?table_name=chat_messages');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        // Transform the data to match the structure of the messages state
        const transformedData = data.map((item) => ({
          messageID: item[0],
          email:item[1],
          
          message: item[2],
          replies: JSON.parse(item[3]), // Parse replies
          showReplies: false,
          time: item[4],
          likes: JSON.parse(item[5]), // Parse likes
          dislikes: JSON.parse(item[6]), // Parse dislikes
        }));
        setMessages(transformedData);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const emailid=getEmail()
      console.log(emailid,"ere");
      const newMessageData = {
        messageID: ulid(),
        email: emailid,
        message: newMessage,
        replies: [],
        showReplies: false,
        time: new Date().toLocaleString(),
        likes: [],
        dislikes: []
      };

      // Call the FastAPI endpoint to insert data
      try {
        const response = await fetch('http://localhost:8000/api/chat_messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messageID: newMessageData.messageID,
            email: newMessageData.email,
            message: newMessageData.message,
            replies: newMessageData.replies,
            time: newMessageData.time,
            likes: newMessageData.likes,
            dislikes: newMessageData.dislikes,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to insert data');
        }

        setMessages([...messages, newMessageData]);
        setNewMessage('');
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleReplyMessage = async (e) => {
    e.preventDefault();
  
    if (replyMessage.trim() && replyTo !== null) {
      const updatedMessages = await Promise.all(
        messages.map(async (message) => {
          const emailid=getEmail()
          if (message.messageID === replyTo) {
            const newReply = {
              messageID: ulid(), // Ensure unique IDs
              email: emailid,
              message: replyMessage,
              time: new Date().toLocaleString(),
            };
  
            const updatedMessage = {
              ...message,
              replies: [...message.replies, newReply],
            };
  
            // Call the FastAPI endpoint to update data
            try {
              const response = await fetch('http://localhost:8000/api/chat_messages', {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  messageID: updatedMessage.messageID,
                  email: updatedMessage.email,
                  message: updatedMessage.message,
                  replies: updatedMessage.replies,
                  time: updatedMessage.time,  // Be careful when updating the time
                  likes: updatedMessage.likes,
                  dislikes: updatedMessage.dislikes,
                }),
              });
  
              if (!response.ok) {
                throw new Error('Failed to update data');
              }
  
              const data = await response.json();
              console.log(data.message);
            } catch (error) {
              console.error('Error:', error);
            }
  
            return updatedMessage;
          }
          return message;
        })
      );
  
      setMessages(updatedMessages); // Update the state with the new messages
      setReplyMessage(''); // Clear the reply message
      setReplyTo(null); // Reset the replyTo state
    }
  };
  
  const handleShowReplies = (id) => {
    setMessages(messages.map((message) => {
      if (message.messageID === id) {
        return { ...message, showReplies: !message.showReplies };
      }
      return message;
    }));
  };
  const handleDisLike = (e) =>{
    const updatedMessages = messages.map((message) => {
      if (message.messageID === e) {
        return {
          ...message,
          dislikes: [...message.dislikes, message.dislikes.length + 1],
        };
      }
      return message;
    });
    setMessages(updatedMessages);
    console.log(messages);
  }
  const handleLike = (e) =>{
    const updatedMessages = messages.map((message) => {
      if (message.messageID === e) {
        return {
          ...message,
          likes: [...message.likes, message.likes.length + 1],
        };
      } 

      return message;
    });
    setMessages(updatedMessages);
  }
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      
      <div className="flex-1 overflow-y-auto p-4">
        <TransitionGroup>
     
          {messages.map((message) => {
           
            return (
              <CSSTransition key={message.messageID} timeout={500} classNames="message">
              <div className="mb-4 group">
                <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full mr-4 justify-center items-center flex bg-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
</svg>
                    </div>
                  {/* <img src={message.profileImg} alt="Profile"  /> */}
                  <div className="bg-white p-4 rounded-lg shadow-md flex-1 relative">
                    <p className="text-gray-800">{message.message}</p>              
                  </div>
                </div>
                <div className="flex gap-x-6 items-center ml-14 mt-2">
                <p className="text-gray-500 text-sm mt-1">{message.time}</p>
                <svg onClick={()=>handleLike(message.messageID)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:text-blue-500">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
</svg>{message.likes.length!=0?message.likes.length:''}
<svg onClick={()=>handleDisLike(message.messageID)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:text-blue-500">
  <path strokeLinecap="round" strokeLinejoin="round" d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54" />
</svg>{message.dislikes.length!=0?message.dislikes.length:''}
                <button
                      className="hover:text-blue-500 hover:underline flex items-center relative"
                      onClick={() => setReplyTo(message.messageID)}
                      title="reply"
                    >

                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 h-5 w-5 mr-1">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
</svg>

                   
                    </button>
                   

                     {message.showReplies ? <button
                      className=" text-blue-500 hover:underline flex items-center relative right-2"
                      onClick={() => handleShowReplies(message.messageID)}
                    >

<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 h-5 w-5 mr-1">
  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
</svg>{message.replies.length!=0?message.replies.length:''}
</button>:
<button
                      className=" text-blue-500 hover:underline flex items-center relative right-2"
                      onClick={() => handleShowReplies(message.messageID)}
                    >
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 h-5 w-5 mr-1">
  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
</svg>
{message.replies.length!=0?message.replies.length:''}


</button>
}
                      
                </div>
                <div className={`${message.showReplies ? "ml-20 mt-2" : "hidden"}`}>
                <span className="">Replies</span>
                {message.replies.map((reply) => (
                  <div key={reply.messageID} className="flex items-start mt-2">
                    <div className="bg-gray-200 p-2 rounded-lg shadow-md flex-1">
                      <p className="text-gray-700">{reply.message}</p>
                    </div>
                  </div>
                ))}
                </div>
                {replyTo === message.messageID && (
                  <form onSubmit={handleReplyMessage} className="ml-14 mt-2 flex items-center">
                    <input
                      type="text"
                      className="flex-1 border border-gray-300 rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Type your reply..."
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="h-full bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 flex items-center"
                    >
                      
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 transform -rotate-45 size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
</svg>

                    </button>
                  </form>
                )}
              </div>
            </CSSTransition>)
})}
        </TransitionGroup>
      </div>
      <form onSubmit={handleSendMessage} className="flex items-center p-4 bg-white border-t border-gray-200">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          type="submit"
          className="h-full bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 flex items-center"
        >
        
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 transform -rotate-45 size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
</svg>

        </button>
      </form>
     
    </div>
  );
};

export default DiscussionForum;