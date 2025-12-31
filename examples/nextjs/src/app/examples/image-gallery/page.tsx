"use client";

import { useState } from "react";
import { ExampleLayout } from "@/components/ExampleLayout";
import { MagicMove, useMagicMove } from "magicmove";

interface Photo {
  id: string;
  title: string;
  aspectRatio: string;
}

const photos: Photo[] = [
  { id: "1", title: "Mountain Sunset", aspectRatio: "aspect-[4/3]" },
  { id: "2", title: "Ocean Waves", aspectRatio: "aspect-square" },
  { id: "3", title: "Forest Path", aspectRatio: "aspect-[3/4]" },
  { id: "4", title: "City Lights", aspectRatio: "aspect-[16/9]" },
  { id: "5", title: "Desert Dunes", aspectRatio: "aspect-square" },
  { id: "6", title: "Northern Lights", aspectRatio: "aspect-[4/3]" },
  { id: "7", title: "Cherry Blossoms", aspectRatio: "aspect-[3/4]" },
  { id: "8", title: "Starry Night", aspectRatio: "aspect-[16/9]" },
  { id: "9", title: "Autumn Leaves", aspectRatio: "aspect-square" },
];

function PhotoThumbnail({
  photo,
  onClick,
}: {
  photo: Photo;
  onClick: () => void;
}) {
  return (
    <MagicMove
      id={`photo-${photo.id}`}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e: React.KeyboardEvent) => e.key === "Enter" && onClick()}
      className={`cursor-pointer rounded-lg overflow-hidden border border-[var(--border)] hover:border-[var(--text-tertiary)] transition-all ${photo.aspectRatio}`}
    >
      <div className="w-full h-full bg-[var(--bg)] flex items-center justify-center">
        <MagicMove
          id={`photo-title-${photo.id}`}
          className="text-[var(--text-secondary)] text-sm"
        >
          {photo.title}
        </MagicMove>
      </div>
    </MagicMove>
  );
}

function PhotoLightbox({
  photo,
  onClose,
}: {
  photo: Photo;
  onClose: () => void;
}) {
  return (
    <>
      <div
        className="fixed inset-0 bg-[var(--bg)]/90 z-40"
        onClick={onClose}
      />
      <div className="fixed inset-4 md:inset-12 z-50 flex items-center justify-center">
        <MagicMove
          id={`photo-${photo.id}`}
          className="relative max-w-3xl w-full rounded-lg overflow-hidden border border-[var(--border)]"
        >
          <div className="w-full aspect-[16/10] bg-[var(--bg-secondary)] flex items-center justify-center">
            <MagicMove
              id={`photo-title-${photo.id}`}
              className="text-[var(--text)] text-2xl font-medium"
            >
              {photo.title}
            </MagicMove>
          </div>
          <div className="p-4 bg-[var(--bg)] border-t border-[var(--border)]">
            <h2 className="text-[var(--text)] font-medium">{photo.title}</h2>
            <p className="text-[var(--text-tertiary)] text-sm mt-1">
              Click anywhere to close
            </p>
          </div>
        </MagicMove>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--text-secondary)] hover:text-[var(--text)] text-2xl z-50"
        >
          ×
        </button>
      </div>
    </>
  );
}

function ImageGalleryDemo() {
  const { trigger } = useMagicMove();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedPhoto = photos.find((p) => p.id === selectedId);

  const handlePhotoClick = (id: string) => {
    trigger(() => {
      setSelectedId(id);
    });
  };

  const handleClose = () => {
    trigger(() => {
      setSelectedId(null);
    });
  };

  return (
    <>
      <div className="columns-2 md:columns-3 gap-4 space-y-4">
        {photos.map((photo) => (
          <div key={photo.id} className="break-inside-avoid">
            <PhotoThumbnail
              photo={photo}
              onClick={() => handlePhotoClick(photo.id)}
            />
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <PhotoLightbox photo={selectedPhoto} onClose={handleClose} />
      )}
    </>
  );
}

export default function ImageGalleryPage() {
  return (
    <ExampleLayout
      title="Image Gallery"
      description="Click any image to open it in a lightbox with smooth transitions."
    >
      <ImageGalleryDemo />
    </ExampleLayout>
  );
}
