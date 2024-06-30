import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

export default function Tooltip({svgRef, data}) {

  const [visibility, setVisibility] = useState(true);
  const [coords, setCoords] = useState([0, 0]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (!svgRef) return;

    const svg = d3.select(svgRef.current).select("#roadNet");

    const onMouseOver = (e, d) => {
      const id = d3.select(e.target).datum(); // !

      setVisibility(false);
      svg.on("mousemove", onMouseMove);
      let way = data.ways.get(id);
      
      console.log();
      if (!way?.properties?.name) setTitle(id);
      else setTitle(way.properties.name);
      svg.on("mousedown", () => {setVisibility(true);});
    };
  
    const onMouseOut = () => {
      setVisibility(true);
      svg.on("mousemove", null);
    };
  
    const onMouseMove = (e) => {
      setCoords([e.x, e.y]);
    };

    svg
      .on("mouseover.tooltip", onMouseOver)
      .on("mouseout.tooltip", onMouseOut)
      .on("mousedown.tooltip", () => setVisibility(false));
  }, [svgRef]);

  return (
    <div className="position-absolute" style={{left:coords[0]+10, top:coords[1]-30}} hidden={visibility} >
      <a>{title}</a>
    </div>
  );
}