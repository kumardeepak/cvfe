import React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";

import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
// import {Link} from 'react-router';
import TextField from '@material-ui/core/TextField';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withStyles } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import ThemeDefault from "../../theme/web/theme-default";

import LoginStyles from "../../styles/web/LoginStyles";

import LoginAPI from "../../../flux/actions/apis/login";
import APITransport from "../../../flux/actions/apitransport/apitransport";
import history from "../../../web.history";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  componentDidMount() {
    localStorage.removeItem("token");
  }

  /**
   * user input handlers
   * captures text provided in email and password fields
   */

  processInputReceived = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  /**
   * user input handlers
   * captures form submit request
   */
  processLoginButtonPressed = () => {
    const { email, password } = this.state;
    const { APITransporter } = this.props;

    const apiObj = new LoginAPI(email, password);
    APITransporter(apiObj);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      

      if(this.props.user.token){
        console.log("token----",this.props.user.token.access_token)
        localStorage.setItem("token", this.props.user.token.access_token);
        console.log("token----",localStorage.getItem('token'))

      setTimeout(() => {
        history.push("/dashboard");
      }, 1000);
    } else {
      alert("Wrong credentials");
    }
    }
  }

  render() {
    const { user, classes, location } = this.props;
    

    return (
      <MuiThemeProvider theme={ThemeDefault}>
        <div>
          <div className={classes.loginContainer}>
            <Paper className={classes.paper}>
              <form method="post">
               
                <TextField
                style={{width:'100%',marginBottom:'30px'}}
          id="outlined-email-input"
          label="Username"
          className={classes.textField}
          type="email"
          name="email"
          autoComplete="email"
          margin="normal"
          variant="outlined"
          onChange={this.processInputReceived("email")}
        />
                 
               
                
                <TextField
                style={{width:'100%',marginBottom:'30px'}}
          id="outlined-password-input"
          label="Password"
          className={classes.textField}
          type="password"
          autoComplete="current-password"
          margin="normal"
          variant="outlined"
          onChange={this.processInputReceived("password")}
        />
                 
                
                <div>
                  
                  {/* <Link to="/"> */}
                  <Button variant="contained" onClick={this.processLoginButtonPressed} color="primary" aria-label="edit"style={{marginTop:'15px',width:'100%',height:'50px'}}>
                    Login
                  </Button>
                  {/* </Link> */}
                </div>
              </form>
            </Paper>

            <div className={classes.buttonsDiv}>
             
            </div>

            <div className={classes.buttonsDiv} />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

Login.propTypes = {
  user: PropTypes.object.isRequired,
  APITransporter: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.login
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      APITransporter: APITransport
    },
    dispatch
  );

export default withRouter(
  withStyles(LoginStyles)(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Login)
  )
);
