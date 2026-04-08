import { getFillStyle } from '../utils/style'

const Element = ({ panelId, element, x, y }) => {
  const transform = (element.dir ? `rotate(${element.dir}) ` : '')
    + `translate(${x}, ${y})`
  const style = getFillStyle(element.color ? element.color : 'black')

  switch (element.type) {
  case 'start':
    return (
      <use href={`#start${panelId}`} transform={transform} />
    )
  case 'pill':
    return (
      <use href={`#pill${panelId}`} transform={transform} className={`${element.match}${panelId}`} />
    )
  case 'stone':
    return (
      <use href={`#stone${panelId}`} transform={transform} style={style} />
    )
  case 'sun':
    return (
      <use href={`#sun${panelId}`} transform={transform} style={style} />
    )
  case 'eraser':
    return (
      <use href={`#eraser${panelId}`} transform={transform} style={style} />
    )
  case 'polyomino': {
    const translateX = element.shape
      .reduce((acc, block) =>
        Math.max(acc, block.x), -Infinity) / 2
    const translateY = element.shape
      .reduce((acc, block) =>
        Math.max(acc, block.y), -Infinity) / 2
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
      .reduce((acc, block) =>
        Math.max(acc, block.x), -Infinity) / 2
    const translateY = element.shape
      .reduce((acc, block) =>
        Math.max(acc, block.y), -Infinity) / 2
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
  case 'dorito': {
    const translateX = element.shape
      .reduce((acc, block) => Math.max(acc, block.x), -Infinity) / 2
    const translateY = element.shape
      .reduce((acc, block) => Math.max(acc, block.y), -Infinity) / 2
    const shapeTransform = `${transform} scale(0.5) translate(-${translateX},-${translateY})`
    return (
      <g transform={shapeTransform}>
        {element.shape.map(block =>
          <use
            key={`${block.x},${block.y}`}
            href={`#dorito${panelId}`}
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
