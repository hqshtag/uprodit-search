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
            aria-label="Blog post pagination list"
        >
            <li className="paginationItem">
                <button
                    type="button"
                    className="arrowButton left"
                    aria-label="Goto previous page"
                    onClick={onPrevious}
                    disabled={disabledNavigation || !isPreviousPageAvailable}
                >
                    ◄
                </button>
            </li>

           
            <li className="paginationItem">
                <button
                    type="button"
                    className="arrowButton right"
                    // Do not remove the aria-label below, it is used for Hatchways automation.
                    aria-label="Goto next page"
                    onClick={onNext}
                    disabled={disabledNavigation || !isNextPageAvailable} // change this line to disable a button.
                >
                    ►
                </button>
            </li>

            
        </ul>
    );
}

export default Pagination