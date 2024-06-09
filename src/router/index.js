import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ScrollSmoother } from 'gsap-trial/ScrollSmoother';

import { ScrollTrigger } from 'gsap-trial/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import Main from '../views/Main';
import ImageGallery from '../views/ImageGallery';
import AdminPanel from '../views/AdminPanel';
import About from '../views/About';

export default function Router() {
    const location = useLocation();
  useGSAP(
    () => {
      if (!ScrollTrigger.isTouch) {
      ScrollSmoother.create({
        smooth: 1.5,
        effects: true
      });
    }
    },
    {
        dependencies: [location]
      }
  );

  return (
    <div id="smooth-wrapper">
    <div id="smooth-content">
        <Routes>
          <Route path="/">
            <Route index element={<Main />} />
            <Route path="artworks" element={<ImageGallery tableName="artworks" />} />
            <Route path="reference" element={<ImageGallery tableName="references" />} />
            <Route path="admin" element={<AdminPanel />} />
            <Route path="about" element={<About />} />
          </Route>
        </Routes>
    </div>
    </div>

  );
}
