import React from 'react';
import BlogCart from "./BlogCart";
import 'swiper/css';

const loop = [1,2,3,4,5,6,7,8,9]

function BlogList() {
    return (
          <>
                  {loop.map((item,index) =>
                      <BlogCart key={index}/>
                  )}
          </>
    );
}

export default BlogList;