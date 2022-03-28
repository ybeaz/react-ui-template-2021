export interface IUser {
  userAvatar: string
  userBirthYear: number | null
  userDateCreated: string
  userDateDeleted: string
  userDateUpdated: string
  userEmail: string
  userGender: string
  userIdProfile: string
  userIdAuth: string
  userIdExternal: string
  userInfoAbout: string
  userLanguages: string[]
  userLocaleCity: string
  userLocaleCountry: string
  userLoginSource: string
  userMedia: string[]
  userName: string
  userNameNick: string
  userNameFirst: string
  userNameLast: string
  userNameMiddle: string
  userPasswordAuth: string
  userPasswordAuth2: string
  userPhone: number | null
  userRoles: string[]
  userSkillsExpertise: string[]
  userStatus: string
  userWebLink: string
  userWebTokenAuth: string
  userZoneInfo: string
}
