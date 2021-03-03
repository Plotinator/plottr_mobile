import { ActionTypes } from 'pltr/v2'
// import rnfs from 'react-native-fs'
import { Platform, NativeModules } from 'react-native'
const { DocumentViewController } = NativeModules

const { FILE_SAVED, FILE_LOADED, NEW_FILE, EDIT_CARD_DETAILS } = ActionTypes
const BLACKLIST = [FILE_SAVED, FILE_LOADED, EDIT_CARD_DETAILS] // card details because it edits details and then coordinates and 2 like that screw up iOS
let documentURL = ''

export const setDocumentURL = URL => (documentURL = decodeURI(URL))

export const saveDocument = (documentData, successCallback, errorCallback) => {
  if (documentURL) {
    // only if doc url was set
    // rnfs
    //   .writeFile(documentURL, documentData, 'utf8')
    //   .then(() => successCallback && successCallback())
    //   .catch(err => errorCallback && errorCallback(err.message))

    if (Platform.OS === 'ios') {
      DocumentViewController.updateDocument(documentURL, documentData)
    } else if (Platform.OS === 'android') {
      NativeModules.AndroidDocument.saveDocument(state.file.fileName, documentData)
    }
  }
}

const DocumentSaver = store => next => action => {
  const result = next(action)
  if (BLACKLIST.includes(action.type)) return result
  // var isNewFile = action.type === NEW_FILE
  const state = store.getState()
  console.log('==================> STATE SAVED <=================')
  console.log(state)
  const documentData = JSON.stringify(state, null, 2)

  saveDocument(documentData)
  return result
}

export default DocumentSaver
