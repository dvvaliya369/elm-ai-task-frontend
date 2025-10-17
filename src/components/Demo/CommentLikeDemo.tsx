import React from "react";
import { Box, Typography, Avatar, Card, CardContent } from "@mui/material";
import CommentLikeButton from "../PostDetail/CommentLikeButton";

const CommentLikeDemo: React.FC = () => {
  const [isLiked, setIsLiked] = React.useState(false);
  const [likesCount, setLikesCount] = React.useState(3);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleToggleLike = async () => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (isLiked) {
      setLikesCount(prev => Math.max(0, prev - 1));
      setIsLiked(false);
    } else {
      setLikesCount(prev => prev + 1);
      setIsLiked(true);
    }
    
    setIsLoading(false);
  };

  return (
    <Card sx={{ maxWidth: 600, mx: "auto", my: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Comment Like Feature Demo
        </Typography>
        
        <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start", mt: 3 }}>
          <Avatar sx={{ bgcolor: "primary.main" }}>J</Avatar>
          
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                John Doe
              </Typography>
              <Typography variant="caption" color="text.secondary">
                2 minutes ago
              </Typography>
            </Box>
            
            <Typography variant="body2" sx={{ mb: 1 }}>
              This is a sample comment to demonstrate the like functionality! 
              Try clicking the heart button below to see it in action.
            </Typography>
            
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <CommentLikeButton
                commentId="demo-comment-1"
                postId="demo-post-1"
                isLiked={isLiked}
                likesCount={likesCount}
                isLoading={isLoading}
                onToggleLike={handleToggleLike}
              />
            </Box>
          </Box>
        </Box>
        
        <Box sx={{ mt: 3, p: 2, bgcolor: "grey.50", borderRadius: 1 }}>
          <Typography variant="subtitle2" gutterBottom>
            Feature Status:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ✅ Like button with heart icons<br />
            ✅ Like count display<br />
            ✅ Loading states<br />
            ✅ Smooth animations<br />
            ✅ Responsive design<br />
            ✅ TypeScript integration<br />
            ✅ Redux state management ready<br />
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CommentLikeDemo;
