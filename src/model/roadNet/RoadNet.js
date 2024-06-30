import { geometry, length } from "@turf/turf";
import Node from "./Node";
import Way from "./Way";

export default function RoadNet(name = null, center = null, bbox = null) {
  let nodeId = 1,
      wayId = 1;
  
  this.name = name;
  this.center = center;
  this.bbox = bbox;
  
  this.ways = new Map();
  this.nodes = new Map();

  RoadNet.prototype.getNode = function(id) {
    return this.nodes.get(id);
  }

  RoadNet.prototype.getWay = function(id) {
    return this.ways.get(id);
  }

  RoadNet.prototype.getNodesKeys = () => {
    return Array.from(this.nodes.keys());
  }

  RoadNet.prototype.getWaysKeys = () => {
    return Array.from(this.ways.keys());
  }

  RoadNet.prototype.getNodesValues = () => {
    return Array.from(this.nodes.values());
  }

  RoadNet.prototype.getWaysValues = () => {
    return Array.from(this.ways.values());
  }

  RoadNet.prototype.getZones = () => {
    const zones = [];
    this.getNodesValues().map((node) => {
      
      if (node.properties.zone === true) {
        zones.push(node);
      }
    });
    return zones;
  }

  RoadNet.prototype.getGraphVerticies = () => {
    const nodes = this.getNodesValues();
    const vertecies = new Map();
    nodes.forEach((node) => {
      if (node.ways.length > 1) {
        vertecies.set(node.id, node);
      } else if (node.ways.length === 1) {
        const way = node.ways[0];
        if (way.nodes[0] == node || way.nodes.slice(-1)[0] == node || node?.properties?.zone) {
          vertecies.set(node.id, node);
        }
      }
    });

    return vertecies;
  }

  RoadNet.prototype.getGraphLinks = (vertecies) => {
    const links = [];
    this.getWaysValues().forEach((way) => {
      const nodes = [];
      way.nodes.forEach((node) => {
        if (vertecies.has(node.id)) nodes.push(node);
      }); 
      for (let i = 0; i < nodes.length; i++) {
        if (i + 1 >= nodes.length) return;
        const coords = [];
        nodes.slice(i, i + 1 + 1).forEach(node => { coords.push(node.coordinates); });
        links.push({source: nodes[i], target: nodes[i + 1], length: length(geometry("LineString", coords))});
      }
    });
    return links;
  }

  RoadNet.prototype.createNode = function(lon, lat, properties = null, id = null) {
    if (id > nodeId) nodeId = id;
    const node = new Node(nodeId, lon, lat, properties);
    this.nodes.set(nodeId, node);
    nodeId++;
    return node;
  }

  RoadNet.prototype.createWay = function(nodes, properties = null, id = null) {
    if (id > wayId) wayId = id;
    const way = new Way(wayId, nodes, properties);
    this.ways.set(wayId, way);
    wayId++;
    return way;
  }

  RoadNet.prototype.getGraph = function() {
    const vertecies = this.getGraphVerticies();
    const links = this.getGraphLinks(vertecies);
    return [vertecies, links];
  }
}