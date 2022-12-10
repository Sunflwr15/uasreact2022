import React from "react";
import Button from "../component/Button";
import Container from "../component/Container";
import TextField from "../component/TextField";
import { BsFillPersonFill, BsEyeFill, BsEnvelopeFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { resetPassword } from "../redux/action/authAction";

function Reset_password() {
  let { id, token } = useParams();
  const navigate = useNavigate();
  const handleBack = () => {
    return navigate(-1);
  };
  let dispatch = useDispatch();
  const [payload, setPayload] = React.useState({
    passwordBaru: "",
    confirmPasswordBaru: "",
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
    if (
      payload.confirmPasswordBaru.length <= 8 ||
      payload.passwordBaru.length <= 8
    ) {
      setMessageError("Password is up to 8 character");
    } else {
      setMessageError("");
    }
  };
  const [messageError, setMessageError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await dispatch(resetPassword(id, token, payload));
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
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: response.msg,
        });
        return navigate("/login", { replace: true });
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
          title: response.msg,
        });
        if (payload.confirmPasswordBaru !== payload.passwordBaru) {
          setMessageError("Password doesn't match");
        } else {
          setMessageError("");
        }
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
        <p className="font-medium">Reset Password</p>
        {/* TextFiel */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <p>{messageError}</p>
            <TextField
              label={"New Password"}
              Icons={<BsEyeFill />}
              name="passwordBaru"
              value={payload.passwordBaru}
              onChange={handleChange}
            />
            <TextField
              label={"Confirm New Password"}
              Icons={<BsEyeFill />}
              name="confirmPasswordBaru"
              value={payload.confirmPasswordBaru}
              onChange={handleChange}
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
            <Button title={"Submit"} />
          </div>{" "}
        </form>
      </Container>
      <x />
    </div>
  );
}

export default Reset_password;
