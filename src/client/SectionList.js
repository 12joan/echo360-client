import React, {Component} from 'react'

class SectionList extends Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)

    this.state = {
      selectedSection: null
    }
  }

  handleClick(section) {
    this.setState({ selectedSection: section })
    this.props.onChange(section)
  }

  render() {
    const listItems = this.props.sections.map((section) =>
      <button
        key={section.id}
        type="button"
        className={`list-group-item list-group-item-action ${
          this.state.selectedSection?.id === section.id ? 'active' : ''
        }`}
        onClick={() => this.handleClick(section)}>
        {section.name}
      </button>
    )

    return (
      <div className="list-group">
        {listItems}
      </div>
    )
  }
}

export default SectionList
