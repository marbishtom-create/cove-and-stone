import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, Image as ImageIcon, Video } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import type { CaseStudyTimelineItem } from "@/pages/projects";

type PhotoTimelineItem = Extract<CaseStudyTimelineItem, { kind: "photo" }>;

export function ProjectTimelineGallery({ items }: { items: CaseStudyTimelineItem[] }) {
  const photos = items.filter(
    (item): item is PhotoTimelineItem => item.kind === "photo",
  );
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const activePhoto = activePhotoIndex === null ? null : photos[activePhotoIndex];

  useEffect(() => {
    if (activePhotoIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setActivePhotoIndex((current) =>
          current === null ? 0 : (current - 1 + photos.length) % photos.length,
        );
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        setActivePhotoIndex((current) =>
          current === null ? 0 : (current + 1) % photos.length,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhotoIndex, photos.length]);

  const showPreviousPhoto = () => {
    setActivePhotoIndex((current) =>
      current === null ? 0 : (current - 1 + photos.length) % photos.length,
    );
  };
  const showNextPhoto = () => {
    setActivePhotoIndex((current) =>
      current === null ? 0 : (current + 1) % photos.length,
    );
  };

  return (
    <>
      <section className="mb-24" aria-labelledby="project-timeline-heading">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="mb-3 block text-xs uppercase tracking-[0.25em] text-secondary">
              Project timeline
            </span>
            <h2
              id="project-timeline-heading"
              className="text-3xl font-serif text-primary"
            >
              From backyard to finished pool
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            Follow the project from the existing yard through construction and into the
            final walkthrough. Progress media is arranged by its original capture time.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2">
          {items.map((item, index) =>
            item.kind === "photo" ? (
              <TimelinePhotoCard
                key={item.asset.src}
                item={item}
                sequence={index + 1}
                photoIndex={photos.indexOf(item)}
                onOpen={() => setActivePhotoIndex(photos.indexOf(item))}
              />
            ) : (
              <TimelineVideoCard
                key={item.video.desktopSrc}
                item={item}
                sequence={index + 1}
              />
            ),
          )}
        </div>
      </section>

      <Dialog
        open={activePhotoIndex !== null}
        onOpenChange={(isOpen) => {
          if (!isOpen) setActivePhotoIndex(null);
        }}
      >
        <DialogContent className="max-h-[94dvh] w-[calc(100%-1rem)] max-w-6xl overflow-y-auto border-white/15 bg-[#101817] p-3 text-white sm:p-6">
          {activePhoto && activePhotoIndex !== null && (
            <>
              <DialogTitle className="sr-only">{activePhoto.asset.label}</DialogTitle>
              <DialogDescription className="sr-only">
                Photo {activePhotoIndex + 1} of {photos.length}. Use the previous and
                next photo controls or your keyboard arrow keys to browse the gallery.
              </DialogDescription>
              <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_15rem] lg:items-center lg:gap-6">
                <div className="flex min-h-0 items-center justify-center bg-black/40">
                  <picture>
                    <source
                      media="(max-width: 767px)"
                      srcSet={activePhoto.asset.mobileSrc}
                    />
                    <img
                      src={activePhoto.asset.src}
                      alt={activePhoto.asset.alt}
                      className="max-h-[74dvh] w-full object-contain"
                    />
                  </picture>
                </div>
                <div className="flex items-center justify-between gap-3 lg:flex-col lg:items-stretch">
                  <button
                    type="button"
                    onClick={showPreviousPhoto}
                    aria-label="Previous photo"
                    className="inline-flex min-h-11 min-w-11 items-center justify-center border border-white/25 text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-secondary"
                  >
                    <ChevronLeft aria-hidden="true" />
                  </button>
                  <div className="flex-1 text-center lg:py-4">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/60">
                      {String(activePhotoIndex + 1).padStart(2, "0")} /{" "}
                      {String(photos.length).padStart(2, "0")}
                    </p>
                    <p className="mt-2 font-serif text-lg">{activePhoto.asset.label}</p>
                    <p className="mt-2 text-xs text-white/65">{activePhoto.stage}</p>
                  </div>
                  <button
                    type="button"
                    onClick={showNextPhoto}
                    aria-label="Next photo"
                    className="inline-flex min-h-11 min-w-11 items-center justify-center border border-white/25 text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-secondary"
                  >
                    <ChevronRight aria-hidden="true" />
                  </button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function TimelinePhotoCard({
  item,
  sequence,
  photoIndex,
  onOpen,
}: {
  item: PhotoTimelineItem;
  sequence: number;
  photoIndex: number;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      aria-label={`Open photo ${photoIndex + 1}: ${item.asset.label}`}
      className="group block w-full overflow-hidden border border-border bg-card text-left transition-colors hover:border-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-secondary"
    >
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-muted">
        <picture>
          <source media="(max-width: 767px)" srcSet={item.asset.mobileSrc} />
          <img
            src={item.asset.src}
            alt={item.asset.alt}
            loading="lazy"
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </picture>
        <span className="absolute left-3 top-3 border border-white/25 bg-black/55 px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-white backdrop-blur-sm">
          {String(sequence).padStart(2, "0")} · {item.stage}
        </span>
        <span className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/35 bg-black/50 text-white backdrop-blur-sm">
          <Expand aria-hidden="true" className="h-4 w-4" />
        </span>
      </div>
      <div className="flex items-center gap-3 p-5">
        <ImageIcon aria-hidden="true" className="h-5 w-5 shrink-0 text-secondary" />
        <span className="font-serif text-lg text-primary">{item.asset.label}</span>
      </div>
      <p className="px-5 pb-5 text-sm text-muted-foreground">{item.asset.alt}</p>
    </button>
  );
}

function TimelineVideoCard({
  item,
  sequence,
}: {
  item: Extract<CaseStudyTimelineItem, { kind: "video" }>;
  sequence: number;
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);
  const videoSource = isMobile ? item.video.mobileSrc : item.video.desktopSrc;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateViewport = () => setIsMobile(mediaQuery.matches);
    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);
    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  useEffect(() => {
    setHasVideoError(false);
  }, [videoSource]);

  return (
    <div className="overflow-hidden border border-border bg-card">
      <div className="flex items-center gap-3 border-b border-border px-5 py-4">
        <Video aria-hidden="true" className="h-5 w-5 text-secondary" />
        <div>
          <p className="font-serif text-lg text-primary">{item.video.label}</p>
          <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            {String(sequence).padStart(2, "0")} · {item.stage}
          </p>
        </div>
      </div>
      {hasVideoError ? (
        <div className="relative mx-auto aspect-[9/16] max-h-[65vh] max-w-[25rem] bg-black">
          <img
            src={item.video.poster}
            alt={item.video.alt}
            className="h-full w-full object-contain"
          />
          <div className="absolute inset-x-0 bottom-0 space-y-3 bg-primary/95 p-4 text-center text-primary-foreground">
            <p className="text-sm">This browser could not play the video inline.</p>
            <a
              href={videoSource}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center justify-center border border-secondary px-4 text-xs uppercase tracking-widest text-secondary transition-colors hover:bg-secondary hover:text-secondary-foreground"
            >
              Open the video
            </a>
          </div>
        </div>
      ) : (
        <video
          key={videoSource}
          className="mx-auto aspect-[9/16] max-h-[65vh] w-full max-w-[25rem] bg-black object-contain"
          controls
          playsInline
          preload="none"
          poster={item.video.poster}
          aria-label={item.video.alt}
          onError={() => setHasVideoError(true)}
        >
          <source src={videoSource} type="video/mp4" />
          Your browser does not support this video.
        </video>
      )}
    </div>
  );
}