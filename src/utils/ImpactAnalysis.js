import * as turf from "@turf/turf";

/**
 * Analyzes the impact of contamination zones on migration paths.
 * @param {Object} whaleGeoJson - FeatureCollection of migration paths (LineStrings)
 * @param {Object} contaminationGeoJson - FeatureCollection of contamination zones (Polygons)
 * @returns {Object} Analysis results including intersections and metrics.
 */
export function analyzeImpact(whaleGeoJson, contaminationGeoJson) {
  if (!whaleGeoJson || !contaminationGeoJson) return null;

  const results = [];
  let totalIntersections = 0;
  let totalLengthInRiskZone = 0;

  whaleGeoJson.features.forEach((whaleFeature) => {
    const whalePath = whaleFeature.geometry;
    const whaleName = whaleFeature.properties.name || whaleFeature.properties.id || "Unknown Whale";
    
    let pathRiskLength = 0;
    const intersections = [];

    contaminationGeoJson.features.forEach((zoneFeature) => {
      const zone = zoneFeature.geometry;
      const zoneName = zoneFeature.properties.name || "Contamination Zone";

      // Find intersection points
      const intersectPoints = turf.lineIntersect(whaleFeature, zoneFeature);
      if (intersectPoints.features.length > 0) {
        totalIntersections += intersectPoints.features.length;
        intersections.push({
          zoneName,
          pointCount: intersectPoints.features.length
        });

        // Calculate length within polygon (rough approximation using lineChunk or booleanWithin)
        // For simplicity in a hackathon, we'll mark it as "At Risk" if there's any intersection
      }
    });

    results.push({
      whaleName,
      intersections,
      status: intersections.length > 0 ? "High Risk" : "Low Risk"
    });
  });

  return {
    summary: results,
    totalIntersections,
    metrics: {
      timestamp: new Date().toISOString()
    }
  };
}

/**
 * Mock function to "generate" an AI report. 
 * In a real app, this would send the analysis results to an LLM.
 */
export function generateMockAIReport(analysis) {
  if (!analysis) return "No data available to analyze.";

  const { summary, totalIntersections } = analysis;
  
  let report = "## 🐋 AI Impact Report: Whale Migration & Ocean Contamination\n\n";
  
  if (totalIntersections === 0) {
    report += "✅ **Good news!** Current data shows no direct intersections between monitored whale migration paths and major garbage patches.\n\n";
    report += "The marine wildlife seems to be navigating clear of the highest density contamination zones for now.";
  } else {
    report += `⚠️ **Warning:** Analysis detected **${totalIntersections} points of intersection** where whale migration paths cross known garbage patches.\n\n`;
    
    summary.forEach(item => {
      if (item.intersections.length > 0) {
        report += `- **${item.whaleName}**: Crossing through ${item.intersections.map(i => i.zoneName).join(", ")}. This path is classified as **${item.status}**.\n`;
      }
    });
    
    report += "\n### Recommended Actions:\n";
    report += "1. **Increased Monitoring**: Deploy drones to the identified intersection coordinates.\n";
    report += "2. **Clean-up Prioritization**: Focus marine waste collection efforts in zones with high migration traffic.\n";
    report += "3. **Navigation Alerts**: Alert nearby research vessels to track for signs of distress in these areas.";
  }

  return report;
}
