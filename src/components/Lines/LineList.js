import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import authService from "../../services/auth.service";
import lineService from "../../services/line.service";

function LineList(props) {
  const currentUser = authService.getCurrentUser();
    console.log("user", currentUser.id);
    const id = currentUser.id;
  //const id = 2;
  const [lines, setLines] = useState([]);
  useEffect(() => {
    getLineList();
  }, [id]);

  const getLineList = () => {
    lineService.getCompayLineList(id)
      .then((response) => {
        setLines(response.data.data.lines.company.lines);
        console.log(response.data.data.lines);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  
  return (
    <div className="company-list-admin">
      <Link to={`/company/cars/line/2`} className="btn btn-primary btn-create">
        <i class="fas fa-plus"></i>  Tạo Hành Trình
      </Link>
      <table className="table table-bordered table-hover company-table">
        <thead className="table-primary">
          <tr>
            <th>STT</th>
            <th>Bắt Đầu</th>
            <th>Điểm Đến</th>
            <th>Giờ Xuất Phát</th>
            <th>Giờ Đến</th>
            <th>Bến Bắt Đầu</th>
            <th>Bến Điểm Đến</th>
            <th>Các Xe Thuộc Đi Tuyến Này</th>
            <th>Gán Xe</th>
            <th>Xem Địa Chỉ Đón Nhận</th>
            <th>Xem Chi Tiết</th>
            {/* <th>Option</th> */}
          </tr>
        </thead>
        <tbody>
          {lines &&
            (lines || []).map((line, index) => (
              <>
                <div class="modal fade" id={`m${index}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                      <div class="modal-header justify-content-center">
                        <h4 className="modal-title text-center" id="exampleModalLabel">Chi Tiết Hành Trình</h4>
                      </div>
                      <div class="modal-body">
                        <div className="row">
                          <div className="col-6">
                            <h4>Điểm Đón</h4>
                            <ul className="list-group">
                              {
                                (line?.journeys || []).filter(item => !item.status).map((item, index) => (
                                  <li class="list-group-item d-flex justify-content-between align-items-center">
    
                                    <span class="badge bg-primary rounded-pill">{index+1}</span>{item.time_hour} - {item.address}
                                  </li>
                                ))
                              }
                            </ul>
                          </div>
                          <div className="col-6">
                            <h4>Điểm Trả</h4>
                            <ul className="list-group">
                              {
                                (line?.journeys || []).filter(item => item.status).map((item, index) => (
                                  <li class="list-group-item d-flex justify-content-between align-items-center">
    
                                    <span class="badge bg-primary rounded-pill">{index+1}</span>{item.time_hour} - {item.address}
                                  </li>
                                ))
                              }
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{line?.start}</td>
                  <td>{line?.destination}</td>
                  <td>{line?.departure_time}</td>
                  <td>{line?.arrival_time}</td>
                  <td>{line?.station}</td>
                  <td>{line?.station_to}</td>
                  <td>{line?.lines?.plate_number}</td>
                  <td>
                      <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target={`#m${index}`}>
                        Chọn
                      </button>
                  </td>
                  <td>
                      <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target={`#m${index}`}>
                        Xem
                      </button>
                  </td>
                  <td>
                    <Link to={`/companies/view/${line.id}`}>
                      <button type="button" class="btn btn-warning">
                        Chi Tiết
                      </button>
                    </Link>
                    <Link to={`/company/cars/line/edit/${line.id}`}>
                      <button type="button" class="btn btn-primary">
                        Cập Nhật
                      </button>
                    </Link>
                  </td>
                </tr>
              </>
            ))}
        </tbody>
      </table>
    </div>
  );
}

const formatDate = (date) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [day, month, year].join("/");
};

export default LineList;
