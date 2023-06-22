import React , {useState, Fragment} from "react";

export default function SortFilter({ paddingX , sort, setsort }) {
  const [sortPriceLowToHigh, setSortPriceLowToHigh] = useState("sortPriceLowToHigh");
  const [sortPriceHighToLow, setSortPriceHightToLow] =useState("sortPriceHighToLow");
  const [sortByName, setSortByName] = useState("name");
  return <Fragment>
    <select
        name="sort"
        id="sort"
        value={sort}
        onChange={(e) => setsort(e.target.value)}
        className={`px-${paddingX} py-1 w-fit rounded-md bg-inherit`}
        >
        <option value={sortByName}> Name</option>
        <option value={sortPriceHighToLow}>Price Hight to low</option>
        <option value={sortPriceLowToHigh}> Price low to High</option>       
    </select>
  </Fragment>;
}
