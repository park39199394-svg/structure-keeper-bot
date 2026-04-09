import { useState } from "react";
import ImageCarousel from "@/components/checkout/ImageCarousel";
import FlashOffer from "@/components/checkout/FlashOffer";
import PriceSection from "@/components/checkout/PriceSection";
import ProductTitle from "@/components/checkout/ProductTitle";
import ShippingInfo from "@/components/checkout/ShippingInfo";
import CustomerProtection from "@/components/checkout/CustomerProtection";
import CustomerReviews from "@/components/checkout/CustomerReviews";
import StoreInfo from "@/components/checkout/StoreInfo";
import ProductDescription from "@/components/checkout/ProductDescription";
import ShippingDetails from "@/components/checkout/ShippingDetails";
import FAQ from "@/components/checkout/FAQ";
import StickyBottomBar from "@/components/checkout/StickyBottomBar";
import BuyModal from "@/components/checkout/BuyModal";

const Index = () => {
  const [buyModalOpen, setBuyModalOpen] = useState(false);

  return (
    <div className="max-w-lg mx-auto bg-background min-h-screen pb-20">
      <ImageCarousel />
      <div className="space-y-4 py-2">
        <PriceSection />
        <ProductTitle />
        <ShippingInfo />
        <CustomerProtection />
        <div className="border-t border-border my-2" />
        <CustomerReviews />
        <div className="border-t border-border my-2" />
        <StoreInfo />
        <div className="border-t border-border my-2" />
        <ProductDescription />
        <div className="border-t border-border my-2" />
        <ShippingDetails />
        <div className="border-t border-border my-2" />
        <FAQ />
      </div>
      <StickyBottomBar onBuyClick={() => setBuyModalOpen(true)} />
      <BuyModal open={buyModalOpen} onClose={() => setBuyModalOpen(false)} />
    </div>
  );
};

export default Index;
