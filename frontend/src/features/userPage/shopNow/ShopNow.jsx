import React from "react";
import StoreCard from "../../../components/StoreCard";

const ShopNow = () => {
  const stores = [
    {
      id: 1,
      name: "ABC Store",
      location: "Kathmandu",
      featuredItems: [
        { name: "Pen", price: 10 },
        { name: "iPhone 13", price: 100000 },
        { name: "Notebook", price: 50 },
      ],
    },
    {
      id: 2,
      name: "XYZ Mart",
      location: "Pokhara",
      featuredItems: [
        { name: "Copy", price: 40 },
        { name: "Bag", price: 1500 },
        { name: "Shoes", price: 3000 },
      ],
    },
    {
      id: 1,
      name: "ABC Store",
      location: "Kathmandu",
      featuredItems: [
        { name: "Pen", price: 10 },
        { name: "iPhone 13", price: 100000 },
        { name: "Notebook", price: 50 },
      ],
    },
    {
      id: 2,
      name: "XYZ Mart",
      location: "Pokhara",
      featuredItems: [
        { name: "Copy", price: 40 },
        { name: "Bag", price: 1500 },
        { name: "Shoes", price: 3000 },
      ],
    },
    {
      id: 1,
      name: "ABC Store",
      location: "Kathmandu",
      featuredItems: [
        { name: "Pen", price: 10 },
        { name: "iPhone 13", price: 100000 },
        { name: "Notebook", price: 50 },
      ],
    },
    {
      id: 2,
      name: "XYZ Mart",
      location: "Pokhara",
      featuredItems: [
        { name: "Copy", price: 40 },
        { name: "Bag", price: 1500 },
        { name: "Shoes", price: 3000 },
      ],
    },
    {
      id: 1,
      name: "ABC Store",
      location: "Kathmandu",
      featuredItems: [
        { name: "Pen", price: 10 },
        { name: "iPhone 13", price: 100000 },
        { name: "Notebook", price: 50 },
      ],
    },
    {
      id: 2,
      name: "XYZ Mart",
      location: "Pokhara",
      featuredItems: [
        { name: "Copy", price: 40 },
        { name: "Bag", price: 1500 },
        { name: "Shoes", price: 3000 },
      ],
    },
    {
      id: 1,
      name: "ABC Store",
      location: "Kathmandu",
      featuredItems: [
        { name: "Pen", price: 10 },
        { name: "iPhone 13", price: 100000 },
        { name: "Notebook", price: 50 },
      ],
    },
    {
      id: 2,
      name: "XYZ Mart",
      location: "Pokhara",
      featuredItems: [
        { name: "Copy", price: 40 },
        { name: "Bag", price: 1500 },
        { name: "Shoes", price: 3000 },
      ],
    },
    {
      id: 1,
      name: "ABC Store",
      location: "Kathmandu",
      featuredItems: [
        { name: "Pen", price: 10 },
        { name: "iPhone 13", price: 100000 },
        { name: "Notebook", price: 50 },
      ],
    },
    {
      id: 2,
      name: "XYZ Mart",
      location: "Pokhara",
      featuredItems: [
        { name: "Copy", price: 40 },
        { name: "Bag", price: 1500 },
        { name: "Shoes", price: 3000 },
      ],
    },
  ];
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 mb-10">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {stores.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ShopNow;
