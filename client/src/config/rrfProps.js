// React-redux-firebase props config
// This is used in our firebase provider

import { createFirestoreInstance } from "redux-firestore";
import firebase from "./db";
import rrfConfig from "./rrfConfig";
import store from "../store";

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, // <- needed if using firestore
};

export default rrfProps;
