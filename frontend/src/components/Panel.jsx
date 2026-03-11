import { getPanelStyle, getGridStyle } from '../utils/style.js'
import Element from './Element'
import { defs } from './Element'

const Panel = ({ panel, width, height }) => {
  const panelWidth = panel.grid.cols * 2
  const panelHeight = panel.grid.rows * 2
  const viewBox = `0 0 ${panelWidth} ${panelHeight}`
  const lw = panel.style.lineWidth
  const hw = lw / 2

  const containerStyle = {
    display: 'inline-block',
    width: width,
    height: height,
  }

  const isGap = (x, y) => {
    return panel.grid.gaps &&
      panel.grid.gaps.find(g => g.x === x && g.y === y)
  }

  const getCoords = (x, y, direction) => {
    const xLineDiff = (direction <= 90 || direction > 270) ? -hw : hw
    const yLineDiff = (direction > 0 && direction <= 180) ? -hw : hw
    return `${x + xLineDiff},${y + yLineDiff}`
  }

  const getEdgeCoords = (x, y, direction) => {
    const xLineDiff = (direction <= 45 || direction > 315) ? -hw
      : (direction > 135 && direction <= 225) ? hw : 0
    const yLineDiff = (direction > 45 && direction <= 135) ? -hw
      : (direction > 225 && direction <= 315) ? hw : 0
    return `${x + xLineDiff},${y + yLineDiff}`
  }

  const mod360 = (value) => (value + 360) % 360

  const renderGrid = () => {
    const nodes = []
    switch (panel.grid.type) {
      case 'square':
        for (let x = 0; x < panel.grid.cols; x++) {
          for (let y = 0; y < panel.grid.rows; y++) {
            const nodeX = x * 2;
            const nodeY = y * 2;
            const edges = []
            if (x > 0 && !isGap(nodeX - 1, nodeY)) {
              edges.push([270, {x: nodeX - 2, y: nodeY}])
            }
            if (x < panel.grid.cols - 1 && !isGap(nodeX + 1, nodeY)) {
              edges.push([90, {x : nodeX + 2, y : nodeY}])
            }
            if (y > 0 && !isGap(nodeX, nodeY - 1)) {
              edges.push([0, {x: nodeX, y: nodeY - 2}])
            }
            if (y < panel.grid.rows - 1 && !isGap(nodeX, nodeY + 1)) {
              edges.push([180, {x : nodeX, y : nodeY + 2}])
            }
            if (edges.length > 0) {
              nodes.push([{x: nodeX, y: nodeY}, edges])
            }
          }
        }
        break;
      default:
        throw new Error('unsupported grid type')
    }

    let gridPath = ''
    let sortedNodes = nodes
      .sort((a, b) => (a[0].y !== b[0].y) ? a[0].y - b[0].y : a[0].x - b[0].x)
    let startNode = sortedNodes.at(0)
    let direction = 0
    while (startNode) {
      // Trace a contour
      let currentNode = startNode
      gridPath += `M${getCoords(currentNode[0].x, currentNode[0].y, direction)}`
      while (true) {
        const nextEdge = currentNode[1]
          .sort((a, b) => mod360(a[0] + 180 - direction - 1) - mod360(b[0] + 180 - direction - 1)).at(0)
        if (mod360(direction - nextEdge[0]) === 180) {
          gridPath += `L${getCoords(currentNode[0].x, currentNode[0].y, (direction + 90) % 360)}`
            + `L${getCoords(currentNode[0].x, currentNode[0].y, (direction + 180) % 360)}`
        } else if (mod360(direction - nextEdge[0]) >= 270) {
          gridPath += `L${getEdgeCoords(currentNode[0].x, currentNode[0].y, direction)}`
            + `A${hw},${hw},0,0,1,${getEdgeCoords(currentNode[0].x, currentNode[0].y, nextEdge[0])}`
        }
        gridPath += `L${getCoords(nextEdge[1].x, nextEdge[1].y, nextEdge[0])}`

        currentNode[1].splice(currentNode[1].indexOf(nextEdge), 1)
        if (currentNode.length < 2 || currentNode[1].length === 0) {
          sortedNodes.splice(sortedNodes.indexOf(currentNode), 1)
        }
        direction = nextEdge[0]
        currentNode = sortedNodes.find(node => JSON.stringify(node[0]) === JSON.stringify(nextEdge[1]))
        if (!currentNode || currentNode === startNode) {
          break;
        }
      }

      // Set up for the next contour
      direction = 270
      startNode = sortedNodes[0]
    }

    return (
      <path d={gridPath} style={getGridStyle(panel.style)} />
    )
  }

  return (
    <div style={containerStyle}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox={viewBox}>
        {defs(panel)}
        <rect width={panelWidth} height={panelHeight} style={getPanelStyle(panel.style)} />
        <g transform={`translate(1,1)`}>
          {renderGrid()}
          {panel.elements.map(element => <Element key={element.id} id={panel.id} element={element} />)}
        </g>
      </svg>
    </div>
  )
}

export default Panel
