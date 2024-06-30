import { select, pointer, zoomTransform } from "d3";
import { useEffect, useState } from "react";

import { point } from "@turf/turf";

export default function useDrawZone(svgRef, geoPath, color = "cyan") {
  const [isActive, setIsActive] = useState(false);
  const projection = geoPath.projection();

  useEffect(() => {
    const svg = select(svgRef.current);
    if (isActive) {
      svg.on("click.drawZone", (e) => {
        const transform = zoomTransform(e.target);
        const coords = projection.invert(transform.invert(pointer(e)));

        svg.select("#zones").insert("path")
           .attr("stroke-width", "20")
           .attr("fill", "none")
           .attr("stroke", color)
           .attr("d", geoPath(point(coords)));
      });
    }

    return () => {
      svg.on("click.drawZone", null);
    };
    
  }, [isActive]);

  return setIsActive;
}