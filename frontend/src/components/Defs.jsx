import {getStyle} from "../utils/style.js";

const Defs = ({ panel }) => {
  const lw = panel.style.lineWidth
  const hw = lw / 2

  const endPath = `M${-hw},${hw}L${-hw},${-lw}A${hw},${hw},0,0,1,${hw},${-lw}L${hw},${hw}Z`

  return (
    <defs>
      <g id={'start' + panel.id}>
        <circle r={lw} style={getStyle(panel.style.gridColor)} />
      </g>
      <g id={'end' + panel.id}>
        <path d={endPath} style={getStyle(panel.style.gridColor)} />
      </g>
      <g id={'block' + panel.id}>
        <rect x='-0.4' y='-0.4' width='0.8' height='0.8' />
      </g>
    </defs>
  )
}

export default Defs
