import React from 'react';
import Styles from './Paginator.module.css';

const Paginator = ({ maxPage, current, handleCLick }) => (
  <section className="col s12 center">
    <ul className="pagination">
      {
        [...Array(maxPage).keys()].map(page => {
          const pageNumber = page + 1;
          return <li key={ pageNumber } className={`waves-effect ${pageNumber === current ? Styles.Active :''}`}>
            <a href="!#" onClick={ (e) => handleCLick(e, pageNumber)}>{ pageNumber }</a>
            </li>
        })
      }
    </ul>
  </section>
);

export default Paginator;
