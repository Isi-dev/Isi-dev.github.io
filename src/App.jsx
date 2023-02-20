import React from 'react'
import IsiHomePage from './pages/IsiHomePage'
import Art from './pages/art/Art'
import Articles from './pages/articles/Articles'
import Books from './pages/books/Books'
import IsiApps from './pages/isiapps/IsiApps'
import Jokes from './pages/jokes/Jokes'
import Videos from './pages/videos/Videos'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


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
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App