export default function Node(id, lon, lat, properties = null){
  this.id = id;
  this.coordinates = [lon, lat];
  this.properties = properties;

  this.ways = [];
}