# Viewer Button Visual Guide

## Post Actions Layout

### Before (Original)
```
┌─────────────────────────────────────────────┐
│  [❤️] [💬] [🔄] [📤]                        │
│                                             │
│  X likes                                    │
│  Y reposts                                  │
└─────────────────────────────────────────────┘
```

### After (With Viewer Button)
```
┌─────────────────────────────────────────────┐
│  [❤️] [💬] [🔄] [📤]              [👁️ 123] │
│                                             │
│  X likes                                    │
│  Y reposts                                  │
└─────────────────────────────────────────────┘
```

## Component Structure

```
PostCard
  └── PostActions
      ├── Action Buttons Row
      │   ├── Like Button (❤️)
      │   ├── Comment Button (💬)
      │   ├── Repost Button (🔄)
      │   ├── Share Button (📤)
      │   └── Viewer Display (👁️ + count) ← NEW!
      │
      ├── Likes Count (if > 0)
      └── Reposts Count (if > 0)
```

## Implementation Details

### Icon Used
- **Material-UI Icon**: `Visibility` (eye icon)
- **Size**: 20px
- **Color**: text.secondary (gray)

### View Count Display
- **Typography**: body2 variant
- **Font Size**: 0.875rem
- **Color**: text.secondary (gray)
- **Default Value**: 0

### Positioning
- **Alignment**: Right side of actions row
- **Method**: `marginLeft: 'auto'`
- **Layout**: Flexbox with gap of 0.5 spacing units

## Files Modified

1. ✅ `src/interface/index.ts` - Added viewsCount to IPost
2. ✅ `src/components/Post/PostActions.tsx` - Added viewer display
3. ✅ `src/components/Post/PostCard.tsx` - Passed viewsCount prop
4. ✅ `src/components/PostDetail/PostDetailCard.tsx` - Passed viewsCount prop
5. ✅ `src/components/Post/styles.ts` - Added viewer styles

## Example Usage

```typescript
<PostActions
  likesCount={42}
  commentsCount={10}
  repostsCount={5}
  viewsCount={123}  // ← NEW PROP
  isLiked={false}
  isCommented={false}
  isReposted={false}
  onLike={handleLike}
  onComment={handleComment}
  onRepost={handleRepost}
  onShare={handleShare}
/>
```

## Backend Integration

The `viewsCount` field will be populated by the backend API when fetching posts:

```typescript
interface IPost {
  _id: string;
  user: IUser;
  caption?: string;
  media?: IMedia;
  likesCount: number;
  commentsCount: number;
  repostsCount: number;
  viewsCount: number;  // ← Backend should provide this
  // ... other fields
}
```
