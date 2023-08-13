import React from 'react'
import ReactDOM from 'react-dom'
// import enzyme, { shallow, mount } from 'enzyme'
// import Adapter from 'enzyme-adapter-react-16'

import { ButtonReact } from '../ButtonReactV0101'

// enzyme.configure({ adapter: new Adapter() })
// jest.mock('../../Shared/serviceFunc')

describe('ComponentXyzFunc', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')

    const buttonReactProps = { title: 'title', click: () => {} }

    ReactDOM.render(<ButtonReact {...buttonReactProps} />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})

/*

  it('should input have a value', () => {
    const wrapperMount = mount(<ComponentXyzFunc />)
    const mockFn = jest.fn()
    const ComponentXyzInput = wrapperMount.find('.ComponentXyzFunc__input')
    ComponentXyzInput.props().value = 'Hello value'
    expect(ComponentXyzInput.props().value).toBe('Hello value')
  })

  it('should respond on onClick', () => {
    const wrapper = shallow(<ComponentXyzFunc />)
    const mockFn = jest.fn()
    const ComponentXyzButton = wrapper.find('.ComponentXyzFunc__button').first()
    ComponentXyzButton.simulate('click', mockFn())
    expect(mockFn).toHaveBeenCalledTimes(1)
    expect(mockFn).toHaveBeenCalled()
  })

  it('should serviceFunc.utilMaxValue called', () => {
    const component = shallow(<ComponentXyzFunc debug />)
    expect(serviceFunc.utilMaxValue).toHaveReturned()
    expect(serviceFunc.utilMaxValue).toHaveBeenCalledWith([])
    expect(serviceFunc.utilMaxValue).toBeCalled()
  })

  it('should match snapshot in "debug" mode', () => {
    const component = shallow(<ComponentXyzFunc debug />)
    expect(component).toMatchSnapshot()
  })

*/
