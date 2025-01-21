import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loading from "../components/loading/Loading";
import companyRouter from "./companyrouter";

const LazyHome = lazy(() => import("../pages/Index"));
const LazyCompany = lazy(() => import("../pages/Company"));
const LazyGood = lazy(() => import("../pages/Good"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <LazyHome />
      </Suspense>
    ),
  },
  {
    path: "/company",
    element: (
      <Suspense fallback={<Loading />}>
        <LazyCompany />
      </Suspense>
    ),
    children: companyRouter(),
  },
  {
    path: "/good",
    element: (
      <Suspense fallback={<Loading />}>
        <LazyGood />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: <h1>잘못된 경로 입니다.</h1>,
  },
]);

export default router;
