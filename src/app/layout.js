// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import { UIDProvider } from "@/component/Rysa/context/UIDProvider";
// import { OnSearchProvider } from "@/component/Rysa/ONDC/context/OnSearchProvider";
// import { SelectedLenderProvider } from "@/component/Rysa/ONDC/context/SelectedLenderProvider";
// import { OnStatusProvider } from "@/component/Rysa/ONDC/context/OnStatusProvider";
// import { FinalLoanOfferProvider } from "@/component/Rysa/ONDC/context/FinalLoanOfferProvider";
// import {SelectedLoanProvider} from "@/component/Rysa/RysaContexts/SelectedLoanProvider";
// import Script from "next/script";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata = {
//   title: "AryseFin",
// };
// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <head>
//         {/* <title>Rysa</title> */}
//         <link rel="icon" href="/Aryse_Fin.png" />
//       </head>
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//          {/* Google Tag Manager */}
//          <Script
//           src="https://www.googletagmanager.com/gtag/js?id=G-GT09YWSLG0"
//           strategy="afterInteractive"
//         />
//         <Script id="gtag-init" strategy="afterInteractive">
//           {`
//             window.dataLayer = window.dataLayer || [];
//             function gtag(){dataLayer.push(arguments);}
//             gtag('js', new Date());
//             gtag('config', 'G-GT09YWSLG0');
//           `}
//         </Script>
//         {/* End Google Tag Manager */}
//         <UIDProvider>
//           <OnSearchProvider>
//             <SelectedLenderProvider>
//               <OnStatusProvider>
//                 <FinalLoanOfferProvider>
//                   <SelectedLoanProvider>
//                   {children}
//                   </SelectedLoanProvider>
//                 </FinalLoanOfferProvider>
//               </OnStatusProvider>
//             </SelectedLenderProvider>
//           </OnSearchProvider>
//         </UIDProvider>
//       </body>
//     </html>
//   );
// }

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UIDProvider } from "@/component/Rysa/context/UIDProvider";
import { OnSearchProvider } from "@/component/Rysa/ONDC/context/OnSearchProvider";
import { SelectedLenderProvider } from "@/component/Rysa/ONDC/context/SelectedLenderProvider";
import { OnStatusProvider } from "@/component/Rysa/ONDC/context/OnStatusProvider";
import { FinalLoanOfferProvider } from "@/component/Rysa/ONDC/context/FinalLoanOfferProvider";
import { SelectedLoanProvider } from "@/component/Rysa/RysaContexts/SelectedLoanProvider";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AryseFin",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="Rysa_favicon3.png" />
        <link rel="icon" sizes="80x80" href="Rysa_favicon3.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="Rysa_favicon3.png" />
        {/* ✅ Google Tag Manager (head) */}
        <Script id="gtm-head" strategy="beforeInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WT8X7H7Q');
          `}
        </Script>
        {/* ✅ End Google Tag Manager */}
        {/* my meta tag */}
        <meta
          name="description"
          content="Learn about our services and team."
        />
        <meta property="og:title" content="About My Website" />
        <meta property="og:image" content="/images/og-banner.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* ✅ Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WT8X7H7Q"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* ✅ End Google Tag Manager (noscript) */}

        {/* ✅ Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GT09YWSLG0"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GT09YWSLG0');
          `}
        </Script>
        {/* ✅ End Google Analytics */}

        <UIDProvider>
          <OnSearchProvider>
            <SelectedLenderProvider>
              <OnStatusProvider>
                <FinalLoanOfferProvider>
                  <SelectedLoanProvider>{children}</SelectedLoanProvider>
                </FinalLoanOfferProvider>
              </OnStatusProvider>
            </SelectedLenderProvider>
          </OnSearchProvider>
        </UIDProvider>
      </body>
    </html>
  );
}
