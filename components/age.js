import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const AgeFilter = ({ age, ageFilterFunction }) => {
  return (
    <View style={styles.agesFilter}>
      <Text style={styles.text}>Age from:</Text>
      <TextInput
        keyboardType={"numeric"}
        placeholder={"From"}
        onChangeText={text => ageFilterFunction(text, "from")}
        maxLength={2}
        value={age.from}
        style={styles.textInput}
      />
      <Text style={styles.text}>To: </Text>
      <TextInput
        keyboardType={"numeric"}
        placeholder={"To"}
        onChangeText={text => ageFilterFunction(text, "to")}
        maxLength={2}
        value={age.to}
        style={styles.textInput}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  agesFilter: {
    marginLeft: 15,
    marginTop: 20
  },
  text: {
    fontSize: 20
  },
  textInput: {
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "red"
  }
});

export default AgeFilter;
