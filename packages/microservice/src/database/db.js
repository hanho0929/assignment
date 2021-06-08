'use strict';
/*
This file (db.js) represents an in-memory db in the form of a javascript object.

DO NOT MODIFY this file
*/

module.exports = {
    itemsById: {
        '1': {
            id: '1',
            name: 'Honeycrisp Apple',
            img: 'honeycrisp_apple.jpg',
            department: 'grocery',
            category: 'fresh produce',
            weight: '1g',
            price: 1.01,
        },
        '2': {
            id: '2',
            name: 'Anjou Pear',
            img: 'anjou_pear.jpg',
            department: 'grocery',
            category: 'fresh produce',
            weight: '2g',
            price: 2.02,
        },
        '3': {
            id: '3',
            name: 'Mens Bucket Hat',
            img: 'mens_bucket_hat.jpg',
            department: 'apparel',
            category: 'mens',
            weight: '3lbs',
            price: 50.05,
        },
        '4': {
            id: '4',
            name: 'Samsung TV',
            img: 'samsung_tv.jpg',
            department: 'electronics',
            category: 'tv and video',
            weight: '50lbs',
            price: 100.01,
        },
        '5': {
            id: '5',
            name: 'Puffy Chair',
            img: 'puffy_chair.jpg',
            department: 'home and furniture',
            category: 'furniture',
            weight: null,
            packagedWeight: '20lbs',
            price: 90.00,
        },
        '6': {
            id: '6',
            name: 'Sharp TV',
            img: 'sharp_tv.jpg',
            department: 'electronics',
            category: 'tv and video',
            weight: null,
            packagedWeight: '100lbs',
            price: 80.00,
        },
        '7': {
            id: '7',
            name: 'Apple Tv',
            img: 'apple_tv.jpg',
            department: 'electronics',
            category: 'tv and video',
            weight: '10lbs',
            price: 150.05,
        },
    },
    usersRecommendedItemsByUsername: {
        james: ['1', '2', '3', '4', '5', '6', '7'],
        monica: ['4', '2', '5'],
    }
};
