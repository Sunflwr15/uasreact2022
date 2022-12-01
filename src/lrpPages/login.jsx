import React from "react";
import Button from "../component/Button";
import Container from "../component/Container";
import TextField from "../component/TextField";
import { BsCheck, BsEnvelopeFill, BsEyeFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const handleBack = () => {
    return navigate(-1);
  };

  const [toggle, setToggle] = React.useState(true);
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <x />
      <Container className={"space-y-10 w-[500px] h-[600px]"}>
        {/* Header */}
        <p className="font-medium">Login</p>
        {/* TextFiel */}
        <form
          className="space-y-5"
          onSubmit={() => {
            navigate("/dashboard");
          }}
        >
          <div className="space-y-5">
            <TextField
              label={"Email"}
              Icons={<BsEnvelopeFill />}
              type="email"
              required
            />
            <TextField
              label={"Password"}
              Icons={<BsEyeFill />}
              type="password"
              required
            />
          </div>
          {/* CheckBox */}
          <div className="flex items-center justify-end">
            {/* <div className=" flex items-center ">
              <div
                className={`border-2 border-black h-5 w-5 mr-3 cursor-pointer items-center flex justify-center transition-all ease-in-out text-white ${
                  toggle ? undefined : "bg-[#FFA114] text-black"
                }`}
                onClick={() => {
                  setToggle(!toggle);
                }}
              >
                <BsCheck />
              </div>
              <input
                type="checkbox"
                className="w-4 h-4 outline-2 outline-black mr-4 text-[#FFA114]"
              />

              <p>Remember Me</p>
            </div> */}
            <Link to="/forgot_password" className="underline">
              Forgot Password?
            </Link>
          </div>
          {/* Button */}
          <div className="grid grid-cols-2">
            <a />
            {/* <a
              onClick={handleBack}
              className="text-center self-center underline"
            >
              Cancel
            </a> */}
            <Button title={"Submit"} onClick={() => {}} />
          </div>{" "}
        </form>
        <div className="flex h-1/3 items-end justify-center">
          <p>
            Don't have an account?{" "}
            <Link to={"/register"} className="font-bold underline">
              Register
            </Link>
          </p>
        </div>
      </Container>
      <x />
    </div>
  );
}

export default Login;
