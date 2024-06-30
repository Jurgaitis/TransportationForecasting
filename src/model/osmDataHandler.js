import { feature, featureCollection, geometry } from "@turf/turf";
import RoadNet from "./roadNet/RoadNet";

export function getRoadNet(data) {
  const roadNet = new RoadNet();
  data.forEach((element) => {
    if (element.type === "node") {
      roadNet.createNode(element.lon, element.lat, {...element?.tags}, element.id);
    }
  });
  data.forEach((element) => {
    if (element.type === "way") {
      const nodes = [];
      element.nodes.forEach((id) => {
        const node = roadNet.getNode(id);
        nodes.push(node);
      });
      const way = roadNet.createWay(nodes, {...element?.tags}, element.id);
      nodes.forEach((node) => {
        node.ways.push(way);
      });
    }
  });
  return roadNet;
}

export function getFlowGeneratingObjects(residencies, pois) {
  const features = [];

  residencies.map((residence) => {
    const geom = geometry("Point", [residence.center.lon, residence.center.lat]);
    features.push(feature(geom, {...residence?.tags}));
  });

  pois.map((poi)=> {
    const geom = geometry("Point", poi?.center ? [poi.center.lon, poi.center.lat] : [poi.lon, poi.lat]);
    features.push(feature(geom, {...poi?.tags}));
  });

  return featureCollection(features);
}