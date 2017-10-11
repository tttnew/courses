import coursesApp from "../reducers/";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import favoritesMiddleware from "../middleware/favoritesMiddleware";

export default function configureStore() {
  const loggerMiddleware = createLogger();
  let store = createStore(
    coursesApp,
    applyMiddleware(favoritesMiddleware, thunkMiddleware, loggerMiddleware)
  );

  return store;
}
