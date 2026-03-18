import { getFillStyle } from '../utils/style'

const Defs = ({ panel }) => {
  const lineWidth = panel.style.lineWidth

  const gridStyle = getFillStyle(panel.style.gridColor)

  return (
    <defs>
      <circle id={`start${panel.id}`} r={lineWidth} style={gridStyle} />
      <rect id={`stone${panel.id}`} x='-0.3' y='-0.3' width='0.6' height='0.6' rx='0.16' />
      <rect id={`block${panel.id}`} x='-0.4' y='-0.4' width='0.8' height='0.8' />
    </defs>
  )
}

export default Defs
