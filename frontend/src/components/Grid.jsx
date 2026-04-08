import { getAngleBetween, mod360, rotate } from '../utils/math'
import { getFillStyle } from '../utils/style'
import { renderCorner, renderEnd, renderGap } from '../utils/svg'

const Grid = ({ panel }) => {
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

  const isGap = (x, y) => {
    return panel.grid.gaps &&
      panel.grid.gaps.find(g => g.x === x && g.y === y)
  }

  const isStart = (x, y) => {
    return panel.elements.find(
      e => e.type === 'start'
        && e.pos.x === x
        && e.pos.y === y
    )
  }

  const getGapElement = (x, y) => {
    return panel.elements.find(
      e => e.type === 'gap'
        && e.pos.x === x
        && e.pos.y === y
    )
  }

  const getEndElement = (x, y) => {
    return panel.elements.find(
      e => e.type === 'end'
        && e.pos.x === x
        && e.pos.y === y
    )
  }

  const removeEdge = (nodes, node, edge) => {
    const otherNode = nodes.filter(n => JSON.stringify(n[0]) === JSON.stringify(edge[1]))[0]
    if (otherNode) {
      otherNode[2].splice(otherNode[2].indexOf(edge[0]), 1)
    }
    node[1].splice(node[1].indexOf(edge), 1)
    if (node.length < 2 || node[1].length === 0) {
      nodes.splice(nodes.indexOf(node), 1)
    }
  }

  const getBackgroundPath = (nodes) => {
    const nodesCopy = []
    for (let n = 0; n < nodes.length; n++) {
      nodesCopy.push(nodes[n])
    }

    nodesCopy.sort((a, b) =>
      (a[0].y !== b[0].y)
        ? a[0].y - b[0].y
        : a[0].x - b[0].x)

    let path = ''
    let startNode = nodesCopy[0]
    let initialDirection = startNode[2]
      .reduce((previous, dir) => dir < previous
        ? dir : previous
      )

    let direction = initialDirection
    let currentNode = startNode
    let initial = true

    while (currentNode && currentNode[1].length > 0) {
      const nextEdge = currentNode[1]
        .sort((a, b) => mod360(a[0] + 180 - direction - 1)
          - mod360(b[0] + 180 - direction - 1))[0]

      if (getAngleBetween(direction, nextEdge[0]) !== 180) {
        const screenCoords = getScreenCoords(currentNode[0].x, currentNode[0].y)
        path += `${initial ? 'M' : 'L'}${screenCoords.x},${screenCoords.y}`
      }

      const endElement = getEndElement(currentNode[0].x, currentNode[0].y)
      if (endElement && endElement.dir === nextEdge[0]) {
        direction = mod360(nextEdge[0] + 180)
      } else {
        direction = nextEdge[0]
        currentNode = nodesCopy.find(node => JSON.stringify(node[0]) === JSON.stringify(nextEdge[1]))
      }

      initial = false

      if (!currentNode || (currentNode === startNode && initialDirection === direction)) {
        path += 'Z'
        break
      }
    }

    return path
  }

  const getGridPath = (nodes) => {
    const nodesCopy = []
    for (let n = 0; n < nodes.length; n++) {
      nodesCopy.push(nodes[n])
    }

    nodesCopy.sort((a, b) =>
      (a[0].y !== b[0].y)
        ? a[0].y - b[0].y
        : a[0].x - b[0].x)

    const contours = []

    let initialDirection = 0
    let startNode = nodesCopy[0]
    while (startNode) {
      if (startNode[1].filter(edge => edge[0] < 135).length > 0) {
        initialDirection = startNode[2]
          .reduce((previous, dir) => dir < previous
            ? dir : previous
          )
      } else {
        initialDirection = startNode[2]
          .reduce((previous, dir) =>
            mod360(dir - 270) < mod360(previous - 270)
              ? dir : previous
          )
      }

      let direction = initialDirection
      let currentNode = startNode
      let initial = true
      let path = ''

      while (currentNode && currentNode[1].length > 0) {
        const nextEdge = currentNode[1]
          .reduce((next, edge) =>
            mod360(edge[0] + 180 - direction - 1) < mod360(next[0] + 180 - direction - 1)
              ? edge : next
          )

        const screenCoords = getScreenCoords(currentNode[0].x, currentNode[0].y)
        path += renderCorner(
          screenCoords.x,
          screenCoords.y,
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
          const gapScreenCoords = getScreenCoords(edgePos.x, edgePos.y)
          path += renderGap(
            gapScreenCoords.x,
            gapScreenCoords.y,
            nextEdge[0],
            halfLineWidth,
            0.15
          )
          direction = nextDirection
          removeEdge(nodesCopy, currentNode, nextEdge)
        } else if (endElement && endElement.dir === nextEdge[0]) {
          const endLength = isStart(currentNode[0].x, currentNode[0].y)
            ? lineWidth + halfLineWidth
            : lineWidth
          path += renderEnd(
            screenCoords.x,
            screenCoords.y,
            endElement.dir,
            endLength,
            halfLineWidth
          )
          direction = mod360(nextEdge[0] + 180)
          removeEdge(nodesCopy, currentNode, nextEdge)
        } else {
          direction = nextEdge[0]
          removeEdge(nodesCopy, currentNode, nextEdge)
          currentNode = nodesCopy.find(node => JSON.stringify(node[0]) === JSON.stringify(nextEdge[1]))
        }

        initial = false

        if (!currentNode || (currentNode === startNode && initialDirection === direction)) {
          path += 'Z'
          break
        }
      }

      contours.push(path)

      // Set up for the next contour
      startNode = nodesCopy[0]
    }

    return contours
      .reduce((accumulator, current) => accumulator + current, '')
  }

  const lineWidth = panel.style.lineWidth
  const halfLineWidth = lineWidth / 2

  const nodes = []

  switch (panel.grid.type) {
  case 'square':
    for (let x = 0; x < panel.grid.cols; x++) {
      for (let y = 0; y < panel.grid.rows; y++) {
        const nodeX = x * 2
        const nodeY = y * 2
        const outEdges = []
        const inEdges = []
        const endElement = getEndElement(nodeX, nodeY)
        if (endElement) {
          const endPosition = rotate(0, -lineWidth, endElement.dir)
          const endX = nodeX + endPosition.x
          const endY = nodeY + endPosition.y
          outEdges.push([endElement.dir, { x: endX, y: endY }])
        }
        if (x > 0 && !isGap(nodeX - 1, nodeY)) {
          const endElement2 = getEndElement(nodeX - 1, nodeY)
          if (endElement2) {
            outEdges.push([270, { x: nodeX - 1, y: nodeY }])
          } else {
            outEdges.push([270, { x: nodeX - 2, y: nodeY }])
          }
          inEdges.push(90)
        }
        if (x < panel.grid.cols - 1 && !isGap(nodeX + 1, nodeY)) {
          const endElement2 = getEndElement(nodeX + 1, nodeY)
          if (endElement2) {
            outEdges.push([90, { x: nodeX + 1, y: nodeY }])
            const endOutEdges = [
              [90, { x: nodeX + 2, y: nodeY }],
              [270, { x: nodeX, y: nodeY }]
            ]
            const endPosition = rotate(0, -lineWidth, endElement2.dir)
            const endX = nodeX + 1 + endPosition.x
            const endY = nodeY + endPosition.y
            endOutEdges.push([endElement2.dir, { x: endX, y: endY }])
            nodes.push([{ x: nodeX + 1, y: nodeY }, endOutEdges, [90, 270]])
          } else {
            outEdges.push([90, { x: nodeX + 2, y: nodeY }])
          }
          inEdges.push(270)
        }
        if (y > 0 && !isGap(nodeX, nodeY - 1)) {
          const endElement2 = getEndElement(nodeX + 1, nodeY)
          if (endElement2) {
            outEdges.push([0, { x: nodeX, y: nodeY - 1 }])
          } else {
            outEdges.push([0, { x: nodeX, y: nodeY - 2 }])
          }
          inEdges.push(180)
        }
        if (y < panel.grid.rows - 1 && !isGap(nodeX, nodeY + 1)) {
          const endElement2 = getEndElement(nodeX, nodeY + 1)
          if (endElement2) {
            outEdges.push([180, { x: nodeX, y: nodeY + 1 }])
            const endOutEdges = [
              [0, { x: nodeX, y: nodeY + 2 }],
              [180, { x: nodeX, y: nodeY }]
            ]
            const endPosition = rotate(0, -lineWidth, endElement2.dir)
            const endX = nodeX + endPosition.x
            const endY = nodeY + 1 + endPosition.y
            endOutEdges.push([endElement2.dir, { x: endX, y: endY }])
            nodes.push([{ x: nodeX, y: nodeY + 1 }, endOutEdges, [0, 180]])
          } else {
            outEdges.push([180, { x: nodeX, y: nodeY + 2 }])
          }
          inEdges.push(0)
        }
        if (outEdges.length > 0) {
          nodes.push([{ x: nodeX, y: nodeY }, outEdges, inEdges])
        }
      }
    }
    break
  case 'triangle-v':
    for (let y = 0; y < panel.grid.rows.length; y++) {
      for (let x = 0; x < panel.grid.rows[y]; x++) {
        const even = y % 2 === 0
        const nodeX = x * 4 + (even ? 2 : 0)
        const nodeY = y * 2
        const outEdges = []
        const inEdges = []
        const endElement = getEndElement(nodeX, nodeY)
        if (endElement) {
          const endPosition = rotate(0, -lineWidth, endElement.dir)
          const endX = nodeX + endPosition.x
          const endY = nodeY + endPosition.y
          outEdges.push([endElement.dir, { x: endX, y: endY }])
        }
        if (x > 0 && !isGap(nodeX - 2, nodeY)) {
          const endElement2 = getEndElement(nodeX - 2, nodeY)
          if (endElement2) {
            outEdges.push([270, { x: nodeX - 2, y: nodeY }])
          } else {
            outEdges.push([270, { x: nodeX - 4, y: nodeY }])
          }
          inEdges.push(90)
        }
        if (x < panel.grid.rows[y] - 1 && !isGap(nodeX + 2, nodeY)) {
          const endElement2 = getEndElement(nodeX + 2, nodeY)
          if (endElement2) {
            outEdges.push([90, { x: nodeX + 2, y: nodeY }])
            const endOutEdges = [
              [90, { x: nodeX + 4, y: nodeY }],
              [270, { x: nodeX, y: nodeY }]
            ]
            const endPosition = rotate(0, -lineWidth, endElement2.dir)
            const endX = nodeX + 2 + endPosition.x
            const endY = nodeY + endPosition.y
            endOutEdges.push([endElement2.dir, { x: endX, y: endY }])
            nodes.push([{ x: nodeX + 2, y: nodeY }, endOutEdges, [90, 270]])
          } else {
            outEdges.push([90, { x: nodeX + 4, y: nodeY }])
          }
          inEdges.push(270)
        }
        if ((x > 0 || even) && y > 0 && !isGap(nodeX - 1, nodeY - 1)) {
          const endElement2 = getEndElement(nodeX - 1, nodeY - 1)
          if (endElement2) {
            outEdges.push([330, { x: nodeX - 1, y: nodeY - 1 }])
          } else {
            outEdges.push([330, { x: nodeX - 2, y: nodeY - 2 }])
          }
          inEdges.push(150)
        }
        if ((x < panel.grid.rows[y] - 1 || even) && y < panel.grid.rows.length - 1 && !isGap(nodeX + 1, nodeY + 1)) {
          const endElement2 = getEndElement(nodeX + 1, nodeY + 1)
          if (endElement2) {
            outEdges.push([150, { x: nodeX + 1, y: nodeY + 1 }])
            const endOutEdges = [
              [150, { x: nodeX + 2, y: nodeY + 2 }],
              [330, { x: nodeX, y: nodeY }]
            ]
            const endPosition = rotate(0, -lineWidth, endElement2.dir)
            const endX = nodeX + 1 + endPosition.x
            const endY = nodeY + 1 + endPosition.y
            endOutEdges.push([endElement2.dir, { x: endX, y: endY }])
            nodes.push([{ x: nodeX + 1, y: nodeY + 1 }, endOutEdges, [150, 330]])
          } else {
            outEdges.push([150, { x: nodeX + 2, y: nodeY + 2 }])
          }
          inEdges.push(330)
        }
        if ((x < panel.grid.rows[y] - 1 || even) && y > 0 && !isGap(nodeX + 1, nodeY - 1)) {
          const endElement2 = getEndElement(nodeX + 1, nodeY - 1)
          if (endElement2) {
            outEdges.push([30, { x: nodeX + 1, y: nodeY - 1 }])
          } else {
            outEdges.push([30, { x: nodeX + 2, y: nodeY - 2 }])
          }
          inEdges.push(210)
        }
        if ((x > 0 || even) && y < panel.grid.rows.length - 1 && !isGap(nodeX - 1, nodeY + 1)) {
          const endElement2 = getEndElement(nodeX - 1, nodeY + 1)
          if (endElement2) {
            outEdges.push([210, { x: nodeX - 1, y: nodeY + 1 }])
            const endOutEdges = [
              [30, { x: nodeX, y: nodeY }],
              [210, { x: nodeX - 2, y: nodeY + 2 }]
            ]
            const endPosition = rotate(0, -lineWidth, endElement2.dir)
            const endX = nodeX - 1 + endPosition.x
            const endY = nodeY + 1 + endPosition.y
            endOutEdges.push([endElement2.dir, { x: endX, y: endY }])
            nodes.push([{ x: nodeX - 1, y: nodeY + 1 }, endOutEdges, [30, 210]])
          } else {
            outEdges.push([210, { x: nodeX - 2, y: nodeY + 2 }])
          }
          inEdges.push(30)
        }
        if (outEdges.length > 0) {
          nodes.push([{ x: nodeX, y: nodeY }, outEdges, inEdges])
        }
      }
    }
    break
  case 'triangle-h':
    for (let x = 0; x < panel.grid.cols.length; x++) {
      for (let y = 0; y < panel.grid.cols[x]; y++) {
        const even = x % 2 === 0
        const nodeX = x * 2
        const nodeY = y * 4 + (even ? 2 : 0)
        const outEdges = []
        const inEdges = []
        const endElement = getEndElement(nodeX, nodeY)
        if (endElement) {
          const endPosition = rotate(0, -lineWidth, endElement.dir)
          const endX = nodeX + endPosition.x
          const endY = nodeY + endPosition.y
          outEdges.push([endElement.dir, { x: endX, y: endY }])
        }
        if (y > 0 && !isGap(nodeX, nodeY - 2)) {
          const endElement2 = getEndElement(nodeX, nodeY - 2)
          if (endElement2) {
            outEdges.push([0, { x: nodeX, y: nodeY - 2 }])
          } else {
            outEdges.push([0, { x: nodeX, y: nodeY - 4 }])
          }
          inEdges.push(180)
        }
        if (y < panel.grid.cols[x] - 1 && !isGap(nodeX, nodeY + 2)) {
          const endElement2 = getEndElement(nodeX, nodeY + 2)
          if (endElement2) {
            outEdges.push([180, { x: nodeX, y: nodeY + 2 }])
            const endOutEdges = [
              [0, { x: nodeX, y: nodeY }],
              [180, { x: nodeX, y: nodeY + 4 }]
            ]
            const endPosition = rotate(0, -lineWidth, endElement2.dir)
            const endX = nodeX + endPosition.x
            const endY = nodeY + 2 + endPosition.y
            endOutEdges.push([endElement2.dir, { x: endX, y: endY }])
            nodes.push([{ x: nodeX, y: nodeY + 2 }, endOutEdges, [0, 180]])
          } else {
            outEdges.push([180, { x: nodeX, y: nodeY + 4 }])
          }
          inEdges.push(0)
        }
        if ((y > 0 || even) && x > 0 && !isGap(nodeX - 1, nodeY - 1)) {
          const endElement2 = getEndElement(nodeX - 1, nodeY - 1)
          if (endElement2) {
            outEdges.push([300, { x: nodeX - 1, y: nodeY - 1 }])
          } else {
            outEdges.push([300, { x: nodeX - 2, y: nodeY - 2 }])
          }
          inEdges.push(120)
        }
        if ((y < panel.grid.cols[x] - 1 || even) && x < panel.grid.cols.length - 1 && !isGap(nodeX + 1, nodeY + 1)) {
          const endElement2 = getEndElement(nodeX + 1, nodeY + 1)
          if (endElement2) {
            outEdges.push([120, { x: nodeX + 1, y: nodeY + 1 }])
            const endOutEdges = [
              [120, { x: nodeX + 2, y: nodeY + 2 }],
              [300, { x: nodeX, y: nodeY }]
            ]
            const endPosition = rotate(0, -lineWidth, endElement2.dir)
            const endX = nodeX + 1 + endPosition.x
            const endY = nodeY + 1 + endPosition.y
            endOutEdges.push([endElement2.dir, { x: endX, y: endY }])
            nodes.push([{ x: nodeX + 1, y: nodeY + 1 }, endOutEdges, [120, 300]])
          } else {
            outEdges.push([120, { x: nodeX + 2, y: nodeY + 2 }])
          }
          inEdges.push(300)
        }
        if ((y < panel.grid.cols[x] - 1 || even) && x > 0 && !isGap(nodeX - 1, nodeY + 1)) {
          const endElement2 = getEndElement(nodeX - 1, nodeY + 1)
          if (endElement2) {
            outEdges.push([240, { x: nodeX - 1, y: nodeY + 1 }])
          } else {
            outEdges.push([240, { x: nodeX - 2, y: nodeY + 2 }])
          }
          inEdges.push(60)
        }
        if ((y > 0 || even) && x < panel.grid.cols.length - 1 && !isGap(nodeX + 1, nodeY - 1)) {
          const endElement2 = getEndElement(nodeX + 1, nodeY - 1)
          if (endElement2) {
            outEdges.push([60, { x: nodeX + 1, y: nodeY - 1 }])
            const endOutEdges = [
              [60, { x: nodeX + 2, y: nodeY - 2 }],
              [240, { x: nodeX, y: nodeY }]
            ]
            const endPosition = rotate(0, -lineWidth, endElement2.dir)
            const endX = nodeX + 1 + endPosition.x
            const endY = nodeY - 1 + endPosition.y
            endOutEdges.push([endElement2.dir, { x: endX, y: endY }])
            nodes.push([{ x: nodeX + 1, y: nodeY - 1 }, endOutEdges, [60, 240]])
          } else {
            outEdges.push([60, { x: nodeX + 2, y: nodeY - 2 }])
          }
          inEdges.push(240)
        }
        if (outEdges.length > 0) {
          nodes.push([{ x: nodeX, y: nodeY }, outEdges, inEdges])
        }
      }
    }
    break
  default:
    return `Unsupported grid type: ${panel.grid.type}`
  }

  return (
    <>
      <path d={getBackgroundPath(nodes)} style={getFillStyle(panel.style.gridBackground)} />
      <path d={getGridPath(nodes)} style={getFillStyle(panel.style.gridColor)} />
    </>
  )
}

export default Grid
