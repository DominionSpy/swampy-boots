import { useState, useEffect } from 'react'

import panelService from './services/panels'

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
        <div key={panel.id}>
          {panel.id} {panel.title}
        </div>
      )}
    </>
  )
}

export default App
