import { createStore, applyMiddleware, compose } from 'redux'
import { rootReducer } from 'pltr/v2'
import DocumentSaver from '../middlewares/DocumentSaver'

let store = null

const dataRepairers = {}

export function configureStore (initialState) {
  const enhancer = compose(applyMiddleware(DocumentSaver))
  store = createStore(rootReducer(dataRepairers), initialState, enhancer)
  return store
}

export function getStore () {
  return store
}
