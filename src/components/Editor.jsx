
import { useCallback, useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { geometry } from "@turf/turf";


import init, { compute_model } from "model"

export default function Editor({svgRef, geoPath, data}) {

  const [transform, setTransform] = useState(d3.zoomIdentity);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const roadNet = svg.select("#roadNet");
    const zones = svg.select("#zones");

    roadNet.selectAll().data(data.getWaysKeys())
      .join("path")
      .attr("d", d => geoPath(geometry("LineString", data.getWay(d).getCoordinates())))
      .attr("fill", "none")
      .attr("stroke", "gray")
      .attr("stroke-width", "10");

    zones.selectAll().data(data.getZones())
      .join("path")
      .attr("d", (d) => {
        return geoPath(geometry("Point", d.coordinates));
      })
      .attr("fill", "none")
      .attr("stroke", "cyan")
      .attr("stroke-width", "20");

    svg.call(d3.zoom()
      .scaleExtent([0.01, 10])
      .on("zoom", (e) => setTransform(e.transform))
    );

    return () => {
      roadNet.selectAll("*").remove();
      zones.selectAll("*").remove();
    };
  }, []);

  return (
    <svg height={"100%"} width={"100%"} ref={svgRef}>
      <g id="main-g" transform={transform}>
        <g id="roadNet"/>
        <g id="flows"/>
        <g id="zones"/>
        
      </g>
    </svg>
  );
}