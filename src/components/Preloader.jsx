export default function Preloader({title = "Loading"}) {

  return (
    <div className="container d-flex align-items-center justify-content-md-center h-100">
      <span className="fs-5 fw-medium align-top me-2" >{title}</span>
      <div className="spinner-grow" role="status"></div>
    </div>
  );
}