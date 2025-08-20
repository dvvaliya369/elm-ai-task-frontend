export interface IUser {
  _id: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  profilePhoto?: {
    photo_id?: string;
    photo_url?: string;
    photo_data?: string;
  };
}

export interface IMedia {
  url: string;
  name: string;
  type: string;
  size: number;
  mediaType: "image" | "video";
}

export interface IComment {
  _id: string;
  user: {
    _id: string;
    profilePhoto?: {
      photo_id?: string;
      photo_url?: string;
      photo_data?: string;
    };
  };
  name: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface ILike {
  _id: string;
  user: string;
  name: string;
  createdAt: string;
}

export interface IPost {
  _id: string;
  user: IUser;
  caption?: string;
  media?: IMedia;
  likes: string[] | ILike[];
  comments?: IComment[];
  createdAt: string;
  updatedAt: string;
  likesCount: number;
  commentsCount: number;
  isLikedByUser: boolean;
  isCommentedByUser: boolean;
}

export interface IPagination {
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
}
