import { getNormal, getIntersection } from './math'

describe('getNormal', () => {
  test('0 degrees', () => {
    const result = getNormal(0)
    expect(result.x).toBeCloseTo(-1)
    expect(result.y).toBeCloseTo(0)
  })

  test('90 degrees', () => {
    const result = getNormal(90)
    expect(result.x).toBeCloseTo(0)
    expect(result.y).toBeCloseTo(-1)
  })

  test('180 degrees', () => {
    const result = getNormal(180)
    expect(result.x).toBeCloseTo(1)
    expect(result.y).toBeCloseTo(0)
  })

  test('270 degrees', () => {
    const result = getNormal(270)
    expect(result.x).toBeCloseTo(0)
    expect(result.y).toBeCloseTo(1)
  })

  test('45 degrees', () => {
    const result = getNormal(45)
    expect(result.x).toBeCloseTo(-0.71)
    expect(result.y).toBeCloseTo(-0.71)
  })

  test('135 degrees', () => {
    const result = getNormal(135)
    expect(result.x).toBeCloseTo(0.71)
    expect(result.y).toBeCloseTo(-0.71)
  })

  test('225 degrees', () => {
    const result = getNormal(225)
    expect(result.x).toBeCloseTo(0.71)
    expect(result.y).toBeCloseTo(0.71)
  })

  test('315 degrees', () => {
    const result = getNormal(315)
    expect(result.x).toBeCloseTo(-0.71)
    expect(result.y).toBeCloseTo(0.71)
  })

  test('300 degrees', () => {
    const result = getNormal(300)
    expect(result.x).toBeCloseTo(-0.5)
    expect(result.y).toBeCloseTo(0.87)
  })
})

describe('getIntersection', () => {
  test('0 degrees in and 270 degrees out', () => {
    const result = getIntersection(0, 270)
    expect(result.x).toBeCloseTo(-1)
    expect(result.y).toBeCloseTo(1)
  })

  test('90 degrees in and 0 degrees out', () => {
    const result = getIntersection(90, 0)
    expect(result.x).toBeCloseTo(-1)
    expect(result.y).toBeCloseTo(-1)
  })

  test('180 degrees in and 90 degrees out', () => {
    const result = getIntersection(180, 90)
    expect(result.x).toBeCloseTo(1)
    expect(result.y).toBeCloseTo(-1)
  })

  test('270 degrees in and 180 degrees out', () => {
    const result = getIntersection(270, 180)
    expect(result.x).toBeCloseTo(1)
    expect(result.y).toBeCloseTo(1)
  })

  test('45 degrees in and 315 degrees out', () => {
    const result = getIntersection(45, 315)
    expect(result.x).toBeCloseTo(-1.41)
    expect(result.y).toBeCloseTo(0)
  })

  test('135 degrees in and 45 degrees out', () => {
    const result = getIntersection(135, 45)
    expect(result.x).toBeCloseTo(0)
    expect(result.y).toBeCloseTo(-1.41)
  })

  test('225 degrees in and 135 degrees out', () => {
    const result = getIntersection(225, 135)
    expect(result.x).toBeCloseTo(1.41)
    expect(result.y).toBeCloseTo(0)
  })

  test('315 degrees in and 225 degrees out', () => {
    const result = getIntersection(315, 225)
    expect(result.x).toBeCloseTo(0)
    expect(result.y).toBeCloseTo(1.41)
  })

  test('0 degrees in and 240 degrees out', () => {
    const result = getIntersection(0, 240)
    expect(result.x).toBeCloseTo(-1)
    expect(result.y).toBeCloseTo(1.73)
  })

  test('30 degrees in and 270 degrees out', () => {
    const result = getIntersection(30, 270)
    expect(result.x).toBeCloseTo(-1.73)
    expect(result.y).toBeCloseTo(1)
  })

  test('60 degrees in and 300 degrees out', () => {
    const result = getIntersection(60, 300)
    expect(result.x).toBeCloseTo(-2)
    expect(result.y).toBeCloseTo(0)
  })

  test('90 degrees in and 330 degrees out', () => {
    const result = getIntersection(90, 330)
    expect(result.x).toBeCloseTo(-1.73)
    expect(result.y).toBeCloseTo(-1)
  })
})
