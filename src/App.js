import React, { useEffect, useState } from 'react';
import api from './services/api';
import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

function App() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [programmers, setProgrammers] = useState([]);

  const [github_username, setGithubusername] = useState('');
  const [techs, setTechs] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setLatitude(latitude);
        setLongitude(longitude);
      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    )
  }, []);

  useEffect(() => {
    async function loadProgrammers() {
      const response = await api.get('/programmers');
      console.log(response.data)
      setProgrammers(response.data);
    }

    loadProgrammers();
  }, []);

  async function handleAddDev(e) {
    e.preventDefault();    

    const response = await api.post('/programmers', {
      github_username,
      techs,
      latitude,
      longitude
    })

    console.log(response.data);

    setGithubusername('');
    setTechs('');

    setProgrammers([...programmers, response.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form onSubmit={handleAddDev}>
          <div className="input-block"> 
            <label htmlFor="">Usuário do Github</label>
            <input 
              name="github_username" 
              id="github_username" 
              value={github_username}  
              onChange={e => setGithubusername(e.target.value)} 
              required />
          </div>
          <div className="input-block">
            <label htmlFor="">Tecnologias</label>
            <input 
              name="techs" 
              id="techs" 
              value={techs}  
              required 
              onChange={e => setTechs(e.target.value)} 
            />
          </div>
          <div className="input-group"> 
            <div className="input-block">
              <label htmlFor="">Latitude</label>
              <input 
                type="number" 
                name="latitude" 
                id="latitude" 
                value={latitude} 
                required 
                onChange={e => setLatitude(e.target.value)} 
              /> 
            </div>
            <div className="input-block">
              <label htmlFor="">Longitude</label>
              <input 
                type="number" 
                name="longitude" 
                id="longitude" 
                value={longitude}  
                onChange={e => setLongitude(e.target.value)} 
                required 
              /> 
            </div>
          </div>
          <button type="submit">Salvar</button>
        </form>
      </aside>
      <main>
        <ul>
          {programmers.map(p => (
            <li key={p._id} className="dev-item">
              <header>
                <img src={p.avatar_url} alt={p.name} />
                <div className="user-info">
                  <strong>{p.name}</strong>
                  <span>{p.techs.join(', ')}</span> 
                </div>
              </header>
              <p>{p.bio}</p>
              <a href={`https://github.com/${p.github_username}`} target="_blank">Acessar perfil no Github</a>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
