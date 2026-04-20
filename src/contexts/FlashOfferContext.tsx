import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface FlashOfferContextValue {
  seconds: number;
}

const FlashOfferContext = createContext<FlashOfferContextValue | undefined>(undefined);

export const FlashOfferProvider = ({ children }: { children: ReactNode }) => {
  const [seconds, setSeconds] = useState(14 * 60 + 57);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <FlashOfferContext.Provider value={{ seconds }}>
      {children}
    </FlashOfferContext.Provider>
  );
};

export const useFlashOffer = () => {
  const ctx = useContext(FlashOfferContext);
  if (!ctx) throw new Error("useFlashOffer must be used within FlashOfferProvider");
  return ctx;
};
