import React, {  useState, useContext } from "react"
import UserContext from "../../UsersCrud/UserContext";

const Otp = () => {

  const [otpData, setOtpData] = useState();
  const { otpFun, otpMsg } = useContext(UserContext)

  const sendOtpFun = (e) => {
    e.preventDefault()
    otpFun(otpData)
  };
  
  return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "80vh", marginTop: '6rem' }}>


      <div className="d-flex  justify-content-center align-items-center  mx-3 mt-3" style={{ width: "40%" }}>
        <div class="card px-3 pt-3" style={{ width: "40rem", backgroundColor: 'whitesmoke' }}>

          <div class="card-body d-flex align-items-start flex-column" >


            {otpMsg &&
              <div className="d-flex flex-column justify-content-center align-items-center" style={{ color: "red", width: "100%" }}>
                 { otpMsg }
              </div>
            }

            <div class="input-group my-3">
              <input
                type="text"
                name="email"
                className="form-control"
                placeholder="Enter Email"
                aria-label="Username"
                aria-describedby="basic-addon1"
              onChange={e => setOtpData((prev) => ({ ...prev, email: e.target.value }))}
              />
            </div>


            <div class="input-group mb-3 gap-2">
              <input
                type="text"
                name="otp"
                className="form-control rounded-2"
                placeholder="Enter otp"
                aria-label="number"
                aria-describedby="basic-addon2"
              onChange={e => setOtpData((prev) => ({ ...prev, otp: e.target.value }))}
              />
            </div>

            <button
              type="button"
              className="btn btn-primary mb-3"
              style={{ width: "100%" }}
              onClick={sendOtpFun}
            >
              verify
            </button>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Otp;