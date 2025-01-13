import clsx from "clsx";

/* eslint-disable react/prop-types */
export function Alert({ message, type }) {
  return (
    <div
      className={clsx(
        "p-4 rounded m-4",
        type === "success" && "bg-green-100 text-green-700",
        type === "error" && "bg-red-100 text-red-700",
        type === "warning" && "bg-yellow-100 text-yellow-700",
      )}
    >
      {message}
    </div>
  );
}
