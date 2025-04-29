import { useEffect, useState } from "react";
import { HiArrowNarrowRight, HiArrowNarrowLeft } from "react-icons/hi";
import '../../css/custompagination.css';

type CustomPaginationProps = {
    rowsPerPage: number;
    rowCount: number;
    currentPage: number;
    onChangePage: (page: number) => void;
};

export default function CustomPagination({ rowsPerPage, rowCount, currentPage, onChangePage }: CustomPaginationProps) {
    const [paginationLinks, setPaginationLinks] = useState<(number | string)[]>([]);
    const totalPages = Math.ceil(rowCount / rowsPerPage);

    const generatePaginationLinks = (currentPage: number, lastPage: number): (number | string)[] => {
        const result: (number | string)[] = [];
        if (lastPage < 7) {
            for (let i = 1; i <= lastPage; i++) {
                result.push(i);
            }
            return result;
        }

        if ([currentPage - 1, currentPage, currentPage + 1].includes(1)) {
            if (currentPage - 1 === 1) {
                result.push(currentPage - 1, currentPage);
            } else if (currentPage === 1) {
                result.push(currentPage, currentPage + 1);
            }
            result.push('...', lastPage);
            return result;
        }

        if ([currentPage, currentPage + 1].includes(lastPage)) {
            if (currentPage + 1 === lastPage) {
                result.push(currentPage - 1, currentPage, currentPage + 1);
            } else if (currentPage === lastPage) {
                result.push(currentPage - 2, currentPage - 1, currentPage);
            }

            result.unshift(1, '...');
            return result;
        }

        if (currentPage - 1 === 2) {
            result.unshift(1);
        } else {
            result.unshift(1, '...');
        }

        result.push(currentPage - 1, currentPage, currentPage + 1);

        if (currentPage + 1 === lastPage - 1) {
            result.push(lastPage);
        } else {
            result.push('...', lastPage);
        }

        return result;
    }

    useEffect(() => {
        const links = generatePaginationLinks(currentPage, totalPages)
        setPaginationLinks(links);
    }, [currentPage, totalPages]);

    if (totalPages === 1) {
        return null;
    }

    const onPreviousClick = () => {
        if (currentPage === 1) return;
        onChangePage(currentPage - 1);
    }

    const onNextClick = () => {
        if (currentPage === totalPages) return;
        onChangePage(currentPage + 1);
    }

    return (
        <div className="pagination-container flex-center">
            <div
                style={{ visibility: currentPage === 1 ? 'hidden' : undefined }}
                onClick={onPreviousClick}
                className="flex-center pagination-nav"
            >
                <HiArrowNarrowLeft /> Previous
            </div>
            <div className="flex-center h-100">
                {
                    paginationLinks.map((page, idx) => (
                        <div
                            onClick={() => page !== '...' && onChangePage(page as number)}
                            key={idx}
                            className="flex-center pagination-links"
                            style={{
                                borderTop: `${page === currentPage ? '2px solid' : ''}`,
                                color: `${page === currentPage ? 'var(--primary)' : 'var(--deep-greige)'}`,
                                cursor: `${page === '...' ? '' : 'pointer'}`
                            }}
                        >
                            {page}
                        </div>
                    ))
                }
            </div>
            <div
                style={{ visibility: currentPage === totalPages ? 'hidden' : undefined }}
                onClick={onNextClick}
                className="flex-center pagination-nav"
            >
                Next <HiArrowNarrowRight />
            </div>
        </div>
    )
}
