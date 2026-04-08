import { getFillStyle } from '../utils/style'
import Defs from './Defs'
import Grid from './Grid'
import Element from './Element'

const Panel = ({ panel }) => {
  const getPanelDimensions = () => {
    switch (panel.grid.type) {
    case 'square':
      return {
        width: panel.grid.cols * 2,
        height: panel.grid.rows * 2,
      }
    case 'triangle-v':
      return {
        width: panel.grid.rows
          .reduce((acc, col) =>
            Math.max(acc, col), -Infinity) * 2,
        height: ((panel.grid.rows.length - 1) * 2 * 0.866) + 2
      }
    case 'triangle-h':
      return {
        width: ((panel.grid.cols.length - 1) * 2 * 0.866) + 2,
        height: panel.grid.cols
          .reduce((acc, row) =>
            Math.max(acc, row), -Infinity) * 2,
      }
    default:
      return {
        width: 0,
        height: 0,
      }
    }
  }

  const getScreenCoords = (gridX, gridY) => {
    switch (panel.grid.type) {
    case 'square':
      return {
        x: gridX,
        y: gridY,
      }
    case 'triangle-v':
      return {
        x: gridX / 2,
        y: gridY * 0.866,
      }
    case 'triangle-h':
      return {
        x: gridX * 0.866,
        y: gridY / 2,
      }
    default:
      return {
        x: 0,
        y: 0,
      }
    }
  }

  const renderPanel = () => {
    const panelDimensions = getPanelDimensions()

    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox={`0 0 ${panelDimensions.width} ${panelDimensions.height}`}
        width='100%'
        height='100%'
      >
        <Defs panel={panel} />
        <rect
          width={panelDimensions.width}
          height={panelDimensions.height}
          style={getFillStyle(panel.style.panelBackground)} />
        <g transform='translate(1,1)'>
          <Grid panel={panel} />
          {panel.elements.map(element => {
            const screenCoords = getScreenCoords(element.pos.x, element.pos.y)
            return (
              <Element
                key={element.id}
                panelId={panel.id}
                element={element}
                x={screenCoords.x}
                y={screenCoords.y}
              />
            )}
          )}
        </g>
      </svg>
    )
  }

  return (
    <>
      {!panel && 'No panel'}
      {panel && renderPanel()}
    </>
  )
}

export default Panel
