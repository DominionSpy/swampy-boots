const NAMED_COLORS = {
  darkbrown: '#3a1e08',
  red: '#e01a1a',
  orange: '#e07d1a',
  lightorange: '#d39630',
  tetrisyellow: '#e8b830',
  yellow: '#e0e01a',
  olive: '#5c6b22',
  lightolive: '#8a9e30',
  lime: '#7de01a',
  green: '#1ae01a',
  darkgreen: '#1a4d1a',
  darkteal: '#3d5d5d',
  cyan: '#1ae0e0',
  skyblue: '#4dd0ff',
  blue: '#1a1ae0',
  lightblue: '#1a7dff',
  purple: '#7d1ab8',
  magenta: '#e01ae0',
  lightmagenta:'#b87db8',
  coral: '#e01a7d',
  pink: '#c84888',
  black: '#1a1a1a',
  darkgray: '#45444b',
  darkgrey: '#45444b',
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
