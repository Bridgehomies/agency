"use client"

import Hero from '@/components/product/Hero'
import FeaturedProduct from '@/components/product/FeaturedProduct'
import Features from '@/components/product/Features'
import CTA from '@/components/product/CTA'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'

export default function ProductsClient() {
  return (
    <main className="products-page min-h-screen">
      <Navbar />
      <Hero />
      <FeaturedProduct />
      <Features />
      <CTA />
      <Footer />
    </main>
  )
}
