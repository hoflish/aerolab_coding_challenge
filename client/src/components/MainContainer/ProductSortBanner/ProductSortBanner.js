import React from "react";

export default function ProductSortBanner({sortValue, onSelectChange}) {
  return (
    <div className="row">
      <div className="ellipsis">

      </div>
      <div className="productSort">
        <span>Sort by</span>
        <select
          id="sort"
          className="btn defaultBtn"
          value={sortValue}
          onChange={(e) => {
            onSelectChange(e);
          }}
        >
          <option value="most-recent">Most recent</option>
          <option value="price-descendant">Price: High to Low</option>
          <option value="price-ascendant">Price: Low to High</option>
        </select>
      </div>
    </div>
  );
}

