import { select } from "d3";
import { useCallback, useEffect, useState } from "react";
import { geometry } from "@turf/turf";
import addRoad from "../model/d3Events/addRoad";

export default function useDrawRoad(svgRef, selection, geoPath, data, strokeWidth = 20, primaryColor = "dodgerBlue", secondaryColor = "white") {
  const [isActive, setIsActive] = useState(false);
  let nodes = [];

  const onAddNode = useCallback((node, id) => {
   
    nodes.push(node);

    if (select("#temp-point").empty()) {
      select("#roadNet").insert("path")
        //.datum(pointGeometry(node)) // id
        .attr("id", "temp-point")
        .attr("stroke-width", strokeWidth)
        .attr("fill", primaryColor)
        .attr("stroke", secondaryColor);
    }

    if (select("#temp-road").empty()) {
      select("#roadNet").insert("path")
        //.datum(lineGeometry(nodes)) // id
        .attr("id", "temp-road")
        .attr("fill", "none")
        .attr("stroke-width", "10")
        .attr("stroke", primaryColor);
    }

    console.log(nodes);
    select("#temp-point").attr("d", geoPath(geometry("Point", node))); // add datum - id
    if (nodes.length > 1)
      select("#temp-road").attr("d", geoPath(geometry("LineString", nodes))); // add datum - id
  }, []);

  const onEndDrawing = useCallback(() => {
    nodes = [];
    console.log("end");
    select("#temp-point").attr("d", null);
    select("#temp-road").attr("stroke", "gray");
  }, []);

  useEffect(() => {
    const svg = select(svgRef.current);
    const dispatch = addRoad(data, geoPath);
    if (isActive) {
      svg.call(dispatch.on("addNode", (node, id) => onAddNode(node, id))
                       .on("end", () => onEndDrawing()));
    }
    return () => {
      svg.call(dispatch.on("addNode", null)
                       .on("end", null));

      onEndDrawing();
    };
    
  }, [isActive]);

  return setIsActive;
}