import React from 'react'
import Navbar from './nav/Navbar'
import Hero from './hero/Hero'
import './nav/navbar.css';
import './hero/hero.css';
import './modal/modal.css';
import './App.css'
import { BrowserRouter as Router, Route,Routes  } from 'react-router-dom'
import CreateTodo from './createTodo/CreateTodo'
import EditTodo from './editTodo/EditTodo';
const App = () => {
  return (<>
  <Router>
  <Navbar/>
  <Routes>
    <Route path='/' element={<Hero/>}/>
    <Route path='/add' element={<CreateTodo/>}/>
    <Route path='/update/:id' element={<EditTodo/>}/>
  </Routes>
  
  </Router>

    </>
  )
}

export default App