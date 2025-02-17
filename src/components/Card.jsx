import React from "react";
import fallbackImage from "../../assets/fallback.png";

const Card = ({
  title,
  imgUrl,
  description,
  url,
  source,
  author,
  publishedAt,
}) => {
  const handleImageError = (event) => {
    event.target.src = fallbackImage;
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const getAuthorDisplay = (author) => {
    if (!author) return "Unknown Author";
    if (Array.isArray(author)) {
      return author.length > 1 ? "Multiple Authors" : author[0];
    }
    return author;
  };

  const getAuthorInitial = (author) => {
    if (!author) return "?";
    if (Array.isArray(author)) {
      return author.length > 1 ? "+" : author[0][0].toUpperCase();
    }
    return author[0].toUpperCase();
  };

  return (
    <div className="mt-10 w-full max-w-xl h-[32rem] rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400">
      {/* Image Section - Fixed height */}
      <div className="h-48 w-full overflow-hidden">
        <img
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          src={imgUrl || fallbackImage}
          alt={title || "News image"}
          onError={handleImageError}
        />
        {source && (
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 text-sm font-semibold text-white bg-blue-600 rounded-full truncate max-w-[200px]">
              {source}
            </span>
          </div>
        )}
      </div>

      {/* Content Section - Fixed height with flexible spacing */}
      <div className="p-6 h-[24rem] flex flex-col">
        {/* Title - Fixed height with ellipsis */}
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white line-clamp-2 h-[3.75rem]">
          {title || "Untitled"}
        </h2>

        {/* Description - Fixed height with ellipsis */}
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 h-[4.5rem]">
          {description || "No description available"}
        </p>

        {/* Spacer to push metadata to bottom */}
        <div className="flex-grow" />

        {/* Metadata Section */}
        <div className="border-t dark:border-gray-700 pt-4">
          {/* Author and Date */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold">
                  {getAuthorInitial(author)}
                </span>
              </div>
              <div className="ml-3 overflow-hidden">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-[200px]">
                  {getAuthorDisplay(author)}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {publishedAt ? formatDate(publishedAt) : "No date"}
                </p>
              </div>
            </div>
          </div>

          {/* Enhanced Read More Link */}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition duration-300 ease-out hover:bg-blue-700 mt-4"
          >
            <span className="absolute inset-y-0 right-0 flex items-center pr-4 transition-transform duration-300 group-hover:translate-x-2">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </span>
            <span className="flex items-center transition-transform duration-300 group-hover:-translate-x-2">
              Continue Reading
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;
