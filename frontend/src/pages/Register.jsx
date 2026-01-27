import React from "react";
import { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../features/auth/authSlice";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth,
  );

const navigate = useNavigate()

useEffect(()=>{
  if(isError){
    toast.error(message)
  }
  //redirect when logged in
  if(isSuccess || user){
    navigate('/')
  }
  dispatch(reset())
}, [isError, isSuccess, user, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Passwords do not match");
    }else{
      const userData = {
        name:name,
        email:email,
        password:password
      }
      dispatch(register(userData))
    }
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              id="name"
              value={name}
              name="name"
              onChange={onChange}
              placeholder="Enter your name"
              required
            ></input>
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="email"
              id="email"
              value={email}
              name="email"
              onChange={onChange}
              placeholder="Enter your email"
              required
            ></input>
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="password"
              id="password"
              value={password}
              name="password"
              onChange={onChange}
              placeholder="Create your password"
              required
            ></input>
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="password"
              id="password2"
              value={password2}
              name="password2"
              onChange={onChange}
              placeholder="Confirm your password"
              required
            ></input>
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
