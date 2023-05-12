import React, { Fragment } from "react";

export default function LargeScreenImages({
  images,
  image_value,
  setimage_value,
}) {
  return (
    <Fragment>
      <main className="hidden md:flex md:space-x-5">
        <aside className="aside-image-for-change-main-image md:col-span-1">
          {images.map((item, key) => (
            <figure key={key} className="overflow-hidden mb-2 rounded-md  ">
              <img
                src={item.url}
                className={`${
                  image_value === key
                    ? "border-2 shadow-lg  outline-indigo-500 border-indigo-700"
                    : "cursor-pointer"
                } w-[5rem] h-[5rem]`}
                onClick={(e) => {
                  e.preventDefault();
                  setimage_value(key);
                }}
              />
            </figure>
          ))}
        </aside>

        <figure className="w-full overflow-hidden rounded-lg  col-span-4">
          <img
            src={images[image_value].url}
            className=" w-full h-96 hover:scale-125  
            transition ease-in-out duration-500  rounded-lg"
          />
        </figure>
      </main>
    </Fragment>
  );
}
