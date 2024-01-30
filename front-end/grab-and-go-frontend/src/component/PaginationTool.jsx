import React, { useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';

function PaginationTool({ totalPages, onPageChange }) {
    const [currentPage, setCurrentPage] = useState(1);

    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber);
        if(onPageChange) {
            onPageChange(pageNumber);
        }
    };

    const paginationItems = () => {
        let items = [];
        let startPage, endPage;

        if (totalPages <= 6) {
            startPage = 2;
            endPage = totalPages - 1;
        } else {
            if (currentPage <= 4) {
                startPage = 2;
                endPage = 5;
            } else if (currentPage + 2 >= totalPages) {
                startPage = totalPages - 4;
                endPage = totalPages - 1;
            } else {
                startPage = currentPage - 1;
                endPage = currentPage + 1;
            }
        }

        // First Page
        items.push(
            <Pagination.Item key={1} active={1 === currentPage} onClick={() => handleClick(1)}>
                1
            </Pagination.Item>
        );

        // Ellipsis
        if (startPage > 2) {
            items.push(<Pagination.Ellipsis key="ellipsis-1" />);
        }

        // Page numbers
        for (let number = startPage; number <= endPage; number++) {
            items.push(
                <Pagination.Item key={number} active={number === currentPage} onClick={() => handleClick(number)}>
                    {number}
                </Pagination.Item>
            );
        }

        // Second Ellipsis
        if (endPage < totalPages - 1) {
            items.push(<Pagination.Ellipsis key="ellipsis-2" />);
        }

        // Last Page
        if (totalPages > 1) {
            items.push(
                <Pagination.Item key={totalPages} active={totalPages === currentPage} onClick={() => handleClick(totalPages)}>
                    {totalPages}
                </Pagination.Item>
            );
        }

        return items;
    };

    return (
        <Pagination>
            <Pagination.First disabled={currentPage === 1} onClick={() => handleClick(1)} />
            <Pagination.Prev disabled={currentPage === 1} onClick={() => handleClick(currentPage - 1)} />
            {paginationItems()}
            <Pagination.Next disabled={currentPage === totalPages} onClick={() => handleClick(currentPage + 1)} />
            <Pagination.Last disabled={currentPage === totalPages} onClick={() => handleClick(totalPages)} />
        </Pagination>
    );
}

export default PaginationTool;
