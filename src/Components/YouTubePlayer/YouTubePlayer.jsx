import React, { useEffect } from 'react';
import ReactPlayer from 'react-player'
import { useDispatch, useSelector } from 'react-redux';
import { getLinkcamaras } from '../../Redux/Actions';
useDispatch
//componente para renderizar los videos de las transmisiones 
function App() {
    const dispatch = useDispatch();
  
    useEffect(() => {
        dispatch(getLinkcamaras());
        
      }, []);
 const linkcamaras = useSelector((state)=>state.linkcamaras)


 
  return (
    <div className="App">
      <h1>Transmisión en vivo de YouTube</h1>
      
      <ReactPlayer controls  url={linkcamaras.camara1}/>
      <ReactPlayer url={linkcamaras.camara2}/>
      <ReactPlayer url={linkcamaras.camara3}/>
      <ReactPlayer url={linkcamaras.camara4}/>
      <ReactPlayer url={linkcamaras.camara5}/>
    </div>
  );
 }

export default App;