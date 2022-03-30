import { IReducer } from '../../Interfaces/IReducer'

export const TOGGLE_LOADER_OVERLAY: IReducer = (store, data) => {
  const { componentsState } = store
  const componentsStateNext = {
    ...componentsState,
    isLoaderOverlayVisible: data,
  }
  return { ...store, componentsState: componentsStateNext }
}
