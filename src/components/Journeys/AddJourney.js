import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useParams, useHistory } from "react-router-dom";
import companyService from "../../services/company.service";
import { SuccessNotify } from "../../utils/Notify";

const temp = [
    {
        time: '11:00:00',
        address: 'Eahleo'
    },
    {
        time: '11:00:00',
        address: 'Eahleo'
    },
    {
        time: '11:00:00',
        address: 'Eahleo'
    },
];

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
  let dataSave = [];

  const handleAddressTo = () => {
    const dataTo = {
        time_hour: '',
        address: '',
        status: false,
        lineId: id,
    }
    dataSave.push(dataTo);
  }

  const handleAddressDes = () => {
    const dataDes = {
        time_hour: '',
        address: '',
        status: true,
        lineId: id,
    }
    dataSave.push(dataDes);
  }

  function onSubmit(data) {
    console.log("dkm", data);
    companyService.createJourney(id, data)
    .then((res) => {
        console.log(res.data);
        SuccessNotify("Tạo Hanh Trinh Thành Công");
        history.push(`/company/cars/line/${res.data.data.id}`);
    })
    .catch((e) => {
        console.log(e);
    });
  }
  return (
    <div className="container mt-5">
      <h2>Tạo Hành Trình</h2>
      <div class="row g-3">
        <div class="col">
            {
                temp.map((item) => (
                    <label>Thời Gian: {item.time} - {item.address}</label>
                ))
            }
        </div>
        <div class="col">
            {
                temp.map((item) => (
                    <label>Thời Gian: {item.time} - {item.address}</label>
                ))
            }
        </div>
      </div>
      <div class="row g-3 mt-5">
        <div class="col">
                <label for="time_hour">Thời Gian</label>
                <input
                    name="time_hour"
                    type="time"
                    {...register("time_hour")}
                    className={`form-control ${errors.time_hour ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback">{errors.time_hour?.message}</div>
        </div>
        <div class="col">
                <label for="time_hour">Thời Gian</label>
                <input
                    name="time_hour"
                    type="time"
                    {...register("time_hour")}
                    className={`form-control ${errors.time_hour ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback">{errors.time_hour?.message}</div>
        </div>
      </div>
      <div class="row g-3 mt-2">
        <div class="col">
            <label for="station">Địa chỉ</label>
            <input
              name="address"
              type="text"
              {...register("address")}
              className={`form-control ${errors.address ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.address?.message}</div>
        </div>
        <div class="col">
            <label for="station">Địa chỉ</label>
            <input
              name="address"
              type="text"
              {...register("address")}
              className={`form-control ${errors.address ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.address?.message}</div>
        </div>
      </div>
      <div class="row g-3 mt-2">
        <div class="col">
            <button className="btn btn-primary mt-2" onClick={handleAddressTo}>
                Thêm
            </button>
        </div>
        <div class="col">
            <button className="btn btn-primary mt-2" onClick={handleAddressDes}>
                Thêm
            </button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
      <div class="row">
            <div class="col">
                <div>
                    <label for="time_hour">Thời Gian</label>
                    <input
                    name="time_hour"
                    type="time"
                    {...register("time_hour")}
                    className={`form-control ${errors.time_hour ? "is-invalid" : ""}`}
                    />
                    <div className="invalid-feedback">{errors.time_hour?.message}</div>
                </div>
                <div>
                    <label for="time_hour">Thời Gian</label>
                    <input
                    name="time_hour"
                    type="time"
                    {...register("time_hour")}
                    className={`form-control ${errors.time_hour ? "is-invalid" : ""}`}
                    />
                    <div className="invalid-feedback">{errors.time_hour?.message}</div>
                </div>
            </div>
        </div>
        <div class="row mt-2">
          <div class="col">
            <label for="station">Địa chỉ</label>
            <input
              name="address"
              type="text"
              {...register("address")}
              className={`form-control ${errors.address ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.address?.message}</div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          Lưu
        </button>
      </form>
    </div>
  );
}

export default AddJourney;
