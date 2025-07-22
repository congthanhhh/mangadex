import { Routes, Route, Navigate } from 'react-router-dom';
import ListSearch from '../HeaderNav/ListSearch';
import Contact from '../HeaderNav/Contact';
import CardDetailDex from '../mangaDetail/CardDetailDex';
import ChapterDex from '../chapter/ChapterDex';
import Authenticate from '../modalManga/Authenticate';
import ScrollToTop from './ScrollToTop';
import HomeProfile from '../modalManga/HomeProfile';
import CardMainDex from '../manga/CardMainDex';

const AppRouter2 = () => {
    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Navigate to="/trang-chu" replace />} />
                <Route path="/trang-chu" element={<CardMainDex />} />
                <Route path="/danh-sach" element={<ListSearch />} />
                <Route path="/lien-he" element={<Contact />} />
                <Route path="/truyen/:cid" element={<CardDetailDex />} />
                <Route path="/chapter/:chid/chapter-number/:chapterNumber" element={<ChapterDex />} />

                <Route path="/authenticate" element={<Authenticate />} />
                <Route path="/home-profile" element={<HomeProfile />} />
            </Routes>

        </>
    )
}

export default AppRouter2;