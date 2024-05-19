import { Icon, Segment } from "semantic-ui-react";
import { Button } from "react-bootstrap";
import { signInWithGoogle } from "../firebase";
import backgroundImage from "./bimg.png"; 

const Login = () => {
  return (
    <div
      className="vh p-4 d-flex justify-content-center align-items-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.9
      }}
    >
      <div className="h-75 mx-auto col-xs-12 col-sm-10 col-md-8 col-lg-6">
        <Segment
          className="h-100"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
        >
          <div className="text-info h-100 d-flex flex-column justify-content-center align-items-center">
            <div className="pt-4 pb-4 text-center">
              <h2 className="mb-1"  style={{color:"#2F4F4F" }}>
                <img
                  src="./logo1.png"
                  alt="image not found"
                  className="mr-3"
                  style={{ width: "290px", height: "290px" }}
                />
                <br />
                "Peace of mind for your files!"
              </h2>
              
            </div>
            
            <Button variant="info" onClick={() => signInWithGoogle()}>
              <div className="p-2 text-center">
                <Icon name="google" className="mr-3" />
                Sign In with Google
              </div>
            </Button>
          </div>
        </Segment>
      </div>
    </div>
  );
};

export default Login;