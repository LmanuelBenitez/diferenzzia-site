import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { Bio } from '@/components/Bio'
import { TopTracks } from '@/components/TopTracks'
import { Shows } from '@/components/Shows'
import { Booking } from '@/components/Booking'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <Navbar />
      <main>
        <Hero />
          <hr className="border-t border-neutral-800" />
        <Bio />
          <hr className="border-t border-neutral-800" />
        <TopTracks />
          <hr className="border-t border-neutral-800" />
        <Shows />
          <hr className="border-t border-neutral-800" />
        <Booking />
          <hr className="border-t border-neutral-800" />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
