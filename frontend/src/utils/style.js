const NAMED_COLORS = {
  darkbrown: '#3a1e08',
  red: '#c80000',
  orange: '#c8641a',
  lightorange: '#d39630',
  tetrisyellow: '#c8a830',
  yellow: '#c8c81a',
  green: '#1ac81a',
  olive: '#5c6b22',
  lightolive: '#8a9e30',
  blue: '#1a1ac8',
  cyan: '#1ac8c8',
  purple: '#7028b8',
  magenta: '#c81ac8',
  lightmagenta:'#b864b8',
  coral: '#c81a64',
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
