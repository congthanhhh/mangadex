import { Routes, Route, Navigate } from 'react-router-dom';
import ListSearch from '../HeaderNav/ListSearch';
import Contact from '../HeaderNav/Contact';
import CardMain from '../manga/CardMain';
import CardDetail from '../mangaDetail/CardDetail';
import Chapter from '../chapter/Chapter';
import Authenticate from '../modalManga/Authenticate';
import ScrollToTop from './ScrollToTop';
import HomeProfile from '../modalManga/HomeProfile';

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
                <Route path="/truyen/:id/chuong/:id" element={<Chapter />} />

                <Route path="/authenticate" element={<Authenticate />} />
                <Route path="/home-profile" element={<HomeProfile />} />
            </Routes>

        </>
    )
}

export default AppRouter