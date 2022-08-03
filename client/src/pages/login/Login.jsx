import React, { useState, useContext } from "react"
import { Link } from "react-router-dom"
import UserContext from "../../UsersCrud/UserContext";

const Login = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState();
  const { loginFun, loginMsg } = useContext(UserContext);

  const sendLoginFun = (e) => {
    e.preventDefault();
    loginFun(loginData)
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "80vh", marginTop: '6rem' }}>


      <div className="d-flex  justify-content-center align-items-center  mx-3 mt-3" style={{ width: "40%" }}>
        <div class="card px-3 pt-3" style={{ width: "40rem", backgroundColor: 'whitesmoke' }}>

          <div class="card-body d-flex align-items-start flex-column" >


            {loginMsg &&
              <div className="d-flex flex-column justify-content-center align-items-center" style={{ color: "red", width: "100%" }}>
                  { loginMsg }
              </div>
            }


            <div className="d-flex justify-content-center align-items-center flex-column mb-3" style={{ width: "100%" }}>
              <p className="mt-3">Don't have an account? <Link to="/register">SignUp</Link></p>
            </div>

            <h5>Email</h5>
            <div class="input-group mb-3">
              <input
                type="text"
                name="username"
                className="form-control"
                placeholder="Enter Email"
                aria-label="Username"
                aria-describedby="basic-addon1"
              onChange={e => setLoginData((prev) => ({ ...prev, email: e.target.value }))}
              />
            </div>


            <h5>Password</h5>
            <div class="input-group mb-3 gap-2">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="form-control rounded-2"
                placeholder="Enter Password"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                onChange={e => setLoginData((prev) => ({ ...prev, password: e.target.value }))}
                />
              <span
                className="input-group-text rounded-2"
                id="basic-addon2"
                onClick={() => setShowPassword(!showPassword)}
              >show</span>
            </div>

            <button
              type="button"
              className="btn btn-primary mb-3"
              style={{ width: "100%" }}
              onClick={ sendLoginFun }
            >
              login
            </button>


            <div className="d-flex justify-content-center align-items-center flex-column mb-3" style={{ width: "100%" }}>
              <Link to="/change-password">Forgot Password ?</Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;