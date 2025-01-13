/* eslint-disable react/prop-types */
export default function Button({ label, onClick, variant = "primary" }) {
  const baseStyle = "px-4 py-2 font-bold rounded";
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };
  return (
    <button className={`${baseStyle} ${variants[variant]}`} onClick={onClick}>
      {label}
    </button>
  );
}
