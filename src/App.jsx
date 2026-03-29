import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';

const CollectionsPage = lazy(() => import('./pages/CollectionsPage'));
const CollectionDetailPage = lazy(() => import('./pages/CollectionDetailPage'));
const CategoriesPage = lazy(() => import('./pages/CategoriesPage'));
const CategoryDetailPage = lazy(() => import('./pages/CategoryDetailPage'));
const HeritagePage = lazy(() => import('./pages/HeritagePage'));
const AtelierPage = lazy(() => import('./pages/AtelierPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const BookAppointmentPage = lazy(() => import('./pages/BookAppointmentPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/collections" element={<CollectionsPage />} />
            <Route path="/collections/:slug" element={<CollectionDetailPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/categories/:slug" element={<CategoryDetailPage />} />
            <Route path="/heritage" element={<HeritagePage />} />
            <Route path="/atelier" element={<AtelierPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/book-appointment" element={<BookAppointmentPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
