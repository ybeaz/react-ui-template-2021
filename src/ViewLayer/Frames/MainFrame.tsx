import React, { ReactElement } from 'react'
interface MainFrameArgs {
  screenType?: string
  children: (ReactElement | null)[]
}

export const MainFrame: React.FunctionComponent<MainFrameArgs> = props => {
  const { screenType } = props

  const classAdded = screenType ? `MainFrame_${screenType}` : ''

  return (
    <div className={`MainFrame ${classAdded}`}>
      <header className='_header'>{props.children[0]}</header>
      <section className='_middle'>
        <aside className='_left'>{props.children[1]}</aside>
        <div className='_main'>
          <div className='_wrapper'>{props.children[2]}</div>
        </div>
        <aside className='_right'>{props.children[3]}</aside>
      </section>
      <footer className='_footer'>{props.children[4]}</footer>
    </div>
  )
}
