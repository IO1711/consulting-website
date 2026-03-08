import { useState } from "react";
import clsx from "clsx";

const ImageWithPlaceholder = ({
  src,
  alt,
  className,
  imgClassName,
  placeholderClassName,
  loading = "lazy",
  decoding = "async",
  fetchPriority,
  sizes,
  width,
  height,
  imgStyle,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={clsx("relative overflow-hidden", className)}>
      <div
        aria-hidden
        className={clsx(
          "absolute inset-0 animate-pulse bg-neutral-200 transition-opacity duration-300",
          isLoaded && "opacity-0",
          placeholderClassName
        )}
      />

      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        sizes={sizes}
        width={width}
        height={height}
        style={imgStyle}
        className={clsx(
          "h-full w-full transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
          imgClassName
        )}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsLoaded(true)}
      />
    </div>
  );
};

export default ImageWithPlaceholder;
