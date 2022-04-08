import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { IRootStore } from '../../Interfaces/IRootStore'

export const LoaderOverlay: React.FunctionComponent<any> = (): ReactElement => {
  const {
    componentsState: { isLoaderOverlayVisible },
  } = useSelector((store2: IRootStore) => store2)

  const classAdd = isLoaderOverlayVisible ? 'LoaderOverlay_show' : ''

  return (
    <div className={`LoaderOverlay ${classAdd}`}>
      <div className={`_spinner`}></div>
    </div>
  )
}
