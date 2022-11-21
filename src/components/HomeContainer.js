import React from "react";
import delivery from "../img/delivery.png";
import heroBg from "../img/heroBg.png";
import I1 from "../img/i1.png";
import { heroData } from "../utils/data";
const HomeContainer = () => {
  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full "
      id="home"
    >
      <div className="py-2 flex-1 flex flex-col items-start  justify-center gap-8">
        <div className="flex items-center justify-center gap-2 bg-orange-100 rounded-tr-2xl rounded-br-2xl pl-2 ">
          <p className="text-orange-500 text-base font-semibold">
            Bike delivery
          </p>

          <div className="w-10 h-10 rounded-full bg-white drop-shadow-xl">
            <img
              className="w-full h-full  object-contain"
              src={delivery}
              alt="delivery"
            />
          </div>
        </div>
        <p className="font-bold text-headingColor tracking-wide lg:text-[4.5rem] text-[2.5rem]">
          The Fastest delivery in{" "}
          <span className="text-[3rem] text-orange-600 lg:text-[5rem]">
            your City
          </span>
          .
        </p>
        <p className="text-headingColor text-base text-center md:text-left md:w-[80%]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero tempora
          sequi soluta, laborum voluptatibus voluptas voluptatem rerum voluptate
          accusamus vitae non itaque illum. Excepturi alias a, veritatis nam
          molestiae placeat?
        </p>
        <button className="bg-gradient-to-br from-orange-400 to-orange-500 w-full rounded-lg cursor-pointer hover:shadow-lg transition-all ease-out duration-100 md:w-auto px-4 py-2 ">
          Order Now
        </button>
      </div>
      <div className="py-2 flex-1 flex items-center relative ">
        <img
          src={heroBg}
          className="w-full h-420 lg:w-auto lg:h-650 ml-auto"
          alt="herobg"
        />
        <div className="absolute w-full h-full flex gap-4 flex-wrap items-center justify-center top-0 xl:-left-12 xl:px-32 lg:-left-8 left-0 py-4">
          {heroData&& heroData.map(card=>(
            <div key={card.id} className="lg:w-150 p-4 rounded-3xl flex flex-col items-center justify-center bg-cardOverlay backdrop-blur-md ">
            <img src={card.imgSrc} className=" w-20 lg:w-40 -mt-10 lg:-mt-20" alt="iceCream" />
            <p className=" text-base lg:text-xl mt-2 lg:mt-4 font-semibold text-textColor">{card.name}</p>
            <p className=" text-[12px] lg:text-sm font-semibold text-lighttextGray my-1 lg:my-3">
              {card.desc}
            </p>
            <p className="text-sm font-semibold text-headingColor">
              <span className="text-xs text-red-600">$</span>{card.price}
            </p>
          </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeContainer;
