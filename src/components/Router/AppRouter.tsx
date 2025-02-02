import { Routes, Route, Navigate } from 'react-router-dom';
import ListSearch from '../HeaderNav/ListSearch';
import Contact from '../HeaderNav/Contact';
import CardMain from '../manga/CardMain';
import CardDetail from '../mangaDetail/CardDetail';
import ScrollToTop from './scrollToTop';

const AppRouter = () => {
    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Navigate to="/trang-chu" replace />} />
                <Route path="/trang-chu" element={<CardMain />} />
                <Route path="/danh-sach" element={<ListSearch />} />
                <Route path="/lien-he" element={<Contact />} />
                <Route path="/truyen/:id" element={<CardDetail />} />
            </Routes>

        </>
    )
}

export default AppRouter