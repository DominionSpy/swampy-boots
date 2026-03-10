const Panel = ({ panel }) => {
  const NAMED_COLORS = {
    darkbrown: '#3a1e08',
    red: '#b82828',
    orange: '#c86018',
    lightorange: '#c87830',
    yellow: '#c8a830',
    green: '#289838',
    olive: '#5c6b22',
    lightolive: '#8a9e30',
    blue: '#3878b8',
    cyan: '#38a8a8',
    purple: '#7028b8',
    pink: '#c84888',
    black: '#0e100a',
    darkgray: '#1a1c0e',
    lightgray: '#a0a888',
    white: '#ffffff',
  }

  const resolveColor = (color) => {
    if (!color) return '#ffffff'
    return NAMED_COLORS[color.toLowerCase()] ?? color
  }

  const panelWidth = 150
  const panelHeight = 150
  const panelPadding = 10
  const lw = 0.6
  const hw = lw/2

  const style = {
    display: 'inline-block',
    width: panelWidth,
    height: panelHeight,
    borderWidth: 1,
    borderColor: 'yellow',
    borderStyle: 'solid',
  }

  const panelStyle = {
    fill: resolveColor(panel.style.panelBackground),
  }

  const gridStyle = {
    fill: resolveColor(panel.style.gridColor),
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

  const getPath = () => {
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

    return gridPath
  }

  const gridPath = getPath()
  const scale = (100 - (2 * panelPadding))/((panel.grid.cols - 1) * 2)

  return (
    <div style={style}>
      <span>{panel.title}</span>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='100%'
        height='100%'
        viewBox='0 0 100 100'>
        <rect width='100' height='100' style={panelStyle} />
        <g transform={`translate(${panelPadding},${panelPadding}) scale(${scale})`}>
          <path
            d={gridPath}
            style={gridStyle} />
        </g>
      </svg>
    </div>
  )
}

export default Panel
