import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useParams, useHistory } from "react-router-dom";
import companyService from "../../services/company.service";
import { SuccessNotify } from "../../utils/Notify";
import "bootstrap/dist/css/bootstrap.min.css";
import journeyService from "../../services/journey.service";

function AddJourney() {
  // form validation rules
  const validationSchema = Yup.object().shape({
    address: Yup.string()
      .min(6, "address must be at least 6 characters")
      .required("address is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  const { id } = useParams();
  let history = useHistory();

  const [data, setData] = useState([]);
  const [time, setTime] = useState();
  const [address, setAddress] = useState();

  const handleAddressTo = (e) => {
    e.preventDefault();
    const dataTo = {
      time_hour: time || "",
      address: address || "",
      status: false,
      lineId: id,
    };
    const dataTemp = [...data, dataTo];
    setData(dataTemp);
  };

  const handleAddressDes = (e) => {
    e.preventDefault();
    const dataDes = {
      time_hour: time || "",
      address: address || "",
      status: true,
      lineId: id,
    };
    const dataTemp = [...data, dataDes];
    setData(dataTemp);
  };

  const handleDataSave = () => {
    console.log("dataSave", data);
    journeyService.create(data)
    .then((res) => {
      console.log(res.data.data);
      SuccessNotify("Tạo Hành Trình Đi Thành Công");
      history.push(`/company/lines`);
    })
    .catch((e) => {
      console.log(e);
    });
  }

  return (
    <div className="container">
      <h2>Tạo Hành Trình</h2>
      <div className="row">
        <div className="col-6 journey-start">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleAddressTo}>
                <div className="journey-block">
                  <label for="time_hour">Thời Gian</label>
                  <input
                    name="time_hour"
                    type="time"
                    onChange={(e) => setTime(e.target.value)}
                    //{...register("time_hour")}
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
                    className={`form-control ${
                      errors.address ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.address?.message}
                  </div>
                </div>
                <div className="journey-block">
                  <button type='submit' className="btn btn-primary">
                    Thêm điểm đón
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="journey-list">
            <h3>Danh Sách Điểm Trả</h3>
            { (data || []).filter(item => !item.status).map((item) => (
              <p className="text-mute fs-5">
                {item.time_hour} - {item.address}
              </p>
            ))}
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
                    onChange={(e) => setTime(e.target.value)}
                    //{...register("time_hour")}
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
                    Thêm điểm trả
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="journey-list">
            <h3>Danh Sách Điểm Trả</h3>
            {(data || []).filter(item => item.status).map((item) => (
              <p className="text-mute fs-5">
                {item.time_hour} - {item.address}
              </p>
            ))}
          </div>
        </div>
      </div>
        <button className="btn btn-primary" onClick={handleDataSave}>
          Lưu
        </button>
    </div>
  );
}

export default AddJourney;
