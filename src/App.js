import React, { useEffect,useState } from 'react';
import './App.css';
import Login from './Component/Login';
import Dash from './Component/Dashboard';
import Scan from './Component/Scan';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Summary from './Component/Summary';
import Attend from'./Component/Attendance';
import secureLocalStorage from 'react-secure-storage';

const App=()=>{
  const trav=useNavigate()
  const [final,setfinals]=useState({})
  const [scanned, setscanned] = useState(null);
  const [log, setlog] = useState();
  const [page, setpage] = useState({page:1});
  useEffect(() => {
    const data1 = secureLocalStorage.getItem('data');
    console.log(data1)
    if (data1) {
      setlog(true)
    }else{
      setlog(false);
      //  <Navigate to="/" />;
    }

  }, []); 

  return (
    <>
    {log?
  
        <Routes>
          <Route path="/" element={<Login final={final} setfinals={setfinals} setlog={setlog}/>} />
          <Route path="/dash" element={<Dash setlog={setlog} final={final} setfinals={setfinals}/>} />
          <Route path="/scan" element={<Scan final={final} setfinals={setfinals} scanned={scanned} setscanned={setscanned}/>} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/attend" element={<Attend />} />
        </Routes>
    
       :log===false?<Login final={final} setfinals={setfinals} setlog={setlog}/>:<div></div>} 
    </>
  );
}

export default App;
