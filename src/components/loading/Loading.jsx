import { ClipLoader } from "react-spinners";

const Loading = () => {
  const LoadingCss = {
    position: "fixed",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  };
  return (
    <div style={LoadingCss}>
      <ClipLoader color="#a518c9" loading size={200} speedMultiplier={1} />
    </div>
  );
};

export default Loading;
