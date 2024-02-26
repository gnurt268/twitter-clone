import React from "react";
import RepeatIcon from "@mui/icons-material/Repeat";
import { Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MenuItem from "@mui/material/MenuItem";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import BarChartIcon from "@mui/icons-material/BarChart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ReplyModal from "./ReplyModal";
import { useDispatch } from "react-redux";
import { likeTweet, createReTweet } from "../../Store/Twit/Action";
const TweetCard = ({item}) => {
  const [openReplyModal, setOpenReplyModal] = React.useState(false);
  const handleOpenReplyModal = () => setOpenReplyModal(true);
  const handleCloseReplyModal = () => setOpenReplyModal(false);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDeleteTweet = () => {
    console.log("Delete");
    handleClose();
  };
  const handleCreateRetweet = () => {
    dispatch(createReTweet(item?.id))
    console.log("handle create retweet");
  };
  const handleLikeTweet = () => {
    dispatch(likeTweet(item?.id))
    console.log("handle like tweet");
  };
  const navigate = useNavigate();
  return (
    <React.Fragment>
      {/*<div className="flex items-center font-semibold text-gray-700 py-2">
        <RepeatIcon />
        <p>You Retweet</p>
  </div>*/}
      <div className="flex space-x-5">
        <Avatar
          onClick={() => navigate(`profile/${item?.user.id}`)}
          className="cursor-pointer"
          alt="username"
          src={item?.user?.image}
        />
        <div className="w-full">
          <div className="flex justify-between items-center">
            <div className="flex cursor-pointer items-center space-x-2">
              <span className="font-semibold">{item?.user?.fullName}</span>
              <span className="text-gray-600">@{item?.user?.fullName.split(" ").join("_").toLowerCase()} . 2m</span>
              <img
                className="ml-2 w-5 h-5"
                src="https://cdn-icons-png.freepik.com/512/7641/7641727.png"
                alt=""
              />
            </div>
            <div>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <MoreHorizIcon />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleDeleteTweet}>Delete</MenuItem>
                <MenuItem onClick={handleDeleteTweet}>Edit</MenuItem>
              </Menu>
            </div>
          </div>
          <div className="mt-2">
            <div onClick={()=>navigate(`/twit/${item?.id}`)} className="cursor-pointer">
              <p className="mb-2 p-0">
                {item?.content}
                </p>
              <img
                className="w-[28rem] border border-gray-400 p-5 rounded-md"
                src= {item?.image}
                alt=""
              />
            </div>
            <div className="py-5 flex flex-wrap justify-between items-center">
              <div className="space-x-3 flex items-center text-gray-600">
                <ChatBubbleOutlineRoundedIcon
                  className="cursor-pointer"
                  onClick={handleOpenReplyModal}
                />
                <p>{item?.totalReplies}</p>
              </div>
              <div
                className={`${
                  item?.retwit ? "text-green-600" : " text-gray-600"
                } space-x-3 flex items-center`}
              >
                <RepeatIcon
                  onClick={handleCreateRetweet}
                  className="cursor-pointer"
                />
                <p>{item?.totalRetweets}</p>
              </div>
              <div
                className={`${
                  item?.liked ? "text-pink-600" : " text-gray-600"
                } space-x-3 flex items-center`}
              >
                {item?.liked ? (
                  <FavoriteBorderRoundedIcon
                    onClick={handleLikeTweet}
                    className="cursor-pointer"
                  />
                ) : (
                  <FavoriteIcon
                    onClick={handleLikeTweet}
                    className="cursor-pointer"
                  />
                )}
                <p>{item?.totalLikes}</p>
              </div>
              <div className="space-x-3 flex items-center text-gray-600">
                <BarChartIcon
                  className="cursor-pointer"
                  onClick={handleOpenReplyModal}
                />
                <p>12</p>
              </div>
              <div className="space-x-3 flex items-center text-gray-600">
                <FileUploadIcon
                  className="cursor-pointer"
                  onClick={handleOpenReplyModal}
                />
                <p>12</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section>
        <ReplyModal item={item} handleClose={handleCloseReplyModal} open={openReplyModal} />
                </section>
    </React.Fragment>
  );
};

export default TweetCard;
