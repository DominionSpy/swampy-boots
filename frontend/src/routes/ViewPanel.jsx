import Panel from '../components/Panel'

const ViewPanel = ({ panel }) => {
  return (
    <div style={{ width: '360px', height: '360px' }}>
      <Panel panel={panel} />
    </div>
  )
}

export default ViewPanel
