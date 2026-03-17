import { getFillStyle } from '../utils/style'

const Element = ({ panelId, element }) => {
  const transform = (element.dir ? `rotate(${element.dir}) ` : '')
    + `translate(${element.pos.x}, ${element.pos.y})`

  const style = element.color ? getFillStyle(element.color) : ''

  switch (element.type) {
  case 'start':
    return (
      <use href={'#start' + panelId} transform={transform} />
    )
  case 'polyomino': {
    const translateX = element.shape
      .map(block => block.x)
      .sort((a, b) => b - a)[0] / 2
    const translateY = element.shape
      .map(block => block.y)
      .sort((a, b) => b - a)[0] / 2
    const polyTransform = `${transform} scale(0.35) translate(-${translateX},-${translateY})`
    return (
      <g transform={polyTransform}>
        {element.shape.map(block =>
          <use
            key={`${block.x},${block.y}`}
            href={`#block${panelId}`}
            transform={`translate(${block.x},${block.y})`}
            style={style}
          />
        )}
      </g>
    )
  }
  default:
    return
  }
}

export default Element
