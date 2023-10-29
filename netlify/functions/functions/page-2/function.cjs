"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const GET = async () => {
  const request = await fetch("https://dummyjson.com/carts?limit=10");
  const data = await request.json();
  return data;
};
exports.GET = GET;
