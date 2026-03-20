import { getFillStyle } from '../utils/style'

const Element = ({ panelId, element }) => {
  const transform = (element.dir ? `rotate(${element.dir}) ` : '')
    + `translate(${element.pos.x}, ${element.pos.y})`

  const style = element.color ? getFillStyle(element.color) : ''

  switch (element.type) {
  case 'start':
    return (
      <use href={`#start${panelId}`} transform={transform} />
    )
  case 'stone':
    return (
      <use href={`#stone${panelId}`} transform={transform} style={style} />
    )
  case 'sun':
    return (
      <use href={`#sun${panelId}`} transform={transform} style={style} />
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
  case 'hollomino': {
    const translateX = element.shape
      .reduce((acc, block) => Math.max(acc, block.x), -Infinity) / 2
    const translateY = element.shape
      .reduce((acc, block) => Math.max(acc, block.y), -Infinity) / 2
    const polyTransform = `${transform} scale(0.35) translate(-${translateX},-${translateY})`
    return (
      <g transform={polyTransform}>
        {element.shape.map(block =>
          <use
            key={`${block.x},${block.y}`}
            href={`#hollow${panelId}`}
            transform={`translate(${block.x},${block.y})`}
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
