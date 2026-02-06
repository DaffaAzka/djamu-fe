interface CardProps {
  title?: string;
  description?: string;
  image?: string;
  children?: React.ReactNode;
  className?: string;
}

export default function Card({
  title,
  description,
  image,
  children,
  className = "",
}: CardProps) {
  return (
    <div
      className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden ${className}`}>
      {image && (
        <img src={image} alt={title} className="w-full h-48 object-cover" />
      )}
      <div className="p-6">
        {title && (
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        )}
        {description && (
          <p className="text-gray-600 text-sm mb-4">{description}</p>
        )}
        {children}
      </div>
    </div>
  );
}
