const mod360 = value => (value + 360) % 360

const toRads = degrees => degrees * Math.PI / 180

const round2dp = value => Math.round(value * 100) / 100

export const getAngleBetween = (inAngle, outAngle) =>
  mod360(outAngle - inAngle + 180)

export const getRotate = (x, y, angle) => {
  const rads = toRads(angle)
  return {
    x: round2dp((x * Math.cos(rads)) - (y * Math.sin(rads))),
    y: round2dp((x * Math.sin(rads)) + (y * Math.cos(rads))),
  }
}

export const getScaledVector = (vector, scale) =>
  round2dp(vector * scale)

// Given the specified angle, calculates the x and y coordinates of a position
// on the perimeter of a unit circle around the origin where the tangent
// equals the angle. For example, with an angle of 0 degrees (towards the top),
// a tangent line will intersect the circle at (-1,0).
export const getNormal = (angle) => {
  const rads = toRads(angle)
  return {
    x: -Math.cos(rads),
    y: -Math.sin(rads)
  }
}

// Calculates the x and y coordinates of the intersection of two tangent lines,
// given both angles.
export const getIntersection = (inAngle, outAngle) => {
  const inNormal = getNormal(inAngle)
  const outNormal = getNormal(outAngle)

  const inTan = Math.tan(toRads(inAngle + 90))
  const outTan = Math.tan(toRads(outAngle + 90))

  const inDiff = outNormal.y - (outTan * outNormal.x)
  const outDiff = inNormal.y - (inTan * inNormal.x)

  const inVertical = inAngle % 180 === 0
  const outVertical = outAngle % 180 === 0

  if (inVertical) {
    return {
      x: inNormal.x,
      y: (outTan * inNormal.x) + inDiff
    }
  } else if (outVertical) {
    return {
      x: outNormal.x,
      y: (inTan * outNormal.x) + outDiff
    }
  }

  const x = (outDiff - inDiff) / (outTan - inTan)

  return {
    x: x,
    y: (inTan * x) + outDiff
  }
}
