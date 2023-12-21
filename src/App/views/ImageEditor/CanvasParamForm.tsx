import React, { useEffect, useRef } from 'react'
import { FormInstance, InputNumber, Form, Slider, Space } from 'antd'

import { CanvasImage } from './type'

import styles from './index.module.css'

interface ISliderAndInputnumber {
  value?: number
  min?: number
  max?: number
  step?: number
  onChange?: (value: number | null) => void
}
const SliderAndInputnumber: React.FC<ISliderAndInputnumber> = ({ value, onChange, min = 0, max = 100, step = 1 }) => {
  return (
    <Space>
      <Slider value={value} onChange={onChange} min={min} max={max} step={step} style={{ width: '150px' }}></Slider>
      <InputNumber value={value} onChange={onChange} min={min} max={max} step={step} style={{ width: '70px' }}></InputNumber>
    </Space>
  )
}
interface ICanvasToolsPanel {
  form: FormInstance<any>
  onFormFieldChange: () => void
  initialValues?: CanvasImage
}
const CanvasParamForm: React.FC<ICanvasToolsPanel> = ({ form, onFormFieldChange, initialValues }) => {
  useEffect(() => {
    form.setFieldsValue(initialValues)
  }, [initialValues])
  return (
    <div className={styles.canvasToolsPanel}>
      <Form
        form={form}
        onFieldsChange={onFormFieldChange}
        name={'CanvasParamForm'}
        labelAlign='left'
        colon={false}
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 16 }}
        style={{ width: '360px', padding: '16px' }}
        autoComplete='off'>
        <Form.Item name='brightness' label='亮度'>
          <SliderAndInputnumber min={-1} max={1} step={0.1} />
        </Form.Item>
        <Form.Item name='contrast' label='对比度'>
          <SliderAndInputnumber min={-100} max={100} step={1} />
        </Form.Item>
        <Form.Item name='opacity' label='透明度'>
          <SliderAndInputnumber min={0} max={1} step={0.1} />
        </Form.Item>
        <Form.Item name='saturation' label='饱和度'>
          <SliderAndInputnumber min={-1} max={1} step={0.1} />
        </Form.Item>
      </Form>
    </div>
  )
}

export default CanvasParamForm
