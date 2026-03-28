const mod360 = value => (value + 360) % 360

const toRads = degrees => degrees * Math.PI / 180

export const round3dp = value => Math.round(value * 1000) / 1000

export const getAngleBetween = (inAngle, outAngle) =>
  mod360(outAngle - inAngle + 180)

// Rotates a set of x and y coordinates by a specified number of degrees
export const rotate = (x, y, angle) => {
  const rads = toRads(angle)
  return {
    x: (x * Math.cos(rads)) - (y * Math.sin(rads)),
    y: (x * Math.sin(rads)) + (y * Math.cos(rads)),
  }
}

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
  // The math is more straightforward if one of the angles is vertical,
  // so we assume the in angle is vertical, normalize the out angle relative
  // to it and calculate y (x is -1). Then we just rotate the result by
  // the original in angle to get the correct result.
  const normalizedOutAngle = mod360(outAngle - inAngle)

  const outNormal = getNormal(normalizedOutAngle)
  const outTan = Math.tan(toRads(normalizedOutAngle + 90))
  const diff = outNormal.y - (outTan * outNormal.x)

  const y = -outTan + diff

  return rotate(-1, y, inAngle)
}
