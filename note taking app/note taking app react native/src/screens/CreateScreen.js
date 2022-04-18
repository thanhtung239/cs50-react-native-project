import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Context } from "../context/notesContext";
import NotesForm from "../components/NotesForm";

const CreateScreen = ({ navigation }) => {
  const { addNotes } = useContext(Context);

  return (
    <NotesForm
      onSubmit={(title, content) => {
        addNotes(title, content, () => {
          navigation.navigate("Index");
        });
      }}
    />
  );
};

export default CreateScreen;

const styles = StyleSheet.create({});
