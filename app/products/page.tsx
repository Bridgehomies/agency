"use client"
import Hero from '@/components/product/Hero'
import FeaturedProduct from '@/components/product/FeaturedProduct'
import UpcomingProducts from '@/components/product/UpcomingProducts'
import Features from '@/components/product/Features'
import Stats from '@/components/product/Stats'
import CTA from '@/components/product/CTA'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Stats />
      <FeaturedProduct />
      <UpcomingProducts />
      <Features />
      <CTA />
      <Footer />
    </main>
  )
}