const ErrorMessage = ({ message, className = "" }) => {
  return (
    <div className={`text-red-600 p-3 bg-red-50 rounded ${className}`}>
      {message}
    </div>
  );
};

export default ErrorMessage;
