'use client';
// components/NewsletterSidebar.js
import styles from './RysaRightBlog.module.css';
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});
export default function RysaRightBlog() {
  // const popularPosts = [
  //   {
  //     title: "Best Investment Options For Beginners",
  //     date: "Jun 5, 2024"
  //   },
  //   {
  //     title: "How to Start a Side Business",
  //     date: "Jun 4, 2024"
  //   },
  //   {
  //     title: "Building an Emergency Fund",
  //     date: "Jun 3, 2024"
  //   }
  // ];
  const popularPosts = [
    { id: 1, title: "Best Investment Options For Beginners", date: "Jun 5, 2024" },
    { id: 2, title: "How to Start a Side Business", date: "Jun 4, 2024" },
    { id: 3, title: "Building an Emergency Fund", date: "Jun 3, 2024" }
  ];
  const tags = [
    "Business Tips", "Online Business",
    "Business Plan", "Investment",
    "Education", "Business",
    "Technology"
  ];

  return (
    <div className={`${styles.sidebar} ${outfit.className}`}>
      {/* Newsletter Subscription */}
      <div className={styles.rightnewsletter}>
        <h3 className={styles.rightPosstsectionTitle}>Subscribe to Our Newsletter</h3>
        <p className={styles.rightdescription}>
          Get the latest loans &amp; finance tips in your inbox.
        </p>
        <div className={styles.rightinputGroup}>
          <input
            type="email"
            placeholder="Enter Your Email"
            className={styles.rightemailInput}
          />
          <button className={styles.rightsubscribeBtn}>Subscribe</button>
        </div>
      </div>

      {/* Popular Posts */}
      <div className={styles.rigtPostsection}>
        <h3 className={styles.rightPosstsectionTitle}>Popular Posts</h3>

        <div className={styles.rightpostsList}>
          {/* {popularPosts.map((post, index) => (
            <div className={styles.mainRightPostItem}>
              <div className={styles.imageDiv}></div>
              <div key={index} className={styles.rightpostItem}>
                <h4 className={styles.rightpostTitle}>{post.title}</h4>
                <span className={styles.rightpostDate}>{post.date}</span>
              </div>
            </div>
          ))} */}
          {popularPosts.map((post) => (
            <div key={post.id} className={styles.mainRightPostItem}>
              <div className={styles.imageDiv}></div>
              <div className={styles.rightpostItem}>
                <h4 className={styles.rightpostTitle}>{post.title}</h4>
                <span className={styles.rightpostDate}>{post.date}</span>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* Popular Tags */}
      <div className={styles.rigtPostsection}>
        <h3 className={styles.rightPosstsectionTitle}>Popular Tags</h3>
        <div className={styles.righttagsContainer}>
          {tags.map((tag, index) => (
            <span key={index} className={styles.righttag}>{tag}</span>
          ))}
        </div>
      </div>

      {/* Loan Offer */}
      <div className={styles.rightloanOffer}>
        <h3 className={styles.rightloanTitle}>Need a loan?</h3>
        <p className={styles.rightloanDescription}>
          Check your eligibility in 2 minutes. No impact on credit score
        </p>
        <button className={styles.righteligibilityBtn}>Check Eligibility</button>
      </div>
    </div>
  );
}
