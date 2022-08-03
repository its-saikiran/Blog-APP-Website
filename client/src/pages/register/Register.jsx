import React, { useState, useContext } from "react"
import { Link } from "react-router-dom"
import UserContext from "../../UsersCrud/UserContext"

const Register = () => {

  const [userData, setUserData] = useState({});
  const { registerFun, registerMsg, setRegisterMsg } = useContext(UserContext);

  const sendRegisterFun = (e) => {
    e.preventDefault();
    // console.log(userData)
    if(userData.password !== userData.confirmPassword){
      setRegisterMsg("Password doesn't match")
      setTimeout(() => {
        setRegisterMsg('')
      }, 3000);
      return 
    }
    const {confirmPassword, ...finalUserData} = userData
    registerFun(finalUserData)
  };

  return (
    <form>

      <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "80vh", marginTop: '6rem' }}>


        <div className="d-flex  justify-content-center align-items-center  mx-3 mt-3" style={{ width: "40%" }}>
          <div class="card px-3 pt-3" style={{ width: "40rem", backgroundColor: 'whitesmoke' }}>

            <div class="card-body d-flex align-items-start flex-column" >


              {registerMsg &&
                <div className="d-flex flex-column justify-content-center align-items-center" style={{ color: "red", width: "100%" }}>
                  { registerMsg }
                </div>
              }

              <div className="d-flex justify-content-center align-items-center flex-column mb-3" style={{ width: "100%" }}>
                <p>Already have an account? <Link to="/login">Login</Link></p>
              </div>


              <div class="input-group d-flex align-items-center mb-2">
                <h5>Full Name: </h5>
                <input
                  type="text"
                  name="username"
                  className="form-control mx-2 rounded-2"
                  placeholder="Enter Email"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div class="input-group d-flex align-items-center mb-2">
                <h5>Email:</h5>
                <input
                  type="text"
                  name="email"
                  className="form-control mx-2 rounded-2"
                  placeholder="Enter Email"
                  aria-label="email"
                  aria-describedby="basic-addon1"
                  onChange={(e) => setUserData((prev) => ({ ...prev, email: e.target.value }))}
                  />
              </div>


              <div class="input-group d-flex align-items-center mb-2">
                <h5>Password:</h5>
                <input
                  type="password"
                  name="password"
                  className="form-control mx-2 rounded-2"
                  placeholder="Enter Password"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  onChange={(e) => setUserData((prev) => ({ ...prev, password: e.target.value }))}
                  />
              </div>

              <div class="input-group d-flex align-items-center mb-2">
                <h5>Confirm Password:</h5>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control mx-2 rounded-2"
                  placeholder="Enter Confirm Password"
                  aria-label="confirm password"
                  aria-describedby="basic-addon2"
                  onChange={(e) => setUserData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                />
              </div>

              <div class="input-group d-flex align-items-center mb-2">
                <h5>DOB:</h5>
                <input
                  type="date"
                  name="dob"
                  className="form-control mx-2 rounded-2"
                  aria-label="date"
                  aria-describedby="basic-addon2"
                  onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
                  />
              </div>

              <div class="input-group d-flex align-items-center mb-2">
                <h5>Bio:</h5>
                <textarea
                  type='text'
                  name="bio"
                  className="form-control mx-2 rounded-2"
                  placeholder="write bio here..."
                  aria-label="bio"
                  aria-describedby="basic-addon2"
                  maxLength={120}
                  rows={3}
                  onChange={(e) => setUserData((prev) => ({ ...prev, bio: e.target.value }))}
                  />
              </div>

              <button
                type="button"
                className="btn btn-primary my-2"
                style={{ width: "100%" }}
                onClick={sendRegisterFun}
              >
                register
              </button>


            </div>
          </div>
        </div>
      </div>
    </form>

  )
}

export default Register;