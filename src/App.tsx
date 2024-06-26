import { useContext } from "react";
import CommentCard from "./components/CommentCard";
import AddComent from "./components/AddComent";
import { Comment } from "./interfaces/commentInterface";
import { CommentContext } from "./contexts/CommentData";

function App() {
  //eslint-disable-next-line

  // we also had to define interfaces explicitly for the argument of the usestate

  const { data } = useContext(CommentContext);
  const { comments } = data;


  return (
    // the below class w-screen enables that our app component take up the whole screen width
    //without it only the max-width will function and about quater of our screen width
    //will be taken as we increase the widt dimensions
    <div className="bg-grayishBlue overflow-scroll px-[15px] w-screen py-[20px] h-screen">
      <main className="space-y-[16px] ">
        {comments?.map((comment: Comment) => (
          <>
            {/* i passed in the username as current-user  */}
            {/* //is it okey to pass undefined as prop values??? */}
            <CommentCard key={comment.id} comment={comment} parentObject={undefined} />
            {comment.replies.length > 0 &&
              comment.replies.map((reply) => (
                <div className="border-l-2 border-gray-500 pl-[9px] lg:ml-[35px] lg:pl-[37px]">
                  <CommentCard
                    key={reply.id}
                    comment={reply}
                    parentObject={comment}
                  />
                </div>
              ))}
          </>
        ))}
        <AddComent action="SEND" />
      </main>

      {/* <footer>
        Challenge by
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
          Frontend Mentor
        </a>
        . Coded by <a href="#">Your Name Here</a>.
      </footer> */}
    </div>
  );
}

export default App;
