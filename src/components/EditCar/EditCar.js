import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useParams, useHistory } from "react-router-dom";

import CompanyService from "../../services/company.service";
import CarService from "../../services/car.service";

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import storage from "../../firebase";

function EditCar() {
  // form validation rules
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(6, "Name must be at least 6 characters")
      .required("Name is required"),
    station: Yup.string()
      .min(6, "Name must be at least 6 characters")
      .required("Station is required"),
    price: Yup.string().required("Last name is required"),
    capacity: Yup.string().required("Capcity is required"),
    start: Yup.string()
      .min(6, "Start must be at least 6 characters")
      .required("Start is required"),
    destination: Yup.string()
      .min(6, "Destination must be at least 6 characters")
      .required("Password is required"),
    plate_number: Yup.string()
      .min(6, "Destination must be at least 6 characters")
      .required("Password is required"),
    departure: Yup.string().required("Departure is required"),
    arrival: Yup.string().required("Arrival is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState, setValue } =
    useForm(formOptions);
  const { errors } = formState;
  const { id } = useParams();
  let history = useHistory();

  const [file, setFile] = useState();
    //const [fileName, setFileName] = useState();

  const handleImageChange = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
    //setFileName(e.target.files[0].name);
  };

  const getCar = (id) => {
    CarService.getCar(id)
      .then((response) => {
        console.log(response.data.data.car);
        const fields = ["name", "plate_number", "capacity", "station"];
        //response.data['gender'] = "M";
        fields.forEach((field) => {
          setValue(field, response.data.data.car[field]);
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getCar(id);
  }, [id]);

  function onSubmit(data) {

    const storageRef = ref(storage, 'cars/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
        'state_changed',
        (snapshot) => {},
        (error) => {
            console.log(error);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
                async (downloadURL) => {
                    // const payload = data;
                    // payload.image = downloadURL;
                    data.image = downloadURL;
                    console.log(data);
                    CarService.update(id, data)
                    .then((response) => {
                      console.log(response.data);
                      alert(response.data.data);
                      history.push("/cars");
                    })
                    .catch((error) => {
                      console.log(error);
                    })
                }
            );
        }
    );
    // display form data on success
    // CarService.update(id, data)
    //   .then((response) => {
    //     console.log(response.data);
    //     history.push("/cars");
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
  }
  return (
    <div className="container mt-5">
      <h2>Tạo Nhà Xe</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div class="row">
          <div class="col">
            <label for="carName">Tên xe</label>
            <input
              disabled
              name="name"
              type="text"
              {...register("name")}
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.name?.message}</div>
          </div>
          <div class="col">
            <label for="from-station">Điểm đi</label>
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
            <label for="station">Bến xe</label>
            <input
              name="station"
              type="text"
              {...register("station")}
              className={`form-control ${errors.station ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.station?.message}</div>
          </div>
          <div class="col">
            <label for="to-station">Điểm đến</label>
            <input
              name="destination"
              type="text"
              {...register("destination")}
              className={`form-control ${
                errors.destination ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">
              {errors.destination?.message}
            </div>
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
          <div class="col">
            <label for="from-station">Thời gian khởi hành</label>
            <input
              name="departure"
              type="time"
              {...register("departure")}
              className={`form-control ${errors.departure ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.departure?.message}</div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label for="capacity">Số chỗ</label>
            <input
              name="capacity"
              type="number"
              {...register("capacity")}
              className={`form-control ${errors.capacity ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.capacity?.message}</div>
          </div>
          <div class="col">
            <label for="from-time">Thời gian đến</label>
            <input
              name="arrival"
              type="time"
              {...register("arrival")}
              className={`form-control ${errors.arrival ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.arrival?.message}</div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label for="plate_number">Biển số</label>
            <input
              name="plate_number"
              type="text"
              {...register("plate_number")}
              className={`form-control ${
                errors.plate_number ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">
              {errors.plate_number?.message}
            </div>
          </div>
          <div class="col"></div>
        </div>
        <div class="row">
          <div class="col">
            <label for="plate_number">Image</label>
            <input
                type="file"
                class="form-control-file mb-4"
                id="company-image"
                onChange={handleImageChange}
            />
          </div>
          <div class="col"></div>
        </div>
        <button type="submit" className="btn btn-primary">
          Tạo
        </button>
      </form>
    </div>
  );
}

export default EditCar;
