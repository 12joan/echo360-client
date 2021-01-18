import React, {Component} from 'react'

const FormInput = (props) => (
  <div className="mb-3">
    <label
      htmlFor={props.id}
      className="form-label">
      {props.label}
    </label>

    <input
      type={props.type || 'text'}
      id={props.id}
      name={props.name}
      className="form-control"
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange} />
  </div>
)

export default FormInput
