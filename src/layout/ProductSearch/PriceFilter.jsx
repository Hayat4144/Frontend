import React,{Fragment} from "react";
import Slider from "@mui/material/Slider";
import { BsPlus } from "react-icons/bs";
import { AiOutlineMinus } from "react-icons/ai";

export default function PriceFilter({PriceOpen,setPriceOpen,price,priceHander}) {
  return (
    <Fragment>
      <div className="Price my-3 border-b border-gray-400 pb-2">
        <h3 className="Price-text flex w-full  justify-between items-center">
          <span>Price</span>
          {!PriceOpen ? (
            <BsPlus
              fontSize={"22px"}
              onClick={() => {
                setPriceOpen(!PriceOpen);
              }}
            />
          ) : (
            <AiOutlineMinus
              fontSize={"22px"}
              onClick={() => {
                setPriceOpen(!setPriceOpen);
              }}
            />
          )}
        </h3>
        <div className={`${PriceOpen ? "block" : "hidden"} Price-list-filter px-3 my-10`}
        >
          <Slider
            aria-label="Always visible"
            value={price}
            onChange={priceHander}
            aria-lableledby="range-slider"
            max={2000}
            min={10}
            step={20}
            valueLabelDisplay="on"
          />
        </div>
      </div>
    </Fragment>
  );
}
