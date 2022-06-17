import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useParams, useHistory } from "react-router-dom";

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import storage from "../../firebase";
import companyService from "../../services/company.service";
import { SuccessNotify } from "../../utils/Notify";

function AddCar() {
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
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  const { id } = useParams();
  let history = useHistory();
  const [file, setFile] = useState();

  const handleImageChange = (e) => {
    setFile(e.target.files[0]);
  };


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
                        companyService.createCar(id, data)
                          .then((res) => {
                            console.log(res.data);
                            SuccessNotify("Tạo Nhà Xe Thành Công");
                            history.push(`/company/cars/line/${res.data.data.id}`);
                          })
                          .catch((e) => {
                            console.log(e);
                          });
                    }
                );
            }
        );
  }
  return (
    <div className="container mt-5">
      <h2>Tạo Nhà Xe</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div class="row">
          <div class="col">
            <label for="carName">Tên xe</label>
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
            <label for="station">Loại xe</label>
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
            <label for="capacity">Số chỗ</label>
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
          Tạo
        </button>
      </form>
    </div>
  );
}

export default AddCar;
