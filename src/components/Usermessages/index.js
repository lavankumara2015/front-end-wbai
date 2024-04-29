import React, { useEffect, useState } from "react";
import "./userMessage.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Editor } from "primereact/editor";
import  EmojiPicker from 'emoji-picker-react';
import Picker from 'emoji-picker-react';


function Index2(props) {
  const { message, userData, showMessage,patientNumber, setShowEditor, setShowEmoji,showEmoji,showEditor } = props;
  const [textMessage, setTextMessage] = useState("");
  const [reaction , setReaction]=useState('no');
  const [text, setText]=useState("");
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  

  // console.log(showMessage + "dataaa")
  

  const formatTimestamp = (timestamp) => {
    const date = new Date(parseInt(timestamp) * 1000);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };  
  const helper = async (bodyData) => {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.token} `,
        },
        body: JSON.stringify(bodyData),
      };
      const makeFetch = await fetch('http://localhost:3005/message', options);
      setTextMessage("")
    
    } catch (err) {
      console.log(err);
    }
  };
  const onSend =(e)=>{
    e.preventDefault();
    helper({
      messaging_product: "whatsapp",
      to: patientNumber,
      type: "text",
      data: {
          text: textMessage,
    },
  });
  setTextMessage('');
  }
  const handleReaction = (id) => {
    setSelectedMessageId(id === selectedMessageId ? null : id); 
     // console.log("selected message" + selectedMessageId)
  }
  const OnHandleReaction = (emoji,id) => {

  const newReaction = (reaction === emoji.emoji) ? '' : emoji.emoji;
  helper({
    messaging_product: "whatsapp",
    to: patientNumber,
    type: "reaction",
    data: {
      message_id: id,
      emoji: newReaction
    }
  });
  setReaction(newReaction);
  }
    const handleText = () => {
    setShowEditor(prevState => !prevState); 
    setShowEmoji(false);
    const messagesMainContainer = document.getElementById("messages-main-container-id");
    messagesMainContainer.style.height = showEditor ? "76vh" : "40vh";
  }
  const handleEmoji = () => {
    setShowEmoji(prevState => !prevState);
    setShowEditor(false); 
    const messagesMainContainer = document.getElementById("messages-main-container-id");
    messagesMainContainer.style.height = showEmoji ? "76vh" : "37vh";
  }
  const handleChange = (e) => {
    setTextMessage(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault(); 
    onSend(e); 
  }
  const handleEmojiSelect = (emoji) => {
    setTextMessage(textMessage + emoji.emoji); 
    console.log("emoji selected" + emoji.emoji)
  }
  
  const handleMedia =()=>{

  }
  

 return (
    <>
    {/* <ToastContainer
    position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
    /> */}
     <div className="messages-main-container-all" id="messages-main-container-id">
        {message && showMessage?.map((val, ind) => {
          return (
          <div key={ind} className="messages-main-container"> 
          <div className={`${val.message_type === "Outgoing" ? 'messages-main-container__text-left' : 'messages-main-container__text-right'}`}>
          <div className="messages-main-container__text-inner" style={{ backgroundColor: `${val.message_type === "Outgoing" ? '#D5FFD5' : '#FBFAFA'}`,alignSelf: `${val.message_type === "Outgoing" ? 'flex-start' : 'flex-end'}`, order :  `${val.message_type === "Outgoing" ? '2' : '0'}`,}}>
          <h3 className="messages-main-container__h3">{val?.text?.body}</h3>
          <p className="messages-main-container__p">{formatTimestamp(val?.timestamp)}</p>
          <p className="messages-main-container-all__Reactions">{val?.reactions[0]?.emoji} {val?.reactions[1]?.emoji}</p>
{val?.type === "location" && (
      
                <div >
            <iframe
            className="location_container"
                src={`https://maps.google.com/maps?q=${val.location.latitude},${val.location.longitude}&z=${12}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="google map"
            ></iframe>
            <a className="location__link" href="https://www.google.com/maps/place/${val.location.latitude}N+${val.location.longitude}E">https://maps.google.com/maps</a>
        </div>

)}
{val?.type === "image" && val?.media_data?.image && (
  <div>
    <img src={`data:image/jpeg;base64,${val.media_data.image.toString('base64')}`} alt="" className="mediaImage" />
    <a href={`data:image/jpeg;base64,${val.media_data.image.toString('base64')}`} download="image.jpg">
    <img className="download__icon" src="assets/download.png" alt="download symbol" />
    </a>
  </div>
)}

{val?.type === "video" && val?.media_data?.video && (
  <div>
    <video controls className="videoclass">
      <source src={`data:video/mp4;base64,${val.media_data.video.toString('base64')}`} type="video/mp4" />
    </video>
    <a href={`data:video/mp4;base64,${val.media_data.video.toString('base64')}`} download="video.mp4">
    <img className="download__icon" src="assets/download.png" alt="download symbol" />
    </a>
  </div>
)}

{val?.type === "document" && val?.media_data?.document && (
  <div className="mediaDocument">
    <iframe  src={`data:application/pdf;base64,${val.media_data.document.toString('base64')}`} ></iframe>
    <a href={`data:application/pdf;base64,${val.media_data.document.toString('base64')}`} download="document.pdf">
    <img className="download__icon" src="assets/download.png" alt="download symbol" />
    </a>
  </div>
)}

{val?.type === "audio" && val?.media_data?.audio && (
  <div>
    <audio controls>
      <source src={`data:audio/mpeg;base64,${val.media_data.audio.toString('base64')}`} type="audio/mpeg" />
    </audio>
    <a href={`data:audio/mpeg;base64,${val.media_data.audio.toString('base64')}`} download="audio.mp3">
      <img className="download__icon" src="assets/download.png" alt="download symbol" />
    </a>
  </div>
)}
 </div>
 <div className="messages-main-container-reaction-picker">
      <div>
        <img onClick={() => handleReaction(val?.id)} src="assets/emoji_btn2.webp" alt="emoji-logo" className="emoji_logo" />
        {selectedMessageId === val?.id &&  
       
       
       <Picker   
        reactionsDefaultOpen={true} 
        onReactionClick={(emoji)=>OnHandleReaction(emoji,val?.id)}
        onClick={handleReaction}
        // onEmojiClick={handleEmojiClick}
       />} 
     
     
     
      </div>
      {/* <div className="messages-main-container-all__Reactions-names">
           <div>
            {val?.reactions[0]?.user}&nbsp;  &nbsp; {val?.reactions[0]?.emoji}
           </div> <br/>
           <div>
            {val?.reactions[1]?.user}&nbsp; &nbsp; {val?.reactions[1]?.emoji}
           </div>
      </div> */}
      </div>
          </div>
          </div>
          );
        })}
        
      </div>

      

      <div className="form-container">
        <img onClick={handleEmoji} src="assets/LOL.png" alt="smile-icon" className="form-container__icons" />
        <img onClick={handleMedia} src="assets/plussimbol.png" alt="plus-icon" className="form-container__icons"/>
        <img  onClick={handleText} src="assets/notes.png" alt="notes-icon" className="form-container__icons"/>
        <form onSubmit={handleSubmit}>
        <input type="text" value={textMessage} onChange={handleChange} placeholder="Type a message"/>
      <img  onClick={onSend} src="assets/paperPlane.png" alt="paperPlane" className="form-container__btn" />
      </form>
        </div>
        {showEditor && <Editor value={text} onTextChange={(e) => setText(e.htmlValue)} className="form-container__text-box" />}
        {showEmoji && <EmojiPicker onEmojiClick={handleEmojiSelect}/>}

    </>
  );
}

export default Index2;
