import React from 'react';
import ReactPlayer from 'react-player'

function App() {
  // Reemplaza 'VIDEO_ID' con el ID del video en vivo que deseas mostrar.
  const liveVideoId = "https://www.youtube.com/watch?v=_1Dw0srlC-I";

 
  return (
    <div className="App">
      <h1>Transmisión en vivo de YouTube</h1>
      
      <ReactPlayer url={liveVideoId}/>
    </div>
  );
}

export default App;
