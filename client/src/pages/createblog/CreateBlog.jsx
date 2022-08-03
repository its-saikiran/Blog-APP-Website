import React, { useState, useContext } from "react"
import BlogContext from "../../BlogsCrud/BlogContext";

const CreateBlog = () => {

  const [blogData, setBlogData] = useState();
  const { createBlogFun, createBlogMsg } = useContext(BlogContext);

  const sendCreateBlogFun = (e) => {
    e.preventDefault();
    // console.log(blogData)
    createBlogFun(blogData)
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "80vh", marginTop: '6rem' }}>


      <div className="d-flex  justify-content-center align-items-center  mx-3 mt-3" style={{ width: "100%" }}>
        <div class="card px-3" style={{ width: "70rem", backgroundColor: 'whitesmoke' }}>

          <div class="card-body d-flex align-items-start flex-column" >


            {createBlogMsg &&
              <div className="d-flex flex-column justify-content-center align-items-center" style={{ color: "red", width: "100%" }}>
                {createBlogMsg}
              </div>
            }


            <h5>Title: </h5>
            <div class="input-group d-flex align-items-center mb-2">
              <input
                type="text"
                name="title"
                className="form-control mx-2 rounded-2"
                placeholder="Enter title"
                aria-label="title"
                aria-describedby="basic-addon1"
                required
                onChange={e => setBlogData((prev) => ({ ...prev, title: e.target.value }))}
              />
            </div>

            <h5>Short Note:</h5>
            <div class="input-group d-flex align-items-center mb-2">
              <textarea
                type='text'
                name="shortNote"
                className="form-control mx-2 rounded-2"
                placeholder="write short note here..."
                aria-label="short note"
                aria-describedby="basic-addon2"
                minLength={200}
                maxLength={240}
                rows={2}
                required
                onChange={e => setBlogData((prev) => ({ ...prev, shortNote: e.target.value }))}
              />
            </div>

            {/* <div class="input-group d-flex align-items-center mb-2" style={{ padding: '0 25rem' }}>
                <input
                    type='file'
                    placeholder='choose image'
                    accept="image/png, image/jpg, image/jpeg"
                    name="image"
                    onChange={e => setBlogData((prev) => ({ ...prev, image: e.target.value }))}
                />
            </div> */}
            
            <div class="input-group d-flex align-items-center mb-2" >
            <span><h5>Choose URL:</h5></span>
            <input
                type='text'
                placeholder='Paste URL here...'
                className="form-control mx-2 rounded-2"
                name="image"
                onChange={e => setBlogData((prev) => ({ ...prev, image: e.target.value }))}
              />
            </div>

            <h5>Description:</h5>
            <div class="input-group d-flex align-items-center mb-2">
              <textarea
                type='text'
                name="description"
                className="form-control mx-2 rounded-2"
                placeholder="write description here..."
                aria-label="bio"
                aria-describedby="basic-addon2"
                maxLength={1500}
                rows={6}
                onChange={e => setBlogData((prev) => ({ ...prev, description: e.target.value }))}
              />
            </div>

            <button
              type="button"
              className="btn btn-primary my-2"
              style={{ width: "100%" }}
              onClick={sendCreateBlogFun}
            >
              create
            </button>


          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateBlog;