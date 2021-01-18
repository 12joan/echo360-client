import React, {Component} from 'react'

class LessonList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const listItems = this.props.lessons.map((lesson) =>
      <a
        key={lesson.s3Url}
        href={lesson.publicUrl}
        target="_blank"
        className="list-group-item list-group-item-action">
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
