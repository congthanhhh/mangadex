import { Routes, Route } from 'react-router-dom';
import ListSearch from '../HeaderNav/ListSearch';
import Contact from '../HeaderNav/Contact';
import CardMain from '../manga/CardMain';

const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<CardMain />} />
                <Route path="/trang-chu" element={<CardMain />} />
                <Route path="/danh-sach" element={<ListSearch />} />
                <Route path="/lien-he" element={<Contact />} />
            </Routes>

        </>
    )
}

export default AppRouter