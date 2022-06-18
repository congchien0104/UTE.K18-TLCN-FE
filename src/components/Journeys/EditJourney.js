import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useParams, useHistory } from "react-router-dom";
import companyService from "../../services/company.service";
import { SuccessNotify } from "../../utils/Notify";
import "bootstrap/dist/css/bootstrap.min.css";
import lineService from "../../services/line.service";
import journeyService from "../../services/journey.service";
import reservationService from "../../services/reservation.service";

const temp = [
  {
    time: "11:00:00",
    address: "Eahleo",
  },
  {
    time: "11:00:00",
    address: "Eahleo",
  },
  {
    time: "11:00:00",
    address: "Eahleo",
  },
];

function EditJourney() {

  const validationSchema = Yup.object().shape({
    address: Yup.string()
      .min(6, "address must be at least 6 characters")
      .required("address is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState, setValue } = useForm(formOptions);
  const { errors } = formState;
  const { id } = useParams();
  console.log('dkkkkkkkkkkkk', id);
  console.log(id);
  let history = useHistory();
  let dataSave = [];
  const [time, setTime] = useState();
  const [address, setAddress] = useState();
  const [time1, setTime1] = useState();
  const [address1, setAddress1] = useState();
  const [journeys, setJourneys] = useState([]);
  const [flag, setFlag] = useState(false);
  const [flagId, setFlagId] = useState();

  const retrieveJourneys = (id) => {
    journeyService.getJourneys(id)
      .then((response) => {
        setJourneys(response.data.data.journeys);
        console.log(response.data.data.journeys);
      })
      .catch((e) => {
        console.log(e);
      });
    }
    

    useEffect(() => {
        retrieveJourneys(id);
      }, [id]);

  const handleAddressTo = (e) => {
    e.preventDefault();
    console.log('time', time);
    console.log('address', address);
    const dataTo = {
      time_hour: time || "",
      address: address || "",
      status: false,
      lineId: id,
    };
    console.log(dataTo);
    if(flag){
        console.log("flagId", flagId);
        journeyService.updateJourney(flagId, dataTo)
        .then((res) => {
            setFlag(false);
            SuccessNotify("Cập Nhật Địa Điểm Thành Công");
            retrieveJourneys(id);
        })
        .catch((e) => {
            console.log(e);
        });
    } else {
        journeyService.createJourney(dataTo)
        .then((res) => {
            SuccessNotify("Thêm Địa Điểm Thành Công");
            retrieveJourneys(id);
        })
        .catch((e) => {
            console.log(e);
        });
    }
  };

  const handleAddressDes = (e) => {
    e.preventDefault();
    console.log('time', time);
    console.log('address', address);
    const dataTo = {
      time_hour: time || "",
      address: address || "",
      status: true,
      lineId: id,
    };
    console.log(dataTo);
    if(flag){
        console.log("flagId", flagId);
        journeyService.updateJourney(flagId, dataTo)
        .then((res) => {
            setFlag(false);
            SuccessNotify("Cập Nhật Địa Điểm Thành Công");
            retrieveJourneys(id);
        })
        .catch((e) => {
            console.log(e);
        });
    } else {
        journeyService.createJourney(dataTo)
        .then((res) => {
            SuccessNotify("Thêm Địa Điểm Thành Công");
            retrieveJourneys(id);
        })
        .catch((e) => {
            console.log(e);
        });
    }
  };

  const handleUpdateJourneyTo = (data) => {
    setFlag(true);
    setFlagId(data.id);
    setTime(data.time);
    setAddress(data.address);
  }

  const handleUpdateJourneyDes = (data) => {
    setFlag(true);
    setFlagId(data.id);
    setTime1(data.time);
    setAddress1(data.address);
  }

  const handleDeleteJourney = (journeyId) => {
    journeyService.deleteJourney(journeyId)
    .then((res) => {
        console.log(res.data.data);
        SuccessNotify("Xóa Địa Điểm Thành Công");
        retrieveJourneys(id);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div className="container">
      <h2>Cập Nhật Hành Trình</h2>
      <div className="row">
        <div className="col-6 journey-start">
          <div className="card">
            <div className="card-body">
              <form>
                <div className="journey-block">
                  <label for="time_hour">Thời Gian</label>
                  <input
                    name="time_hour"
                    type="time"
                    onChange={(e) => setTime(e.target.value)}
                    //{...register("time_hour")}
                    value={time}
                    className={`form-control ${
                      errors.time_hour ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.time_hour?.message}
                  </div>
                </div>
                <div className="journey-block mb-4">
                  <label for="station">Địa chỉ</label>
                  <input
                    name="address"
                    type="text"
                    onChange={(e) => setAddress(e.target.value)}
                    //{...register("address")}
                    value={address}
                    className={`form-control ${
                      errors.address ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.address?.message}
                  </div>
                </div>
                <div className="journey-block">
                  <button type='submit' className="btn btn-primary" onClick={handleAddressTo}>
                    { flag ? "Cập Nhật" : "Thêm Điểm Đi"}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="journey-list">
            <h3>Danh Sách Điểm Đón</h3>
            <ul className="list-group">
            {(journeys || []).filter(item => !item.status).map((item, index) => (
              
              <li className="list-group-item d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                      <span className="badge bg-primary rounded-pill d-block">{index + 1}</span>
                      <span style={{"marginLeft": "1rem"}} className="d-block ml-2">{item.time_hour} - {item.address}</span>
                  </div>
                  <div className="d-flex align-items-center">
                      <button className="btn btn-success fw-bolder" onClick={() => handleUpdateJourneyTo(item)}>Chỉnh Sửa</button>
                      <button className="btn btn-danger fw-bolder" style={{"marginLeft": "1rem"}} 
                          onClick={() => {
                              const confirmBox = window.confirm(
                              "Bạn có muốn xóa địa điểm này không?"
                              );
                              if (confirmBox === true) {
                                  handleDeleteJourney(item.id);
                              }
                          }}
                      >Xóa</button>
                  </div>
              </li>
            ))}
            </ul>
          </div>
        </div>
        <div className="col-6 journey-end">
          <div className="card">
            <div className="card-body">
                <form>
                    <div className="journey-block">
                    <label for="time_hour">Thời Gian</label>
                    <input
                        name="time_hour"
                        type="time"
                        onChange={(e) => setTime1(e.target.value)}
                        //{...register("time_hour")}
                        value={time1}
                        className={`form-control ${
                        errors.time_hour ? "is-invalid" : ""
                        }`}
                    />
                    <div className="invalid-feedback">
                        {errors.time_hour?.message}
                    </div>
                    </div>
                    <div className="journey-block mb-4">
                    <label for="station">Địa chỉ</label>
                    <input
                        name="address"
                        type="text"
                        onChange={(e) => setAddress1(e.target.value)}
                        //{...register("address")}
                        value={address1}
                        className={`form-control ${
                        errors.address ? "is-invalid" : ""
                        }`}
                    />
                    <div className="invalid-feedback">
                        {errors.address?.message}
                    </div>
                    </div>
                    <div className="journey-block">
                    <button type='submit' className="btn btn-primary" onClick={handleAddressDes}>
                        { flag ? "Cập Nhật" : "Thêm Điểm Đi"}
                    </button>
                    </div>
                </form>
            </div>
          </div>
          <div className="journey-list">
            <h3>Danh Sách Điểm Trả</h3>
            <ul className="list-group">
            {(journeys || []).filter(item => item.status).map((item, index) => (
              
              <li className="list-group-item d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                      <span className="badge bg-primary rounded-pill d-block">{index + 1}</span>
                      <span style={{"marginLeft": "1rem"}} className="d-block ml-2">{item.time_hour} - {item.address}</span>
                  </div>
                  <div className="d-flex align-items-center">
                      <button className="btn btn-success fw-bolder" onClick={() => handleUpdateJourneyDes(item)}>Chỉnh Sửa</button>
                      <button className="btn btn-danger fw-bolder" style={{"marginLeft": "1rem"}} 
                          onClick={() => {
                              const confirmBox = window.confirm(
                              "Bạn có muốn xóa địa điểm này không?"
                              );
                              if (confirmBox === true) {
                                  handleDeleteJourney(item.id);
                              }
                          }}
                      >Xóa</button>
                  </div>
              </li>
            ))}
            </ul>
          </div>
        </div>
      </div>
        <button className="btn btn-primary mt-3">
          Hoàn Thành
        </button>
    </div>
  );
}

export default EditJourney;
