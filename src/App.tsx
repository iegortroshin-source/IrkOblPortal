import { AppProvider } from '@/context/AppContext';
import { Header } from '@/components/navigation/Header';
import { CartDrawer } from '@/components/navigation/CartDrawer';
import { Hero } from '@/components/sections/Hero';
import { Destinations } from '@/components/sections/Destinations';
import { Experiences } from '@/components/sections/Experiences';
import { TripPlanner } from '@/components/sections/TripPlanner';
import { InfoCenter } from '@/components/sections/InfoCenter';
import { Booking } from '@/components/sections/Booking';
import { Footer } from '@/components/sections/Footer';
import './App.css';

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-baikal-deep text-baikal-snow overflow-x-hidden">
        <Header />
        <CartDrawer />
        <main>
          <Hero />
          <Destinations />
          <Experiences />
          <TripPlanner />
          <InfoCenter />
          <Booking />
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
}

export default App;
