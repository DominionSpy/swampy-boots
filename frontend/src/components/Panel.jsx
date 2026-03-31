import { getFillStyle } from '../utils/style'
import { renderCorner, renderEnd, renderGap } from '../utils/svg'
import { mod360, rotate } from '../utils/math'
import Defs from './Defs'
import Element from './Element'

const Panel = ({ panel }) => {
  const isGap = (x, y) => {
    return panel.grid.gaps &&
      panel.grid.gaps.find(g => g.x === x && g.y === y)
  }

  const getGapElement = (x, y) => {
    return panel.elements.find(e => e.type === 'gap' && e.pos.x === x && e.pos.y === y)
  }

  const getEndElement = (x, y) => {
    return panel.elements.find(e => e.type === 'end' && e.pos.x === x && e.pos.y === y)
  }

  const removeEdge = (nodes, node, edge) => {
    node[1].splice(node[1].indexOf(edge), 1)
    if (node.length < 2 || node[1].length === 0) {
      nodes.splice(nodes.indexOf(node), 1)
    }
  }

  const renderGrid = () => {
    const lineWidth = panel.style.lineWidth
    const halfLineWidth = lineWidth / 2

    const nodes = []
    switch (panel.grid.type) {
    case 'square':
      for (let x = 0; x < panel.grid.cols; x++) {
        for (let y = 0; y < panel.grid.rows; y++) {
          const nodeX = x * 2
          const nodeY = y * 2
          const edges = []
          const endElement = getEndElement(nodeX, nodeY)
          if (endElement) {
            const endPosition = rotate(0, -lineWidth, endElement.dir)
            const endX = nodeX + endPosition.x
            const endY = nodeY + endPosition.y
            edges.push([endElement.dir, { x: endX, y: endY }])
          }
          if (x > 0 && !isGap(nodeX - 1, nodeY)) {
            const endElement2 = getEndElement(nodeX - 1, nodeY)
            if (endElement2) {
              edges.push([270, { x: nodeX - 1, y: nodeY }])
            } else {
              edges.push([270, { x: nodeX - 2, y: nodeY }])
            }
          }
          if (x < panel.grid.cols - 1 && !isGap(nodeX + 1, nodeY)) {
            const endElement2 = getEndElement(nodeX + 1, nodeY)
            if (endElement2) {
              edges.push([90, { x: nodeX + 1, y: nodeY }])
              const endEdges = [[90, { x: nodeX + 2, y: nodeY }],
                [270, { x: nodeX, y: nodeY }]]
              const endPosition = rotate(0, -lineWidth, endElement2.dir)
              const endX = nodeX + 1 + endPosition.x
              const endY = nodeY + endPosition.y
              endEdges.push([endElement2.dir, { x: endX, y: endY }])
              nodes.push([{ x: nodeX + 1, y: nodeY }, endEdges])
            } else {
              edges.push([90, { x: nodeX + 2, y: nodeY }])
            }
          }
          if (y > 0 && !isGap(nodeX, nodeY - 1)) {
            const endElement2 = getEndElement(nodeX + 1, nodeY)
            if (endElement2) {
              edges.push([0, { x: nodeX, y: nodeY - 1 }])
            } else {
              edges.push([0, { x: nodeX, y: nodeY - 2 }])
            }
          }
          if (y < panel.grid.rows - 1 && !isGap(nodeX, nodeY + 1)) {
            const endElement2 = getEndElement(nodeX, nodeY + 1)
            if (endElement2) {
              edges.push([0, { x: nodeX, y: nodeY + 1 }])
              const endEdges = [[0, { x: nodeX, y: nodeY + 2 }],
                [180, { x: nodeX, y: nodeY }]]
              const endPosition = rotate(0, -lineWidth, endElement2.dir)
              const endX = nodeX + endPosition.x
              const endY = nodeY + 1 + endPosition.y
              endEdges.push([endElement2.dir, { x: endX, y: endY }])
              nodes.push([{ x: nodeX, y: nodeY + 1 }, endEdges])
            } else {
              edges.push([180, { x: nodeX, y: nodeY + 2 }])
            }
          }
          if (edges.length > 0) {
            nodes.push([{ x: nodeX, y: nodeY }, edges])
          }
        }
      }
      break
    default:
      return
    }

    nodes.sort((a, b) =>
      (a[0].y !== b[0].y)
        ? a[0].y - b[0].y
        : a[0].x - b[0].x)

    const maxX = nodes[nodes.length - 1][0].x
    const maxY = nodes[nodes.length - 1][0].y
    const backgroundPath = `M0,0L${maxX},0L${maxX},${maxY}L0,${maxY}Z`

    const perimeters = []
    const internals = []

    let initialDirection = 0
    let perimeter = true
    let startNode = nodes[0]
    while (startNode) {
      if (startNode[1].filter(edge => edge[0] < 135).length > 0) {
        initialDirection = 0
        perimeter = true
      } else {
        initialDirection = 270
        perimeter = false
      }

      let direction = initialDirection
      let currentNode = startNode
      let initial = true
      let path = ''

      while (currentNode && currentNode[1].length > 0) {
        const nextEdge = currentNode[1]
          .sort((a, b) => mod360(a[0] + 180 - direction - 1)
            - mod360(b[0] + 180 - direction - 1))[0]

        path += renderCorner(
          currentNode[0].x,
          currentNode[0].y,
          direction,
          nextEdge[0],
          halfLineWidth,
          initial
        )

        const edgePos = {
          x: (currentNode[0].x + nextEdge[1].x) / 2,
          y: (currentNode[0].y + nextEdge[1].y) / 2,
        }
        const endElement = getEndElement(currentNode[0].x, currentNode[0].y)
        if (getGapElement(edgePos.x, edgePos.y)) {
          const nextDirection = mod360(nextEdge[0] + 180)
          path += renderGap(
            edgePos.x,
            edgePos.y,
            nextEdge[0],
            halfLineWidth,
            0.15
          )
          direction = nextDirection
          removeEdge(nodes, currentNode, nextEdge)
        } else if (endElement && endElement.dir === nextEdge[0]) {
          path += renderEnd(
            nextEdge[1].x,
            nextEdge[1].y,
            endElement.dir,
            halfLineWidth
          )
          direction = mod360(nextEdge[0] + 180)
          removeEdge(nodes, currentNode, nextEdge)
        } else {
          direction = nextEdge[0]
          removeEdge(nodes, currentNode, nextEdge)
          currentNode = nodes.find(node => JSON.stringify(node[0]) === JSON.stringify(nextEdge[1]))
        }

        initial = false

        if (!currentNode || (currentNode === startNode && initialDirection === direction)) {
          path += 'Z'
          break
        }
      }

      if (perimeter) {
        perimeters.push(path)
      } else {
        internals.push(path)
      }

      // Set up for the next contour
      startNode = nodes[0]
    }

    const perimeterPath = perimeters
      .reduce((accumulator, current) => accumulator + current, '')
    const gridPath = perimeterPath + internals
      .reduce((accumulator, current) => accumulator + current, '')

    return (
      <>
        <path d={backgroundPath} style={getFillStyle(panel.style.gridBackground)} />
        <path d={gridPath} style={getFillStyle(panel.style.gridColor)} />
      </>
    )
  }

  const renderPanel = () => {
    const panelWidth = panel.grid.cols * 2
    const panelHeight = panel.grid.rows * 2

    if (panel.grid.type !== 'square') {
      return 'Unsupported grid type'
    }

    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox={`0 0 ${panelWidth} ${panelHeight}`}>
        <Defs panel={panel} />
        <rect width={panelWidth} height={panelHeight} style={getFillStyle(panel.style.panelBackground)} />
        <g transform='translate(1,1)'>
          {renderGrid()}
          {panel.elements.map(element =>
            <Element key={element.id} panelId={panel.id} element={element} />
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
