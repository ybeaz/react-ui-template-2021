import { IRootStore } from './IRootStore'

export interface IReducer {
  (store: IRootStore, data: any): IRootStore
}
