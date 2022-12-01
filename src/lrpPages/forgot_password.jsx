import React from "react";
import Button from "../component/Button";
import Container from "../component/Container";
import TextField from "../component/TextField";
import { BsFillPersonFill, BsEyeFill, BsEnvelopeFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

function Forgot_password() {
  const navigate = useNavigate();
  const handleBack = () => {
    return navigate(-1);
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <x />
      <Container className={"space-y-10 w-[500px] h-[600px]"}>
        {/* Header */}
        <div>
          <p className="font-medium">Forgot Password</p>
          <p className="font-light">Enter your email address for the verification link.</p>
        </div>
        {/* TextFiel */}
        <form className="space-y-5" onSubmit={()=>{
          navigate("/reset_password")
        }}>
          <div className="space-y-5">
            <TextField label={"Email"} Icons={<BsEnvelopeFill />} type="email" />
          </div>
          {/* CheckBox */}
          {/* <div className="flex space-x-3 items-center">
            <div className="border-2 border-black h-5 w-5" />
            <p>Remember Me</p>
          </div> */}
          {/* Button */}
          <div className="grid grid-cols-2">
            <a
              onClick={handleBack}
              // href=""
              className=" cursor-pointer text-center self-center underline"
            >
              Cancel
            </a>
            <Button title={"Submit"} />
          </div>{" "}
        </form>
      </Container>
      <x />
    </div>
  );
}

export default Forgot_password;
