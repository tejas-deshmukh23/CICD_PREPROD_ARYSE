"use client";
import React from "react";
import { useState, useEffect } from 'react';
import styles from "./RysaBlogPage.module.css";
import { FaSearch } from "react-icons/fa";
import FooterSection from "./FooterSection.js";
import Image from "next/image";
import girlImage from "../../../public/girl_with_lapi.png";
import logo from '../../../public/arysefin-dark logo.png';
import RysaRightBlog from "./RysaRightBlog";
import { Outfit } from "next/font/google";
import Link from "next/link";
const outfit = Outfit({
    subsets: ["latin"],
    weight: ["400", "700"],
    display: "swap",
});
export default function RysaBlogPage() {
    // ===================blog car function start================
    const allBlogPosts = [
        {
            id: 1,
            image: "/girl_with_lapi.png", // Replace with your actual image paths
            alt: "Girl with Laptop",
            heroTitle: "Calculate your loan requirements with our comprehensive guide",
            featured: "Featured",
            title: "The Complete Guide to Personal Loans in 2024",
            description: "Everything you need to know about personal loans, interest rates, eligibility criteria, and how to choose the best loan for your needs.",
            author: "Admin",
            date: "January 15, 2024",
            readTime: "5 min read"
        },
        {
            id: 2,
            image: "/girl_with_lapi.png",
            alt: "Business Loan",
            heroTitle: "Start your business with the right financial planning",
            featured: "Popular",
            title: "Business Loans: A Comprehensive Guide for Entrepreneurs",
            description: "Learn about different types of business loans, eligibility requirements, and how to secure funding for your startup or expansion.",
            author: "John Doe",
            date: "January 12, 2024",
            readTime: "7 min read"
        },
        {
            id: 3,
            image: "/girl_with_lapi.png",
            alt: "Home Loan",
            heroTitle: "Make your dream home a reality with our loan options",
            featured: "Trending",
            title: "Home Loans: Everything You Need to Know in 2024",
            description: "Complete guide to home loans, interest rates, documentation, and tips to get the best deal for your dream home.",
            author: "Sarah Wilson",
            date: "January 10, 2024",
            readTime: "6 min read"
        },
        {
            id: 4,
            image: "/girl_with_lapi.png",
            alt: "Car Loan",
            heroTitle: "Drive your dream car with affordable financing",
            featured: "New",
            title: "Car Loans: How to Finance Your Next Vehicle",
            description: "Learn about car loan options, interest rates, and strategies to get the best deal on your next vehicle purchase.",
            author: "Mike Johnson",
            date: "January 8, 2024",
            readTime: "4 min read"
        },
        {
            id: 5,
            image: "/girl_with_lapi.png",
            alt: "Education Loan",
            heroTitle: "Invest in your future with education loans",
            featured: "Important",
            title: "Education Loans: Funding Your Academic Dreams",
            description: "Everything about education loans, eligibility, interest rates, and repayment options for students and parents.",
            author: "Emily Davis",
            date: "January 5, 2024",
            readTime: "8 min read"
        },
        {
            id: 6,
            image: "/girl_with_lapi.png",
            alt: "Gold Loan",
            heroTitle: "Quick cash with gold as collateral",
            featured: "Quick",
            title: "Gold Loans: Fast and Secure Financing Option",
            description: "Learn about gold loans, their benefits, interest rates, and how to get instant cash against your gold jewelry.",
            author: "Robert Brown",
            date: "January 3, 2024",
            readTime: "3 min read"
        },
        {
            id: 7,
            image: "/girl_with_lapi.png",
            alt: "Credit Card",
            heroTitle: "Choose the right credit card for your lifestyle",
            featured: "Essential",
            title: "Credit Cards: A Complete Guide for Smart Spending",
            description: "Understand credit cards, their benefits, fees, and how to use them responsibly to build your credit score.",
            author: "Lisa Anderson",
            date: "December 28, 2023",
            readTime: "5 min read"
        },
        {
            id: 8,
            image: "/girl_with_lapi.png",
            alt: "Investment",
            heroTitle: "Grow your wealth with smart investment strategies",
            featured: "Expert",
            title: "Investment Strategies for Beginners in 2024",
            description: "Learn about different investment options, risk management, and how to start your investment journey safely.",
            author: "David Wilson",
            date: "December 25, 2023",
            readTime: "9 min read"
        },
        {
            id: 9,
            image: "/girl_with_lapi.png",
            alt: "Insurance",
            heroTitle: "Protect your future with comprehensive insurance",
            featured: "Security",
            title: "Insurance Guide: Protecting What Matters Most",
            description: "Complete guide to different types of insurance, coverage options, and how to choose the right policy for you.",
            author: "Anna Thompson",
            date: "December 22, 2023",
            readTime: "6 min read"
        }
    ];

    const [visiblePosts, setVisiblePosts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const postsPerLoad = 3;

    // Initialize with first 3 posts
    useEffect(() => {
        setVisiblePosts(allBlogPosts.slice(0, postsPerLoad));
        setCurrentIndex(postsPerLoad);
    }, []);

    // Load more posts function
    const handleLoadMore = () => {
        setIsLoading(true);

        // Simulate API call delay
        setTimeout(() => {
            const nextPosts = allBlogPosts.slice(currentIndex, currentIndex + postsPerLoad);
            setVisiblePosts(prevPosts => [...prevPosts, ...nextPosts]);
            setCurrentIndex(prevIndex => prevIndex + postsPerLoad);
            setIsLoading(false);
        }, 500);
    };

    // Check if there are more posts to load
    const hasMorePosts = currentIndex < allBlogPosts.length;
    // ===================blog card funtion end================
    return (
        <>
            <div className={styles.blogContainer}>
                {/* Header Section */}
                <header className={styles.header}>
                    <nav className={styles.navbar}>
                        <div className={styles.navContainer}>
                            {/* Logo */}
                            <div className={styles.logoNav}>
                                <Link href='/'><Image
                                    src={logo}
                                    alt="Logo"
                                    width={80}
                                    height={65}
                                /></Link>
                            </div>

                            {/* हंबरगर बटन */}
                            {/* <div className={styles.navRightHumberger}>
                <button onClick={toggleMenu} className={styles.hamburgerBtn}>
                  {isOpen ? <FaTimes /> : <FaBars />}
                </button>
              </div>

              {isOpen && (
                <div className={styles.humberView}>
                  <a href="#" className={styles.navLinkHumberger}>
                    Home
                  </a>
                  <a href="#" className={styles.navLinkHumberger}>
                    Loans
                  </a>
                  <a href="#" className={styles.navLinkHumberger}>
                    About
                  </a>
                </div>
              )} */}

                            {/* Navigation Links */}
                            {/* <div className={styles.navRight}>
                <div className={styles.navLinks}>
                  <div className={styles.navAncor}>
                    <a href="#" className={styles.navLink}>
                      Home
                    </a>
                  </div>
                  <div className={styles.navAncor}>
                    <a href="#" className={styles.navLink}>
                      Loans
                    </a>
                  </div>
                  <div className={styles.navAncor}>
                    <a href="#" className={styles.navLink}>
                      About
                    </a>
                  </div>
                </div>
                <button className={styles.loginBtn}>Login</button>
              </div> */}
                            {/* Login Button */}
                        </div>
                    </nav>
                </header>

                {/* Hero Section */}
                <section className={styles.hero}>
                    <div className={styles.heroImage} style={{ position: "relative", width: "600px", height: "400px", botto: "0" }}>
                        <Image
                            src="/couple.png"
                            alt="Hero Image"
                            fill
                            priority
                            className={styles.bg}
                        // width={70}
                        // height={80}
                        // style={{width:'200px', height:'100px'}}
                        // style={{
                        //     width: '100%',           // Change this (50%, 80%, 120%, etc.)
                        //     height: '100%',          // Change this (80%, 150%, etc.)
                        //     top: '0%',               // Move up/down (-20%, 10%, etc.)
                        //     left: '0%',              // Move left/right (-10%, 20%, etc.)
                        //     objectFit: 'cover',      // or 'contain', 'fill', 'scale-down'
                        //     objectPosition: 'center' // or 'top', 'bottom', 'left', 'right'
                        // }}
                        />
                    </div> {/*/*/}
                    <div className={styles.overlay1}></div>
                    <div className={styles.heroContent1}>
                        <h1>Our Blogs</h1>
                        <p>Insights, Tips &amp; Success Stories</p>
                    </div>
                </section>
                <div className={styles.divMainDivider}>
                    <div className={styles.leftSideDiv}>{/* leftSideDiv start */}
                        <div className={styles.centerCss}>
                            {/* Search Bar */}
                            <div className={styles.searchDiv}>
                                <p className={styles.searchPtag}>Explore expert articles on personal loans, finance management, investments,
                                    and success stories. Get practical tips to make smarter financial decisions in 2025 and beyond.</p>
                                <div className={styles.searchBox}>
                                    <FaSearch className={styles.searchIcon} />
                                    <input type="text" placeholder="Search Blogs....." />
                                </div>
                            </div>
                            {/* Filter Buttons */}
                            <div className={styles.filterButtons}>
                                <button className={styles.active}>All</button>
                                <button className={styles.unactive}>Career</button>
                                <button className={styles.unactive}>Finance</button>
                                <button className={styles.unactive}>Technology</button>
                                <button className={styles.unactive}>Education</button>
                                <button className={styles.unactive}>Success stories</button>
                            </div>
                            {/* blog card code start */}
                            <div className={styles.blogSection}>
                                {visiblePosts.map((post) => (
                                    <div key={post.id} className={styles.blogCard}>
                                        <div className={styles.bloagContainer}>
                                            <div className={styles.left}>
                                                <Image
                                                    src={post.image}
                                                    alt={post.alt}
                                                    className={styles.blogImage}
                                                    width={700}
                                                    height={650}
                                                />
                                            </div>
                                            <div className={styles.right}>
                                                <h2 className={styles.blogText}>
                                                    {post.heroTitle}
                                                </h2>
                                            </div>
                                        </div>

                                        <div className={styles.blogContent}>
                                            <span className={styles.featured}>{post.featured}</span>
                                            <h2>{post.title}</h2>
                                            <p>{post.description}</p>
                                            <div className={styles.blogMeta}>
                                                <span>By {post.author}</span>
                                                <span>• {post.date}</span>
                                                <span>• {post.readTime}</span>
                                            </div>
                                            <button className={styles.readMore}>Read More..</button>
                                        </div>
                                    </div>
                                ))}

                                {hasMorePosts && (
                                    <div className={styles.loadbtn1Div}>
                                        <button
                                            className={styles.loadBtn1}
                                            onClick={handleLoadMore}
                                            disabled={isLoading}
                                        >
                                            {isLoading ? 'Loading...' : 'Load More Post......'}
                                        </button>
                                    </div>
                                )}
                            </div>
                            {/* blog card code end */}
                            {/* Blog Card 1*/}

                            {/* <div className={styles.blogCard}>

                            <div className={styles.bloagContainer}>
                                <div className={styles.left}>
                                    <Image
                                        src={girlImage}
                                        alt="Girl with Laptop"
                                        className={styles.blogImage}
                                    />
                                </div>
                                <div className={styles.right}>
                                    <h2 className={styles.blogText}>
                                        Calculate your loan requirements <br /> with our comprehensive guide
                                    </h2>
                                </div>
                            </div>

                            <div className={styles.blogContent}>
                                <span className={styles.featured}>Featured</span>
                                <h2>The Complete Guide to Personal Loans in 2024</h2>
                                <p>
                                    Everything you need to know about personal loans, interest rates,
                                    eligibility criteria, and how to choose the best loan for your needs.
                                </p>
                                <div className={styles.blogMeta}>
                                    <span>By Admin</span>
                                    <span>• January 15, 2024</span>
                                    <span>• 5 min read</span>
                                </div>
                                <button className={styles.readMore}>Read More..</button>
                            </div>
                        </div> */}
                            {/* Blog Card2 */}
                            {/* <div className={styles.blogCard}>

                            <div className={styles.bloagContainer}>
                                <div className={styles.left}>
                                    <Image
                                        src={girlImage}
                                        alt="Girl with Laptop"
                                        className={styles.blogImage}
                                    />
                                </div>
                                <div className={styles.right}>
                                    <h2 className={styles.blogText}>
                                        Calculate your loan requirements <br /> with our comprehensive guide
                                    </h2>
                                </div>
                            </div>

                            <div className={styles.blogContent}>
                                <span className={styles.featured}>Featured</span>
                                <h2>The Complete Guide to Personal Loans in 2024</h2>
                                <p>
                                    Everything you need to know about personal loans, interest rates,
                                    eligibility criteria, and how to choose the best loan for your needs.
                                </p>
                                <div className={styles.blogMeta}>
                                    <span>By Admin</span>
                                    <span>• January 15, 2024</span>
                                    <span>• 5 min read</span>
                                </div>
                                <button className={styles.readMore}>Read More..</button>
                            </div>
                        </div> */}
                            {/* Blog Card 3 */}
                            {/* <div className={styles.blogCard}>

                            <div className={styles.bloagContainer}>
                                <div className={styles.left}>
                                    <Image
                                        src={girlImage}
                                        alt="Girl with Laptop"
                                        className={styles.blogImage}
                                    />
                                </div>
                                <div className={styles.right}>
                                    <h2 className={styles.blogText}>
                                        Calculate your loan requirements <br /> with our comprehensive guide
                                    </h2>
                                </div>
                            </div>

                            <div className={styles.blogContent}>
                                <span className={styles.featured}>Featured</span>
                                <h2>The Complete Guide to Personal Loans in 2024</h2>
                                <p>
                                    Everything you need to know about personal loans, interest rates,
                                    eligibility criteria, and how to choose the best loan for your needs.
                                </p>
                                <div className={styles.blogMeta}>
                                    <span>By Admin</span>
                                    <span>• January 15, 2024</span>
                                    <span>• 5 min read</span>
                                </div>
                                <button className={styles.readMore}>Read More..</button>
                            </div>
                        </div> */}
                            {/* Blog Card 4 */}
                            {/* <div className={styles.blogCard}>

                            <div className={styles.bloagContainer}>
                                <div className={styles.left}>
                                    <Image
                                        src={girlImage}
                                        alt="Girl with Laptop"
                                        className={styles.blogImage}
                                    />
                                </div>
                                <div className={styles.right}>
                                    <h2 className={styles.blogText}>
                                        Calculate your loan requirements <br /> with our comprehensive guide
                                    </h2>
                                </div>
                            </div>

                            <div className={styles.blogContent}>
                                <span className={styles.featured}>Featured</span>
                                <h2>The Complete Guide to Personal Loans in 2024</h2>
                                <p>
                                    Everything you need to know about personal loans, interest rates,
                                    eligibility criteria, and how to choose the best loan for your needs.
                                </p>
                                <div className={styles.blogMeta}>
                                    <span>By Admin</span>
                                    <span>• January 15, 2024</span>
                                    <span>• 5 min read</span>
                                </div>
                                <button className={styles.readMore}>Read More..</button>
                            </div>
                        </div> */}
                            {/* Blog Card 5*/}
                            {/* <div className={styles.blogCard}>

                            <div className={styles.bloagContainer}>
                                <div className={styles.left}>
                                    <Image
                                        src={girlImage}
                                        alt="Girl with Laptop"
                                        className={styles.blogImage}
                                    />
                                </div>
                                <div className={styles.right}>
                                    <h2 className={styles.blogText}>
                                        Calculate your loan requirements <br /> with our comprehensive guide
                                    </h2>
                                </div>
                            </div>

                            <div className={styles.blogContent}>
                                <span className={styles.featured}>Featured</span>
                                <h2>The Complete Guide to Personal Loans in 2024</h2>
                                <p>
                                    Everything you need to know about personal loans, interest rates,
                                    eligibility criteria, and how to choose the best loan for your needs.
                                </p>
                                <div className={styles.blogMeta}>
                                    <span>By Admin</span>
                                    <span>• January 15, 2024</span>
                                    <span>• 5 min read</span>
                                </div>
                                <button className={styles.readMore}>Read More..</button>
                            </div>
                        </div> */}
                            {/* <div className={styles.loadbtn1Div}>
                            <button className={styles.loadBtn1}>Load More Post......</button>
                        </div> */}
                        </div>
                    </div>
                    {/*leftSideDiv end*/}
                    <div className={styles.rightSideDiv}>
                        {/* rightSideDiv start */}
                        <RysaRightBlog />
                    </div> {/* rightSideDiv end */}
                </div>{/* divMainDivider end */}
            </div>
            <FooterSection />
        </>
    );
}
