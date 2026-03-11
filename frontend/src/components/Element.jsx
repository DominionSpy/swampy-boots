import { getGridStyle } from '../utils/style'

export const defs = (panel) => {
  const lw = panel.style.lineWidth
  const hw = lw / 2

  const endPath = `M${-hw},${hw}L${-hw},${-lw}A${hw},${hw},0,0,1,${hw},${-lw}L${hw},${hw}Z`

  return (
    <defs>
      <g id={'start' + panel.id}>
        <circle r={lw} style={getGridStyle(panel.style)} />
      </g>
      <g id={'end' + panel.id}>
        <path d={endPath} style={getGridStyle(panel.style)} />
      </g>
    </defs>
  )
}

const Element = ({ id, element }) => {
  const transform = (element.dir ? `rotate(${element.dir}) ` : '')
    + `translate(${element.pos.x}, ${element.pos.y})`

  switch (element.type) {
    case 'start':
      return (
        <use href={'#start' + id} transform={transform} />
      )
    case 'end':
      return (
        <use href={'#end' + id} transform={transform} />
      )
    case 'polyomino':
      return
    case 'gap':
      // Handled by renderGrid
      return
    default:
      throw new Error('unsupported element type')
  }
}

export default Element
