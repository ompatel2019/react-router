import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import MainLayout from './Layouts/MainLayout';
import HomePage from './Pages/HomePage';
import { lazy, useEffect } from "react";
import { Suspense } from "react";

const BlogsPage = lazy(() => import('./Pages/BlogsPage'));
const ServicesPage = lazy(() => import('./Pages/ServicesPage'));
const Blog1 = lazy(() => import('./components/blogs/Blog1'));
const Blog2 = lazy(() => import('./components/blogs/Blog2'));
const Blog3 = lazy(() => import('./components/blogs/Blog3'));

const fallback = `<div>Loading Blog...</div>`;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/blogs" element={<BlogsPage />} />
      <Route path="blogs/1" element={
        <Suspense fallback={fallback}>
          <Blog1 />
        </Suspense>
      }/>
      <Route path="blogs/2" element={
        <Suspense fallback={fallback}>
          <Blog2 />
        </Suspense>
      }/>
      <Route path="blogs/3" element={
        <Suspense fallback={fallback}>
          <Blog3 />
        </Suspense>
      }/>
    </Route>
  )
);

export default function App() {
  useEffect(() => {
    const consoleScreenSize = () => {
      const length = window.innerWidth;
      console.log(`Width: ${length}px`);
    };

    // Add event listener with the function (not calling it immediately)
    window.addEventListener("resize", consoleScreenSize);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("resize", consoleScreenSize);
    };
  }, []);

  return <RouterProvider router={router} />;
}
