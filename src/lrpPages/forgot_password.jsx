import React from "react";
import Button from "../component/Button";
import Container from "../component/Container";
import TextField from "../component/TextField";
import { BsFillPersonFill, BsEyeFill, BsEnvelopeFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../redux/action/authAction";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

function Forgot_password() {
  const navigate = useNavigate();
  const handleBack = () => {
    return navigate(-1);
  };
  let dispatch = useDispatch();
  const [payload, setPayload] = React.useState({
    email: "nabil.gathfan@gmail.com",
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
  };
  const [messageError, setMessageError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await dispatch(forgotPassword(payload));
    console.log("response", response);
    // console.log("msg", response);
    try {
      setIsLoading(true);
      if (response.status === "Success") {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: response.msg,
        });
        // return navigate("/lupa-password", { replace: true });
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "error",
          title: response.response.data.msg,
        });
      }
    } catch (err) {
      console.log("error =>", err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <x />
      <Container className={"space-y-10 w-[500px] h-[600px]"}>
        {/* Header */}
        <div>
          <p className="font-medium">Forgot Password</p>
          <p className="font-light">
            Enter your email address for the verification link.
          </p>
        </div>
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
              error={messageError}
              required
            />
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
            {isLoading ? (
              <Button title={"Submitting"} />
            ) : (
              <Button title={"Submit"} />
            )}
          </div>{" "}
        </form>
      </Container>
      <x />
    </div>
  );
}

export default Forgot_password;
