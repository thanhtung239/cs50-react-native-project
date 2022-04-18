import React, { useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Context } from "../context/notesContext";
import { EvilIcons } from "@expo/vector-icons";

const ShowScreen = ({ navigation }) => {
  const { state } = useContext(Context);

  const notes = state.find((notes) => notes.id === navigation.getParam("id"));

  return (
    <View>
      <Text style={styles.title}>{notes.title}</Text>
      <Text style={styles.content}>{notes.content}</Text>
    </View>
  );
};

ShowScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Edit", { id: navigation.getParam("id") })
        }
      >
        <EvilIcons name="pencil" size={35} />
      </TouchableOpacity>
    ),
  };
};

export default ShowScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 700,
    marginLeft: 10,
    marginTop: 15,
  },
  content: {
    fontSize: 16,
    marginLeft: 10,
  }
});
