export default function Way(id, nodes, properties = null) {
  this.id = id;
  this.nodes = nodes;
  this.properties = properties;
}

Way.prototype.getCoordinates = function() {
  return this.nodes.map((node) => {
    return node.coordinates;
  });
}