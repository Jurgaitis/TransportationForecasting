import { useEffect, useState, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";

import Editor from "../components/Editor";
import Toolbar from "../components/toolbar/Toolbar";
import Tooltip from "../components/Tooltip";
import Preloader from "../components/Preloader";
import { getFlowGeneratingObjects, getRoadNet } from "../model/osmDataHandler";
import transportZoning from "../model/transportZoning";
import { getOsmData } from "../model/overpass";
import useSelect from "../hooks/useSelect";


import {Graph, alg} from "graphlib";

import * as d3 from "d3";
import useDrawZone from "../hooks/useDrawZone";
import Sidepanel from "../components/Sidepanel";
import useDrawRoad from "../hooks/useDrawRoad";

import init, { compute_model } from "model"

import {geometry} from "@turf/turf";
import RoadNet from "../model/roadNet/RoadNet";

export default function MainPage() {
  const { state } = useLocation();

  const svgRef = useRef();

  const center = [state.lon, state.lat];
  const bbox = [state.boundingbox[0], state.boundingbox[2], state.boundingbox[1], state.boundingbox[3]];
  const name = state.name;
  
  const projection = d3.geoMercator()
  .center(center)
  //.translate([svgRef.current.clientWidth/2,svgRef.current.clientHeight/2])
  .scale(1<<22); // 1<<24

  const geoPath = d3.geoPath().projection(projection).pointRadius(30);

  const [isLoading, setIsLoading] = useState(true);
  const [preloaderTitle, setPreloaderTitle] = useState("");
  const [osmData, setOsmData] = useState(null);
  const [data, setData] = useState(null);
  
  const [svgPath, setSvgPath] = useState();
  const setIsActiveUseDrawZone = useDrawZone(svgRef, geoPath);
  const [selectedItem, setIsActiveUseSelect] = useSelect(svgRef);
  const setIsActiveUseDrawRoad = useDrawRoad(svgRef, null, geoPath, data);

  function listToMatrix(list, ndim) {
    var matrix = [], i, k;

    for (i = 0, k = -1; i < list.length; i++) {
        if (i % ndim === 0) {
            k++;
            matrix[k] = [];
        }

        matrix[k].push(list[i]);
    }

    return matrix;
  }

  function getMax(matrix) {
    const links = [];
    const zones = data.getZones();

    matrix.forEach(axis => {
      axis.forEach(q => {
        if (Math.round(q) <= 1) return;
        console.log(Math.round(q));
        const link = {source: zones[matrix.indexOf(axis)], target: zones[axis.indexOf(q)], trips: Math.round(q)};
        links.push(link);
      })
      
    });

    console.log(links);
    const svg = d3.select(svgRef.current);
    svg.select("#flows").selectAll().data(links)
      .join("path")
      .attr("d", (d) => {
        return geoPath(geometry("LineString", [d.source.coordinates, d.target.coordinates]));
      })
      .attr("fill", "none")
      .attr("stroke", (d) => {
        if (Math.round(Math.log2(d.trips)) > 12) return "red";
        else if (Math.round(Math.log2(d.trips)) > 6) return "yellow";
        return "green";
      })
      .attr("stroke-width", (d) => {console.log(Math.round(Math.log2(d.trips))); return Math.round(Math.log2(d.trips));});
  }

  const computeModel = async (productions, attractions, costs) => {
    const ndim = costs.length;
    
    let _ = [];
    costs.forEach(element => {
      element.forEach(el => {
        _.push(el);
      });
    });
    
    await init();
    const trips = compute_model(productions, attractions, _, ndim);


    const matrix = listToMatrix(trips.array, ndim);
    getMax(matrix);
    console.log(matrix);
    console.log(ndim);
  };

  const compute = () => {
    const [v, l] = data.getGraph();

    let g = new Graph({directed: false});
    v.forEach(element => {
      g.setNode(String(element.id), element?.properties?.zone ? "zone" : null);
    });
    l.forEach(element => {
      g.setEdge(String(element.source.id), String(element.target.id), { distance: element.length });
    });

    const matrix = [];
    const nodes = [];

    g.nodes().forEach(node => {
      if (g.node(node)) nodes.push(node);
    });

    console.log(v, l);
    
    nodes.forEach((node) => {
      const distances = alg.dijkstra(g, node, function(e) { return g.edge(e).distance;}, function(e) { return g.nodeEdges(e); });
      const row = nodes.map((target) => distances[target].distance);
      matrix.push(row);
    });
    console.log(matrix);

    const zones = data.getZones();
    const productions = [];
    const attractions = [];

    zones.forEach(zone => {
      productions.push(zone.properties.productions);
      attractions.push(zone.properties.attractions);
    });
    
    computeModel(productions, attractions, matrix);
  };

  useEffect(() => {
    setIsLoading(true);
    setPreloaderTitle("Fetching data");
    getOsmData(bbox).then((result) => {
      setOsmData(result);
    });
  }, []);

  useEffect(() => {
    if (!osmData) return;
    const roadNet = getRoadNet(osmData.roads.elements);
    roadNet.name = name;
    roadNet.center = center;
    roadNet.bbox = bbox;
    
    const flowGeneratingObjects = getFlowGeneratingObjects(osmData.residencies.elements, osmData.pois.elements);
    transportZoning(flowGeneratingObjects, roadNet);

    setData(roadNet);
    setIsLoading(false);
  }, [osmData]); 

  if (isLoading) return <Preloader title={preloaderTitle}></Preloader>;
  return (
    <div className="row g-0 h-100">
      <div className="col-lg-10 col-md-8" style={{minHeight: "30%"}}>
        <div className="row p-0 m-0 h-100">
          <div className="col position-relative p-0 m-0">
            <Editor data={data} svgRef={svgRef} geoPath={geoPath}/>
            <Toolbar defaultCallback={setIsActiveUseSelect} zoneCallback={setIsActiveUseDrawZone} roadCallback={setIsActiveUseDrawRoad}/>
            <Tooltip svgRef={svgRef} data={data}></Tooltip>
            <div className="position-absolute top-0 end-0 mb-2 me-2 m-2">
              <button type="button" className="btn btn-primary" onClick={compute}><i className="bi bi-cpu"></i></button>
            </div>
            <div className="position-absolute bottom-0 end-0 mb-2 me-2">
              <h3 className="text-end">{data.name}</h3>
              <p className="text-end">© <a href="https://www.openstreetmap.org/about/">OpenStreetMap</a> contributors</p>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-2 col-md-4 border-start border-top">
        <Sidepanel data={data} item={selectedItem}></Sidepanel>
      </div>
    </div>
  );
}
