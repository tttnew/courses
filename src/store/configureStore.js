import coursesApp from "../reducers/";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { createStore, applyMiddleware } from "redux";

export default function configureStore() {
  const loggerMiddleware = createLogger();
  let store = createStore(
    coursesApp,
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  );
  store.subscribe(() => {
    let state = store.getState();
    let data = JSON.stringify(state.course.favorites);
    localStorage.setItem("favorites", data);
  });
  return store;
}
