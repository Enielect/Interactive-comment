import { ReactElement, useEffect, useState } from "react";
import CommentCard from "./components/CommentCard";
import AddComent from "./components/AddComent";
import axios from "axios";

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

  interface Comment {
    id: number;
    content: string;
    createdAt: string;
    score: number;
    user: userData;
    username: string;
    replies: {
      id: number;
      content: string;
      createdAt: string;
      score: number;
      replyingTo: string;
      user: userData;
    }[];
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

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [comments, setComments] = useState<Comment[] | undefined>(undefined);

  useEffect(() => {
    // using axios
    const getComments = async () => {
      const response = await axios.get("http://localhost:4001/comments");
      setComments(response.data);
    };
    getComments();
  }, [isModalOpen]);

  useEffect(() => {
    //using axios
    const getUserData = async () => {
      const response = await axios.get("http://localhost:4001/currentUser");
      setUserData(response.data);
    };
    getUserData();
  }, [isModalOpen]);

  return (
    // the below class w-screen enables that our app component take up the whole screen width
    //without it only the max-width will function and about quater of our screen width
    //will be taken as we increase the widt dimensions
    <div className="bg-grayishBlue overflow-scroll px-[15px] w-screen py-[20px] h-screen">
      <main className="space-y-[16px] ">
        {comments?.map((comment: Comment) => (
          <>
            {/* i passed in the username as current-user  */}
            <CommentCard
              key={comment.id}
              currentUser={userData.username}
              comment={comment}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
            {comment.replies.length > 0 &&
              comment.replies.map((reply) => (
                <div className="border-l-2 border-gray-500 pl-[9px] lg:ml-[35px] lg:pl-[37px]">
                  <CommentCard
                    key={reply.id}
                    currentUser={userData.username}
                    comment={reply}
                    parentObject={comment}
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                  />
                </div>
              ))}
          </>
        ))}
        <AddComent
          action="SEND"
          src={userData.image.png}
          comments={comments}
          currentUser={userData}
        />
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
