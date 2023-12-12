import React, { useEffect, useState } from "react";
import AdminPanel from "./admin/AdminPanel";
import UserPanel from "./user/UserPanel";
import loginimg from "../assets/img/loginimg.png";
import Nav from "./Nav";

const LoginForm = () => {
  //react hook for error message
  const [errorMessages, setErrorMessages] = useState({});

  //react hook for admin submit form
  const [isAdminSubmitted, setIsAdminSubmitted] = useState(false);

  //react hook for user submit form
  const [isUserSubmitted, setIsUserSubmitted] = useState(false);

  //react hook for admin db data
  const [adminData, setAdminData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8081/masteradmin")
      .then((res) => res.json())
      .then((data) => setAdminData(data))
      .catch((err) => console.log(err));
  }, []);

  //react hook for user db data
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8081/user")
      .then((res) => res.json())
      .then((data) => setUserData(data))
      .catch((err) => console.log(err));
  }, []);

  const errors = {
    uname: "invalid username",
    pass: "invalid password",
  };
  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    const { uname, pass } = document.forms[0];

    // Find admin login info
    const AdminData = adminData.find((admin) => admin.Username === uname.value);

    //Find user login info
    const UserData = userData.find((user) => user.Username === uname.value);

    // Compare adminUser info
    if (AdminData) {
      if (AdminData.Password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsAdminSubmitted(true);
      }
    } else if (UserData) {
      // Compare user info
      if (UserData.Password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsUserSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && <div>{errorMessages.message}</div>;

  const renderForm = (
    <>
      <Nav />
      <div className="h-[100vh] flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          action=""
          className=" w-[90%] flex flex-col border-solid border-2 border-black-500
       items-center rounded-sm md:max-w-[850px] bg-slate-300">
          <div
            className="w-full flex flex-col
       items-center rounded-sm md:flex-row ">
            <div className=" hidden md:flex ">
              <img src={loginimg} alt="" />
            </div>
            <div className="w-[100%] flex flex-col items-center ">
              <span className="text-[1.8rem] mt-5  font-bold">Log In</span>
              <div
                className="border-solid border-b-2
         border-b-blue-500 font-bold w-[2.1rem] pt-1"></div>
              <input
                className="mt-10 p-2 w-[80%] border-solid border-b-2
        border-b-black-600 outline-none "
                placeholder="Username:"
                type="text"
                name="uname"
                required
              />
              {renderErrorMessage("uname")}
              <input
                className=" mt-10 p-2 w-[80%] border-solid border-b-2
        border-b-black-600 outline-none"
                placeholder="Password:"
                type="password"
                name="pass"
                required
              />
              {renderErrorMessage("pass")}
              <div className="w-[80%] pt-[3rem]">
                <div className="  flex justify-between text-blue-700">
                  <div className="flex gap-2">
                    <input
                      type="checkbox"
                      name="checks"
                      id="check"
                      className="cursor-pointer"
                    />
                    <label htmlFor="check" className="cursor-pointer">
                      Remeber Me
                    </label>
                  </div>
                  <div className=" cursor-pointer">
                    <span>Forget Password?</span>
                  </div>
                </div>
                <input
                  type="submit"
                  value="Login"
                  className="w-full mt-10 bg-blue-500 py-2 text-white font-bold"
                />

                <div className="flex pt-5 pb-10 gap-3">
                  <span>Don't Have An Account?</span>
                  <span className=" font-semibold cursor-pointer">
                    Click Here
                  </span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );

  return (
    <div className="">
   
      {isAdminSubmitted ? (
        <AdminPanel />
      ) : isUserSubmitted ? (
        <UserPanel />
      ) : (
        renderForm
      )}
    </div>
  );
};

export default LoginForm;
