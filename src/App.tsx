import React, { useState } from 'react';

import './App.css';
import UserCard from './components/UserCard';
import Search from './features/search/Search';
import { getUproditUserImage } from './features/search/uproditApi';

function App() {
  //let [data, setData] = useState({image: undefined});
   
 /*  useEffect(()=>{
       async function fetchImage(){
           return await getUproditUserImage('62');
       }
       setData({image:fetchImage()})

  },[])
 */
  return (
    <div className="App">
      Hello Uprodit
      <Search />
    </div>
  );
}

export default App;
