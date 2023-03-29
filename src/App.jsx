import React from 'react'
import IsiHomePage from './pages/IsiHomePage'
import Art from './pages/art/Art'
import Articles from './pages/articles/Articles'
import Books from './pages/books/Books'
import IsiApps from './pages/isiapps/IsiApps'
import Jokes from './pages/jokes/Jokes'
import Videos from './pages/videos/Videos'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import RidersGlory from './pages/ridersGlory/RidersGlory'
import BreakOut from './pages/breakOut/BreakOut'



const App = () => {
  return (
    <BrowserRouter  basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/">
          <Route index element={<IsiHomePage />} />
          <Route path="art" element={<Art />} />
          <Route path="articles" element={<Articles />} />
          <Route path="books" element={<Books />} />
          <Route path="isiapps" element={<IsiApps />} />
          <Route path="jokes" element={<Jokes />} />
          <Route path="videos" element={<Videos />} />
          <Route path="riders" element={<RidersGlory />} />
          <Route path="breakout" element={<BreakOut />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App