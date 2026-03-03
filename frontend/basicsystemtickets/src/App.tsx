import './App.css'
import {NavBar} from '../components/NavBar'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {Tickets} from '../pages/Tickets'
import {Clients} from '../pages/Clients'
import {Agents} from '../pages/Agents'

function App() {


  return (
    <>

      <Router>


        <div className='row'>
          <NavBar />
          <main className="col-md-10 ms-sm-auto px-md-4">
            <Routes>
              <Route path='/tickets'element={<Tickets/>} />
              <Route path='/agents'element={<Agents/>} />
              <Route path='/clients'element={<Clients/>} />
              
            </Routes>
          </main>
        </div>




      </Router>

    </>
  )
}

export default App
