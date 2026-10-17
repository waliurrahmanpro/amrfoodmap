'use client';

import React from 'react';
import { Heart, ShieldCheck, Map, Utensils, Info } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0C382E] text-white border-t border-[#185343] mt-16 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-[#185343]">
          {/* Brand & Purpose */}
          <div>
            <div className="flex items-center space-x-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#13463B] text-[#A3E635] flex items-center justify-center border border-[#84CC16]/40">
                <Utensils className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                আমার <span className="text-[#A3E635]">Food Map</span>
              </span>
            </div>
            <p className="text-xs text-emerald-100/80 leading-relaxed">
              বাংলাদেশের ৬৪ জেলার সমৃদ্ধ রন্ধন ঐতিহ্য, লোকসংস্কৃতি ও বিখ্যাত খাবারের প্রামাণিক সংকলন। আপনার স্বাদ সফর ট্র্যাক করুন এবং বাংলার আসল স্বাদকে জানুন।
            </p>
          </div>

          {/* Verification & Accuracy */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <ShieldCheck className="w-5 h-5 text-[#A3E635]" />
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                তথ্যসূত্র ও প্রামাণিকতা
              </h4>
            </div>
            <p className="text-xs text-emerald-100/80 leading-relaxed">
              প্রতিটি জেলা-খাবার সম্পর্ক ভৌগোলিক নির্দেশক (GI) সনদপত্র, লোকসংস্কৃতি বিষয়ক গবেষণা এবং জেলা প্রসাশনের নথিপত্র দ্বারা সমর্থিত। কোনো মিথ্যা বা অসত্য দাবি করা হয়নি।
            </p>
          </div>

          {/* Open Data & Map Boundaries */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Map className="w-5 h-5 text-[#A3E635]" />
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                মানচিত্র ও বাউন্ডারি উপাত্ত
              </h4>
            </div>
            <p className="text-xs text-emerald-100/80 leading-relaxed">
              বাংলাদেশের ৬৪ জেলার নির্ভুল প্রশাসনিক সীমানা William & Mary GeoLab (geoBoundaries) ও বাংলাদেশ পরিসংখ্যান ব্যুরো (BBS) এর উন্মুক্ত জিওগ্রাফিক ডেটা থেকে সংগৃহীত।
            </p>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-200/70 gap-3">
          <p className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 inline" />
            <span>for the rich culinary culture of Bangladesh.</span>
          </p>

          <p className="text-[11px]">
            © 2026 Amar Food Map • All 64 Districts of Bangladesh
          </p>
        </div>
      </div>
    </footer>
  );
};
