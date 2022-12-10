import React from "react";
import Button from "../component/Button";
import Container from "../component/Container";
import TextField from "../component/TextField";
import { BsFillPersonFill, BsEyeFill, BsEnvelopeFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { authRegister } from "../redux/action/authAction";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

function Register() {
  let dispatch = useDispatch();
  const navigate = useNavigate();
  const [payload, setPayload] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    jenisKelamin: "",
    status: "",
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
    if (payload.password.length <= 8 || payload.confirmPassword.length <= 8) {
      setPassword("Password must be 8 characters");
    } else {
      setPassword("");
    }
  };
  const [messageError, setMessageError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [nameError, setNameError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [statusError, setStatusError] = React.useState(false);
  const [jenisKelaminError, setJenisKelaminError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (payload.email == "nabil@gmail.com" && payload.password == "123") {
    //   navigate("/dashboard");
    // } else {
    //   setMessageError("salah kontol");
    // }
    setIsLoading(true);
    const response = await dispatch(authRegister(payload));
    console.log("response", response);
    // console.log("msg", response);
    try {
      setIsLoading(true);
      if (response?.status === "Success") {
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
        return navigate("/login", { replace: true });
      }

      if (
        response.response.data.status === "fail" ||
        payload.password !== payload.confirmPassword
      ) {
        setToggle(true);
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
          title: response.response.data.status,
        });

        setMessageError(response.response.data.status);
        setJenisKelaminError(response.response.data.errors.jenisKelamin.msg);
        setEmailError(response.response.data.errors.email.msg);
        setNameError(response.response.data.errors.name.msg);
        setStatusError(response.response.data.errors.status.msg);
        setPasswordError(response.response.data.errors.password.msg);
      }
    } catch (err) {
      console.log("error =>", err);
    } finally {
      setIsLoading(false);
    }

    // setPayload(() => {
    //   return {
    //     name: "",
    //     email: "",
    //     password: "",
    //     confirmPassword: "",
    //     jenisKelamin: "",
    //     status: "",
    //   };
    // });
  };
  const [password, setPassword] = React.useState("");
  const [toggle, setToggle] = React.useState(false);
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Container className={"space-y-10 w-[500px] h-[600px]"}>
        {/* Header */}
        <p className="font-medium">Register</p>
        {/* TextFiel */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <section className="grid grid-cols-2 gap-2">
              <div className="p-0">
                <TextField
                  label={"Name"}
                  Icons={<BsFillPersonFill />}
                  value={payload.name}
                  name="name"
                  onChange={handleChange}
                  error={nameError}
                />
              </div>
              <div>
                <TextField
                  label={"Email"}
                  Icons={<BsEnvelopeFill />}
                  value={payload.email}
                  name="email"
                  onChange={handleChange}
                  error={emailError}
                />
              </div>
            </section>
            <section className="grid grid-cols-2 gap-2">
              <div>
                <TextField
                  label={"Password"}
                  Icons={<BsEyeFill />}
                  value={payload.password}
                  name="password"
                  onChange={handleChange}
                  error={passwordError}
                />
              </div>

              <TextField
                label={"Confirm Password"}
                Icons={<BsEyeFill />}
                value={payload.confirmPassword}
                name="confirmPassword"
                onChange={handleChange}
              />
            </section>
            <div className="space-y-1">
              <div className="flex flex-row justify-between">
                <label htmlFor="">Gender</label>
                <p className="text-red-500 text-[10px]">{jenisKelaminError}</p>
              </div>{" "}
              <section className="border-2 border-black w-full h-fit px-5 py-3">
                <select
                  value={payload.jenisKelamin}
                  name="jenisKelamin"
                  id=""
                  onChange={handleChange}
                  className="w-full focus:outline-0 bg-transparent"
                >
                  <option value="">-</option>
                  <option value="laki-laki">Male</option>
                  <option value="perempuan">Female</option>
                </select>
              </section>
            </div>
            <div className="space-y-1">
              <div className="flex flex-row justify-between">
                <label htmlFor="">Gender</label>
                <p className="text-red-500 text-[10px]">{statusError}</p>
              </div>{" "}
              <section className="border-2 border-black w-full h-fit px-5 py-3 ">
                <select
                  value={payload.status}
                  name="status"
                  id=""
                  onChange={handleChange}
                  className="w-full focus:outline-0 bg-transparent"
                >
                  <option value="">-</option>
                  <option value="active">Active</option>
                  <option value="nonactive">Nonactive</option>
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
              onClick={() => {
                navigate("/login");
              }}
              // href=""
              className="cursor-pointer text-center self-center underline"
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
        <div className="flex h-[12%] items-end justify-center">
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
