const endpoint = "https://overpass-api.de/api/interpreter?data=";

export async function getOsmData(bbox) {
  const [roads, residencies, pois] = await Promise.all([getRoads(bbox), getResidencies(bbox), getPois(bbox)]);
  return {roads, residencies, pois};
}

function getRoads(bbox) {
  const query = `[out:json][bbox:${bbox}];((
    way["highway"="motorway"]; way["highway"="motorway_link"];
    way["highway"="trunk"]; way["highway"="trunk_link"];
    way["highway"="primary"]; way["highway"="primary_link"];
    way["highway"="secondary"]; way["highway"="secondary_link"];
    way["highway"="tertiary"]; way["highway"="tertiary_link"];
  );node(w)->.x; >;);out;`;
  return fetch(endpoint + query).then(response => response.json());
}

function getResidencies(bbox) {
  const query = `[out:json][bbox:${bbox}];(
    wr["building"="yes"][!"amenity"][!"leisure"][!"shop"][!"office"][!"man_made"][!"ruins"][!"craft"][!"tourism"];
    wr["building"="residential"];
    wr["building"="apartments"];
    wr["building"="terrace"];
    wr["building"="semidetached_house"];
    wr["building"="house"];
    wr["building"="detached"];
    wr["building"="dormitory"];
  ); out tags center;`;

  return fetch(endpoint + query).then(response => response.json());
}

function getPois(bbox) {
  const query = `[out:json][bbox:${bbox}];(
    nwr["amenity"];
    nwr["leisure"];
    nwr["shop"];
    nwr["office"];
    nwr["craft"];
    nwr["tourism"];
  ); out tags center;`;

  return fetch(endpoint + query).then(response => response.json());
}