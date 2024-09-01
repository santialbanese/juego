import React from 'react';
import ReactDOM from 'react-dom';

import Juego from './juego';

function App() {
  return (
    <div>
      
      <Juego/>
    </div>
  );
}

export default App;

ReactDOM.render(<App />, document.getElementById('root'));