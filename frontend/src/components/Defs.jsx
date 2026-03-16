import { getFillStyle } from '../utils/style.js'

const Defs = ({ panel }) => {
  const lw = panel.style.lineWidth
  const hw = lw / 2

  const gridStyle = getFillStyle(panel.style.gridColor)

  return (
    <defs>
      <g id={'deadend' + panel.id}>
        <rect x={-hw} y={-hw} width={lw} height={lw} style={gridStyle} />
      </g>
      <g id={'corner' + panel.id}>
        <circle r={hw} style={gridStyle} />
      </g>
      <g id={'start' + panel.id}>
        <circle r={lw} style={gridStyle} />
      </g>
      <g id={'block' + panel.id}>
        <rect x='-0.4' y='-0.4' width='0.8' height='0.8' />
      </g>
    </defs>
  )
}

export default Defs
