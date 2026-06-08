export const MAX_IMAGE_SIZE_BYTES = 2 * 1024 * 1024;

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
]);

const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

export function getVehiclePlaceholderImage(): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect width="800" height="500" fill="#e5e7eb"/><g fill="#9ca3af" font-family="sans-serif" font-size="20" text-anchor="middle"><text x="400" y="240">Vehicle image</text><text x="400" y="270">not available</text></g></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export function isValidVehicleImageSrc(src: string | null | undefined): boolean {
  if (!src?.trim()) return false;

  const value = src.trim();

  if (value.startsWith("data:image/")) return true;
  if (value.startsWith("/")) return true;

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function resolveVehicleImageSrc(src: string | null | undefined): string {
  if (isValidVehicleImageSrc(src)) {
    return src!.trim();
  }

  return getVehiclePlaceholderImage();
}

export function validateImageFile(file: File): string | null {
  const extension = file.name
    .slice(file.name.lastIndexOf("."))
    .toLowerCase();

  const hasAllowedType = ALLOWED_MIME_TYPES.has(file.type);
  const hasAllowedExtension = ALLOWED_EXTENSIONS.has(extension);

  if (!hasAllowedType && !hasAllowedExtension) {
    return "Please upload a JPG, PNG, or WebP image.";
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    return "Image must be smaller than 2MB.";
  }

  return null;
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
        return;
      }
      reject(new Error("Failed to read image file."));
    };
    reader.onerror = () => reject(new Error("Failed to read image file."));
    reader.readAsDataURL(file);
  });
}
