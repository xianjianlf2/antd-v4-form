import React, { Component } from 'react'
import Input from '../components/Input'
import Form, { FormItem } from '../components/my-rc-field-form/index'

const nameRules = { required: true, message: '请输入姓名！' }
const passwordRules = { required: true, message: '请输入密码！' }

export default class MyRCFieldForm extends Component {
  formRef = React.createRef()
  componentDidMount() {
    console.log('form', this.formRef.current)
    this.formRef.current.setFieldsValue({ username: 'default' })
  }
  onFinish = (val) => {
    console.log('onFinish', val)
  }

  // 表单校验失败执行
  onFinishFailed = (val) => {
    console.log('onFinishFailed', val)
  }
  render() {
    return (
      <div>
        <h3>MyRCFieldForm</h3>
        <Form
          ref={this.formRef}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <FormItem name="username" rules={[nameRules]}>
            <Input placeholder="Username" />
          </FormItem>
          <FormItem name="password" rules={[passwordRules]}>
            <Input placeholder="Password" />
          </FormItem>
          <button>Submit</button>
        </Form>
      </div>
    )
  }
}
