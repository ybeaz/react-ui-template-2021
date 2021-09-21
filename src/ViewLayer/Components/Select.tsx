import React, { useState, useEffect, useRef } from 'react'
import { nanoid } from 'nanoid'

import { getUniqArrBy } from '../../Shared/getUniqArrBy'
import { getCreatedStyleElement } from '../../Shared/getCreatedStyleElement'
import { handleEvents } from '../../DataLayer/index.handleEvents'
import { IHandleEventsProps } from '../../Interfaces/IHandleEventsProps'
export interface ISelectOption {
  defaultSelected?: boolean
  selected: boolean
  text?: string
  value?: string
}
interface ISelectArgs {
  classAdded: string
  multiple?: boolean
  options: ISelectOption[]
  size: number
  sizeOnBlur: number
  typeEvent: string
  componentId: string
  language: string
}

interface IGetOptionsNext {
  (options: ISelectOption[], arrSelected: string[]): ISelectOption[]
}

export const Select: React.FunctionComponent<ISelectArgs> = (
  props: ISelectArgs
): JSX.Element => {
  const {
    classAdded,
    size: sizeIn,
    sizeOnBlur,
    options: optionsIn,
    multiple,
    typeEvent: typeEventIn,
    componentId,
    language,
  } = props

  const options = getUniqArrBy(['value'], optionsIn)

  const animationRef = useRef(`_animationOut`)
  const onBlurRef = useRef(true)
  const [optionsState, setOptionsState] = useState(options)
  const [optionsState2, setOptionsState2] = useState(options)
  const [onBlurState, setOnBlurState] = useState(true)
  const [sizeState, setSizeState] = useState(sizeOnBlur)

  const getInjectedAnimationToSelect = (props2: {
    size2: number
    hBase2: number
    delay2: number
  }): void => {
    const { size2, hBase2, delay2 } = props2
    const iterator = Array(12).fill(true)

    const hInInit = String(hBase2 * size2)

    let keyframesStyleArr = [
      `._animationIn { min-height: ${hInInit}rem; height: ${hInInit}rem; }`,
    ]

    iterator.forEach((item, i) => {
      const f = i > 1 ? i : 1
      const hOut = String(hBase2 * f)
      const hIn =
        hBase2 * f <= hBase2 * size2
          ? String(hBase2 * size2)
          : String(hBase2 * f)

      keyframesStyleArr.push(
        ...[
          `._animationIn${i} { animation-duration: ${delay2}s; animation-name: in${i}; animation-direction: alternate; }`,
          `@-webkit-keyframes in${i} {
            0% { min-height: ${hOut}rem; height: ${hOut}rem; } 100% { min-height: ${hIn}rem; height: ${hIn}rem; }
          }`,

          `._animationOut${i} { animation-duration: ${delay2}s; animation-name: out${i}; animation-direction: alternate; }`,
          `@-webkit-keyframes out${i} {
            0% { min-height: ${hIn}rem; height: ${hIn}rem; } 100% { min-height: ${hOut}rem; height: ${hOut}rem; }
          }`,
        ]
      )
    })

    keyframesStyleArr.forEach((item, i) =>
      getCreatedStyleElement.sheet.insertRule(item, i)
    )
  }

  useEffect(() => {
    getInjectedAnimationToSelect({ size2: sizeIn, hBase2: 1.6, delay2: 0.6 })

    setOptionsState(options)
    setOptionsState2(options)
    onBlurRef.current = onBlurState
    setOnBlurState(true)
    setSizeState(sizeOnBlur)
  }, [language])

  const getOptionsSelected = (options2: ISelectOption[]): ISelectOption[] =>
    options2.filter(item => item.selected === true)

  const getOptionsJsx = (options2: ISelectOption[]): React.ReactElement[] => {
    return options2.map((option: ISelectOption) => {
      const { text, value, defaultSelected, selected } = option
      const nanoID = nanoid()

      const optionProps = {
        key: nanoID,
        className: `_option`,
        value,
        defaultSelected,
        selected,
      }

      return <option {...optionProps}>{text}</option>
    })
  }

  const getOptionsNext: IGetOptionsNext = (options2, arrSelected) => {
    let output = options2.map((option: ISelectOption, i: number) => {
      const { value, selected } = option

      let selectedNext = false
      if (multiple) {
        if (selected) {
          selectedNext = !arrSelected.find(item => item === value)
        } else {
          selectedNext = !!arrSelected.find(item => item === value)
        }
      } else {
        selectedNext = !!arrSelected.find(item => item === value)
      }

      return {
        ...option,
        selected: selectedNext,
      }
    })

    const optionsSelected = output.filter(item => item.selected === true)

    if (multiple && optionsSelected.length > 1) {
      output = output.map((item, i) =>
        i === 0 ? { ...item, selected: false } : item
      )
    }

    return output
  }

  const SELECT_ON_MOUSE_DOWN = (event: any): void => {
    options.length > sizeIn && setSizeState(sizeIn)
    if (onBlurState) {
      onBlurState && setOptionsState(optionsState2)
      onBlurRef.current = true
      setOnBlurState(false)
    }

    // Case clicking to remove the only selected option
    const optionsSelected = getOptionsSelected(optionsState)
    if (
      !onBlurState &&
      optionsSelected.length === 1 &&
      optionsSelected[0].value === event.target.value
    ) {
      const optionsStateNext = getOptionsNext(optionsState, [
        event.target.value,
      ])
      setOptionsState(optionsStateNext)
    }
  }

  const SELECT_ON_MOUSE_ENTER = (): void => {
    // if (openOmMouseEnter) SELECT_ON_MOUSE_DOWN()
  }

  const SELECT_ON_MOUSE_LEAVE = (): void => {
    if (onBlurRef.current === false) return

    let optionsNext = optionsState.filter(item => item.selected === true)
    if (optionsState.filter(item => item.selected === true).length === 0) {
      optionsNext = options.filter((item, i) => i === 0)
    }

    const sizeSelected = optionsNext.length ? optionsNext.length : 1

    onBlurRef.current = false
    setOnBlurState(true)
    setSizeState(sizeSelected)
    setOptionsState2(optionsState)
    setOptionsState(optionsNext)
  }

  const SELECT_ON_CHANGE = (event: any): void => {
    setSizeState(sizeIn)

    const arrSelected = event.target.selectedOptions
      ? Array.from(event.target.selectedOptions, (option: any) => option.value)
      : [event.target.value]

    if (!multiple) {
      SELECT_ON_MOUSE_LEAVE()
    }

    const optionsStateNext = getOptionsNext(optionsState, arrSelected)
    setOptionsState(optionsStateNext)

    const dataSelected = optionsStateNext
      .filter((item, i) => i !== 0 && item.selected === true)
      .map(item => item.value)

    handleEvents(event, {
      typeEvent: typeEventIn,
      data: dataSelected,
    })
  }

  const handleComponentEvents = (
    event: any,
    propsEvent: IHandleEventsProps
  ): void => {
    const { typeEvent: typeEvent2, data } = propsEvent

    const output = {
      SELECT_ON_MOUSE_DOWN,
      SELECT_ON_CHANGE,
      SELECT_ON_MOUSE_ENTER,
      SELECT_ON_MOUSE_LEAVE,
    }

    // console.info('Select [225]', { typeEvent2, componentId })
    output[typeEvent2]
      ? output[typeEvent2](event)
      : console.log('Select handleComponentEvents [error]', 'strange type', {
          typeEvent2,
          data,
        })
  }

  const optionsSelectedLen = getOptionsSelected(optionsState).length

  const getAddAnimationClass = (
    onBlur: boolean,
    optionsLen: number
  ): string => {
    let output = `_animationOut${0}`

    if (!onBlur && animationRef.current === '_animationOut') {
      output = `_animationIn${optionsLen}`
      animationRef.current = '_animationIn'
    } else if (!onBlur && animationRef.current === '_animationIn') {
      output =
        optionsLen <= sizeIn ? `_animationIn` : `_animationIn${optionsLen}`
      animationRef.current = '_animationIn'
    } else if (onBlur) {
      output = `_animationOut${optionsLen}`
      animationRef.current = '_animationOut'
    }

    return output
  }

  const selectAddAmimation = getAddAnimationClass(
    onBlurState,
    optionsSelectedLen
  )
  let size = optionsSelectedLen < sizeIn ? sizeState : optionsSelectedLen
  size = !multiple && sizeState === 1 ? 2 : size

  const classScrollbar = !onBlurState ? '_scrollbar' : ''
  const classHeightFixed = !multiple && onBlurState ? '_heightFixed' : ''
  const classBackground = onBlurState && optionsSelectedLen ? '_background' : ''

  // console.info('Select [258]', { size, optionsSelectedLen, sizeIn, sizeState })

  return (
    <div
      className={`Select ${classAdded} ${selectAddAmimation} ${classBackground}`}
      id={componentId}
    >
      <select
        id='select'
        className={`__selectTag ${classScrollbar} ${classHeightFixed} ${classBackground}`}
        name='select_component'
        size={size}
        multiple={multiple}
        onMouseDown={(event: any) =>
          handleComponentEvents(event, { typeEvent: 'SELECT_ON_MOUSE_DOWN' })
        }
        onChange={(event: any) =>
          handleComponentEvents(event, { typeEvent: 'SELECT_ON_CHANGE' })
        }
        onMouseEnter={(event: any) =>
          handleComponentEvents(event, { typeEvent: 'SELECT_ON_MOUSE_ENTER' })
        }
        onMouseLeave={(event: any) =>
          handleComponentEvents(event, {
            typeEvent: 'SELECT_ON_MOUSE_LEAVE',
          })
        }
      >
        {getOptionsJsx(optionsState)}
      </select>
    </div>
  )
}
