
import { useState ,React, useEffect} from 'react';
import './App.css';
import Login from './components/login/Login';
import Homepage from './pages/homepage/Homepage';

function App() {
  const [user,setUser] = useState(null)
  
  useEffect(() => { 
   console.log(user)
 }, [user]) 

  return (

    <div className="App">
         
      { user ?     
       <Homepage user={user} /> : <Login setUser={setUser} />
      }  
    </div>  
    
  );
}

export default App;
