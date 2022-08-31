import React, { Component } from "react";
import "./login.css";
import axios from "axios";

const initialState = {
  email: "",
  password: "",
  stu:1,
  emp:1,
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.onChange = this.onChange.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSignIn(event) {
    localStorage.clear();
    event.preventDefault();
    let login = {
      email: this.state.email,
      password: this.state.password,
    };


    // axios.post(`${APIURL}/employer/login-employer`, login).then((res) => {
    //   console.log("res", res);
    //   if (res.data.code === 200) {
      
    //     console.log("data are ", res.data.data);
    //     const { userRoleStatus } = res.data.data;

    //     if (userRoleStatus === "Employer") {
    //       let i = JSON.stringify(res.data.token);
    //       let result = i.slice(1, -1);

    //       let User = JSON.stringify(res.data.data._id);
    //       let EId = User.slice(1, -1);

    //       localStorage.setItem("LocalEmployerID", EId);

    //       let UserName = JSON.stringify(res.data.data.employer_name);
    //       let EName = UserName.slice(1, -1);

    //       localStorage.setItem("LocalEmployerName", EName);

    //       localStorage.setItem("employer", JSON.stringify(res.data.data));
    //       localStorage.setItem("token", result);
    //       console.log("tok", result);
    //       this.props.history.push("/employerDashboard");
    //       toast.success(
    //         this.state.email +
    //           " is logged as an Employer"
    //       );
    //     }
    //   } else if(res.data.message == "This email doest not exist. Please create a your account first.")  {
    //     this.state.emp=2;
    
    //   }
    //   else{
    //          toast.error(res.data.message);
    //   }
    // });
  }

  render() {
    return (
      <>
        <label htmlFor="chk" >HASTHIYA</label>
        <div className="main">  	
        <input type="checkbox" id="chk" aria-hidden="true" />
        <div className="signup">
          <form>
            <label htmlFor="chk" aria-hidden="true">Sign up</label>
            <input type="text" name="txt" placeholder="User name" required />
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="pswd" placeholder="Password" required />
            <button>Sign up</button>
          </form>
        </div>
        <div className="login">
          <form>
            <label htmlFor="chk" aria-hidden="true">Login</label>
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="pswd" placeholder="Password" required />
            <button>Sign in</button>
          </form>
        </div>
      </div>
      </> 
    );
  }
}

export default Login;
