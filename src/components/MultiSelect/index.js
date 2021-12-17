import React, { useRef } from 'react'
import PropTypes from 'prop-types';
import { Select } from 'antd'

export const MultiSelect = (props) => {
    const input = useRef()
    const lblPlaceholder = useRef()
    function placeholder(input, text, onOff) {           
        if (!lblPlaceholder.current) {
          return
        }

        if (onOff && (!input?.current || input?.current?.props?.value?.length === 0)) {
          lblPlaceholder.current.innerText = props.placeholder
        }
        else {
            lblPlaceholder.current.innerText = ''
        }
    }

    return <div style={{ width: "100%", position: 'relative' }}>
        <span ref={lblPlaceholder} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', marginTop: '-3px', left: '8px', color: '#d8bdbd', fontSize: '14px' }}>{props.placeholder}</span>
        <Select {...props} placeholder="" ref={input} 
            onFocus={() => {placeholder(input, props.placeholder, false)}}
            onBlur={() => {placeholder(input, props.placeholder, true)}}
        >
            {props.children}
        </Select>
        </div>
}

MultiSelect.propTypes = {
    children: PropTypes.object,
    placeholder: PropTypes.string
}

export default MultiSelect;