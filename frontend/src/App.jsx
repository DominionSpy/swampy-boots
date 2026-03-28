import { useState, useEffect } from 'react'

import panelService from './services/panels'

import Thumbnail from './components/Thumbnail'
import Panel from './components/Panel'

const App = () => {
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
        <Thumbnail key={panel.id} width='150' height='150'
          title={panel.title}>
          <Panel panel={panel} />
        </Thumbnail>
      )}
    </>
  )
}

export default App
