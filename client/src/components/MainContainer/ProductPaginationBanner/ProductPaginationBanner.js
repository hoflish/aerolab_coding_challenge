import React from "react";
import { number } from "prop-types";
import CONFIG from "../../../config/app";

export default function ProductPaginationBanner({ productsSize, page, onPaginate }) {

  const numberOfPages = Math.ceil(
    productsSize / CONFIG.PAGINATION_LIMIT_NUMBER
  );
  const offset = (page - 1) * CONFIG.PAGINATION_LIMIT_NUMBER + 1;
  const offsetText =
    "" + offset + " - " + (offset + CONFIG.PAGINATION_LIMIT_NUMBER - 1);

  return (
    <div className="row">
      <div className="productPagination--offset">
        {`${offsetText} of ${productsSize} products`}
      </div>
      <span className="productPagination--pageLinks">
        <button
          disabled={page === 1}
          aria-label="Previous"
          onClick={(evt) => onPaginate(evt, "prev")}
          className="icon-chevron_left"
        />
        <ul>
          {[...Array(numberOfPages).keys()].map((item, key) => (
            <li
              className={`${
                page === key + 1 ? "page-link__active" : ""
              } page-link `}
              data-num={key + 1}
              key={key + 1}
            >
              <a
                onClick={(evt) => onPaginate(evt, key + 1)}
                aria-label={`Page ${key + 1}`}
                href="#"
                role="button"
              >
                {key + 1}
              </a>
            </li>
          ))}
        </ul>
        <button
          disabled={numberOfPages === page}
          onClick={(evt) => onPaginate(evt, "next")}
          className="icon-chevron_right"
        />
      </span>
    </div>
  );
}

ProductPaginationBanner.propTypes = {
  productsSize: number,
  page: number
};

ProductPaginationBanner.defaultProps = {};
