import React, { useState } from 'react'
import Login from './components/login/Login'
import './App.css';
import { BrowserRouter, Routes,Route} from 'react-router-dom';
import Chat from './components/chat/Chat';
import ChatSidebar from './components/chatSidebar/ChatSidebar';
import { useStateValue } from './components/context/StateProvider';

const App = () => {
  const [{user}] = useStateValue();
  // const [isAuth,setAuth] =useState();
   return (
    <div className='App'>
      {!user ?
      <Login/> :
      <div className='app_body'>
         <BrowserRouter>
         <ChatSidebar/>
        <Routes>
          <Route path='/' element={<Chat/>}/>
          <Route path='/room/:roomId' element={<Chat/>}/>
          </Routes>
        </BrowserRouter>
    
       </div> 
       } 
</div>
  )
}

export default App
