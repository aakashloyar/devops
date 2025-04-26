import './App.css'
import { useEffect,useState } from 'react'
function App() {
  const [message,setMessage]=useState("");
  const [socket,setSocket]=useState<null|WebSocket>(null);
  useEffect(()=>{
    const newSocket=new WebSocket('ws://localhost:8080')
    newSocket.onopen = () => {
      console.log('Connection established');
      newSocket.send('Hello Server!');
      setSocket(newSocket);
    }
    newSocket.onmessage = (message) => {
      console.log('Message received:', message.data);
    }
    return () => newSocket.close();
  },[])
  if(!socket) {
    return (
      <div>
        connecting ...
      </div>
    )
  }
  return (
    <>
    <div>
      connected
      <div>
        <input type="text" value={message} onChange={(e)=>{
          setMessage(e.target.value)
        }} />
      </div>
      <div>
        <button onClick={()=>{
          socket.send(`${message}`)
          setMessage("");
        }}>Send Message</button>
      </div>
    </div>
    </>
  )
}

export default App
