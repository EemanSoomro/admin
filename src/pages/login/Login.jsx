import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import styled from "styled-components";
import React, { useContext, useState } from "react";
import { loginCall } from "../../context/authContext/apiCalls";
import { AuthContext } from "../../context/authContext/AuthContext";
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isFetching, dispatch } = useContext(AuthContext);
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      swal({
        title: "Error",
        text: "Please fill in all fields",
        icon: "error",
        button: false,
        timer: 2000

      });
      return;
    }
    loginCall({ username, password }, dispatch);
  };

  return (
    <>
      <SignIn>
        <h2>Sign In</h2>
        <h3>It's quick & simple</h3>
        <Form
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}>
          <Textbox >
            <Input type="text" onChange={(e) => setUsername(e.target.value)} required />
            <label>Username</label>
            <span class="material-symbols-outlined">
              <AiOutlineUser />
            </span>
          </Textbox>
          <Textbox >
            <Input type="password" onChange={(e) => setPassword(e.target.value)} required />
            <label>Password</label>
            <span class="material-symbols-outlined">
              <RiLockPasswordLine />
            </span>
          </Textbox>
          <Link to="/register">
            <p>
              Not a User?
            </p>
          </Link>
          <Btn
            onClick={handleLogin}
          >Login
            <span class="material-symbols-outlined">
              <IoIosArrowForward />
            </span>
          </Btn>
        </Form>
      </SignIn>
    </>
  );
};

export default Login;



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

const SignIn = styled(motion.div)`
position: fixed;
z-index: 2;
height: 100%;
width: 100%;
max-width: 100%;
padding: 200px 90px;
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
color: #3991dd;
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