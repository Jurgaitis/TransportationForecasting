import { select } from "d3";
import { useEffect, useState } from "react";

export default function useSelect(svgRef, selectionColor = "dodgerBlue", defaultColor = "gray") {
  const [item, setItem] = useState(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const svg = select(svgRef.current);
    if (isActive) {
      svg.on("click.select", (e) => {
        if (item) item.attr("stroke", defaultColor);
  
        const _item = select(e.target);
        _item.attr("stroke", selectionColor);
  
        setItem(_item);
      });
    }
    else {
      if (item) item.attr("stroke", defaultColor);
      setItem(null);
    }

    return () => {
      svg.on("click.select", null);
    };
    
  }, [isActive, item]);

  return [item? item.datum() : null, setIsActive];
}