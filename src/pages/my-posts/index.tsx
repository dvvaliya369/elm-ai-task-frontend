import { Box } from "@mui/material";
import { Navbar } from "../../layouts";
import MyPosts from "../../components/MyPosts/MyPosts";

const MyPostsPage = () => {
  return (
    <Box>
      <Navbar />
      <MyPosts />
    </Box>
  );
};

export default MyPostsPage;
