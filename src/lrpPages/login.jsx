import React from "react";
import Button from "../component/Button";
import Container from "../component/Container";
import TextField from "../component/TextField";
import { BsCheck, BsEnvelopeFill, BsEyeFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { authLogin } from "../redux/action/authAction";
import { useDispatch } from "react-redux";
import "animate.css/animate.min.css";
import Notification from "rc-notification";
import Swal from "sweetalert2";

function Login() {
  let dispatch = useDispatch();
  const navigate = useNavigate();
  const [payload, setPayload] = React.useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    // console.log(payload.email);
    // console.log(payload.password);
    e.preventDefault();
    setPayload((payload) => {
      return {
        ...payload,
        [e.target.name]: e.target.value,
      };
    });
    if (payload.password.length <= 8) {
      setMessageError("Password kurang dari 8 karakter");
    } else {
      setMessageError("");
    }
  };
  const [messageError, setMessageError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const response = await dispatch(authLogin(payload));
    console.log("response", response);
    // console.log("msg", response);
    try {
      if (response.status === "Success") {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: response.msg,
        });
        return navigate("/dashboard", { replace: true });
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "error",
          title: response.data.msg,
        });
      }
    } catch (err) {
      console.log("error =>", err);
    } finally {
      setIsLoading(false);
    }

    // setPayload(() => {
    //   return {
    //     email: "",
    //     password: "",
    //   };
    // });
  };
  const [password, setPassword] = React.useState(false);
  const [typePass, settypePass] = React.useState("");
  const [toggle, setToggle] = React.useState(true);
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      {/* <x /> */}
      <Container className={"space-y-10 w-[500px] h-[600px]"}>
        {/* Header */}
        <p className="font-medium">Login</p>
        {/* TextFiel */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <TextField
              value={payload.email}
              onChange={handleChange}
              label={"Email"}
              name="email"
              Icons={<BsEnvelopeFill />}
              type="email"
              // error={messageError}
              required
            />
            <TextField
              value={payload.password}
              onChange={handleChange}
              label={"Password"}
              name="password"
              Icons={<BsEyeFill />}
              type={typePass}
              error={messageError}
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
            {isLoading ? (
              <Button title={"Submitting"} onClick={() => {}} />
            ) : (
              <Button title={"Submit"} onClick={() => {}} />
            )}
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
      {/* <x /> */}
    </div>
  );
}

export default Login;
