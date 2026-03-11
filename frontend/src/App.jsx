import { useState, useEffect } from 'react'

import panelService from './services/panels'

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
        <Panel key={panel.id} panel={panel} height='150' width='150' />
      )}
    </>
  )
}

export default App
