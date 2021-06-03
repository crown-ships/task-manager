import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme } from '@material-ui/core/styles';

import { loginUser } from "../actions/authActions";
import classnames from "classnames";
import { Link } from "react-router-dom";
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


class Login extends Component {
  constructor(){
    super();
    this.state = {
      email:'',
      password:'',
      errors: {}
    };

    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


  componentDidMount() {
  // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/companies");
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/companies");
    }

    if (nextProps.errors) {
        this.setState({
          errors: nextProps.errors
        });
      }
    }

  changeEmail(event){
    this.setState({
      email:event.target.value
    });
  }

  changePassword(event){
    this.setState({
      password:event.target.value
    });
  }

  onSubmit(event){
    event.preventDefault();

    const auth = {
      email:this.state.email,
      password:this.state.password
    };
    this.props.loginUser(auth);
    // axios.post('http://localhost:4000/api/login', auth)
    // .then(resp => console.log(resp.data));

    this.setState({
      email:'',
      password:''
    });
  }

  render() {
    const theme = createMuiTheme();
    const { errors } = this.state;
    const root =  {
      height: '100vh',
    };
    const image= {
      backgroundImage: 'linear-gradient(90deg, transparent 50%, rgba(255,255,255,.5) 50%)',
      backgroundColor: "#E6E6FA",
      backgroundSize: '20px',
      backgroundPosition: 'center'
    };
    const paper= {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    };
    const avatar= {
      margin: theme.spacing(1),
      backgroundColor: "black"
    };
    const form= {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1)
    };
    const submit= {
      color:"white",
      backgroundColor: "black",
      margin: theme.spacing(3, 0, 2)
    };
    const link= {
      color: "black"
    };

    return(
      <Grid container component="main" style={root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={4} style={image} />
        <Grid item xs={12} sm={4} md={4} component={Paper} elevation={6} square>
          <div style={paper}>
            <Avatar style={avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form style={form} noValidate onSubmit={this.onSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={this.changeEmail}
                value={this.state.email}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.changePassword}
                value={this.state.password}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2" style={link}>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2" style={link}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
        <Grid item xs={false} sm={4} md={4} style={image} />
      </Grid>
    );

}
}

Login.propTypes = {
loginUser: PropTypes.func.isRequired,
auth: PropTypes.object.isRequired,
errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
auth: state.auth,
errors: state.errors
});
export default connect(
mapStateToProps,
{ loginUser }
)(Login);
