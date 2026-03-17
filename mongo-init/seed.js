db = db.getSiblingDB('swampyBootsApp')

db.panels.insertMany([
  {
    "title": "Entry Panel 4",
    "style": {
      "panelBackground": "lightorange",
      "gridBackground": "lightorange",
      "gridColor": "darkbrown",
      "primaryPathColor": "yellow",
      "lineWidth": 0.6
    },
    "grid": {
      "type": "square",
      "cols": 13,
      "rows": 13
    },
    "elements": [
      {
        "type": "start",
        "pos": {
          "x": 0,
          "y": 12
        }
      },
      {
        "type": "start",
        "pos": {
          "x": 12,
          "y": 12
        }
      },
      {
        "type": "end",
        "pos": {
          "x": 6,
          "y": 0
        },
        "dir": 270
      },
      {
        "type": "gap",
        "pos": {
          "x": 1,
          "y": 0
        }
      },
      {
        "type": "gap",
        "pos": {
          "x": 5,
          "y": 0
        }
      },
      {
        "type": "gap",
        "pos": {
          "x": 7,
          "y": 0
        }
      },
      {
        "type": "gap",
        "pos": {
          "x": 8,
          "y": 1
        }
      },
      {
        "type": "gap",
        "pos": {
          "x": 10,
          "y": 1
        }
      },
      {
        "type": "gap",
        "pos": {
          "x": 1,
          "y": 2
        }
      },
      {
        "type": "gap",
        "pos": {
          "x": 7,
          "y": 2
        }
      },
      {
        "type": "gap",
        "pos": {
          "x": 4,
          "y": 3
        }
      },
      {
        "type": "gap",
        "pos": {
          "x": 6,
          "y": 3
        }
      },
      {
        "type": "gap",
        "pos": {
          "x": 12,
          "y": 3
        }
      },
      {
        "type": "gap",
        "pos": {
          "x": 1,
          "y": 4
        }
      },
      {
        "type": "gap",
        "pos": {
          "x": 5,
          "y": 4
        }
      },
      {
        "type": "gap",
        "pos": {
          "x": 9,
          "y": 4
        }
      },
      {
        "type": "gap",
        "pos": {
          "x": 2,
          "y": 5
        }
      },
      {
        "type": "gap",
        "pos": {
          "x": 8,
          "y": 5
        }
      },
      {
        "type": "gap",
        "pos": {
          "x": 10,
          "y": 5
        }
      },
      {
        "type": "gap",
        "pos": {
          "x": 3,
          "y": 6
        }
      },
      {
        "type": "gap",
        "pos": {
          "x": 7,
          "y": 6
        }
      },
      {
        "type": "gap",
        "pos": {
          "x": 4,
          "y": 7
        }
      },
      {
        "type": "gap",
        "pos": {
          "x": 6,
          "y": 7
        }
      },
      {
        "type": "gap",
        "pos": {
          "x": 12,
          "y": 7
        }
      },
      {
        "type": "gap",
        "pos": {
          "x": 7,
          "y": 8
        }
      },
      {
        "type": "gap",
        "pos": {
          "x": 9,
          "y": 8
        }
      },
      {
        "type": "gap",
        "pos": {
          "x": 2,
          "y": 9
        }
      },
      {
        "type": "gap",
        "pos": {
          "x": 8,
          "y": 9
        }
      },
      {
        "type": "gap",
        "pos": {
          "x": 10,
          "y": 9
        }
      },
      {
        "type": "gap",
        "pos": {
          "x": 3,
          "y": 10
        }
      },
      {
        "type": "gap",
        "pos": {
          "x": 9,
          "y": 10
        }
      },
      {
        "type": "gap",
        "pos": {
          "x": 5,
          "y": 12
        }
      },
      {
        "type": "gap",
        "pos": {
          "x": 9,
          "y": 12
        }
      }
    ]
  },
  {
    "title": "Swamp Tram",
    "style": {
      "panelBackground": "darkgrey",
      "gridBackground": "grey",
      "gridColor": "lightgrey",
      "primaryLineColor": "white",
      "lineWidth": 0.6
    },
    "grid": {
      "type": "square",
      "cols": 8,
      "rows": 4
    },
    "elements": [
      {
        "type": "start",
        "pos": {
          "x": 0,
          "y": 6
        }
      },
      {
        "type": "end",
        "pos": {
          "x": 14,
          "y": 0
        },
        "dir": 0
      },
      {
        "type": "polyomino",
        "pos": {
          "x": 1,
          "y": 3
        },
        "color": "yellow",
        "shape": [
          {
            "x": 0,
            "y": 0
          },
          {
            "x": 0,
            "y": 1
          },
          {
            "x": 0,
            "y": 2
          }
        ],
        "rotatable": false
      },
      {
        "type": "polyomino",
        "pos": {
          "x": 7,
          "y": 3
        },
        "color": "yellow",
        "shape": [
          {
            "x": 0,
            "y": 0
          },
          {
            "x": 1,
            "y": 0
          },
          {
            "x": 2,
            "y": 0
          }
        ],
        "rotatable": false
      },
      {
        "type": "polyomino",
        "pos": {
          "x": 13,
          "y": 3
        },
        "color": "yellow",
        "shape": [
          {
            "x": 0,
            "y": 0
          },
          {
            "x": 0,
            "y": 1
          },
          {
            "x": 0,
            "y": 2
          }
        ],
        "rotatable": false
      }
    ]
  }
])

print('Seed complete — inserted', db.panels.countDocuments(), 'panels.')
