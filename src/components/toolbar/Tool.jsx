export default function Tool({ id, name, icon, item }) {
  return (
    <>
      <input className="btn-check" type="radio" id={id} name={name} autoComplete="off" defaultChecked={item===id}/>
      <label className="btn btn-outline-primary" htmlFor={id}><i className={icon}/></label>
    </>
  );
}