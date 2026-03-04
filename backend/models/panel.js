const { Schema, model } = require('mongoose')

const PositionSchema = Schema({
  x: {
    type: Number,
    required: true,
  },
  y: {
    type: Number,
    required: true,
  },
})

const EdgeSchema = Schema({
  from: {
    type: PositionSchema,
    required: true,
  },
  to: {
    type: PositionSchema,
    required: true,
  },
})

const StyleSchema = Schema({
  panelBackground: {
    type: String,
    required: true,
  },
  gridBackground: {
    type: String,
    required: true,
  },
  gridColor: {
    type: String,
    required: true,
  },
  lineColor: {
    type: String,
    required: true,
  },
  lineWidth: {
    type: Number,
    required: true,
  },
  panelWidth: {
    type: Number,
    required: true,
  },
  panelHeight: {
    type: Number,
    required: true,
  },
})

const GridSchema = Schema({
  type: {
    type: String,
    required: true,
  },
  cols: {
    type: Schema.Types.Union,
    of: [Number, [Number]],
    required: false,
  },
  rows: {
    type: Schema.Types.Union,
    of: [Number, [Number]],
    required: false,
  },
  nodes: {
    type: [PositionSchema],
    required: false,
  },
  edges: {
    type: [EdgeSchema],
    required: false,
  },
  gaps: {
    type: [EdgeSchema],
    required: false,
  },
})

const ElementSchema = Schema({
  type: {
    type: String,
    required: true,
  },
  pos: {
    type: PositionSchema,
    required: true,
  },
  dir: {
    type: Number,
    required: false,
  },
  shape: {
    type: [PositionSchema],
    required: false,
  },
  rotatable: {
    type: Boolean,
    required: false,
  }
})

const PanelSchema = Schema({
  version: {
    type: Number,
    value: 1,
    required: true,
  },
  style: {
    type: StyleSchema,
    required: true,
  },
  grid: {
    type: GridSchema,
    required: true,
  },
  elements: [{
    type: ElementSchema,
    required: true,
  }]
})

PanelSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = model('Panel', PanelSchema)
