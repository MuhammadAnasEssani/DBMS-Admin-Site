import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { activateVendor } from "../../config/api/UserAuthAPI";
import Notification from "../../component/notification/Notification";

export default function ActivateAccount() {
  const { token } = useParams();
  const history = useHistory();
  const Activate = async () => {
    // console.log(token)
    const model = {
      token,
    };
    // console.log(model);
    try{
        const res = await activateVendor(model);
        if(res.status == 201){
            Notification("Activation", res.data.message, "Success")
            history.push("/");
            return

        }else {
            Notification("Activation", res.data.message, "Error")
            return
        }
    }catch(err){
        Notification("Activation", "Something went wrong", "Error")
    }
    // if(res.status === 201) {
    //     Notification("Authentication", res.data.message, "Success")
    //     history.push("/signup");
    //     return;
    // }
    // if(res.status === 400) {
    //   Notification("Authentication Faild", res.data.message, "Error")
    // }
  };
  return (
    <section id="signin" className="hero d-flex align-items-center" style={{height: "100vh"}}>
      <div className="container">
        <div
          className="row sectionShadow"
          style={{ maxWidth: "380px", marginLeft: "auto", marginRight: "auto" }}
        >
          <h2>Verify Your Account</h2>
          <p>
            We emailed you the six digit code to cool_guy@email.com <br />
            Enter the code below to confirm your email address.
          </p>
          <div class="code-container">
            <button
              className="btn btn-get-started"
              style={{
                width: "100%",
                backgroundColor: "#58595b",
                borderRadius: "15px",
              }}
              onClick={Activate}
            >
              Verify Account
            </button>
          </div>
          <small class="info">
            This is design only. We didn't actually send you an email as we
            don't have your email, right?
          </small>
        </div>
      </div>
    </section>
  );
}
