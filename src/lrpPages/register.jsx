import React from "react";
import Button from "../component/Button";
import Container from "../component/Container";
import TextField from "../component/TextField";
import { BsFillPersonFill, BsEyeFill, BsEnvelopeFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const handleBack = () => {
    return navigate(-1);
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <x />
      <Container className={"space-y-10 w-[500px] h-[600px]"}>
        {/* Header */}
        <p className="font-medium">Register</p>
        {/* TextFiel */}
        <form className="space-y-5">
          <div className="space-y-5">
            <section className="grid grid-cols-2 gap-2">
              <TextField label={"Name"} Icons={<BsFillPersonFill />} />
              <TextField label={"Email"} Icons={<BsEnvelopeFill />} />
            </section>
            <TextField label={"Password"} Icons={<BsEyeFill />} />
            <TextField label={"Confirm Password"} Icons={<BsEyeFill />} />
            <div className="space-y-1">
              <label htmlFor="">Gender</label>
              <section className="border-2 border-black w-full h-fit px-5 py-3 bg-white">
                <select name="" id="" className="w-full focus:outline-0">
                  <option value="">-</option>
                  <option value="">Male</option>
                  <option value="">Female</option>
                </select>
              </section>
            </div>
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
              className="cursor-pointer text-center self-center underline"
            >
              Cancel
            </a>
            <Button title={"Submit"} />
          </div>{" "}
        </form>
        <div className="flex h-[7%] items-end justify-center">
          <p>
            Already hace an account?{" "}
            <Link to="/login" className="font-bold underline">
              Login
            </Link>
          </p>
        </div>
      </Container>
      <x />
    </div>
  );
}

export default Register;
