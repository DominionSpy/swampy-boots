import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import panelService from './services/panels'

import PanelView from './routes/PanelView'

import Thumbnail from './components/Thumbnail'
import Panel from './components/Panel'

const PanelList = () => {
  const [panels, setPanels] = useState([])

  useEffect(() => {
    panelService
      .getAll()
      .then(initialPanels => {
        setPanels(initialPanels)
      })
  }, [])

  return (
    <>
      {panels.map(panel =>
        <Thumbnail
          key={panel.id}
          width='150'
          height='150'
          title={panel.title}
          href={`/panel/${panel.id}`}>
          <Panel panel={panel} />
        </Thumbnail>
      )}
    </>
  )
}

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
