import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useParams, useHistory } from "react-router-dom";
import lineService from "../../services/line.service";
import { SuccessNotify } from "../../utils/Notify";

const dayArray = [
    {
        id: 1,
        name: "Thứ 2"
    },
    {
        id: 2,
        name: "Thứ 3"
    },
    {
        id: 3,
        name: "Thứ 4"
    },
    {
        id: 4,
        name: "Thứ 5"
    },
    {
        id: 5,
        name: "Thứ 6"
    },
    {
        id: 6,
        name: "Thứ 7"
    },
    {
        id: 0,
        name: "Chủ Nhật"
    }
];

function AddLine() {
  // form validation rules
  const validationSchema = Yup.object().shape({
    start: Yup.string()
      .required("Start is required"),
    destination: Yup.string()
      .required("Destination is required"),
    departure_time: Yup.string().required("Departure is required"),
    arrival_time: Yup.string().required("Arrival is required"),
    station: Yup.string()
      .min(6, "Name must be at least 6 characters")
      .required("Station is required"),
    station_to: Yup.string()
      .min(6, "Name must be at least 6 characters")
      .required("Station is required"),
    price: Yup.string().required("Last name is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;
  const { id } = useParams();
  let history = useHistory();
  const [dayOfWeek, setDayOfWeek] = useState([]);
  

  const handleDayOfWeek = async (e) => {
        console.log(e.target.checked);
        if(e.target.checked){
            await setDayOfWeek([...dayOfWeek, e.target.name]);
        }else{
            await setDayOfWeek(dayOfWeek.filter((name) => name !== e.target.name));
        }
  }
  console.log(dayOfWeek);

  function onSubmit(data) {
    console.log(data);
    var temp = {
        start: data.start,
        destination: data.destination,
        departure_time: data.departure_time,
        arrival_time: data.arrival_time,
        innitiated_date: data.innitiated_date,
        weekdays: dayOfWeek,
        station: data.station,
        station_to: data.station_to,
        price: data.price
    }
    lineService.create(id, temp)
    .then((response) => {
      reset();
      SuccessNotify("Tạo Tuyến Thành Công");
    })
    .catch((e) => {
        console.log(e);
    });
  }
  return (
    <div className="container mt-5">
      <h2>Tạo Tuyến Xe</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div class="row">
          <div class="col">
            <label for="carName">Bắt Đầu</label>
            <input
              name="start"
              type="text"
              {...register("start")}
              className={`form-control ${errors.start ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.start?.message}</div>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col">
            <label for="destination">Kết Thúc</label>
            <input
              name="destination"
              type="text"
              {...register("destination")}
              className={`form-control ${errors.destination ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.destination?.message}</div>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col">
            <label for="station">Bến xe</label>
            <input
              name="station"
              type="text"
              {...register("station")}
              className={`form-control ${errors.station ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.station?.message}</div>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col">
            <label for="station_to">Bến Đến</label>
            <input
              name="station_to"
              type="text"
              {...register("station_to")}
              className={`form-control ${errors.station_to ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.station_to?.message}</div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label for="number-palte">Giá</label>
            <input
              name="price"
              type="number"
              {...register("price")}
              className={`form-control ${errors.price ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.price?.message}</div>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col">
            <label for="departure_time">Thời Gian Khởi Hành</label>
            <input
              name="departure_time"
              type="time"
              {...register("departure_time")}
              className={`form-control ${errors.departure_time ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.departure_time?.message}</div>
          </div>
        </div>
        <div class="row">
            <div class="col">
                <label for="arrival_time">Thời Gian Kết Thúc</label>
                <input
                name="arrival_time"
                type="time"
                {...register("arrival_time")}
                className={`form-control ${errors.arrival_time ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback">{errors.arrival_time?.message}</div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <label for="innitiated_date">Ngày Bắt Đầu</label>
                <input
                name="innitiated_date"
                type="date"
                {...register("innitiated_date")}
                className={`form-control ${errors.innitiated_date ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback">{errors.innitiated_date?.message}</div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <label for="innitiated_date">Ngày Trong Tuần</label>
                <ul class="list-group">
                    {
                        dayArray.map((item, index) => (
                            <li class="list-group-item" key={index}>
                                <div class="form-check">
                                    <input class="form-check-input" name={item.id} type="checkbox" value={item.id} id="defaultCheck1" onChange={(e) => handleDayOfWeek(e)}/>
                                    <label class="form-check-label" for="defaultCheck1">
                                        {item.name}
                                    </label>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          Tạo
        </button>
      </form>
    </div>
  );
}

export default AddLine;
