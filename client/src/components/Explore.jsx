import * as React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Loading from "./Loading";
import { RiChat1Fill, RiHeartFill } from "react-icons/ri";

export default function Explore() {
  const posts = useSelector((state) => state.posts);

  let twobytwoSeries__StartOne = 1;
  let twobytwoSeries__StartTwo = 6;
  let twobytwoSeries = [];

  for (var i = 0; i <= posts.length; i++) {
    twobytwoSeries.push(twobytwoSeries__StartOne);
    twobytwoSeries.push(twobytwoSeries__StartTwo);
    twobytwoSeries__StartOne = twobytwoSeries__StartOne + 8;
    twobytwoSeries__StartTwo = twobytwoSeries__StartTwo + 8;
  }

  let twobyoneSeries__StartOne = 4;
  let twobyoneSeries__StartTwo = 5;
  let twobyoneSeries = [];

  for (var j = 0; j <= posts.length; j++) {
    twobyoneSeries.push(twobyoneSeries__StartOne);
    twobyoneSeries.push(twobyoneSeries__StartTwo);
    twobyoneSeries__StartOne = twobyoneSeries__StartOne + 8;
    twobyoneSeries__StartTwo = twobyoneSeries__StartTwo + 8;
  }

  const ImageGallery = ({ index, post, size }) => {
    let rows = 1;
    let cols = 1;

    if (twobytwoSeries.includes(index)) {
      rows = 2;
      cols = 2;
    } else if (twobyoneSeries.includes(index)) {
      rows = 1;
      cols = 2;
    }

    let post_image_url = post.post_image;

    return (
      <ImageListItem
        className="relative cursor-pointer"
        key={post._id}
        cols={cols || 1}
        rows={rows || 1}
      >
        <img
          src={`${post_image_url}?w=${size * cols}&h=${
            size * rows
          }&fit=crop&auto=format`}
          srcSet={`${post_image_url}?w=${size * cols}&h=${
            size * rows
          }&fit=crop&auto=format&dpr=2 2x`}
          alt={post.title}
          loading="lazy"
          className="bg-[#f9f9f9]"
        />
        <Link to={`/p/${post._id}`}>
          <div className="transition ease-in-out delay-50 bg-black/20 absolute  h-full w-full top-0  opacity-0 hover:opacity-100">
            <span className="text-white font-bold text-xl absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] items-center">
              <span className="md:mr-5">
                <RiHeartFill className="inline" />{" "}
                <span className="text-sm">{post.likes.length}</span>
              </span>
              <span className="block md:inline">
                <RiChat1Fill className="inline" />{" "}
                <span className="text-sm">{post.comments.length}</span>{" "}
              </span>
            </span>
          </div>
        </Link>
      </ImageListItem>
    );
  };

  if (!posts || posts.length === 0) {
    return <Loading />;
  }

  return (
    <ImageList
      // sx={{ width: 500, height: 450 }}
      variant="quilted"
      cols={4}
      rowHeight={150}
      className="w-[100%] sm:w-[90%] md:w-[70%] lg:w-[65%] xl:w-[55%] mx-auto my-12"
    >
      {posts.map((post, index) => (
        <ImageGallery key={index} index={index + 1} post={post} size={140} />
      ))}
    </ImageList>
  );
}
