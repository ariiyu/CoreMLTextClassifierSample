import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, TextInput } from "react-native";
import { connect } from "react-redux";
import { predict } from "./redux";
import { store } from "./redux";

export class Home extends Component {
  render() {
    const { predict, textPredicted } = this.props;
    const s = store.getState();
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Text Classifier Sample with Core ML</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Type here to predict!"
          onChangeText={text => handlePredict(text)}
        />
        <Text style={styles.result}>{textPredicted}</Text>
      </View>
    );
  }
}

const handlePredict = text => {
  store.dispatch(predict(text));
};

const mapStateToProps = state => {
  return {
    textPredicted: state.classifier.textPredicted
  };
};

const mapDispatchToProps = {
  predict
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

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
