import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import "../src/styles/swiper.css";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { css } from "@emotion/react";
import BeatLoader from "react-spinners/ClipLoader";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation } from "swiper/core";

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

export default function Product({ product, username }) {
  // don't know why string can't pass through the graphQL, so make another variable
  const usernameString = username;
  const GET_RECOMMANDEDID = gql`
    query getusersRecommendedItems {
      usersRecommendedItems(username: "${usernameString}") {
        id
        name
        img
        department
        category
        weight
        packagedWeight
        price
      }
    }
  `;
  const [isLoading, setIsLoading] = useState(true);
  const [recommandedProduct, setRecommandedProduct] = useState(null);
  const [mainProduct, setMainProduct] = useState(product);
  const path = `/packages/client/src/public/images/`;
  const { loading, error, data } = useQuery(GET_RECOMMANDEDID);
  const imgClickHandler = (product) => {
    // console.log('click this img',product);
    setMainProduct(product);
  }
  useEffect(() => {
    // check data been assigned
    if(data) {
      const {usersRecommendedItems} = data;
      cacheLoading(usersRecommendedItems);
      console.log("DATA!!",usersRecommendedItems);
      if(usersRecommendedItems.length > 0) {
        setRecommandedProduct(usersRecommendedItems);
      }
    }

    // const {
    //   getRecommendedItemsForUser,
    //   getItemsById,
    // } = require("../../microservice/src/database/index");
    // async function getRecommendedItemsForUserCall() {
    //   const recommandedItems = await getRecommendedItemsForUser(username);
    //   //console.log(recommandedItems);
    //   if (recommandedItems.length > 0) {
    //     const productArray = await getItemsById(recommandedItems);
    //     setRecommandedProduct(productArray);
    //   }
    // }

    // getRecommendedItemsForUserCall();
  }, [product, data, mainProduct]);
  const cacheLoading = async(srcArray) => {
    const promises = await srcArray.map((src) => {
      return new Promise( function(resolve, reject) {
        const img = new Image();
        img.src = `${path}${src.img}`;
        img.onload = resolve();
        img.onerror = reject();
      })
    })

    await Promise.all(promises);
    setIsLoading(false);
  }
  return (
    <>
      {isLoading ? 
        <div>
          <h1 className="text-center">Fetching Data....</h1>
          <BeatLoader color={"#fffff"} loading={isLoading} css={override} size={50} />
        </div>
      :
      <div>
      <div className="ml-4 mb-4">
        <h1 className="text-2xl font-bold">{mainProduct?.name}</h1>
        <div className="container flex mx-auto max-w-screen-md items-center">
          <div className="">
            <img
              src={`${path}${mainProduct.img}`}
              alt=""
              className=" w-2/4 h-2/4"
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
            <p className="my-2 text-xs">{mainProduct.department}</p>
          </div>
          <div className="mt-2 ml-2">
            <p className="font-bold"> Category </p>
            <p className="my-2 text-xs">{mainProduct.category}</p>
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
                onClick={()=>imgClickHandler(product)}
              />
              <p className="text-xs my-4">{product?.name}</p>
              <p className="text-xs mb-1 font-bold">{`$${product?.price}`}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      </div>
      }
    </>
  );
}
