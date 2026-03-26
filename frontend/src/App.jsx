import { Routes, Route } from 'react-router-dom'

import PanelList from './routes/PanelList'
import PanelView from './routes/PanelView'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<PanelList />} />
        <Route path='/panel/:id' element={<PanelView />} />
      </Routes>
    </>
  )
}

export default App
