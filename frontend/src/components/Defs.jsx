import { getFillStyle } from '../utils/style'
import { renderStar, renderFlatStar } from '../utils/svg'

const Defs = ({ panel }) => {
  const lineWidth = panel.style.lineWidth

  const gridStyle = getFillStyle(panel.style.gridColor)

  const hollowPath = 'M-0.4,-0.4L0.4,-0.4L0.4,0.4L-0.4,0.4Z'
    + 'M-0.2,-0.2L-0.2,0.2L0.2,0.2L0.2,-0.2Z'
  const hollowStyle = getFillStyle('blue')
  const sunPath = renderStar(8, 0.4, 0.28)
  const eraserPath = renderFlatStar(3, 0.3, 0.1, 0.08)

  return (
    <defs>
      <circle id={`start${panel.id}`} r={lineWidth} style={gridStyle} />
      <rect id={`stone${panel.id}`} x='-0.3' y='-0.3' width='0.6' height='0.6' rx='0.16' />
      <rect id={`block${panel.id}`} x='-0.4' y='-0.4' width='0.8' height='0.8' />
      <path id={`hollow${panel.id}`} d={hollowPath} style={hollowStyle} />
      <path id={`sun${panel.id}`} d={sunPath} />
      <path id={`eraser${panel.id}`} d={eraserPath} />
    </defs>
  )
}

export default Defs
