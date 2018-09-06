import React, { Component } from "react";
import axios from "axios";
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      error: ""
    };
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onsubmit = e => {
    e.preventDefault();

    let newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };
    axios
      .post("http://localhost:5000/api/users/register", newUser)
      .then(user => {
        console.log(user.data);
      })
      .catch(err => {
        console.log(err.response.data);
        this.setState({ error: err.response.data.error });
      });
  };
  render() {
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form onSubmit={this.onsubmit.bind(this)}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange.bind(this)}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email Address"
                    value={this.state.email}
                    name="email"
                    onChange={this.onChange.bind(this)}
                  />
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange.bind(this)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Confirm Password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.onChange.bind(this)}
                  />
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
                {this.state.error != "" ? (
                  <p style={{ color: "red", textAlign: "center" }}>
                    {this.state.error}
                  </p>
                ) : null}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Register;
