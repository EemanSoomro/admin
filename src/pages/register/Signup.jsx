import React, { useState } from 'react'
import { AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineMail } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { motion } from "framer-motion";
import styled from 'styled-components';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
const Signup = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    cpassword: ''
  })
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value })
    console.log(user)
  }
  const PostData = async (e) => {
    e.preventDefault();
    const { username, email, password, cpassword } = user;
    if (!username || !email || !password || !cpassword) {
      swal({
        title: "Missing Details!",
        text: "Kindly fill all the Details",
        icon: "warning",
        button: false,
        timer: 1200
      })
    }
    // Email Must start with K or k, have 6 digits after that, and end with @nu.edu.pk
    else if (!email.match(/^k[0-9]{6}@nu.edu.pk$/)) {
      swal({
        title: "Invalid Email!",
        text: "Please use your Correct NU Email",
        icon: "error",
        button: false,
        timer: 1200
      })
    } else if (password !== cpassword) {
      swal({
        title: "Incorrect Password!",
        text: "Password and Confirm Password should be same",
        icon: "error",
        button: false,
        timer: 1200
      })
    } else if (password.length < 8 || cpassword.length < 8) {
      swal({
        title: "Weak Password!",
        text: "Password should be atleast 8 characters long",
        icon: "error",
        button: false,
        timer: 1800
      })
    } else {
      const res = await fetch('/auth/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username, email, password
        })
      })
      const data = await res.json();
      if (res.status === 400 || !data) {
        swal("Email or Username Already Exists!", "Please Use Another One.", "error");
        console.log("Invalid Registration")
      } else {
        // Swal Success Message, then auto redirect to login page after 0.5 seconds
        swal({
          title: "Registration Successful!",
          text: "Redirecting to Login Page.",
          icon: "success",
          button: false,
          timer: 1200
        }).then(function () {
          window.location = "/login";
        });

        console.log("Registration Successful")
        setUser({
          name: '',
          email: '',
          password: '',
          cpassword: ''
        })
        // navigate("/signin");
      }
    }
  }

  return (
    <>
      <SignUp>
        <h2>Sign Up</h2>
        <h3>It's quick & simple</h3>
        <Form
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}>
          <Textbox >
            <Input type="text" name="username" id="username" value={user.username} onChange={handleInputs} required/>
            <label>Username</label>
            <span class="material-symbols-outlined">
              <AiOutlineUser />
            </span>
          </Textbox>
          <Textbox >
            <Input type="text" name="email" id="email" value={user.email} onChange={handleInputs} required/>
            <label>Email</label>
            <span class="material-symbols-outlined">
              <AiOutlineMail />
            </span>
          </Textbox>
          <Textbox >
            <Input type="password"  name="password" id="password" value={user.password} onChange={handleInputs} required/>
            <label>Password</label>
            <span class="material-symbols-outlined">
              <RiLockPasswordLine />
            </span>
          </Textbox>
          <Textbox >
            <Input type="password" name="cpassword" id="cpassword" value={user.cpassword} onChange={handleInputs} required/>
            <label>Confirm Password</label>
            <span class="material-symbols-outlined">
              <RiLockPasswordLine />
            </span>
          </Textbox>
          <Link to="/login">
            <p>
              Signed up already?
            </p>
          </Link>
          <Btn
            onClick={PostData}
          >Sign Up
            <span class="material-symbols-outlined">
              <IoIosArrowForward />
            </span>
          </Btn>
        </Form>
      </SignUp>
    </>
  );
};

export default Signup;

const Btn = styled.button`
  border: 0;
  background: #3991dd;                                                                                                       
  align-items: center;
  cursor: pointer;
  padding: 0 24px;
  border-radius: 6px;
  color: #f9f9f9;
  font-family: inherit;
  font-weight: 600;
  width: 100%;
  height: 50px;
  font-size: 16px;
  text-align: center;
  transition: 0.6s all;
  display: flex;
  justify-content: space-between;
  /* Hover */
  &:hover {
    /* Make the button a little bigger */
    transform: scale(1.05);
    /* Make the button a little darker */
    background: #216ce7;
  }

`;

const Input = styled.input`
  border: 0;
  width: 100%;
  height: 60px;
  background: transparent;
  font-family: inherit;
  font-size: 16px;
  outline: none;

  &:focus ~ label{
    color: #216ce7;
  }

  &:focus {
    border-color: #216ce7;
  }

  /* :is(input:focus, input:valid) ~ label  */
  &:focus ~ label,
  &:valid ~ label {
    translate: -40px -40px;
  scale: 0.875;
  }

  &:focus ~ span,
  &:valid ~ span {
    color: rgb(255 255 255 / 96%);
  }
`;

const SignUp = styled.div`
  position: fixed;
  z-index: 2;
  height: 100%;
  width: 100%;
  max-width: 100%;
  padding: 60px 90px;
  background: #111820;
  text-align: center;
  h2 {
    font-size: 32px;
  font-weight: 600;
  margin: 0 0 6px;
  color: rgb(255 255 255 / 96%);
  }

  h3 {
    font-size: 16px;
  font-weight: 400;
  margin: 0 0 30px;
  color: rgb(255 255 255 / 40%);
  }

  p {
  color: #216ce7;
  text-decoration: none;
  margin: 0 0 22px;

}

`;


const Form = styled(motion.form)`
  margin: 0;
  display: grid;
  gap: 16px;
  /* If Laptop or desktop screen add padding */
  @media (min-width: 768px) {
    padding: 0 390px;
  }
  `;

const Textbox = styled.div`
  position: relative;
  margin-bottom: 16px;

  span{
    position: absolute;
  top: 50%;
  translate: 0 -50%;
  left: 0;
  font-size: 22px;
  pointer-events: none;
  color: rgb(255 255 255 / 40%);
  }

  input {
  padding: 0 24px 0 36px;
  border-bottom: 2px solid #2b3442;
  color: rgb(255 255 255 / 96%);
  height: 72px;
  }

  label{
    position: absolute;
  top: 50%;
  left: 36px;
  translate: 0 -50%;
  color: rgb(255 255 255 / 40%);
  pointer-events: none;
  transition: 0.4s;
  }
  `;