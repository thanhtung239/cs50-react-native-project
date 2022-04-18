import createDataContext from "./createDataContext";
import jsonServer from "../api/jsonServer";

const notesReducer = (state, action) => {
  switch (action.type) {
    case "get_notes":
      return action.payload;
    case "edit_notes":
      return state.map((notesPost) => {
        return notesPost.id === action.payload.id ? action.payload : notesPost;
      });

    case "delete_notes":
      return state.filter((notesPost) => notesPost.id !== action.payload);
    case "add_notes":
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 99999),
          title: action.payload.title,
          content: action.payload.content,
        },
      ];
    default:
      return state;
  }
};

const getNotes = (dispatch) => {
  return async () => {
    const response = await jsonServer.get("/notes");
    dispatch({ type: "get_notes", payload: response.data });
  };
};

const addNotes = (dispatch) => {
  return async (title, content, callback) => {
    await jsonServer.post("/notes/add", { title, content });

    if (callback) {
      callback();
    }
  };
};

const deleteNotes = (dispatch) => {
  return async (id) => {
    await jsonServer.delete(`/notes/${id}`);
    dispatch({ type: "delete_notes", payload: id });
  };
};

const editNotes = (dispatch) => {
  return async (id, title, content, callback) => {
    await jsonServer.put(`/notes/${id}`, { title, content });
    dispatch({ type: "edit_notes", payload: { id, title, content } });
    if (callback) {
      callback();
    }
  };
};

export const { Context, Provider } = createDataContext(
  notesReducer,
  { addNotes, deleteNotes, editNotes, getNotes },
  []
);
