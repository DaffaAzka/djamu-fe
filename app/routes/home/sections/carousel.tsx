// ...existing code...
import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Star, Pause, Play } from "lucide-react";

interface CarouselItem {
  id: number;
  image: string;
  title: string;
  description: string;
  rating: number;
  price: string;
}

const CAROUSEL_ITEMS: CarouselItem[] = [
  {
    id: 1,
    image: "/assets/jamu-assets1.jpeg",
    title: "Jamu Kunyit Asam",
    description:
      "Minuman tradisional yang menyegarkan dengan manfaat kesehatan maksimal",
    rating: 4.8,
    price: "Rp 25.000",
  },
  {
    id: 2,
    image: "/assets/jamu-assets2.jpg",
    title: "Jamu Beras Kencur",
    description: "Ramuan kuno untuk meningkatkan stamina dan daya tahan tubuh",
    rating: 4.7,
    price: "Rp 28.000",
  },
  {
    id: 3,
    image: "/assets/jamu-assets3.jpg",
    title: "Jamu Temulawak",
    description: "Terbuat dari bahan alami pilihan untuk kesehatan pencernaan",
    rating: 4.9,
    price: "Rp 30.000",
  },
  {
    id: 4,
    image: "/assets/jamu-assets4.jpg",
    title: "Jamu Ginger Shot",
    description: "Konsentrasi jahe murni untuk imunitas dan energi tubuh",
    rating: 4.6,
    price: "Rp 32.000",
  },
];

export default function CarouselSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [progress, setProgress] = useState(0); // 0-100 for progress bar
  const intervalRef = useRef<number | null>(null);
  const progressRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const AUTO_MS = 5000;
  const PROGRESS_TICK_MS = 100;

  const goTo = useCallback((index: number) => {
    setCurrentIndex((prev) => {
      const next =
        ((index % CAROUSEL_ITEMS.length) + CAROUSEL_ITEMS.length) %
        CAROUSEL_ITEMS.length;
      return next;
    });
    setAutoPlay(false);
  }, []);

  const goNext = useCallback(
    () => goTo(currentIndex + 1),
    [currentIndex, goTo],
  );
  const goPrev = useCallback(
    () => goTo(currentIndex - 1),
    [currentIndex, goTo],
  );

  // Autoplay with progress indicator
  useEffect(() => {
    if (!autoPlay) {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setProgress(0);
      progressRef.current = 0;
      return;
    }

    // reset then start ticking
    setProgress(0);
    progressRef.current = 0;

    const steps = AUTO_MS / PROGRESS_TICK_MS;
    intervalRef.current = window.setInterval(() => {
      progressRef.current += 100 / steps;
      setProgress(Math.min(100, progressRef.current));

      if (progressRef.current >= 100) {
        setCurrentIndex((prev) => (prev + 1) % CAROUSEL_ITEMS.length);
        progressRef.current = 0;
        setProgress(0);
      }
    }, PROGRESS_TICK_MS);

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [autoPlay]);

  // keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
      if (e.key === " " || e.key === "Spacebar") {
        // toggle play/pause on space
        e.preventDefault();
        setAutoPlay((p) => !p);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev]);

  // Touch / swipe handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setAutoPlay(false);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) > 50) {
      if (delta < 0) goNext();
      else goPrev();
    }
  };

  const currentItem = CAROUSEL_ITEMS[currentIndex];

  return (
    <section
      ref={containerRef}
      className="relative w-full max-w-7xl mx-auto mt-20 mb-10 px-4"
      aria-roledescription="carousel"
      aria-label="Featured jamu products carousel"
      onMouseEnter={() => setAutoPlay(false)}
      onMouseLeave={() => setAutoPlay(true)}
    >
      <div className="relative overflow-hidden rounded-2xl shadow-2xl">
        <div
          className="relative h-64 md:h-96 overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          role="group"
          aria-roledescription="slide"
          aria-label={`${currentItem.title} — ${currentIndex + 1} of ${CAROUSEL_ITEMS.length}`}
        >
          {/* Slides container */}
          <div
            className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {CAROUSEL_ITEMS.map((item) => (
              <figure
                key={item.id}
                className="w-full h-full shrink-0"
                aria-hidden={item.id !== currentItem.id}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <figcaption className="sr-only">{item.description}</figcaption>
              </figure>
            ))}
          </div>

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

          {/* Nav Buttons */}
          <button
            onClick={goPrev}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white rounded-full p-2 transition-all duration-200 hover:scale-110 focus:outline-none z-20"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={goNext}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white rounded-full p-2 transition-all duration-200 hover:scale-110 focus:outline-none z-20"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>

          {/* Info card */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/80 to-transparent text-white">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-1">
              {currentItem.title}
            </h2>
            <p className="text-gray-200 text-sm md:text-base mb-3">
              {currentItem.description}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1" aria-hidden>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < Math.round(currentItem.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-400"
                      }
                    />
                  ))}
                </div>
                <span className="text-yellow-400 font-semibold">
                  {currentItem.rating.toFixed(1)}
                </span>
              </div>
              <span className="text-white text-lg font-bold">
                {currentItem.price}
              </span>
            </div>
          </div>

          {/* Autoplay progress */}
          <div className="absolute left-4 right-4 bottom-0 h-1 bg-white/10 rounded-full overflow-hidden pointer-events-none">
            <div
              className="h-full bg-orange-500 transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Dots with accessible labels */}
      <div
        className="flex justify-center gap-2 mt-6"
        role="tablist"
        aria-label="Slide selection"
      >
        {CAROUSEL_ITEMS.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={`h-3 rounded-full transition-all duration-200 ${index === currentIndex ? "bg-orange-500 w-8" : "bg-gray-300 hover:bg-gray-400 w-3"}`}
            aria-selected={index === currentIndex}
            role="tab"
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        {CAROUSEL_ITEMS.map((item, index) => (
          <button
            key={item.id}
            onClick={() => goTo(index)}
            className={`cursor-pointer rounded-lg overflow-hidden transition-all duration-200 transform ${index === currentIndex ? "ring-2 ring-orange-500 shadow-lg scale-105" : "hover:shadow-md"}`}
            aria-current={index === currentIndex}
            aria-label={`${item.title} — ${item.price}`}
          >
            <div className="relative h-24 md:h-32 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              {index === currentIndex && (
                <div className="absolute inset-0 bg-orange-500/20" />
              )}
            </div>
            <div className="p-3 bg-white">
              <h3 className="font-semibold text-sm text-gray-800 truncate">
                {item.title}
              </h3>
              <p className="text-xs text-orange-600 font-bold mt-1">
                {item.price}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 mt-6">
        <button
          onClick={() => setAutoPlay((p) => !p)}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all inline-flex items-center gap-2 ${autoPlay ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-800"}`}
          aria-pressed={!autoPlay ? false : true}
        >
          {autoPlay ? (
            <>
              <Pause size={16} /> Pause
            </>
          ) : (
            <>
              <Play size={16} /> Resume
            </>
          )}
        </button>
        <span className="text-sm text-gray-600">
          Gunakan ← → untuk Navigasi, Geser untuk Mobile.
        </span>
      </div>
    </section>
  );
}
