import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useParams, useHistory } from "react-router-dom";

import CompanyService from "../../services/company.service";
import CarService from "../../services/car.service";

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import storage from "../../firebase";
import { SuccessNotify } from "../../utils/Notify";

function EditCar() {
  // form validation rules
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(6, "Name must be at least 6 characters")
      .required("Name is required"),
    type: Yup.string()
      .min(6, "Type must be at least 6 characters"),
    capacity: Yup.string().required("Capcity is required"),
    plate_number: Yup.string()
      .min(6, "Destination must be at least 6 characters")
      .required("Password is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState, setValue } =
    useForm(formOptions);
  const { errors } = formState;
  const { id } = useParams();
  let history = useHistory();

  const [file, setFile] = useState();

  const handleImageChange = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const getCar = (id) => {
    CarService.getCar(id)
      .then((response) => {
        console.log(response.data.data.car);
        const fields = ["name", "type", "plate_number", "capacity"];
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

  function onSubmit (data) {
    console.log('temp', data);
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
                      SuccessNotify("C???p nh???t xe th??nh c??ng");
                      history.goBack();
                    })
                    .catch((error) => {
                      console.log(error);
                    })
                }
            );
        }
    );
  }
  return (
    <div className="container mt-5">
      <h2>C???p Nh???t Xe</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div class="row">
          <div class="col">
            <label for="carName">T??n xe</label>
            <input
              name="name"
              type="text"
              {...register("name")}
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.name?.message}</div>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col">
            <label for="station">Lo???i xe</label>
            <input
              name="type"
              type="text"
              {...register("type")}
              className={`form-control ${errors.type ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.type?.message}</div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label for="capacity">S??? ch???</label>
            <input
              name="capacity"
              type="number"
              {...register("capacity")}
              className={`form-control ${errors.capacity ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.capacity?.message}</div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label for="plate_number">Bi???n s???</label>
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
        </div>
        <div class="row">
          <div class="col">
            <label for="image">Image</label>
            <input
            type="file"
            class="form-control-file"
            id="exampleFormControlFile1"
            name="image"
            onChange={handleImageChange}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          L??u
        </button>
      </form>
    </div>
  );
}

export default EditCar;
