const NAMED_COLORS = {
  darkbrown: '#3a1e08',
  red: '#b82828',
  orange: '#c86018',
  lightorange: '#d39630',
  yellow: '#c8a830',
  green: '#289838',
  olive: '#5c6b22',
  lightolive: '#8a9e30',
  blue: '#3878b8',
  cyan: '#38a8a8',
  purple: '#7028b8',
  pink: '#c84888',
  black: '#0e100a',
  darkgray: '#45444B',
  darkgrey: '#45444B',
  gray: '#7a7b7f',
  grey: '#7a7b7f',
  lightgray: '#c3c3c7',
  lightgrey: '#c3c3c7',
  white: '#ffffff',
}

const resolveColor = color => {
  if (!color) return '#ffffff'
  return NAMED_COLORS[color.toLowerCase()] ?? color
}

export const getStyle = color => {
  return {
    fill: resolveColor(color),
  }
}
