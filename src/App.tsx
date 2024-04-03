import { useEffect, useState } from "react";
import CommentCard from "./components/CommentCard";
import AddComent from "./components/AddComent";
import axios from "axios";
import Modal from "./components/Modal";

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

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [comments, setComments] = useState<Comment[] | undefined>(undefined);

  useEffect(() => {
    // using axios
    const getComments = async () => {
      const response = await axios.get("http://localhost:4001/comments");
      setComments(response.data);
    };
    getComments();
  }, []);

  useEffect(() => {
    //using axios
    const getUserData = async () => {
      const response = await axios.get("http://localhost:4001/currentUser");
      setUserData(response.data);
    };
    getUserData();
  }, []);

  const handleIsCloseModal = () => setIsModalOpen((c) => !c);

  return (
    // the below class w-screen enables that our app component take up the whole screen width
    //without it only the max-width will function and about quater of our screen width
    //will be taken as we increase the widt dimensions
    <div className="bg-grayishBlue px-[15px] w-screen py-[20px] overflow-hidden">
      {isModalOpen && (
        <Modal onClose={handleIsCloseModal} isOpen={isModalOpen}>
          <h2 className="font-bold text-2xl mb-[10px]">Delete Comment</h2>
          <div className="text-[14px] mb-[10px]">
            Are you sure you want to delete this comment? This will remove the
            comment and can't be undone `
          </div>
        </Modal>
      )}
      <main className="space-y-[16px] ">
        {comments?.map((comment: Comment) => (
          <>
            {/* i passed in the username as current-user  */}
            <CommentCard
              key={comment.id}
              currentUser={userData.username}
              comment={comment}
              handleIsCloseModal={handleIsCloseModal}
            />
            {comment?.replies?.length > 0 &&
              comment.replies.map((reply) => (
                <div className="border-l-2 border-gray-500 pl-[9px] lg:ml-[35px] lg:pl-[37px]">
                  <CommentCard
                    key={reply.id}
                    currentUser={userData.username}
                    comment={reply}
                    parentObject={comment}
                    handleIsCloseModal={handleIsCloseModal}
                  />
                </div>
              ))}
          </>
        ))}
        <AddComent src={userData.image.png} action="SEND" />
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
