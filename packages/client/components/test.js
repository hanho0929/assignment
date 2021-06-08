import React,{ useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Product from './product';
import queryString from 'query-string'

import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'

export default function Test(props) {
    const { name, id } = useParams();
    
    // get the query 
    const value= queryString.parse(props.location.search);
    const username= value.username;

    const [products, setProducts] = useState([]);
    useEffect( () => {
        const {getItemsById} = require('../../microservice/src/database/index');
        async function getItemsByIdCall() { 
            const productArray = await getItemsById([id]);
            setProducts(productArray);
        }
        getItemsByIdCall();
    },[name,id])
    return (
        <>
            {products && products.map((product)=> (
                <div key={product.id}>
                        <Product product={product} username={username}/>
                </div>
            ))}

        </>
    )
}