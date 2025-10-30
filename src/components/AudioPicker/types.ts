export interface AudioFile {
  file: File;
  preview: string;
  id: string;
  duration?: number;
}

export interface AudioPickerProps {
  multiple?: boolean;
  maxFiles?: number;
  maxSizeInMB?: number;
  acceptedFormats?: string[];
  onFilesChange: (files: File[]) => void;
  initialAudios?: string[];
  disabled?: boolean;
  helperText?: string;
  error?: boolean;
  errorText?: string;
}

export interface AudioPreviewProps {
  audio: AudioFile;
  onRemove: (id: string) => void;
  disabled?: boolean;
}
