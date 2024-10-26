import React from "react";
import { readFile } from "../../../Helper/UploadImage";
import { useState } from "react";

export default function AddBlogs() {
  const [image, setImage] = useState("");

  const handleImageUpload = (e) => {
    let files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      (function (file) {
        var reader = new FileReader();
        reader.onload = () => {
          console.log(reader.result);
          setImage(reader.result);
        };
        reader.readAsDataURL(file);
      })(files[i]);
    }
  };
  return (
    <div className="bg-slate-700 text-white p-[30px] m-auto rounded-lg shadow-lg w-[50%] mt-[50px] mb-[50px] text-center">
      <h1 className="text-[35px] font-semibold">Add Blog</h1>
      <input
        type="text"
        placeholder="Title: "
        className="w-[100%] h-[40px] rounded-md p-[10px]"
      />
      <br />
      <br />
      <textarea
        placeholder="Content.."
        rows={6}
        cols={60}
        className="w-[100%] rounded-md p-[10px]"
      ></textarea>
      <br />
      <br />
      <input type="file" name="file" onChange={(e) => handleImageUpload(e)} />
      <br />
      <br />
      <img
        src={image}
        alt="blog"
        width={300}
        className="border-stone-300 rounded-md shadow-lg"
      />
      <br />
      <br />
      <button className="bg-slate-200 text-slate-800 rounded-lg w-[150px] h=[35px]">
        Add Blog
      </button>
    </div>
  );
}
