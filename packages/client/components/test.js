import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Product from "./product";
import queryString from "query-string";
import { useHistory } from "react-router-dom";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
export default function Test(props) {
  
  const { name, id } = useParams();
  const GET_ITEMS = gql `
  query getItem{
    item(id: ${+id}){
          id
          name
          img
          department
          category
          weight
          packagedWeight
          price
    }
  }`;
  const { loading, error, data } = useQuery(GET_ITEMS);

  let history = useHistory();
  // get the query
  const value = queryString.parse(props.location.search);
  const username = value.username;

  const [products, setProducts] = useState(null);
  useEffect(() => {
    if (loading) console.log("I am Loading");
    if (error) return <p>An error occured!</p>;
    //console.log(data)
    
    if(data) {
        setProducts(data.item);
        console.log("Setting product", data);
    }
    // console.log(data?.item);
    // const { getItemsById } = require("../../microservice/src/database/index");
    // async function getItemsByIdCall() {
    //   const productArray = await getItemsById([id]);
    //   if (productArray.length > 0) setProducts(productArray);
    //   else {
    //     // no specific item
    //     history.push("/");
    //   }
    // }
    // getItemsByIdCall();
  }, [name, id, data]);
  return (
    // <>
    //   {products &&
    //     products.map((product) => (
    //       <div key={product.id}>
    //         <Product product={product} username={username} />
    //       </div>
    //     ))}
    // </>
    <>
        {products &&
        <div key={products.id}>
            <Product product={products} username={username} />
        </div>
        }
    </>
  );
}
