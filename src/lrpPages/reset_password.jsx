import React from "react";
import Button from "../component/Button";
import Container from "../component/Container";
import TextField from "../component/TextField";
import { BsFillPersonFill, BsEyeFill, BsEnvelopeFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

function Reset_password() {
  const navigate = useNavigate();
  const handleBack = () => {
    return navigate(-1);
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <x />
      <Container className={"space-y-10 w-[500px] h-[600px]"}>
        {/* Header */}
        <p className="font-medium">Reset Password</p>
        {/* TextFiel */}
        <form className="space-y-5">
          <div className="space-y-5">
            <TextField label={"New Password"} Icons={<BsEyeFill />} />
            <TextField label={"Confirm New Password"} Icons={<BsEyeFill />} />
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

export default Reset_password;
