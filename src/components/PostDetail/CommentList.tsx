import React, { memo } from 'react';
import { Box, Divider } from '@mui/material';
import CommentItem from './CommentItem';
import type { IComment } from '../../interface';

interface CommentListProps {
  comments: IComment[];
  postId: string;
}

const CommentList: React.FC<CommentListProps> = ({ comments, postId }) => {
  const sortedComments = [...comments].sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <Box>
      <Divider />
      <Box sx={{ px: 2, py: 1 }}>
        {sortedComments.map((comment, index) => (
          <React.Fragment key={comment._id}>
            <CommentItem comment={comment} postId={postId} />
            {index < sortedComments.length - 1 && (
              <Box sx={{ my: 1 }}>
                <Divider variant="middle" />
              </Box>
            )}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default memo(CommentList);
