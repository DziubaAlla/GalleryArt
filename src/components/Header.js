import React, {useRef} from 'react';
import collage from '../img/collage.jpg';
import { ScrollTrigger } from 'gsap-trial/ScrollTrigger';
import { ScrollSmoother } from 'gsap-trial/ScrollSmoother';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap'


gsap.registerPlugin(ScrollTrigger, ScrollSmoother);


const Header = () => {

    
const container = useRef();
useGSAP(
  () => {
    gsap.fromTo('header', {opacity: 1}, {opacity: 0, scrollTrigger: {
        trigger: container.current,
        start: 'center',
        end: '850',
        scrub: true
    }});
  }
);
  return (
    <header ref={container}>
		<img src={collage} alt="Collage" data-speed=".6" />
		<section className="container">
			<div className="main-title" data-speed=".75">
				<h1>ГАЛЕРЕЯ НАПРАЦЮВАНЬ</h1>
			</div>
		</section>
	</header>
  );
};

export default Header;
