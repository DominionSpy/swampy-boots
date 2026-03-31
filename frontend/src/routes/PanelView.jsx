import Panel from '../components/Panel'
import { useMatch } from 'react-router-dom'
import { useEffect, useState } from 'react'

import panelService from '../services/panels'

const PanelView = () => {
  const [panel, setPanel] = useState(null)
  const match = useMatch('/panel/:id')

  useEffect(() => {
    panelService
      .getById(match.params.id)
      .then(initialPanel => {
        setPanel(initialPanel)
      })
  }, [])

  return (
    <div style={{ width: '360px', height: '360px' }}>
      {panel && <Panel panel={panel}/>}
      {!panel && 'No panel available'}
    </div>
  )
}

export default PanelView
