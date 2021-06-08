import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import "../src/styles/swiper.css";
// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation } from "swiper/core";

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

export default function Product({ product, username }) {
  //console.log(username);
  const [recommandedProduct, setRecommandedProduct] = useState(null);
  const path = `/packages/client/src/public/images/`;

  useEffect(() => {
    // const {apolloServer} = require("../../gql_server/src/index");
    const {
      getRecommendedItemsForUser,
      getItemsById,
    } = require("../../microservice/src/database/index");
    async function getRecommendedItemsForUserCall() {
      const recommandedItems = await getRecommendedItemsForUser(username);
      //console.log(recommandedItems);
      if (recommandedItems.length > 0) {
        const productArray = await getItemsById(recommandedItems);
        setRecommandedProduct(productArray);
      }
    }

    getRecommendedItemsForUserCall();
  }, [product, username]);
  return (
    <>
      <div className="ml-4 mb-4">
        <h1 className="text-2xl font-bold">{product?.name}</h1>
        <div className="container flex mx-auto max-w-screen-md items-center">
          <div className="">
            <img
              src={`${path}${product.img}`}
              alt=""
              className=" w-2/4 h-3/5"
            />
          </div>
        </div>
        <div className="container max-w-screen-md my-4">
          <p className="font-bold text-2xl">About This Items</p>
        </div>
        <div className="border-solid border-b-2 border-gray-primary"></div>
        <div className="grid grid-cols-1">
          <div className="my-4 font-bold">Specification</div>
          <div className="mt-2 ml-2">
            <p className="font-bold"> Weight </p>
            <p className="my-2 text-xs">
              {product.weight.replace(/[a-z](?=\d)|\d(?=[a-z])/gi, "$& ")}
            </p>
          </div>
          <div className="mt-2 ml-2">
            <p className="font-bold"> Department </p>
            <p className="my-2 text-xs">{product.department}</p>
          </div>
          <div className="mt-2 ml-2">
            <p className="font-bold"> Category </p>
            <p className="my-2 text-xs">{product.category}</p>
          </div>
        </div>
      </div>

      {recommandedProduct && (
        <Swiper
          slidesPerView={6}
          spaceBetween={10}
          slidesPerGroup={1}
          loop={false}
          loopFillGroupWithBlank={false}
          pagination={{ clickable: true }}
          navigation={true}
          className="mySwiper mt-4 border-gray-900"
        >
          {recommandedProduct.map((product) => (
            <SwiperSlide key={product.id}>
              <img
                src={`${path}${product.img}`}
                alt=""
                className="object-contain h-20 w-full"
              />
              <p className="text-xs my-4">{product?.name}</p>
              <p className="text-xs mb-1 font-bold">{`$${product?.price}`}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
}
