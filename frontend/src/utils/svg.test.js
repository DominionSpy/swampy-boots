import { renderCorner, renderEnd, renderGap } from './svg'

describe('renderCorner', () => {
  test('0 degrees', () => {
    const result = renderCorner(4,6, 0, 0, 0.3)

    expect(result).toBe('')
  })

  test('90 degree corner', () => {
    const result = renderCorner(2, 5, 0, 270, 0.3)

    expect(result).toBe('L1.7,5.3')
  })

  test('dead end', () => {
    const result = renderCorner(4, 1, 270, 90, 0.3)

    expect(result).toBe('L3.7,1.3L3.7,0.7')
  })

  test('270 degree angle', () => {
    const result = renderCorner(6, 3, 90, 180, 0.3)

    expect(result).toBe('L6,2.7A0.3,0.3,0,0,1,6.3,3')
  })

  test('60 degree angle', () => {
    const result = renderCorner(7, 1, 300, 180, 0.3)

    expect(result).toBe('L7.3,1.52')
  })
})

describe('renderEnd', () => {
  test('0 degrees', () => {
    const result = renderEnd(6, -0.6, 0, 0.3)
    expect(result).toBe('L5.7,-0.6A0.3,0.3,0,0,1,6.3,-0.6')
  })

  test('45 degrees', () => {
    const result = renderEnd(3.29, 3.71, 45, 0.3)
    expect(result).toBe('L3.078,3.498A0.3,0.3,0,0,1,3.502,3.922')
  })
})

describe('renderGap', () => {
  test('0 degrees', () => {
    const result = renderGap(3, 5, 0, 0.3, 0.15)
    expect(result).toBe('L2.7,5.15L3.3,5.15')
  })

  test('45 degrees', () => {
    const result = renderGap(5, 5, 45, 0.3, 0.15)
    expect(result).toBe('L4.682,4.894L5.106,5.318')
  })
})
