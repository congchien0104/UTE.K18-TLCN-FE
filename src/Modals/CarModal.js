import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function CarModal({data}) {
    console.log(data);
  return (
    <div className="l-modal">
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target={"#"+data.username+"a"}>
        Details
      </button>
      <div class="modal fade" id={data.username+"a"}>
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Details</h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <p>ID: {data.id}</p>
              <p>Name: {data.name}</p>
              <p>Plate Number: {data.plate_number}</p>
              <p>Capacity: {data.capacity}</p>
              <p>Station: {data.station}</p>
              <p>Price: {data.price}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CarModal;