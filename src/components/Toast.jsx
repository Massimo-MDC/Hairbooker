function Toast({ message }) {
    if (!message) return null;
  
    return (
      <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded shadow-lg text-lg z-50 animate-fade-in-out">
        {message}
      </div>
    );
  }
  
export default Toast;
  