export const contaminationPockets = [
  {
    id: "pocket-001",
    type: "Plastic",
    severity: 8,
    description: "High-density floating plastic debris field near a known turtle corridor.",
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [-126.4, 34.0],
          [-124.6, 34.0],
          [-124.4, 35.2],
          [-126.1, 35.5],
          [-126.4, 34.0]
        ]
      ]
    }
  },
  {
    id: "pocket-002",
    type: "Chemical",
    severity: 6,
    description: "Modeled chemical runoff plume from coastal storm discharge.",
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [-123.3, 36.0],
          [-121.9, 36.1],
          [-121.6, 37.0],
          [-122.8, 37.4],
          [-123.3, 36.0]
        ]
      ]
    }
  }
];

export const migrationPaths = [
  {
    id: "migration-001",
    speciesName: "Leatherback Sea Turtle",
    timestamp: "2026-04-18T15:10:00.000Z",
    path: {
      type: "LineString",
      coordinates: [
        [-128.0, 33.6],
        [-126.0, 34.4],
        [-124.9, 34.8],
        [-123.5, 35.3]
      ]
    }
  },
  {
    id: "migration-002",
    speciesName: "Humpback Whale",
    timestamp: "2026-04-18T14:25:00.000Z",
    path: {
      type: "LineString",
      coordinates: [
        [-124.8, 35.4],
        [-123.0, 36.2],
        [-122.2, 36.6],
        [-121.0, 37.2]
      ]
    }
  },
  {
    id: "migration-003",
    speciesName: "Blue Shark",
    timestamp: "2026-04-18T13:50:00.000Z",
    path: {
      type: "LineString",
      coordinates: [
        [-129.0, 31.0],
        [-127.5, 31.8],
        [-126.4, 32.5],
        [-125.0, 33.0]
      ]
    }
  }
];
