import { useState } from "react";
import { Link } from "react-router-dom";

export default function StartPage() {
  const [cities, setCitites] = useState([]);
  const [timer, setTimer] = useState();

  const endpoint = "https://nominatim.openstreetmap.org/search?format=json&city=";

  const nominatimSearch = async(query) => {
    return await fetch(endpoint + query)
      .then(response => response.json());
  };

  const handleFieldChange = (e) => {
    const value = e.target.value;

    if (value === ""){
      setCitites([]);
      return;
    }
    clearTimeout(timer);
    const _ = setTimeout(() => {
      nominatimSearch(value).then((result) => {
        setCitites(result);
      });
    }, 500);
    setTimer(_);
  };

  return (
    <div className="d-flex align-items-center h-100">
      <div className="container d-flex flex-column justify-content-center h-50" style={{maxWidth: "960px"}}>
        <input className="form-control mb-2" name="city" type="text" placeholder="Enter a city name" onChangeCapture={handleFieldChange}/>
        <div className="list-group overflow-auto">
          {
            cities.map(item => (
              <Link className="btn list-group-item list-group-item-action" to={`/TransportationForecasting/${item.name}`} state={item} key={item.osm_id}>
                {item.display_name}
              </Link>
            ))
          }
        </div>
      </div>
    </div>
  );
}
