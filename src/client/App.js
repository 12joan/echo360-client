import React, {Component} from 'react'
import LoginForm from './LoginForm'
import Echo360Service from './Echo360Service'
import SectionList from './SectionList'
import LessonList from './LessonList'

class App extends Component {
  constructor(props) {
    super(props)

    this.handleLoginFormSubmitted = this.handleLoginFormSubmitted.bind(this)
    this.handleLoginSuccess = this.handleLoginSucceeded.bind(this)
    this.handleSectionChange = this.handleSectionChange.bind(this)

    this.initialState = {
      token: null,
      institutionId: null,
      performingLogin: false,
      loginFailed: false,
      sections: null,
      lessons: null,
      sectionName: null,
    }

    this.state = {
      ...this.initialState
    }
  }

  handleLoginFormSubmitted(options) {
    this.setState({
      ...this.initialState,
      performingLogin: true,
      loginFailed: false
    })

    Echo360Service.performLogin({
      email: options.email,
      password: options.password
    })
      .then(response => {
        this.setState({
          token: response.token,
          institutionId: response.institutionId,
          performingLogin: false,
          loginFailed: false
        })

        this.handleLoginSucceeded()
      })
      .catch(error => {
        console.error(error)
        this.setState({
          performingLogin: false,
          loginFailed: true
        })
      })
  }

  handleLoginSucceeded() {
    Echo360Service.fetchSections({
      institutionId: this.state.institutionId,
      token: this.state.token
    })
      .then(response => 
        this.setState({
          sections: response.sections
        })
      )
  }

  handleSectionChange(section) {
    this.setState({
      lessons: null
    })

    Echo360Service.fetchLessons({
      sectionId: section.id,
      token: this.state.token
    })
      .then(response =>
        this.setState({
          lessons: response.lessons,
          sectionName: section.name 
        })
      )
  }

  render() {
    return (
      <div className="container py-3">
        <div className="row mb-3">
          <LoginForm
            onSubmit={this.handleLoginFormSubmitted} 
            submitDisabled={this.state.performingLogin}
            loginFailed={this.state.loginFailed} />
        </div>

        <div className="row">
          <div className="col-md-4 mb-3">
            {
              this.state.sections &&
                <SectionList
                  sections={this.state.sections}
                  onChange={this.handleSectionChange} />
            }
          </div>

          <div className="col-md-8 mb-3">
            {
              this.state.lessons &&
                <LessonList
                  lessons={this.state.lessons} sectionName={this.state.sectionName}/>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default App
