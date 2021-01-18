import React, {Component} from 'react'
import FormInput from './FormInput'

class LoginForm extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
      email: "",
      password: ""
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.onSubmit(this.state)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {
          this.props.loginFailed &&
            <div className="alert alert-danger" role="alert">
              Authentication failed. Make sure your email and password are correct and work on Echo360.
            </div>
        }

        <FormInput
          name="email"
          value={this.state.email}
          onChange={this.handleChange}
          id="email"
          type="email"
          label="Echo360 email"
          placeholder="someone@example.com" />

        <FormInput
          name="password"
          value={this.state.password}
          onChange={this.handleChange}
          id="password"
          type="password"
          label="Echo360 password"
          placeholder="Password" />

        <input
          type="submit"
          value="Authenticate"
          className="btn btn-primary btn-block"
          disabled={this.props.submitDisabled} />
      </form>
    )
  }
}

export default LoginForm
