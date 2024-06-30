import { useEffect, useState } from "react";

export default function Sidepanel({data, item}) {

  const [string, setString] = useState();

  useEffect(() => {
    console.log(item);
    if (item) {
      let way = data.getWay(item);
      if (!way) {
        way = item;
      }
      setString(JSON.stringify(way?.properties));
    }
    else setString("");
  }, [item]);

  const change = (e) => {
    setString(e.target.value);
  };

  return (
    <div className="border-start p-2"  style={{height: "100%"}}>
      {item? 
      <div className="card border-primary mb-3">
        <div className="card-header">{"id: " + item.id}</div>
        <div className="card-body">
          <h5 className="card-title">Tags</h5>
          <textarea className="form-control" value={string} rows={10} onChange={(e) => {change(e);}}/>
          <button className="btn btn-primary mt-2">Изменить</button>
        </div>
      </div>
      :
      null}
    </div>
  );
}