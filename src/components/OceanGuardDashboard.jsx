import { useEffect, useRef } from "react";
import WMSLayer from "@arcgis/core/layers/WMSLayer.js";
import Map from "@arcgis/core/Map.js";
import SceneView from "@arcgis/core/views/SceneView.js";

const NASA_GIBS_WMS_URL = "https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi";

export default function OceanGuardDashboard() {
  const mapRef = useRef(null);
  const viewRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current || viewRef.current) {
      return undefined;
    }

    const chlorophyllLayer = new WMSLayer({
      url: NASA_GIBS_WMS_URL,
      title: "NASA GIBS Global Chlorophyll-a",
      opacity: 0.72,
      visible: true,
      sublayers: [
        {
          name: "VIIRS_SNPP_L2_Chlorophyll_A",
          title: "Chlorophyll-a VIIRS/Suomi NPP",
          visible: true
        }
      ]
    });

    const map = new Map({
      basemap: "oceans",
      layers: [chlorophyllLayer]
    });

    const view = new SceneView({
      container: mapRef.current,
      map,
      viewingMode: "global",
      qualityProfile: "high",
      camera: {
        position: {
          longitude: -155.0,
          latitude: 15.0,
          z: 14500000
        },
        heading: 0,
        tilt: 18
      },
      environment: {
        atmosphereEnabled: true,
        starsEnabled: false,
        lighting: {
          type: "virtual"
        }
      },
      popup: {
        dockEnabled: true,
        dockOptions: {
          position: "top-right",
          breakpoint: false
        }
      }
    });

    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
  }, []);

  return (
    <main className="flex h-screen bg-zinc-50 text-zinc-950">
      <aside className="flex w-[30%] min-w-[320px] flex-col border-r border-zinc-200 bg-white">
        <div className="border-b border-zinc-200 p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
            OceanGuard
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Data Insights</h1>
          <p className="mt-3 text-sm leading-6 text-zinc-600">
            A clean starting point for ocean risk layers and globe-based exploration.
          </p>
        </div>

        <div className="border-b border-zinc-200 px-6 py-4">
          <span className="text-sm font-medium text-zinc-700">Globe view ready</span>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-6">
          <p className="text-sm leading-6 text-zinc-600">
            Add the next OceanGuard layer here.
          </p>
        </div>
      </aside>

      <section className="relative h-screen flex-1">
        <div ref={mapRef} className="h-full w-full" />
      </section>
    </main>
  );
}
