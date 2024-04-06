import { createContext, useContext, useReducer } from "react";

interface CommentContextProp {
  // Add your component props here
  children: React.ReactNode;
}
const Context = createContext();

const CommentContext: React.FC<CommentContextProp> = ({ children }) => {
  const initialState = {
    comment: []
  }

  function reducer(action, state) {
    switch (action.type) {
      case "ADD_COMMENT":
        return {
          ...state,
          comments: state.comments.concat(action.payload),
        };
      default:
        return new Error("Action not found");
    }
  }

  const [data, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={(data, dispatch)}>{children}</Context.Provider>
  );
};

function UseCommentsData() {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useCommentsData must be used within a CommentsProvider");
  }
  return context;
}

export { CommentContext, UseCommentsData };
