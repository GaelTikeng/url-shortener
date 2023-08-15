import React from "react";


import './showUrl.css';

export default function ShowUrl () {

  const getData = JSON.parse(localStorage.getItem("url-object"))
  console.log(getData)

  return (
    <div className="show-url">
      {JSON.stringify(getData)}
    </div>
  )
}