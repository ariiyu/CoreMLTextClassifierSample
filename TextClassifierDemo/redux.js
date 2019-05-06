import { NativeModules } from "react-native";
import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const RNCoreML = NativeModules.RNCoreML;

const initialState = {
  classifier: {
    textPredicted: "-"
  }
};

// actions

export const predictAction = text => ({
  type: "PREDICT",
  text: text
});

export const predict = text => dispatch => {
  RNCoreML.predict(text).then(result => {
    dispatch(predictAction(result.text));
  });
};

// reducers

const _classifier = (state = {}, action) => {
  switch (action.type) {
    case "PREDICT":
      return {
        ...state,
        textPredicted: action.text
      };
    default:
      return state;
  }
};

export const reducers = combineReducers({
  classifier: _classifier
});

// store

export const store = createStore(
  reducers,
  initialState,
  applyMiddleware(thunk)
);
