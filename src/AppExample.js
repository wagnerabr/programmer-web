import React, { useState } from 'react';

//Componente: é uma função(bloco) isolado de HTML, CSS ou JS, o qual não interfere no restante da aplicação 
//Propriedade: Informações que um componente PAI passa para o componente FILHO
//Estado: Informação mantida pelo componente (Lembrar: imutabilidade)

function App() {
  const [counter, setCounter] = useState(0);

  function incrementCounter() {
    setCounter(counter + 1);
  }
  return (
    <>
    <h1>Contador: {counter}</h1>
    <button onClick={incrementCounter}>Incrementar</button>
    </>
  );
}

export default App;
