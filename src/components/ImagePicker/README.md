# ImagePicker Component

A reusable React component for selecting and previewing images with drag-and-drop support.

## Features

- ✅ Single or multiple image selection
- ✅ Drag and drop support
- ✅ Image preview with remove functionality
- ✅ File type validation
- ✅ File size validation
- ✅ Maximum file count limit
- ✅ Responsive grid layout
- ✅ Material-UI integration
- ✅ TypeScript support

## Usage

### Basic Example

```tsx
import { ImagePicker } from './components';

function MyComponent() {
  const handleFilesChange = (files: File[]) => {
    console.log('Selected files:', files);
  };

  return (
    <ImagePicker
      onFilesChange={handleFilesChange}
      helperText="Select up to 5 images (max 5MB each)"
    />
  );
}
```

### Multiple Images

```tsx
<ImagePicker
  multiple
  maxFiles={10}
  maxSizeInMB={10}
  onFilesChange={handleFilesChange}
/>
```

### With Initial Images

```tsx
<ImagePicker
  initialImages={[
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg'
  ]}
  onFilesChange={handleFilesChange}
/>
```

### With Custom Formats

```tsx
<ImagePicker
  acceptedFormats={['image/jpeg', 'image/png']}
  onFilesChange={handleFilesChange}
/>
```

### With Error Handling

```tsx
<ImagePicker
  error={hasError}
  errorText="Please select at least one image"
  onFilesChange={handleFilesChange}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onFilesChange` | `(files: File[]) => void` | **Required** | Callback when files are selected or removed |
| `multiple` | `boolean` | `false` | Allow multiple file selection |
| `maxFiles` | `number` | `5` | Maximum number of files allowed |
| `maxSizeInMB` | `number` | `5` | Maximum file size in megabytes |
| `acceptedFormats` | `string[]` | `['image/jpeg', 'image/png', 'image/gif', 'image/webp']` | Accepted MIME types |
| `initialImages` | `string[]` | `[]` | Initial image URLs to display |
| `disabled` | `boolean` | `false` | Disable the picker |
| `helperText` | `string` | `undefined` | Helper text to display |
| `error` | `boolean` | `false` | Show error state |
| `errorText` | `string` | `undefined` | Error message to display |

## Styling

The component uses Material-UI's `sx` prop for styling. You can customize the appearance by modifying the styles in `styles.ts`.

## TypeScript

The component is fully typed with TypeScript. Import types as needed:

```tsx
import { ImagePickerProps, ImageFile } from './components/ImagePicker/types';
```
