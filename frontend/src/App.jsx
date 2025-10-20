import { useEffect, useState } from 'react';
import './App.css';
 
function App() {
  const [rooms, setRooms] = useState([]);
  const [occupancy, setOccupancy] = useState([]);
  const [bookings, setBookings] = useState([]);
 
  useEffect(() => {
    fetch('http://localhost:3001/hettorpefogado')
      .then((res) => res.json())
      .then(setRooms)
      .catch((err) => console.error('Error loading /hettorpefogado:', err));
 
    fetch('http://localhost:3001/szobakkihasznaltsaga')
      .then((res) => res.json())
      .then(setOccupancy)
      .catch((err) => console.error('Error loading /szobakkihasznaltsaga:', err));
 
    fetch('http://localhost:3001/valasztottszoba')
      .then((res) => res.json())
      .then(setBookings)
      .catch((err) => console.error('Error loading /valasztottszoba:', err));
  }, []);
 
  return (
    <>
      <div >
        <div></div>
      </div>
 
      <div>
        <div>
          <div>
            <h3>Napraforgós Nemzeti Tanúsító Védjegy célja</h3>
            <p>
              A falusi szálláshelyek napraforgós Nemzeti Tanúsító Védjegye a FATOSZ által több mint tíz éve létrehozott...
            </p>
          </div>
 
          <div>
            <h3>Falusi szálláshely fajtái</h3>
            <ul>
            <li>Vendégszoba: a vendégek rendelkezésére bocsátható önálló lakóegység, amely egy lakóhelyiségből, és a minősítéstől függően a hozzátartozó mellékhelyiségekből áll.</li> <li>Lakrész: önálló épület kettő, illetve több szobából álló lehatárolt része a minősítéstől függően hozzátartozó mellékhelyiségekkel együtt</li> <li>Vendégház: önálló épület, több szobával, mellékhelyiségekkel és főzési lehetőséggel rendelkező lakó-, illetve üdülőegység, családok vagy kisebb csoportok elszállásolására.</li> <li>Sátorozóhely: csak valamelyik falusi szálláshely típus mellett, mintegy azt kiegészítve üzemeltethető az előírt feltételek megléte esetén. Pl.: falusi vendégház sátorozóhellyel.</li>
            </ul>
          </div>
 
          <div>
            <h3>A hét törpe fogadó</h3>
            <table >
              <thead>
                <tr>
                  <th>Szoba neve</th>
                  <th>Ágyak száma</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room, i) => (
                  <tr key={i}>
                    <td>{room.sznev}</td>
                    <td>{room.agy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ul>
              <li>Ruhásszekrény</li>
              <li>Saját fürdőszoba zuhanytálca</li>
              <li>WC (fürdőszobával egyben)</li>
            </ul>
          </div>
        </div>
      </div>
 
      <div>
            <h3>A szobák kihasználtsága:</h3>
            <table>
              <thead>
                <tr>
                  <th>Szoba</th>
                  <th>Vendégek száma</th>
                  <th>Vendégéjszakák</th>
                </tr>
              </thead>
              <tbody>
                {occupancy.map((o, i) => (
                  <tr key={i}>
                    <td>{o.sznev}</td>
                    <td>{o.osszes_vendeg}</td>
                    <td>{o.osszes_ott_toltott_ejszaka}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
 
      <div>
      <div>
  <div>
    <div>
      <h3>A vendégszobák foglaltsága</h3>
          <table>
            <thead>
              <tr>
                <th>Szoba</th>
                <th>Érkezés</th>
                <th>Távozás</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b, i) => (
                <tr key={i}>
                  <td>{b['Szobanév']}</td>
                  <td>{b['Érkezés'] ? b['Érkezés'].split('T')[0] : '—'}</td>
                  <td>{b['Távozás'] ? b['Távozás'].split('T')[0] : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
    </div>
  </div>
</div>
      </div>
    </>
  );
}
 
export default App;
