import panelService from '../services/panels'
import { useEffect, useState } from 'react'
import Thumbnail from '../components/Thumbnail'
import Panel from '../components/Panel'

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

export default PanelList
