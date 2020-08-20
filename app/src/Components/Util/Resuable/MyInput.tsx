import React from 'react'
import { Form, Input, Checkbox, Radio } from 'semantic-ui-react'
import { useFormContext } from 'react-hook-form'
import NumberFormat from 'react-number-format'

type Props = {
  label?: string
  name: string
  options?: Array<String>
  input_type: string
  max_range?: number
  id: string
  value?: string
  disabled?: boolean
  checked?: boolean
  size?: number
  width?: number
  rows?: number
  label_size?: number
  style?: object
  defaultValue?: string
  placeholder?: string
  autoComplete?: boolean
}

const MyInput: React.FC<Props> = (props: Props) => {
  const [passwordToggle, setpasswordToggle] = React.useState(false)
  const { register } = useFormContext()
  //   if (!props.options) {
  //     props.options = []
  //   }
  return (
    <>
      {props.input_type === 'input' ? (
        <Form.Field id={props.id} control={Input} label={props.label}>
          <input placeholder={props.placeholder} name={props.name} ref={register} />
        </Form.Field>
      ) : props.input_type === 'password' ? (
        <Form.Field id={props.id}>
          <label onClick={() => setpasswordToggle((prev) => (prev = !prev))}>{props.label}</label>
          <input
            data-tip
            data-for='password'
            placeholder={props.placeholder}
            type={passwordToggle ? 'text' : 'password'}
            name={props.name}
            ref={register}
            autoComplete='off'
          />
        </Form.Field>
      ) : props.input_type === 'checkbox' ? (
        <Form.Field>
          <Checkbox label={props.label} name={props.name} ref={register} />
        </Form.Field>
      ) : props.input_type === 'radio' ? (
        <Form.Field>
          <Radio label={props.label} name={props.name} ref={register} />
        </Form.Field>
      ) : props.input_type === 'number' ? (
        <NumberFormat name={props.name} ref={register} displayType={'input'} thousandSeparator={true} />
      ) : null}
    </>
  )
}

export default MyInput
