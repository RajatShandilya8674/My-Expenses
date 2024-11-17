import React from 'react'

export default function InputField({title, id, handleChange, expObj, error}) {
  return (
    <div className="input-container">
          <label htmlFor={title}>{title}</label>
          <input
            id={id}
            name={id}
            value={expObj}
            onChange={handleChange}
          />
          <p className="errorPara">{error}</p>
        </div>
  )
}
