import { useEffect, useState } from "react";
import CommentCard from "./components/CommentCard";
import AddComent from "./components/AddComent";

function App() {
  //eslint-disable-next-line

  // we also had to define interfaces explicitly for the argument of the usestate
  interface Images {
    png: string;
    webp: string;
  }

  interface userData {
    image: { png: string; webp: string };
    username: string;
  }

  // interface commentCardProps {
  //   // Add your component props here
  //   comment: {
  //     content: string;
  //     createdAt: string;
  //     score: number;
  //     user: userData;
  //     username: string;
  //     replies: object[];
  //   };
  // }

  ///

  interface Comment {
    id: number;
    content: string;
    createdAt: string;
    score: number;
    user: userData;
    username: string;
    replies?: object[];
    replyingTo?: string;
  }
  /**
   * This approach leverages generics and the Partial<T> utility type.
    Define an optional interface (MyObjectType) to specify some of the known properties, even if not all.
    Use Partial<MyObjectType> as the state type. This allows you to store an object with some or all of the properties defined in the interface.
    This provides some level of type safety while allowing for flexibility in the object structure.

   */

  //I had to put the square brackets below to indicate that the Comment
  //type was an array (in this case containing objects)

  //had to delete the syntax below cos i already specified all properties
  // type CommentState = Partial<Comment>[];

  ///

  interface UserInfo {
    image: Images;
    username: string;
  }

  // const [comments, setComments] = useState<string[]>([]);
  const [userData, setUserData] = useState<UserInfo>({
    image: { png: "", webp: "" },
    username: "",
  });

  const [comments, setComments] = useState<Comment[] | undefined>(undefined);

  useEffect(() => {
    fetch("http://localhost:4001/comments")
      .then((result) => result.json())
      .then((data) => setComments(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:4001/currentUser")
      .then((data) => data.json())
      .then((result) => setUserData(result));
  }, []);
  return (
    // the below class w-screen enables that our app component take up the whole screen width
    //without it only the max-width will function and about quater of our screen width
    //will be taken as we increase the widt dimensions
    <div className="bg-grayishBlue px-[15px] w-screen py-[20px] overflow-hidden">
      <main className="space-y-[16px] ">
        {comments?.map((comment: Comment) => (
          <>
            <CommentCard key={comment.id} currentUser={userData.username} comment={comment} />
            {comment?.replies?.length &&
              comment.replies.map((reply) => (
                <div className="border-l-2 border-gray-500 pl-[9px]">
                  <CommentCard key={reply.id} currentUser={userData.username} comment={reply} />
                </div>
              ))}
          </>
        ))}
        <AddComent src={userData.image.png} />
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
