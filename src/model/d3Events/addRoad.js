import * as d3 from "d3";

function pointsDistance(a, b) { 
  return Math.sqrt(Math.pow(b[0] - a[0], 2) + Math.pow(b[1] - a[1], 2));
}

export default function addRoad(data, geoPath) {
  const listeners = d3.dispatch("addNode", "end"),
        projection = geoPath.projection(),
        pointRadius = geoPath.pointRadius();
  let previousNode;

  function getDistnace() {
    return pointsDistance(projection.invert([0., 0.]), projection.invert([0. + pointRadius * 2, 0. + pointRadius * 2]));
  }

  function that(selection) {
    selection.on("click.addRoad", mouseclick);
  }

  function mouseclick(e){
    const transform = d3.zoomTransform(e.target);
    let coords = transform.invert(d3.pointer(e));
    coords = projection.invert(coords);

    const id = d3.select(e.target).datum();
    if (id) {
      let max = Number.MAX_VALUE;
      let point;
      data.getWay(id).nodes.forEach(element => {
        let distance = pointsDistance(coords, element.coordinates);
        if (distance < max) {
          max = distance;
          
          point = element.coordinates;
        }
      });
      coords = point;
    }

    if (previousNode) {
      if (pointsDistance(coords, previousNode) < getDistnace()) {
        listeners.call("end", this);
        return;
      }
    }
    previousNode = coords;
    listeners.call("addNode", this, coords, data);
  }

  that.on = function() {
    const value = listeners.on.apply(listeners, arguments);
    return value === listeners ? that : value;
  }

  return that;
}