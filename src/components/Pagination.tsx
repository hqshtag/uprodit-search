type PaginationProps = {
    totalCount: number,
    currentPage: number,
    pageSize: number,
    onPageChange: (nextPage: number) => void,
    disabledNavigation: boolean
}

const Pagination = ({
    onPageChange,
    totalCount,
    currentPage,
    pageSize,
    disabledNavigation
}: PaginationProps) => {


    const isNextPageAvailable = totalCount >= pageSize;
    const isPreviousPageAvailable = currentPage > 1;

    const onNext = () => {
        if (isNextPageAvailable) {
            onPageChange(currentPage + 1);
        }
    };

    const onPrevious = () => {
        if (isPreviousPageAvailable) {
            onPageChange(currentPage - 1);
        }
    };

    return (
        <ul
            className="wrapper"
        >
            <li className="paginationItem">
                <button
                    type="button"
                    className="arrowButton left"
                    onClick={onPrevious}
                    disabled={disabledNavigation || !isPreviousPageAvailable}
                >
                    Previous
                </button>
            </li>

           
            <li className="paginationItem">
                <button
                    type="button"
                    className="arrowButton right"
                    onClick={onNext}
                    disabled={disabledNavigation || !isNextPageAvailable} // change this line to disable a button.
                >
                    Next
                </button>
            </li>

            
        </ul>
    );
}

export default Pagination