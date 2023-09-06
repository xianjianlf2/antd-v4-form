import { useRef } from 'react'

class FormStore {
  constructor() {
    this.store = {}
    // 存放FromItem实例
    this.fieldEntities = []

    this.callbacks = {}
  }

  registerFieldEntities = (entity) => {
    this.fieldEntities.push(entity)

    // unregister
    return () => {
      this.fieldEntities = this.fieldEntities.filter((item) => item !== entity)
      delete this.store[entity]
    }
  }

  getFieldValue = (name) => {
    return this.store[name]
  }
  getFieldsValue = () => {
    return { ...this.store }
  }

  setFieldsValue = (newStore) => {
    this.store = {
      ...this.store,
      ...newStore
    }
    this.fieldEntities.forEach((entity) => {
      Object.keys(newStore).forEach((k) => {
        if (k === entity.props.name) {
          entity.onStoreChange()
        }
      })
    })
  }

  submit = () => {
    console.log('submit')

    let err = this.validate()
    const { onFinish, onFinishFailed } = this.callbacks

    if (err.length === 0) {
      // 校验通过
      onFinish(this.getFieldsValue())
    } else {
      // 校验不通过
      onFinishFailed(err, this.getFieldsValue())
    }
  }

  setCallbacks = (callbacks) => {
    this.callbacks = {
      ...this.callbacks,
      ...callbacks
    }
  }

  validate() {
    let err = []
    const fieldEntities = this.fieldEntities
    fieldEntities.forEach((entity) => {
      const { name, rules } = entity.props
      const value = this.getFieldValue(name)
      // warning: 只取了第一个校验规则
      let rule = rules[0]
      if (
        rule &&
        rule.required &&
        (value === undefined || value.trim() === '')
      ) {
        err.push({ [name]: rule.message, value })
      }
    })
    return err
  }

  getForm = () => {
    return {
      getFieldsValue: this.getFieldsValue,
      getFieldValue: this.getFieldValue,
      setFieldsValue: this.setFieldsValue,
      submit: this.submit,
      registerFieldEntities: this.registerFieldEntities,
      setCallbacks: this.setCallbacks
    }
  }
}

export default function useForm(form) {
  // 存值，在组件卸载之前指向的都是同一个值
  const formRef = useRef()

  if (!formRef.current) {
    if (form) {
      formRef.current = form
    } else {
      const formStore = new FormStore()
      formRef.current = formStore.getForm()
    }
  }
  return [formRef.current]
}
