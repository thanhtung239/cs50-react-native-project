import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

const NotesForm = ({ onSubmit, initialValues }) => {
  const [title, setTitle] = useState(initialValues.title);
  const [content, setContent] = useState(initialValues.content);

  return (
    <View style={styles.noteForm}>
      <Text style={styles.label}>Enter Title:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <Text style={styles.label}>Enter Content:</Text>
      <TextInput
        style={styles.input}
        multiline={true}
        numberOfLines={4}
        value={content}
        onChangeText={(text) => setContent(text)}
      />
      <Button
        style={styles.buttonSave}
        title="Save Note"
        onPress={() => {
          onSubmit(title, content);
        }}
      />
    </View>
  );
};

NotesForm.defaultProps = {
  initialValues: {
    title: "",
    content: "",
  },
};

export default NotesForm;

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 15,
    padding: 5,
    margin: 5,
    borderRadius: 5,
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
    marginLeft: 5,
  },
  noteForm: {
    marginTop: 15,
  },
  buttonSave: {
    backgroundColor: "#009900",
    borderRadius: 5,
  }
});
