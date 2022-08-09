import React from "react";
import Posts from "./posts/Posts";
import SuggestedForYou from "./SuggestedForYou";

const Home = ({ setCurrentEditPostId }) => {
  return (
    <div className="w-[100%] sm:w-[90%] md:w-[70%] lg:w-[65%] xl:w-[55%] grid grid-cols-12 gap-4 mt-16 mx-auto">
      <div className="col-span-12 lg:col-span-7">
        <Posts setCurrentEditPostId={setCurrentEditPostId} />
      </div>
      <div className="sticky top-20 hidden lg:block col-span-5 w-full">
        <SuggestedForYou />
      </div>
    </div>
  );
};

export default Home;
