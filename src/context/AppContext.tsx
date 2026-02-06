import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Season, Language, Cart, BookingItem } from '@/types';

interface AppContextType {
  season: Season;
  toggleSeason: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  cart: Cart;
  addToCart: (item: BookingItem) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [season, setSeason] = useState<Season>('winter');
  const [language, setLanguage] = useState<Language>('ru');
  const [cart, setCart] = useState<Cart>({ items: [], total: 0 });
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleSeason = useCallback(() => {
    setSeason(prev => prev === 'summer' ? 'winter' : 'summer');
  }, []);

  const addToCart = useCallback((item: BookingItem) => {
    setCart(prev => {
      const existingItem = prev.items.find(i => i.id === item.id);
      if (existingItem) {
        const updatedItems = prev.items.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
        return {
          items: updatedItems,
          total: updatedItems.reduce((sum, i) => sum + i.price * i.quantity, 0)
        };
      }
      const newItems = [...prev.items, { ...item, quantity: 1 }];
      return {
        items: newItems,
        total: newItems.reduce((sum, i) => sum + i.price * i.quantity, 0)
      };
    });
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((itemId: string) => {
    setCart(prev => {
      const newItems = prev.items.filter(i => i.id !== itemId);
      return {
        items: newItems,
        total: newItems.reduce((sum, i) => sum + i.price * i.quantity, 0)
      };
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart({ items: [], total: 0 });
  }, []);

  return (
    <AppContext.Provider
      value={{
        season,
        toggleSeason,
        language,
        setLanguage,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
