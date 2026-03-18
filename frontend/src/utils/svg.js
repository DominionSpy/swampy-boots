import {
  round3dp,
  rotate,
  getAngleBetween,
  getNormal,
  getIntersection
} from './math'

const getRelativeCoords = (x, y, scale, point) => {
  const newX = round3dp(x + (scale * point.x))
  const newY = round3dp(y + (scale * point.y))
  return `${newX},${newY}`
}

export const renderCorner = (x, y, inAngle, outAngle, halfLineWidth, initial = false) => {
  const operation = initial ? 'M' : 'L'
  const joinAngle = getAngleBetween(inAngle, outAngle)
  if (joinAngle === 180) {
    return ''
  } else if (joinAngle === 0) {
    const perpendicularAngle = inAngle + 90
    const reverseAngle = inAngle + 180
    const corner1 = getRelativeCoords(x, y, halfLineWidth,
      getIntersection(inAngle, perpendicularAngle))
    const corner2 = getRelativeCoords(x, y, halfLineWidth,
      getIntersection(perpendicularAngle, reverseAngle))
    return `${operation}${corner1}L${corner2}`
  } else if (joinAngle < 180) {
    const intersection = getRelativeCoords(x, y, halfLineWidth,
      getIntersection(inAngle, outAngle))
    return `${operation}${intersection}`
  }

  const normal1 = getRelativeCoords(x, y, halfLineWidth,
    getNormal(inAngle))
  const normal2 = getRelativeCoords(x, y, halfLineWidth,
    getNormal(outAngle))
  return `${operation}${normal1}A${halfLineWidth},${halfLineWidth},0,0,1,${normal2}`
}

export const renderEnd = (x, y, angle, halfLineWidth) => {
  const corner1 = getRelativeCoords(x, y, 1,
    rotate(-halfLineWidth, 0, angle))
  const corner2 = getRelativeCoords(x, y, 1,
    rotate(halfLineWidth, 0, angle))
  return `L${corner1}A${halfLineWidth},${halfLineWidth},0,0,1,${corner2}`
}

export const renderGap = (x, y, angle, halfLineWidth, halfGapWidth) => {
  const corner1 = getRelativeCoords(x, y, 1,
    rotate(-halfLineWidth, halfGapWidth, angle))
  const corner2 = getRelativeCoords(x, y, 1,
    rotate(halfLineWidth, halfGapWidth, angle))
  return `L${corner1}L${corner2}`
}

export const renderStar = (points, maxD, minD) => {
  const angleDelta = 360 / points / 2
  let path = ''
  for (let p = 0; p < points; p++) {
    const point1 = getRelativeCoords(0, 0, 1,
      rotate(0, -maxD, angleDelta * p * 2))
    const point2 = getRelativeCoords(0, 0, 1,
      rotate(0, -minD, angleDelta * ((p * 2) + 1)))
    path = path.concat(p === 0 ? 'M' : 'L')
      .concat(point1).concat('L').concat(point2)
  }
  path = path.concat('Z')
  return path
}
