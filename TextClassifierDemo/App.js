/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  NativeModules
} from "react-native";

const RNCoreML = NativeModules.RNCoreML;

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      textPredicted: "-"
    };
  }

  componentDidMount() {
    this.predict();
  }

  predict = inputText => {
    if (!inputText) return;
    RNCoreML.predict(inputText).then(result => {
      this.setState({
        textPredicted: result.text
      });
    });
  };

  render() {
    const { textPredicted } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Text Classifier Sample with Core ML</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Type here to predict!"
          onChangeText={text => this.predict(text)}
        />
        <Text style={styles.result}>{textPredicted}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
    marginTop: -120,
    marginBottom: 120
  },
  textInput: {
    width: "88%",
    height: 44,
    padding: 8,
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#333333"
  },
  result: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    color: "#333333",
    marginTop: 24,
    marginBottom: 64
  }
});
