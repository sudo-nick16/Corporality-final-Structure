import React, { useEffect, useState } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap/dist/js/bootstrap.min.js'
import "./Blogs.css"
import Input from "./components/Input"
import Button from "./components/Button";
import thumbnail from "./img/thumbnail.png";
import rightArrow from "./img/rightArrow.png";
import leftArrow from "./img/leftArrow.png";
import BlogCard from "./components/BlogCard";
import search from "./img/search.svg"
import axios from "axios";
import { useLocation } from "react-router";
import searchIcon from "./img/search-icon.png"
import DropDown from "./components/DropDown";
import blogTopLeft from "./img/blog-top-left.png"


function Blogs() {
    const [state, setState] = useState(false);
    const [articles, setarticles] = useState([
        {
            "id": 1,
            "title": "Dancing Cat article",
            "description": "<p>It&#39;s not only writers who can benefit from this free online tool. If you&#39;re a programmer who&#39;s working on a project where blocks of text are needed, this tool can be a great way to get that. It&#39;s a good way to test your programming and that the tool being created is working well.</p>\n\n<p>Above are a few examples of how the random paragraph generator can be beneficial. The best way to see if this random paragraph picker will be useful for your intended purposes is to give it a try. Generate a number of paragraphs to see if they are beneficial to your current project.</p>\n\n<p>If you do find this paragraph tool useful, please do us a favor and let us know how you&#39;re using it. It&#39;s greatly beneficial for us to know the different ways this tool is being used so we can improve it with updates. This is especially true since there are times when the generators we create get used in completely unanticipated ways from when we initially created them. If you have the time, please send us a quick note on what you&#39;d like to see changed or added to make it better in the future.</p>\n",
            "photo": "data:image/png;base64,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",
            "likes": 0,
            "username": "admin",
            "slug": "dancing-cat-article",
            "date": "2021-12-16T12:00:53.000Z"
        },
        {
            "id": 2,
            "title": "assignment answer",
            "description": "<p>bruh ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfjdkslfjslkfjskdfjs ksldjfk fjksd fkfj lskfj</p>\n",
            "photo": "data:image/png;base64,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",
            "likes": 0,
            "username": "admin",
            "slug": "assignment-answer",
            "date": "2021-12-17T05:49:23.000Z"
        }
    ]);
    const { search } = useLocation();
    useEffect(() => {
        Aos.init();
        const fetcharticles = async () => {
            const res = await axios.get("/articles");
            setarticles(res.data);
            console.log(res.data);
        };
        // fetcharticles();  uncomment if api is available
        // console.log(articles);
    }, [search]);

    // function show() {
    //     state ? setState(false) : setState(true);
    // }

    return (
        <>
            <div className="blogContainer">
            <div className="blogSubscription">
                <h3>Subscribe to Business Insight?</h3>
                <input type="email" placeholder="Email Address" />
                <select name="Select Country" id="contrySelect">
                    <option value="0">Select Country</option>
                    <option value="1">Australia</option>
                    <option value="2">India</option>
                    <option value="3">USA</option>
                    <option value="4">UK</option>
                </select>
                <div className="subscribeButton">Subscribe</div>
            </div>
            <div className="blogMarket">
                <img src={blogTopLeft} alt="" />
                <div>
                    <h3>Do you want me to do your marketing for you?</h3>
                    <div>Yes, I want</div>
                </div>
            </div>
            <div className="blogCustomizer">
                <DropDown className="blogDropDown" initial="Recent Post" list={['Recent Post']} />
                <div className="blogSearchInput">
                    <input type="text" placeholder="Search" />
                    <img src={searchIcon} alt="" />
                </div>
                <DropDown className="blogDropDown" initial="Select Category" list={['Corporate Strategy','Digital Media Marketing', 'Lead Gen and Sales Strategy', 'Marketing Strategy for 2021', 'Product Strategy', 'Professional Practices Strategy', 'Website Blueprint']} />
            </div>
        </div>
            <div className="container mx-auto blogs-container-4">
                <div className="row justify-content-between">
                    <div className="dividerLine px-0"></div>
                    {articles.map((article) => (
                        <div className="col-lg-5 col-10 mx-lg-0 mx-auto" data-aos="fade-up">
                            <BlogCard thumbnail={article.photo}
                                heading={article.title}
                                description={article.description}
                                date={article.date}
                                slug={article.slug}
                                comments={article.likes} />
                            {/* {article.date} */}
                        </div>
                    ))}
                </div>
                <div className="row justify-content-between">
                    <div className="col-lg-4 col-md-6 col-10 mx-auto pagination d-flex flex-row justify-content-evenly align-items-center px-lg-0 px-3">
                        <div href="/" className="leftArrow d-flex flex-row justify-content-evenly align-items-center">
                            <img src={leftArrow} alt="" />
                        </div>
                        <div className="paginationNumber active">1</div>
                        <div className="paginationNumber">2</div>
                        <div className="paginationNumber">3</div>
                        <div className="paginationNumber">4</div>
                        <div className="paginationNumber">5</div>
                        <div className="paginationNumber">6</div>
                        <div className="rightArrow d-flex flex-row justify-content-evenly align-items-center">
                            <img src={rightArrow} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Blogs;