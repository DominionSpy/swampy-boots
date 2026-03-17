import { getFillStyle } from '../utils/style.js'

const Defs = ({ panel }) => {
  const lineWidth = panel.style.lineWidth

  const gridStyle = getFillStyle(panel.style.gridColor)

  return (
    <defs>
      <g id={'start' + panel.id}>
        <circle r={lineWidth} style={gridStyle} />
      </g>
      <g id={'block' + panel.id}>
        <rect x='-0.4' y='-0.4' width='0.8' height='0.8' />
      </g>
    </defs>
  )
}

export default Defs
