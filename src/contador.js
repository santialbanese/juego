import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={increment}>Incrementar</button>
      <button
        className={isActive ? 'active' : 'inactive'}
        onClick={() => setIsActive(!isActive)}>boton
      </button>
    </div>
  );
}

export default Counter;