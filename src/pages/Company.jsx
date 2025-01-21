import { Outlet } from "react-router-dom";

function Company() {
  return (
    <div>
      <h1>Company</h1>
      <Outlet />
    </div>
  );
}
export default Company;
