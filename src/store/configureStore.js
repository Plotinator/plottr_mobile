import { createStore, applyMiddleware, compose } from 'redux'
import { rootReducer } from 'pltr/v2'
import saver from '../middlewares/saver'

let store = null

export function configureStore(initialState) {
  const enhancer = compose(applyMiddleware(saver))
  store = createStore(rootReducer, initialState, enhancer)
  return store
}

export function getStore () {
  return store
}
