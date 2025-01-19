import { Pagination } from "antd";

// interface IManga {
//   id: number;
//   title: string;
// }
interface PaginationMangaProps {
  totalPages: number;
  postsPerPage: number;
  currentPage: number;
  handlePageChange: (pageNumber: number) => void;
}
const PaginationManga = (props: PaginationMangaProps) => {
  const { totalPages, postsPerPage, currentPage, handlePageChange } = props;

  return (
    <Pagination
      align="end"
      simple
      showSizeChanger={false}
      current={currentPage}
      pageSize={postsPerPage}
      total={totalPages}
      onChange={handlePageChange}
    />
  );
};

export default PaginationManga;
