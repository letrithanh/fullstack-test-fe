export interface PaginationProps {
    /** Indicate number of page is displayed*/
    numberOfPage: number;

    /** Current active page number */
    activePage: number;

    /** Callback event when clicked on page number */
    onPageClicked?: (clickedPage: number) => void;

    /** Custom previous text. Default is Previous */
    previousText?: string;

    /** Custom next text. Default is Next */
    nextText?: string;
}
