import React, { JSX } from 'react';
import { PaginationProps } from './pagination.interface';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

export default function Pagination(props: PaginationProps) {

    function getPagesToRenderBasedOnActivePage() {
        const firstThreePages = sliceFirstHalfPages();
        const lastThreePages = sliceLastHalfPages();

        return {
            firstThreePages: firstThreePages,
            lastThreePages: lastThreePages,
        };
    }

    function sliceFirstHalfPages() {
        const pages = getPagesAsArray();
        let slicedPages = pages.slice(0, 3);
        
        for (
            let i = 1; 
            i <= props.numberOfPage / 2 
            && props.activePage <= props.numberOfPage / 2 
            && notExisted(props.activePage, slicedPages);
            i++
        ) {
            slicedPages = pages.slice(i, 3 + i);
        }

        return slicedPages;
    }

    function sliceLastHalfPages() {
        const pages = getPagesAsArray();
        let slicedPages = pages.slice(-3);
        
        for (
            let i = Math.round(props.numberOfPage / 2); 
            i <= props.numberOfPage 
            && props.activePage > props.numberOfPage / 2 
            && notExisted(props.activePage, slicedPages);
            i++
        ) {
            pages.pop();
            slicedPages = pages.slice(-3);
        }

        return slicedPages;
    }

    function isExisted(num: number, arr: number[]) {
        return arr.indexOf(num) !== -1;
    }

    function notExisted(num: number, arr: number[]) {
        return !isExisted(num, arr);
    }

    function getPagesAsArray() {
        const pages: number[] = [];
        for (let i = 1; i <= props.numberOfPage; i++) {
            pages.push(i);
        }
        return pages;
    }

    function renderPageNumber(pageNumber: number) {
        if (pageNumber === props.activePage) {
            return renderActivePage(pageNumber);
        }
        return renderNormalPage(pageNumber);
    }

    function renderNormalPage(pageNumber: number) {
        return (
            <a
                className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium cursor-pointer"
                key={`pagination-${pageNumber}`}
                onClick={() => onPageClicked(pageNumber)}
            >
                {pageNumber}
            </a>
        );
    }

    function renderActivePage(pageNumber: number) {
        return (
            <a
                className="border-indigo-500 text-indigo-600 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium cursor-pointer"
                aria-current="page"
                key={`pagination-${pageNumber}`}
                onClick={() => onPageClicked(pageNumber)}
            >
                {pageNumber}
            </a>
        );
    }

    function render() {
        const renderPages = getPagesToRenderBasedOnActivePage();

        const uniquePages = new Set([...renderPages.firstThreePages, ...renderPages.lastThreePages]);
        const arrUniquePage = Array.from(uniquePages);
        arrUniquePage[0] = 1;
        arrUniquePage[arrUniquePage.length - 1] = props.numberOfPage;

        const renderedCollection: JSX.Element[] = [];
        arrUniquePage.forEach((each, index) => {
            if (index > 0 && arrUniquePage[index - 1] + 1 !== each) {
                renderedCollection.push(renderDotDotDot(index));
            }
            renderedCollection.push(renderPageNumber(each));
        });
        

        return (
            <>
                {renderedCollection}
            </>
        );
    }

    function renderDotDotDot(index: number) {
        return (
            <span key={`...-${index}`} className="border-transparent text-gray-500 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">
                ...
            </span>
        );
    }

    function onPageClicked(pageNumber: number) {
        if (props.onPageClicked && pageNumber !== props.activePage) {
            props.onPageClicked(pageNumber);
        }
    }

    return (
        <nav className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0">
            <div className="-mt-px w-0 flex-1 flex">
                {
                    props.activePage !== 1 &&
                    <a
                        className="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 cursor-pointer"
                        onClick={() => onPageClicked(props.activePage - 1)}
                    >
                        <ArrowLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                        {props.previousText ? props.previousText : "Previous"}
                    </a>
                }
            </div>
            <div className="hidden md:-mt-px md:flex">
                {render()}
            </div>
            <div className="-mt-px w-0 flex-1 flex justify-end">
                {
                    props.activePage !== props.numberOfPage &&
                    <a
                        className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 cursor-pointer"
                        onClick={() => onPageClicked(props.activePage + 1)}
                    >
                        {props.nextText ? props.nextText : "Next"}
                        <ArrowRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                    </a>
                }
            </div>
        </nav>
    )
}