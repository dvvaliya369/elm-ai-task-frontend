# AudioPicker Component

A reusable React component for selecting and previewing audio files with drag-and-drop support.

## Features

- ✅ Single or multiple audio file selection
- ✅ Drag and drop support
- ✅ Audio preview with playback controls
- ✅ File type validation
- ✅ File size validation
- ✅ Maximum file count limit
- ✅ Audio duration display
- ✅ Material-UI integration
- ✅ TypeScript support

## Usage

### Basic Example

```tsx
import { AudioPicker } from './components';

function MyComponent() {
  const handleFilesChange = (files: File[]) => {
    console.log('Selected files:', files);
  };

  return (
    <AudioPicker
      onFilesChange={handleFilesChange}
      helperText="Select up to 5 audio files (max 10MB each)"
    />
  );
}
```

### Multiple Audio Files

```tsx
<AudioPicker
  multiple
  maxFiles={10}
  maxSizeInMB={20}
  onFilesChange={handleFilesChange}
/>
```

### With Initial Audio Files

```tsx
<AudioPicker
  initialAudios={[
    'https://example.com/audio1.mp3',
    'https://example.com/audio2.wav'
  ]}
  onFilesChange={handleFilesChange}
/>
```

### With Custom Formats

```tsx
<AudioPicker
  acceptedFormats={['audio/mpeg', 'audio/wav']}
  onFilesChange={handleFilesChange}
/>
```

### With Error Handling

```tsx
<AudioPicker
  error={hasError}
  errorText="Please select at least one audio file"
  onFilesChange={handleFilesChange}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onFilesChange` | `(files: File[]) => void` | **Required** | Callback when files are selected or removed |
| `multiple` | `boolean` | `false` | Allow multiple file selection |
| `maxFiles` | `number` | `5` | Maximum number of files allowed |
| `maxSizeInMB` | `number` | `10` | Maximum file size in megabytes |
| `acceptedFormats` | `string[]` | `['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg', 'audio/webm', 'audio/aac', 'audio/m4a']` | Accepted MIME types |
| `initialAudios` | `string[]` | `[]` | Initial audio URLs to display |
| `disabled` | `boolean` | `false` | Disable the picker |
| `helperText` | `string` | `undefined` | Helper text to display |
| `error` | `boolean` | `false` | Show error state |
| `errorText` | `string` | `undefined` | Error message to display |

## Styling

The component uses Material-UI's `sx` prop for styling. You can customize the appearance by modifying the styles in `styles.ts`.

## TypeScript

The component is fully typed with TypeScript. Import types as needed:

```tsx
import { AudioPickerProps, AudioFile } from './components/AudioPicker/types';
```

## Features

### Audio Playback
Each selected audio file displays a native HTML5 audio player with standard controls (play, pause, volume, seek).

### Duration Display
The component automatically extracts and displays the duration of each audio file.

### File Information
Shows file name, size, and duration for each selected audio file.
