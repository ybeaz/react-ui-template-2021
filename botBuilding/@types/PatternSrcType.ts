import { RoleType } from './RoleType'
import { ContentSrcType } from './ContentSrcType'

export type PatternSrcType = {
  isActive: boolean
  position: number
  roleType: RoleType
  contentSrcType: ContentSrcType
  contentSrc: string
  contentSrcProcessor?: any
  contentResFunc: (str: any) => string
}
