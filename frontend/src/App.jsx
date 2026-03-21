import { useState, useEffect } from 'react'
import {
  Routes,
  Route,
  useMatch,
} from 'react-router-dom'

import panelService from './services/panels'

import ViewPanel from './routes/ViewPanel'

import Thumbnail from './components/Thumbnail'
import Panel from './components/Panel'

const Panels = ({ panels }) => {
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
  const [panels, setPanels] = useState([])

  useEffect(() => {
    panelService
      .getAll()
      .then(initialPanels => {
        setPanels(initialPanels)
      })
  }, [])

  const match = useMatch('/panel/:id')
  const panel = match
    ? panels.find(panel => panel.id === match.params.id)
    : null

  return (
    <>
      <Routes>
        <Route path='/' element={<Panels panels={panels} />} />
        <Route path='/panel/:id' element={<ViewPanel panel={panel} />} />
      </Routes>
    </>
  )
}

export default App
