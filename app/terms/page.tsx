'use client';

import { useEffect } from 'react';
import Head from 'next/head';

export default function TermsPage() {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute('id');
        if (entry.isIntersecting && id) {
          const link = document.querySelector(`.tab-container a[href="#${id}"]`);
          if (link) {
            document.querySelectorAll('.tab-container a').forEach((a) => {
              a.classList.remove('text-deepblue', 'border-electric');
              a.classList.add('text-gray-500');
              (a as HTMLElement).style.borderBottom = '2px solid transparent';
            });
            link.classList.remove('text-gray-500');
            link.classList.add('text-deepblue');
            (link as HTMLElement).style.borderBottom = '2px solid #7c3aed';
          }
        }
      });
    }, observerOptions);

    document.querySelectorAll('div[id]').forEach((section) => observer.observe(section));

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click',  (e) => {
        e.preventDefault();
        const target = document.querySelector((this as HTMLAnchorElement).getAttribute('href')!);
        if (target) {
          window.scrollTo({
            top: target.getBoundingClientRect().top + window.scrollY - 100,
            behavior: 'smooth',
          });
        }
      });
    });
  }, []);

  return (
    <>
      <Head>
        <title>Quantum Agency | Terms & Conditions</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* Everything inside <body> from your HTML goes here directly */}
      <main className="font-sans bg-[#f0f9ff]" style={{
        backgroundImage: 'radial-gradient(#c4b5fd 0.8px, transparent 0.8px)',
        backgroundSize: '32px 32px',
        scrollBehavior: 'smooth' as 'smooth',
      }}>
        {/* 🔽 Paste the entire content of <body> here directly */}

        {/* Example */}
        <div className="px-6 py-16 md:py-24">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-block mb-4 px-4 py-1 bg-blue-100 text-deepblue rounded-full text-sm font-medium">
              <i className="fas fa-file-contract mr-1"></i> Updated: Sep 25, 2023
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-navy mb-6">
              Terms & <span className="text-electric">Conditions</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The legal framework for our products and services...
            </p>
          </div>
        </div>

        {/* 🔁 Paste rest of the HTML content here just like this */}

        {/* ✅ Accept Button */}
        <div className="fixed bottom-6 right-6 bg-white shadow-xl rounded-full">
          <button className="flex items-center py-3 px-6 rounded-full bg-gradient-to-r from-deepblue to-electric text-white font-medium hover:opacity-90 transition">
            <span>Accept Terms</span>
            <span className="ml-2">
              <i className="fas fa-check-circle"></i>
            </span>
          </button>
        </div>
      </main>

      <style jsx global>{`
        .content-bg {
          background: linear-gradient(to right bottom, #ffffff, #f5f3ff);
        }
        .gradient-border {
          position: relative;
        }
        .gradient-border::before {
          content: '';
          position: absolute;
          top: 5px;
          left: 5px;
          right: 5px;
          bottom: 5px;
          border-radius: 0.5rem;
          background: linear-gradient(to right bottom, #2563eb, #7c3aed);
          z-index: -1;
        }
        .glow {
          box-shadow: 0 0 25px rgba(124, 58, 237, 0.3);
        }
        li::before {
          content: '•';
          color: #7c3aed;
          padding-right: 8px;
          font-weight: bold;
        }
        .tab-container {
          overflow-x: auto;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .tab-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}
