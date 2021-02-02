import React, {Component} from 'react'

class LessonList extends Component {
  constructor(props) {
    super(props)
    const moduleCode = this.props.sectionName.match(/[A-Z]{2,3}\w{3}/)
    if (moduleCode && moduleCode.length && moduleCode[0].length == 5) {
      this.prefix = moduleCode[0]
    } else { 
      this.prefix = this.props.sectionName
    }
  }

  render() {
    const listItems = this.props.lessons.map((lesson) =>
      <a
        key={lesson.s3Url}
        href={lesson.publicUrl}
        target="_blank"
        className="list-group-item list-group-item-action"
        download={`[${this.prefix}] ${lesson.name}.mp4`}>
        {lesson.name}
      </a>
    )

    return (
      <div className="list-group">
        {listItems}
      </div>
    )
  }
}

export default LessonList
