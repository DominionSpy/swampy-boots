import {
  getAngleBetween,
  getRotate,
  getNormal,
  getIntersection,
  getScaledVector
} from './math.js'

export const renderCorner = (x, y, inAngle, outAngle, halfLineWidth, initial = false) => {
  const operation = initial ? 'M' : 'L'
  const joinAngle = getAngleBetween(inAngle, outAngle)
  if (joinAngle === 180) {
    return ''
  } else if (joinAngle === 0) {
    const perpendicularDirection = inAngle + 90
    const reverseDirection = inAngle + 180
    const intersection1 = getIntersection(inAngle, perpendicularDirection)
    const x1 = x + getScaledVector(intersection1.x, halfLineWidth)
    const y1 = y + getScaledVector(intersection1.y, halfLineWidth)
    const intersection2 = getIntersection(perpendicularDirection, reverseDirection)
    const x2 = x + getScaledVector(intersection2.x, halfLineWidth)
    const y2 = y + getScaledVector(intersection2.y, halfLineWidth)
    return `${operation}${x1},${y1}L${x2},${y2}`
  } else if (joinAngle < 180) {
    const intersection = getIntersection(inAngle, outAngle)
    const x1 = x + getScaledVector(intersection.x, halfLineWidth)
    const y1 = y + getScaledVector(intersection.y, halfLineWidth)
    return `${operation}${x1},${y1}`
  }

  const intersection1 = getNormal(inAngle)
  const x1 = x + getScaledVector(intersection1.x, halfLineWidth)
  const y1 = y + getScaledVector(intersection1.y, halfLineWidth)
  const intersection2 = getNormal(outAngle)
  const x2 = x + getScaledVector(intersection2.x, halfLineWidth)
  const y2 = y + getScaledVector(intersection2.y, halfLineWidth)
  return `${operation}${x1},${y1}A${halfLineWidth},${halfLineWidth},0,0,1,${x2},${y2}`
}

export const renderEnd = (x, y, angle, halfLineWidth) => {
  const corner1 = getRotate(-halfLineWidth, 0, angle)
  const x1 = x + corner1.x
  const y1 = y + corner1.y
  const corner2 = getRotate(halfLineWidth, 0, angle)
  const x2 = x + corner2.x
  const y2 = y + corner2.y

  return `L${x1},${y1}A${halfLineWidth},${halfLineWidth},0,0,1,${x2},${y2}`
}

export const renderGap = (x, y, angle, halfLineWidth, halfGapWidth) => {
  const corner1 = getRotate(-halfLineWidth, halfGapWidth, angle)
  const x1 = x + corner1.x
  const y1 = y + corner1.y
  const corner2 = getRotate(halfLineWidth, halfGapWidth, angle)
  const x2 = x + corner2.x
  const y2 = y + corner2.y

  return `L${x1},${y1}L${x2},${y2}`
}
