import React, { Component } from 'react'
import FieldContext from './FieldContext'

export default class FormItem extends Component {
  static contextType = FieldContext

  componentDidMount() {
    const { registerFieldEntities } = this.context
    this.unregister = registerFieldEntities(this)
  }

  componentWillUnmount() {
    this.unregister()
  }

  onStoreChange = () => {
    this.forceUpdate()
  }

  // 受控组件
  getControl = () => {
    const { getFieldValue, setFieldsValue } = this.context

    const { name } = this.props

    return {
      value: getFieldValue(name),
      onChange: (e) => {
        const newValue = e.target.value
        setFieldsValue({ [name]: newValue })
      }
    }
  }

  render() {
    const { children } = this.props
    const returnChildNode = React.cloneElement(children, this.getControl())
    return returnChildNode
  }
}
