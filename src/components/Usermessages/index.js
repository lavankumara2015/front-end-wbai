import React, { useEffect, useState } from "react";
import "./userMessage.css";
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import EmojiPicker from 'emoji-picker-react';


function Index2(props) {
  const { message, userData, showMessage,patientNumber } = props;
  const [textMessage, setTextMessage] = useState("");
  // const [mediaData , setmediaData]=useState("");
  const [reaction , setReaction]=useState('no');
  // const [reactionImage, setReactionImage]=useState("")
  

  const formatTimestamp = (timestamp) => {
    const date = new Date(parseInt(timestamp) * 1000);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };  


  // useEffect(()=>{
  //   const mediaData= async ()=>{
  //   const media = await axios("http://localhost:3005/mediaData")
  //   setmediaData(media.data.data)
  //   } 
  //   mediaData();

   
  // },[])


  const helper = async (bodyData) => {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer EABqxsZAVtAi8BOZBMGEsiohnaijzS57i5EeILZAJfRMcWiZAcDcVHqOJKx7NiUxjC3X1BbWTblq3arre7hqA11dENXbODiVXLy5FIfQthfUZBQhEb6XrdqsK5HZBGw64HTVgusFAV9H9j5vaZA6LZA2ZCpGuIAXnGviFLjZBdpCidUZAFQHVlgfBRUWZATH4bnsU7gbgghoDJzIxF3R4yxPRjXET',
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
  }

  // console.log(showMessage, 'ddd')

  const handleReaction =(id)=>{
    helper({
      messaging_product: "whatsapp",
      to: patientNumber,
      type: "reaction",
      data: {
        message_id:id,
        emoji: reaction=='yes'? "❤️" : ""
      }
    })
    if(reaction=='no'){
      setReaction('yes')
          }else{
      setReaction('no')
    }
  }
  
 return (
    <>
      <div>
        {message && showMessage?.map((val, ind) => {
          return (
            <div key={ind} className="messages-main-container">
              <div className={`${val.message_type === "Outgoing" ? 'messages-main-container__text-left' : 'messages-main-container__text-right'}`}>
                <div className="messages-main-container__text-inner" style={{ alignSelf: `${val.message_type === "Outgoing" ? 'flex-start' : 'flex-end'}`, order :  `${val.message_type === "Outgoing" ? '2' : '0'}`}}>
                  <h3 className="messages-main-container__h3">{val?.text?.body}</h3>
                  <p className="messages-main-container__p">{formatTimestamp(val?.timestamp)}</p>
{val?.type === "location" && (
      
                <div >
            <iframe
            className="location_container"
                src={`https://maps.google.com/maps?q=${val.location.latitude},${val.location.longitude}&z=${16}&output=embed`}
               
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="google map"
            ></iframe>
            <a href="https://www.google.com/maps/place/${val.location.latitude}N+${val.location.longitude}E">https://maps.google.com/maps</a>
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
  <div className="mediaImage">
    <iframe src={`data:application/pdf;base64,${val.media_data.document.toString('base64')}`} ></iframe>
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
        <div >
          <img onClick={() => handleReaction(val?.id)} src="assets/emoji_btn2.webp" alt="emoji-logo" className="emoji_logo" />
                 <div className="emoji_container">
                   <EmojiPicker />
                </div>
                </div>
              </div>
              

            </div>
          );
        })}
      </div>
      <form>
        <input type="text" value={textMessage} onChange={(e) => setTextMessage(e.target.value)} />
        <button type="submit" onClick={onSend}>Send</button>
      </form>
    </>
  );
}

export default Index2;
