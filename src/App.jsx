import React from 'react'
import IsiHomePage from './pages/IsiHomePage'
import Articles from './pages/articles/Articles'
import Books from './pages/books/Books'
import IsiApps from './pages/isiapps/IsiApps'
import Jokes from './pages/jokes/Jokes'
import Videos from './pages/videos/Videos'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RidersGlory from './pages/ridersGlory/RidersGlory'
import BreakOut from './pages/breakOut/BreakOut'
import Electric from './pages/electricEng/Electric'
import MazeGame from './pages/mazeGame/MazeGame'
// import FileConverter from './pages/fileConvert/FileConverter'



const App = () => {
  return (
    <BrowserRouter  basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/">
          <Route index element={<IsiHomePage />} />
          <Route path="electric" element={<Electric />} />
          <Route path="articles" element={<Articles />} />
          <Route path="books" element={<Books />} />
          <Route path="isiapps" element={<IsiApps />} />
          <Route path="jokes" element={<Jokes />} />
          <Route path="videos" element={<Videos />} />
          <Route path="riders" element={<RidersGlory />} />
          <Route path="breakout" element={<BreakOut />} />
          <Route path="mazegame" element={<MazeGame />} />
          {/* <Route path="fileconvert" element={<FileConverter />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App