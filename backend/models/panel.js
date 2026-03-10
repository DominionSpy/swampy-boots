const { Schema, model } = require('mongoose')

const deleteIdAndVersion = (returnedObject) => {
  delete returnedObject._id
  delete returnedObject.__v
}

const PositionSchema = Schema({
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
  },
  {
    toJSON: {
      transform: function (document, returnedObject) {
        deleteIdAndVersion(returnedObject)
      }
    }
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
    primaryPathColor: {
      type: String,
      required: true,
    },
    secondaryPathColor: {
      type: String,
      required: false,
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
  },
  {
    toJSON: {
      transform: function (document, returnedObject) {
        deleteIdAndVersion(returnedObject)
      }
    }
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
      default: undefined,
      required: false,
    },
    edges: {
      type: [PositionSchema],
      default: undefined,
      required: false,
    },
    gaps: {
      type: [PositionSchema],
      default: undefined,
      required: false,
    },
    symmetry: {
      type: String,
      required: false,
    },
  },
  {
    toJSON: {
      transform: function (document, returnedObject) {
        deleteIdAndVersion(returnedObject)
      }
    }
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
      default: undefined,
      required: false,
    },
    rotatable: {
      type: Boolean,
      required: false,
    },
  },
  {
    toJSON: {
      transform: function (document, returnedObject) {
        deleteIdAndVersion(returnedObject)
      }
    }
  })

const PanelSchema = Schema({
    title: {
      type: String,
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
    }],
  },
  {
    toJSON: {
      transform: function (document, returnedObject) {
        returnedObject.id = returnedObject._id.toString()
        deleteIdAndVersion(returnedObject)
      }
    }
  })


module.exports = model('Panel', PanelSchema)
