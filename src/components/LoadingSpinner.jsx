const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-lg">{message}</div>
    </div>
  );
};

export default LoadingSpinner;
