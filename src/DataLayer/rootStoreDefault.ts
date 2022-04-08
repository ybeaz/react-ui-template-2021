import { IComponentsState, IForms, IRootStore } from '../Interfaces/IRootStore'

import { IUser } from '../Interfaces/IUser'

export const userStoreDefault: IUser = {
  userAvatar: '',
  userBirthYear: null,
  userDateCreated: '',
  userDateDeleted: '',
  userDateUpdated: '',
  userEmail: '',
  userGender: '',
  userIdProfile: '',
  userIdAuth: '',
  userIdExternal: '',
  userInfoAbout: '',
  userLanguages: [],
  userLocaleCity: '',
  userLocaleCountry: '',
  userLoginSource: '',
  userMedia: [],
  userName: '',
  userNameNick: '',
  userNameFirst: '',
  userNameLast: '',
  userNameMiddle: '',
  userPasswordAuth: '',
  userPasswordAuth2: '',
  userPhone: null,
  userRoles: [],
  userSkillsExpertise: [],
  userStatus: '',
  userWebLink: '',
  userWebTokenAuth: '',
  userZoneInfo: '',
}

export const componentsStateDefault: IComponentsState = {
  isLoaderOverlayVisible: false,
  modalFrames: [
    {
      childName: 'AuthUser',
      isActive: false,
      childProps: {
        scenario: { branch: 'signInManually', step: '' },
      },
    },
  ],
}

export const formsDefault: IForms = {
  searchInput: '',
  userPrev: userStoreDefault,
  user: userStoreDefault,
}

export const rootStoreDefault: IRootStore = {
  componentsState: componentsStateDefault,
  users: [],
  forms: formsDefault,
  isLoaded: {
    isLoadedGlobalVars: false,
  },
  globalVars: {
    theme: 'Dark',
    language: localStorage.getItem('language') || 'en',
  },
}
