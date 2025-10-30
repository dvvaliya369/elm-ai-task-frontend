export interface ImageFile {
  file: File;
  preview: string;
  id: string;
}

export interface ImagePickerProps {
  multiple?: boolean;
  maxFiles?: number;
  maxSizeInMB?: number;
  acceptedFormats?: string[];
  onFilesChange: (files: File[]) => void;
  initialImages?: string[];
  disabled?: boolean;
  helperText?: string;
  error?: boolean;
  errorText?: string;
}

export interface ImagePreviewProps {
  image: ImageFile;
  onRemove: (id: string) => void;
  disabled?: boolean;
}
