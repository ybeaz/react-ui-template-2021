/**
 * @description Funciton to merge "right" array with arrInput (with arrInput priority)
 */

export const getUpdatedArrByArrInput: Function = (
  arr: any[],
  arrInput: any[],
  updateByProp: string
): any[] => {
  if (arr.length === 0) return []
  if (arrInput.length === 0) return arr

  const arrFiltered = arr.filter(
    item => !!arrInput.find(item2 => item2[updateByProp] !== item[updateByProp])
  )

  return [...arrFiltered, ...arrInput]
}

/*
const modalFrames = [
  {
    childName: 'AuthUser1',
    isActive: false,
    childProps: {
      scenario: { branch: 'signInWithVkontakte', step: '' },
    },
  },
  {
    childName: 'AuthUser2',
    isActive: false,
    childProps: {
      scenario: { branch: 'signInWithFacebook', step: '' },
    },
  },
  {
    childName: 'AuthUser3',
    isActive: true,
    childProps: {
      scenario: { branch: 'signInManually', step: '' }, // signInWithVkontakte signInWithFacebook signInWithGoogle signInManually
    },
  },
]

const arrInput = [
  {
    childName: 'AuthUser1',
    isActive: true,
    childProps: {
      scenario: { branch: 'signInWithVkontakte', step: '' },
    },
  },
]

const res = getUpdatedArrByArrInput(modalFrames, arrInput, 'childName')

console.info('getUpdatedArrByArrInput [21]', { res })
*/
