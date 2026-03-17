const NAMED_COLORS = {
  darkbrown: '#3a1e08',
  red: '#e01a1a',
  orange: '#e07d1a',
  lightorange: '#d39630',
  tetrisyellow: '#e8b830',
  yellow: '#e0e01a',
  green: '#1ae01a',
  olive: '#5c6b22',
  lightolive: '#8a9e30',
  blue: '#1a1ae0',
  lightblue: '#1a7dff',
  cyan: '#1ae0e0',
  purple: '#7d1ab8',
  magenta: '#e01ae0',
  lightmagenta:'#b87db8',
  coral: '#e01a7d',
  pink: '#c84888',
  black: '#1a1a1a',
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

export const getFillStyle = color => {
  return {
    fill: resolveColor(color),
  }
}
