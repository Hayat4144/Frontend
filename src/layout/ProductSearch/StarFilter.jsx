import React, { Fragment ,useState} from "react";
import { Rating } from "@mui/material";
import { BsPlus } from "react-icons/bs";
import { AiOutlineMinus } from "react-icons/ai";

export default function StarFilter({ RatingOpen, setRatingOpen,setStar}) {
  const [Star1, setStar1] = useState(1);
  const [Star2, setStar2] = useState(2);
  const [Star3, setStar3] = useState(3);
  const [Star4, setStar4] = useState(4);
  return (
    <Fragment>
      <div className="star my-3">
        <h3 className="Size-text flex w-full pb-3  justify-between items-center">
          <span>Ratings</span>
          {!RatingOpen ? (
            <BsPlus
              fontSize={"22px"}
              onClick={() => {
                setRatingOpen(!RatingOpen);
              }}
            />
          ) : (
            <AiOutlineMinus
              fontSize={"22px"}
              onClick={() => {
                setRatingOpen(!RatingOpen);
              }}
            />
          )}
        </h3>
        <div className={`${RatingOpen ? "block" : "hidden"} rating_container`}>
          <div className="rating_2_above flex items-center space-x-1">
            <Rating
              value={Star4}
              onClick={() => setStar(Star4)}
              size="medium"
            />
            <span>4 and above</span>
          </div>
          <div className="rating_3_above flex items-center space-x-3">
            <Rating
              value={Star3}
              onClick={() => setStar(Star3)}
              size="medium"
            />
            <span>3 and above</span>
          </div>
          <div className="rating_2_above flex items-center space-x-3">
            <Rating
              value={Star2}
              onClick={() => setStar(Star2)}
              size="medium"
            />
            <span>2 and above</span>
          </div>
          <div className="rating_1_above flex items-center space-x-3">
            <Rating
              value={Star1}
              onClick={() => setStar(Star1)}
              size="medium"
            />
            <span>1 and above</span>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
