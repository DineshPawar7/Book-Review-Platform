export function Button({ children, onClick, className, variant }) {
    const baseStyles = variant === 'outline'
      ? 'border border-gray-500 text-gray-700'
      : 'bg-blue-600 text-white';
    return (
      <button
        onClick={onClick}
        className={`px-4 py-2 rounded ${baseStyles} ${className}`}
      >
        {children}
      </button>
    );
  }
  