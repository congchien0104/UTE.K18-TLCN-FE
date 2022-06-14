import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function ReservationModal({data}) {
    console.log(data);
  return (
    <div className="l-modal">
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target={"#"+data.plate_number+"a"}>
        Chi tiết
      </button>
      <div class="modal fade" id={data.plate_number+"a"}>
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Chi tiết</h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <p>ID: {data.id}</p>
              <p>Khởi hành: {data.username}</p>
              <p>Kết thúc: {data.email}</p>
              <p>Giờ đi: {data.verified}</p>
              <p>Giờ đến: {data.verified}</p>
              <p>Vị trí ghế: {data.verified}</p>
              <p>Ngày đi: {data.verified}</p>
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
export default ReservationModal;