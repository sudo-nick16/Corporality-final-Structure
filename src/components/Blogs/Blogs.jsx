import React, { useEffect, useState } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap/dist/js/bootstrap.min.js'
import "./Blogs.css"
import BlogCard from "./components/BlogCard";
import Pagination from "./components/Pagination";
import axios from "axios";
import BlogTop from '../Blog/components/BlogTop';
import { useParams } from "react-router-dom";


function Blogs() {
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showArticles, setShowArticles] = useState([articles])
    const [totalArticles, setTotalArticles] = useState(1);

    const params = useParams();
    console.log("blog");
    useEffect( async () => {
        Aos.init();
        setCurrentPage(1);
        if(params.search_string){
            console.log("searching")
            const res = await axios.get(`/articles/search/${params.search_string}/1`);
            setArticles(res.data);
            setShowArticles(res.data.splice(0, res.data.length-1));
            setTotalArticles(Math.ceil(res.data[0].count));
        }else{
            const res = await axios.get("/articles/page/1");
            setArticles(res.data);
            setShowArticles(res.data.splice(0, res.data.length-1));
            setTotalArticles(Math.ceil(res.data[0].count));
        }
    }, [params]);
    
    const paginate = async (pageNumber) => {
        setCurrentPage(pageNumber);
        let res;
        if(params.search_string){
            res = await axios.get(`/articles/search/${params.search_string}/${pageNumber}`); //ad
        }else{
            res = await axios.get(`/articles/page/${pageNumber}`);

        }
        setArticles(res.data.slice(0, res.data.length-1));
        setShowArticles(res.data.slice(0, res.data.length-1));
    }

    return (
        <>
            <BlogTop blogState={ {articles, showArticles, setShowArticles} } />
            <div className="container mx-auto blogs-container-4 my-2 mb-5">
                <div className="row justify-content-between">
                    <div className="dividerLine px-0"></div>
                    {showArticles.map((article) => (
                        <div className="col-lg-5 col-10 mx-lg-0 mx-auto" data-aos="fade-up" key={article.slug}>
                            <BlogCard thumbnail={article.photo}
                                heading={article.title}
                                description={article.description}
                                date={article.date}
                                slug={article.slug}
                                likes={article.likes} />
                        </div>
                    ))}
                </div>
                <Pagination
                    totalArticles={totalArticles}
                    paginate={paginate}
                    currentPage={currentPage} 
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </>
    );
}

export default Blogs;