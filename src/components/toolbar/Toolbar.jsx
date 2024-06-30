import { useEffect, useState } from "react";
import Tool from "./Tool";
import { Tools } from "./Tools";

export default function Toolbar({ defaultTool = Tools.default, defaultCallback, zoneCallback, roadCallback }) {
  const [tool, setTool] = useState(defaultTool);

  useEffect(() => {
    if (defaultCallback) defaultCallback(false);
    if (roadCallback) roadCallback(false);
    if (zoneCallback) zoneCallback(false);
    switch (tool) {
      case Tools.default:
        if (defaultCallback) defaultCallback(true);
        break;
      case Tools.zone:
        if (zoneCallback) zoneCallback(true);
        break;
      case Tools.road:
        if (roadCallback) roadCallback(true);
        break;
    }
  }, [tool]);

  return (
    <div className="position-absolute top-50 translate-middle-y ms-2 d-flex align-items-start flex-column">
      <div className="btn-group-vertical bg-body mb-2" role="group" onChange={(e) => {setTool(Number(e.target.id));}}>
        <Tool id={Tools.default} name="tools" callback="default" icon="bi bi-cursor" item={defaultTool}/>
        <Tool id={Tools.zone} name="tools" callback="zone" icon="bi bi-pin-map" item={defaultTool}/>
        <Tool id={Tools.road} name="tools" callback="road" icon="bi bi-infinity" item={defaultTool}/>
      </div>
    </div>
  );
}