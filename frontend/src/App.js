import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [generalStats, setGeneralStats] = useState(null);
  const [detailedStats, setDetailedStats] = useState(null);
  const [filters, setFilters] = useState({ location: '', type: '', minPrice: '', maxPrice: '' });

  useEffect(() => {
    // Pobierz ogólne statystyki
    axios.get('http://localhost:3001/api/statistics/general')
      .then(response => setGeneralStats(response.data))
      .catch(error => console.error('Błąd przy pobieraniu ogólnych statystyk:', error));
  }, []);

  const fetchDetailedStats = () => {
    axios.get('http://localhost:3001/api/statistics/detailed', { params: filters })
      .then(response => setDetailedStats(response.data))
      .catch(error => console.error('Błąd przy pobieraniu szczegółowych statystyk:', error));
  };

  const handleInputChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Statystyki Zamian Nieruchomości</h1>

      <h2>Ogólne Statystyki</h2>
      {generalStats && (
        <div>
          <p>Liczba zamian: {generalStats.totalExchanges}</p>
          <p>Średnia wartość nieruchomości: {generalStats.avgValue}</p>
          <p>Popularne lokalizacje: {JSON.stringify(generalStats.popularLocations)}</p>
        </div>
      )}

      <h2>Szczegółowe Statystyki</h2>
      <div>
        <input type="text" name="location" placeholder="Lokalizacja" onChange={handleInputChange} />
        <input type="text" name="type" placeholder="Typ nieruchomości" onChange={handleInputChange} />
        <input type="number" name="minPrice" placeholder="Minimalna cena" onChange={handleInputChange} />
        <input type="number" name="maxPrice" placeholder="Maksymalna cena" onChange={handleInputChange} />
        <button onClick={fetchDetailedStats}>Pokaż statystyki</button>
      </div>
      {detailedStats && (
        <div>
          <h3>Wyniki:</h3>
          <ul>
            {detailedStats.map((item, index) => (
              <li key={index}>{item.location} - {item.type} - {item.value} PLN</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;


