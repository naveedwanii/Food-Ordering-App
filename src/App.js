import './App.css'
import Header from './components/Header'
import Body from './components/Body'
import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import UserContext from './utils/UserContext';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';


function App() {

  const [userName, setUserName] = useState()

  // authentication
  useEffect(() => {
    // Make an API call and send username and password
    const data = {
      name: 'Naveed Wani'
    }
    setUserName(data.name)
  }, [])
  
  return (
    //Default
    <Provider store = {appStore}>
    <UserContext.Provider value={{loggedInUser: userName, setUserName}}>
       <div className="App">
      <UserContext.Provider value={{loggedInUser: 'Elon Musk'}}>
       {/* Elon Musk */}
      <Header />
      {/* if path = /*/}
        {/* <Body /> */}
        </UserContext.Provider>
        <Outlet />
     
      </div>
      </UserContext.Provider>
    </Provider>
     
  );
}

export default App;
