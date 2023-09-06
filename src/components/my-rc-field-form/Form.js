import FieldContext from './FieldContext'
import useForm from './useForm'
import React from 'react'

export default function Form(
  { children, onFinish, onFinishFailed, form },
  ref
) {
  const [formInstance] = useForm()

  formInstance.setCallbacks({
    onFinish,
    onFinishFailed
  })

  React.useImperativeHandle(ref, () => formInstance)

  const handleSubmit = (e) => {
    e.preventDefault()
    formInstance.submit()
  }

  return (
    <form onSubmit={handleSubmit}>
      <FieldContext.Provider value={formInstance}>
        {children}
      </FieldContext.Provider>
    </form>
  )
}
