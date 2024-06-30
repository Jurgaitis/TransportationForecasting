import { clustersKmeans, clusterEach, nearestPoint, featureCollection, point } from "@turf/turf";

function adjustZonesTrips(zones) {
  let totalProductions = 0;
  let totalAttractions = 0;

  zones.forEach(zone => {
    totalProductions += zone.productions;
    totalAttractions += zone.attractions;
  });

  const factor = totalProductions / totalAttractions;

  zones.forEach(zone => {
    zone.attractions = Math.round(zone.attractions * factor);
  });

  totalProductions = 0;
  totalAttractions = 0;

  zones.forEach(zone => {
    totalProductions += zone.productions;
    totalAttractions += zone.attractions;
  });
}

function getZones(clusters) {
  const zones = [];

  clusterEach(clusters, "cluster", function (cluster, clusterValue, currentIndex) {
    const productions = getProductions(cluster);
    const attractions = getAttractions(cluster);

    zones.push({
      centroid: cluster.features[0].properties.centroid,
      productions: productions,
      attractions: attractions
    });
  });
  return zones;
}

export default function transportZoning(flowGeneratingObjects, graph) {
  
  let vertecies = graph.getNodesValues();
  console.log(flowGeneratingObjects);
  console.log(vertecies);
  const clustered = clustering(flowGeneratingObjects, flowGeneratingObjects.features.length, vertecies.length);
  vertecies = vertecies.map((vertex) => {
    return point(vertex.coordinates, {id: vertex.id});
  });

  vertecies = featureCollection(vertecies);
  

  const zones = getZones(clustered);
  adjustZonesTrips(zones);

  zones.forEach((zone) => {
    const nearestNode = nearestPoint(zone.centroid, vertecies);
    const node = graph.getNode(nearestNode.properties.id);
    node.properties.zone = true;
    node.properties.productions = zone.productions;
    node.properties.attractions = zone.attractions;
  });

  return zones;
}

function clustering(points, nclustering, nnodes) {
  const x1 = Math.sqrt(nclustering / 2);
  const x2 = Math.sqrt(nnodes / 2);
  let nClusters = x1 - x2 > 2 ? x1 - x2 : 2;
  
  const options = { numberOfClusters: Math.round(x2 / 2) };
  return clustersKmeans(points, options);
}

function getProductions(featureCollection) {
  let productions = 0;
  featureCollection.features.map((feature) => {
    let flats, levels;
    switch (feature.properties.building) {
      case "yes":
        flats = getBuildingFlats(feature);
        levels = getBuildingLevels(feature);
        if (flats) productions += flats * residenceProductions.flat;
        else if (levels) productions += levels * residenceProductions.level;
        else productions += residenceProductions.house;
        break;
      case "apartments":
        flats = getBuildingFlats(feature);
        levels = getBuildingLevels(feature);
        if (flats) productions += flats * residenceProductions.flat;
        else if (levels) productions += levels * residenceProductions.level;
        else productions += 75 * residenceProductions.flat;
        break;
      case "residential": 
        flats = getBuildingFlats(feature);
        levels = getBuildingLevels(feature);
        if (flats) productions += flats * residenceProductions.flat;
        else if (levels) productions += levels * residenceProductions.level;
        else productions += 75 * residenceProductions.flat;
        break;
      case "terrace": 
        flats = getBuildingFlats(feature);
        if (flats) productions += flats * residenceProductions.flat;
        else productions += 10 * residenceProductions.house;
        break;
      case "house" || "bungalow" || "detached" || "stilt_house":
        productions += residenceProductions.house;
        break;
      case "semidetached_house":
        productions += residenceProductions.house * 2;
        break;
      case "dormitory":
        productions += residenceProductions.dormitory;
        break;
    }
  });
  return productions;
}

function getAttractions(featureCollection) {
  let attractions = 0;
  featureCollection.features.map((feature) => {
    if (feature.properties.amenity) {
      attractions += poiAttractions.amenity;
    }
    else if (feature.properties.leisure) {
      attractions += poiAttractions.leisure;
    }
    else if (feature.properties.office) {
      attractions += poiAttractions.office;
    }
    else if (feature.properties.shop) {
      attractions += poiAttractions.shop;
    }
    else if (feature.properties.craft) {
      attractions += poiAttractions.craft;
    }
    else if (feature.properties.tourism) {
      attractions += poiAttractions.tourism;
    }
  });
  return attractions;
}

function getBuildingFlats(feature) {
  if (feature.properties["building:flats"]) {
    const flats = Number(feature.properties["building:flats"]);
    if (!isNaN(flats)) return flats;
  }
  return null;
}

function getBuildingLevels(feature) {
  if (feature.properties["building:levels"]) {
    const levels = Number(feature.properties["building:levels"]);
    if (!isNaN(levels)) return levels;
  }
  return null;
}

const residenceProductions = {
  dormitory: 300,
  house: 4,
  flat: 3,
  level: 15
};

const poiAttractions = {
  amenity: 100,
  leisure: 70,
  office: 20,
  shop: 20,
  craft: 20,
  tourism: 30
};