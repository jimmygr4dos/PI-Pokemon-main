import React from 'react';
import "./Pagination.css";

const Pagination = ({totalPosts, postsPerPage, setCurrentPage, currentPage}) => {
	let pages = [];

	for (let i = 1; i <= Math.ceil(totalPosts/postsPerPage); i++) {
		pages.push(i);
	}

    const validatePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
        else {
            setCurrentPage(currentPage);
            console.log('currentPage: ', currentPage)
        } 
    }

    const validateNext = () => {
        if (currentPage < pages.length) {
            setCurrentPage(currentPage + 1);
        }
        else {
            setCurrentPage(currentPage);
            console.log('currentPage: ', currentPage)
        } 
    }

	return (
		<div className='pagination'>

            <button key='prev' onClick={validatePrev}>&lt;&lt;&lt;</button>

			{                 
				pages.map((page, index) => {
					return <button  key={index} 
                                    onClick={() => setCurrentPage(page)} 
                                    className={page === currentPage ? 'active' : ''}>{page}</button>;
				})
			}

            <button key='next' onClick={validateNext}>&gt;&gt;&gt;</button>

		</div>
	)
}

export default React.memo(Pagination);