import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { ButtonReact, ButtonReactPropsType } from '../ButtonReactV0101'

let click = () => {}
let params = 'test param'

const buttonReactProps: ButtonReactPropsType = {
  title: 'Click me',
  click,
  params,
}

/**
 @function type jest.Describe
 @description Unit Test Suites to implement
  - Render Test
  - Props Test
 */
describe('ButtonReact', () => {
  beforeEach(() => {})

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Render Test: checks rendering all elements with expected content', () => {
    const container = render(<ButtonReact {...buttonReactProps} />).container
    const buttonReact = container.getElementsByClassName('ButtonReact')[0]
    const buttonElement = container.getElementsByClassName('buttonElement')[0]

    expect(buttonReact).toBeInTheDocument()
    expect(buttonReact).toHaveTextContent('Click me')

    expect(buttonElement).toBeInTheDocument()
    expect(buttonElement).toHaveTextContent('Click me')
  })

  test('Props Test: tests display the correct values from props', () => {
    let buttonReactProps: ButtonReactPropsType = {
      title: 'The first buttonReact',
      click,
    }
    let container = render(<ButtonReact {...buttonReactProps} />).container
    let buttonReact = container.getElementsByClassName('ButtonReact')[0]
    expect(buttonReact).toHaveTextContent('The first buttonReact')

    buttonReactProps = {
      title: 'The second buttonReact',
      click,
    }
    container = render(<ButtonReact {...buttonReactProps} />).container
    buttonReact = container.getElementsByClassName('ButtonReact')[0]
    expect(buttonReact).toHaveTextContent('The second buttonReact')
  })
})
