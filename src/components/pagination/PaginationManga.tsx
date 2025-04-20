import { Pagination } from "antd";

interface PaginationMangaProps {
  totalPages: number;
  postsPerPage: number;
  currentPage: number;
  handlePageChange: (pageNumber: number) => void;
}

const PaginationManga = (props: PaginationMangaProps) => {
  const { totalPages, postsPerPage, currentPage, handlePageChange } = props;
  const totalItems = totalPages * postsPerPage;

  return (
    <Pagination
      align="end"
      simple
      showSizeChanger={false}
      current={currentPage}
      pageSize={postsPerPage}
      total={totalItems}
      onChange={handlePageChange}
    />
  );
};

export default PaginationManga;
