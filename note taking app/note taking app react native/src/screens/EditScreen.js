import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Context } from "../context/notesContext";
import NotesForm from "../components/NotesForm";

const EditScreen = ({ navigation }) => {
  const id = navigation.getParam("id");
  const { state, editNotes } = useContext(Context);

  const notes = state.find((notes) => notes.id === id);

  return (
    <NotesForm
      initialValues={{ title: notes.title, content: notes.content }}
      onSubmit={(title, content) => {
        editNotes(id, title, content, () => {
          navigation.pop();
        });
      }}
    />
  );
};

export default EditScreen;

const styles = StyleSheet.create({});
