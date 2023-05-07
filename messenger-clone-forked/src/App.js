import React, { useEffect, useState } from "react";
import { FormControl, Input, InputLabel } from "@mui/material";
import Message from "./Message.js";
import firebase from "firebase";
import "./Message.css";
import db from "./firebase.js";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";
import IconButton from "@mui/material/IconButton";
import "./App.css";

export default function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  useEffect(() => {
    //run once when the app component loads
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);
  useEffect(() => {
    const name = prompt("Enter Your Name !!");
    setUsername(name);
  }, []);

  const sendMessage = (event) => {
    event.preventDefault(); //prevent default is to prevent page from reloading everytime enter has been hit by the user
    //all the logic to send the message
    db.collection("messages").add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    setInput("");
    //spread operator is used here because we want to store all the mesage history
    //so destructuring with spread operator will keep the previous messages intact
    //and at the same time adds the input typed to the messages array
    //and after the input is stored we setinput to blank again
  };

  return (
    <div className="App">
      <img
        src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100"
        alt="messenger"
      />
      <h1>WTF CHAT BOX !!</h1>
      <h2>Welcome {username}</h2>
      <form className="app__form">
        <FormControl className="app_formControl">
          <Input
            className="app__input"
            placeholder="Enter a message..."
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <IconButton
            className="app__iconButton"
            variant="contained"
            type="submit"
            disabled={!input}
            color="primary"
            onClick={sendMessage}
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
      <FlipMove>
        {
          messages.map(({ id, message }) => (
            <Message key={id} message={message} name={username} />
          ))
          //map function is gonna loop over our messages array which stores the history of
          //all the messages sent and gonna display each and every message on the screen using <p> element
        }
      </FlipMove>
    </div>
    //everytime we want to use javscript inside html we use{} curly braces
    //we put our input and button inside form and then me make the type of button to submit so the whenevr we hit enter after typing a message it sends
  );
}
//useEffect(() => {
//run code here...this code runs when the component loads
//},[])condition here
//useEffect has 2 parameters one is function inside which we write the code wjhich has to be executed
//second is the condition on the basis of which we either execute the code or we dont
