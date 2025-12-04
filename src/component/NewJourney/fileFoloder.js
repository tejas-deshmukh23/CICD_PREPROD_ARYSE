import React from "react";
import styles from "./fileFolder.module.css";
import { Clock, Tag } from "lucide-react"; // icons from lucide-react

export default function LoanCard() {
  return (
    <div >
      <svg>
  <rect width="200" height="100" fill="#29bc91" rx="25" ry="10" x="100" y="50"/>
</svg>
<svg width="500" height="500" xmlns="http://www.w3.org/2000/svg">
  
  <rect x="10" y="10" width="100" height="50" fill="blue" />

  
  <circle cx="200" cy="75" r="40" fill="red" />

  
  <ellipse cx="350" cy="75" rx="50" ry="30" fill="green" />

  
  <line x1="10" y1="150" x2="100" y2="200" stroke="black" stroke-width="2" />

  
  <polyline points="150,150 200,180 250,150 300,180" fill="none" stroke="purple" stroke-width="2" />

  
  <polygon points="10,220,260,280 610,820" fill="orange" />

  
  <path d="M 150,220 L 200,250 L 250,220 L 300,250" fill="none" stroke="gray" stroke-width="2" />
</svg>

<svg className={styles.cardBg} viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0 20 
             Q0 0 20 0 
             H210 
             Q230 0 140 30 
             L280 60 
             V180 
             Q280 200 260 200 
             H20 
             Q0 200 0 180 
             Z"
          fill="white"
          stroke="rgba(0,0,0,05)"
          strokeWidth="1"
        />
      </svg>
       <svg width="482" height="900" viewBox="0 0 200 300" >
          <path 
            d="M 20 20 
               Q 20 10, 30 10
               L 100 10
               L 120 25
               L 180 25
               Q 190 25, 190 35
               L 190 280
               Q 190 290, 180 290
               L 30 290
               Q 20 290, 20 280
               Z"
            fill="white"
            stroke="black"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          
        </svg>
    </div>
  );
}
