import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useParams, useHistory } from "react-router-dom";

import CompanyService from "../../services/company.service";

function EditUser() {
  // form validation rules
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(6, "Name must be at least 6 characters")
      .required("Name is required"),
    phone: Yup.string()
      .min(6, "Phone must be at least 6 characters")
      .required("Station is required"),
    address: Yup.string().required("Address is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState, setValue } =
    useForm(formOptions);
  const { errors } = formState;
  const { id } = useParams();
  let history = useHistory();
  const getCompany = (id) => {
    CompanyService.getCompany(id)
      .then((response) => {
        console.log(response.data.data.company);
        const fields = ["name", "phone", "address"];
        //response.data['gender'] = "M";
        fields.forEach((field) => {
          setValue(field, response.data.data.company[field]);
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getCompany(id);
  }, [id]);

  function onSubmit(data) {
    // display form data on success
    // CarService.update(id, data)
    //   .then((response) => {
    //     console.log(response.data);
    //     history.push("/cars");
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    // alert("SUCCESS!! :-)\n\n" + JSON.stringify(data, null, 4));
    // return false;
  }
  return (
    <div className="container mt-5">
      <h2>Cập Nhật Công Ty</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div class="row">
          <div class="col">
            <label for="carName">Tên Công Ty</label>
            <input
              disabled
              name="name"
              type="text"
              {...register("name")}
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.name?.message}</div>
          </div>
          <div class="col"></div>
        </div>
        <div class="row mt-2">
          <div class="col">
            <label for="phone">Số Điện Thoại</label>
            <input
              name="phone"
              type="text"
              {...register("phone")}
              className={`form-control ${errors.phone ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.phone?.message}</div>
          </div>
          <div class="col"></div>
        </div>
        <div class="row">
          <div class="col">
            <label for="address">Address</label>
            <input
              name="address"
              type="text"
              {...register("address")}
              className={`form-control ${errors.address ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.address?.message}</div>
          </div>
          <div class="col"></div>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Cập Nhật
        </button>
      </form>
    </div>
  );
}

export default EditUser;
