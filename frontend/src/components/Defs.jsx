import { getColor, getFillStyle } from '../utils/style'
import { renderPolygon, renderStar, renderFlatStar } from '../utils/svg'

const Defs = ({ panel }) => {
  const lineWidth = panel.style.lineWidth
  const halfLineWidth = lineWidth / 2

  const primaryPathColor = getColor(panel.style.primaryPathColor)
  const secondaryPathColor = getColor(panel.style.secondaryPathColor)

  const pillPath = renderPolygon(6, halfLineWidth)
  const hollowPath = 'M-0.4,-0.4L0.4,-0.4L0.4,0.4L-0.4,0.4Z'
    + 'M-0.2,-0.2L-0.2,0.2L0.2,0.2L0.2,-0.2Z'
  const hollowStyle = getFillStyle('blue')
  const sunPath = renderStar(8, 0.4, 0.3)
  const eraserPath = renderFlatStar(3, 0.3, 0.1, 0.08)
  const doritoPath = renderPolygon(3, 0.5)
  const doritoStyle = getFillStyle('lightorange')

  return (
    <>
      <defs>
        <circle id={`start${panel.id}`} r={lineWidth} className={`gridColor${panel.id}`} />
        <path id={`pill${panel.id}`} d={pillPath} transform='rotate(90)' />
        <rect id={`stone${panel.id}`} x='-0.3' y='-0.3' width='0.6' height='0.6' rx='0.16' />
        <rect id={`block${panel.id}`} x='-0.4' y='-0.4' width='0.8' height='0.8' />
        <path id={`hollow${panel.id}`} d={hollowPath} style={hollowStyle} />
        <path id={`sun${panel.id}`} d={sunPath} />
        <path id={`eraser${panel.id}`} d={eraserPath} />
        <path id={`dorito${panel.id}`} d={doritoPath} style={doritoStyle} />
      </defs>
      <style>{`
        .panelBackground${panel.id} {
          fill: ${getColor(panel.style.panelBackground)};
        }
        .gridBackground${panel.id} {
          fill: ${getColor(panel.style.gridBackground)};
        }
        .gridColor${panel.id} {
          fill: ${getColor(panel.style.gridColor)};
        }
        .primary${panel.id} {
          fill: ${primaryPathColor};
        }
        .secondary${panel.id} {
          fill: ${secondaryPathColor};
        }
      `}</style>
    </>
  )
}

export default Defs
