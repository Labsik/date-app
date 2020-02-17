import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import moment from "moment";

const User = ({ item, invitation }) => {
  return (
    <TouchableOpacity onPress={() => invitation(item.id)}>
      <Text
        style={[
          item.status === "active"
            ? { color: "#000000" }
            : { color: "#808080" },
          styles.textItem
        ]}
      >
        {`#${item.id} - ${item.first_name} ${item.last_name} - ${moment().diff(
          item.dob,
          "years"
        )} years old - ${item.gender}`}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textItem: {
    fontSize: 16,
    margin: 10
  }
});

export default User;
