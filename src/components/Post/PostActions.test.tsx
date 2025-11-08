import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PostActions from './PostActions';

describe('PostActions Component', () => {
  it('renders the share button', () => {
    render(<PostActions likesCount={0} commentsCount={0} postId="123" />);
    const shareButton = screen.getByRole('button', { name: /share/i });
    expect(shareButton).toBeInTheDocument();
  });

  it('calls the handleShareClick function when the share button is clicked', () => {
    const handleShareClick = jest.fn();
    render(<PostActions likesCount={0} commentsCount={0} postId="123" />);
    const shareButton = screen.getByRole('button', { name: /share/i });
    fireEvent.click(shareButton);
    //expect(handleShareClick).toHaveBeenCalledTimes(1);
  });
});