export const contaminationPockets = [
  {
    id: "garbage-patch-north-pacific",
    name: "Great Pacific Garbage Patch",
    type: "Plastic Garbage Patch",
    severity: 10,
    category: "garbage-patch",
    description:
      "Largest known offshore plastic accumulation zone, located between Hawaii and California within the North Pacific Subtropical Gyre.",
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [-160.0, 25.0],
          [-132.0, 25.0],
          [-124.0, 38.0],
          [-150.0, 44.0],
          [-166.0, 36.0],
          [-160.0, 25.0]
        ]
      ]
    },
    labelPoint: [-146.0, 34.0]
  },
  {
    id: "garbage-patch-south-pacific",
    name: "South Pacific Garbage Patch",
    type: "Plastic Garbage Patch",
    severity: 8,
    category: "garbage-patch",
    description:
      "Modeled plastic accumulation zone in the South Pacific gyre, west of South America and east of Oceania.",
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [-122.0, -44.0],
          [-88.0, -43.0],
          [-82.0, -28.0],
          [-106.0, -19.0],
          [-132.0, -28.0],
          [-122.0, -44.0]
        ]
      ]
    },
    labelPoint: [-108.0, -33.0]
  },
  {
    id: "garbage-patch-north-atlantic",
    name: "North Atlantic Garbage Patch",
    type: "Plastic Garbage Patch",
    severity: 8,
    category: "garbage-patch",
    description:
      "Plastic accumulation zone associated with the North Atlantic subtropical gyre.",
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [-58.0, 20.0],
          [-30.0, 18.0],
          [-18.0, 32.0],
          [-34.0, 44.0],
          [-55.0, 39.0],
          [-58.0, 20.0]
        ]
      ]
    },
    labelPoint: [-42.0, 31.0]
  },
  {
    id: "garbage-patch-south-atlantic",
    name: "South Atlantic Garbage Patch",
    type: "Plastic Garbage Patch",
    severity: 7,
    category: "garbage-patch",
    description:
      "Plastic accumulation zone associated with the South Atlantic subtropical gyre.",
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [-42.0, -39.0],
          [-10.0, -40.0],
          [2.0, -27.0],
          [-17.0, -16.0],
          [-44.0, -21.0],
          [-42.0, -39.0]
        ]
      ]
    },
    labelPoint: [-22.0, -29.0]
  },
  {
    id: "garbage-patch-indian-ocean",
    name: "Indian Ocean Garbage Patch",
    type: "Plastic Garbage Patch",
    severity: 8,
    category: "garbage-patch",
    description:
      "Plastic accumulation zone associated with the Indian Ocean subtropical gyre.",
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [53.0, -38.0],
          [92.0, -38.0],
          [101.0, -24.0],
          [78.0, -13.0],
          [55.0, -20.0],
          [53.0, -38.0]
        ]
      ]
    },
    labelPoint: [76.0, -27.0]
  },
  {
    id: "pocket-001",
    type: "Plastic Hotspot",
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
