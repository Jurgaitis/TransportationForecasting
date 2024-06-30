export default function ModalInfo({ id }) {

  return (
    <div className="modal fade" id={id} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title"><i className="bi bi-info-lg"/> Info</h4>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <p><i className="bi bi-github"></i> <a href="https://github.com/Jurgaitis/TransportationForecasting">Source code</a> • <a href="https://github.com/Jurgaitis/TransportNet">Math model</a></p>
            <hr/>
            <h4>Data sources</h4>
            <p>
              Data © <a href="https://www.openstreetmap.org/about/">OpenStreetMap</a> contributors<br/>
              Data processing <a href="https://overpass-api.de/">Overpass API</a><br/>
              Search provided by <a href="https://nominatim.org/">Nominatim</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}