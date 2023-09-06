import FormItem from './FormItem'

import _Form from './Form'
import React from 'react'

const Form = React.forwardRef(_Form)
Form.Item = FormItem

export { FormItem }
export default Form
