import axios from "axios";
import { createContext, useEffect, useReducer } from "react";

import { Comment } from "../interfaces/commentInterface";

type MyActionTypes =
  | { type: actionType.ADD_COMMENT; payload: Comment[] } // Payload for adding a TODO
  | { type: actionType.ADD_USER_DATA; payload: Comment["user"] } // Payload for removing a TODO
  | { type: actionType.CHANGE_MODAL_STATE };

//not sure of the below

interface CommentProviderProp {
  // Add your component props here
  children: React.ReactNode;
}

interface State {
  //be careful of the below, what is the consequence of undefined?
  comments: Comment[] | undefined;
  userData: Comment["user"];
  isModalOpen: boolean;
}

const initialState = {
  comments: [],
  userData: {
    image: { png: "", webp: "" },
    username: "",
  },
  isModalOpen: false,
};

const CommentContext = createContext<{
  data: State;
  dispatch: React.Dispatch<MyActionTypes>;
}>({ data: initialState, dispatch: () => null });

enum actionType {
  ADD_COMMENT = "ADD_COMMENT",
  ADD_USER_DATA = "ADD_USER_DATA",
  CHANGE_MODAL_STATE = "CHANGE_MODAL_STATE",
}



const CommentProvider: React.FC<CommentProviderProp> = ({ children }) => {
  function reducer(state: State, action: MyActionTypes): State {
    switch (action.type) {
      case actionType.ADD_COMMENT:
        return {
          ...state,
          comments: action.payload,
        };
      case actionType.ADD_USER_DATA:
        return {
          ...state,
          userData: action.payload,
        };
      case actionType.CHANGE_MODAL_STATE:
        return { ...state, isModalOpen: !state.isModalOpen };
      default:
        return state;
    }
  }
  //fetching comments and userdata
  const [data, dispatch] = useReducer(reducer, initialState);

  // const [comments, setComments] = useState<Comment[] | undefined>(undefined);

  useEffect(() => {
    // using axios
    const getComments = async () => {
      const response = await axios.get("http://localhost:4001/comments");
      dispatch({ type: actionType.ADD_COMMENT, payload: response.data });
      // setComments(response.data);
    };
    getComments();
  }, [data.isModalOpen]);

  useEffect(() => {
    //using axios
    const getUserData = async () => {
      const response = await axios.get("http://localhost:4001/currentUser");
      dispatch({ type: actionType.ADD_USER_DATA, payload: response.data });
      // setUserData(response.data);
    };
    getUserData();
  }, [data.isModalOpen]);

  return (
    <CommentContext.Provider value={{ data, dispatch }}>
      {children}
    </CommentContext.Provider>
  );
};

//i had issues implementing the below in typescript
//i ommited this due to the fact that in whatever case we are safe due to 
//the fact that the Context provider is wrapped arround the whole application

// function UseCommentsData() {
//   const context = useContext(CommentContext);
//   if (context === undefined) {
//     throw new Error("useCommentsData must be used within a CommentsProvider");
//   }
//   return context;
// }

export { CommentProvider, CommentContext };
