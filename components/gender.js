import React from "react";
import { View, Text, Picker, StyleSheet } from "react-native";

const GenderPicker = ({ gender, genderFilterFunction }) => {
  return (
    <Picker
      style={styles.picker}
      selectedValue={gender}
      onValueChange={genderFilterFunction}
    >
      <Picker.Item label="Female" value="female" />
      <Picker.Item label="Both" value="both" />
      <Picker.Item label="Male" value="male" />
    </Picker>
  );
};

const styles = StyleSheet.create({
  picker: {
    marginTop: -27,
    marginLeft: 50,
    height: 2,
    width: 140
  }
});

export default GenderPicker;
