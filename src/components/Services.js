import React, {useRef} from 'react';

import { ScrollTrigger } from 'gsap-trial/ScrollTrigger';
import { ScrollSmoother } from 'gsap-trial/ScrollSmoother';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap'

import img1 from '../img/1.jpeg';
import img2 from '../img/3.jpeg';
import img3 from '../img/4.jpeg';
import img4 from '../img/5.jpeg';


gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
const Services = () => {

    const ref_left = useRef([]);
    const ref_right = useRef([]);
    
useGSAP(
  () => {

ref_left.current.forEach((item) => {
    gsap.fromTo(item, {x: -50, opacity: 0}, {x:0, opacity: 1, scrollTrigger: {
        trigger: item,
        start:  '-=850',
        end:  '-=100',
        scrub: true
    }})
});
ref_right.current.forEach((item) => {
    gsap.fromTo(item, {x: 50, opacity: 0}, {x:0, opacity: 1, scrollTrigger: {
        trigger: item,
        start:  '-=850',
        end:  '-=100',
        scrub: true
    }})
});


  }
);

const addtoLeftRefs = (el) => {
    if (el && !ref_left.current.includes(el)) {
        ref_left.current.push(el);
    }
}


const addtoRightRefs = (el) => {
    if (el && !ref_right.current.includes(el)) {
        ref_right.current.push(el);
    }
}

  return (
    <>
    <div className="services">
	<div className="container">
			<div className="gallery">
				<div className="gallery-left" data-speed=".9">
					<img src={img2} alt="" className="gallery-item" ref={addtoLeftRefs}/>
					<div className="text-block gallery-item" ref={addtoLeftRefs}>
						<h2>Виставка Власних Робіт</h2>
						<p>Ласкаво просимо до нашої галереї, де ми з гордістю представляємо вам виставку власних робіт. Тут ви знайдете унікальні твори мистецтва, створені талановитими художниками, які надихають і вражають своєю майстерністю. Кожна робота — це результат глибоких емоцій та творчого процесу, які передаються через пензлі, фарби та полотна. Завітайте до нашої галереї та пориньте у світ краси та гармонії, який ми створюємо для вас.</p>
					</div>

					<img src={img1} alt="" className="gallery-item" ref={addtoLeftRefs}/>

				</div>
				<div className="gallery-right" data-speed="1.1">
					<div className="text-block gallery-item" ref={addtoRightRefs}>
						<h2>Референси для Натхнення</h2>
						<p>У нашій галереї також представлені референси, які можуть стати джерелом натхнення для художників та любителів мистецтва. Ці роботи відображають різноманітність стилів та технік, що допомагає розширити горизонти творчого процесу. Вивчайте шедеври великих майстрів, аналізуйте їхні техніки та знаходьте нові ідеї для власних творінь. Наші референси допоможуть вам відкрити нові грані мистецтва та знайти свій унікальний шлях у творчості.</p>
					</div>
					<img src={img3} alt="" className="gallery-item" ref={addtoRightRefs}/>
					<img src={img4} alt="" className="gallery-item" ref={addtoRightRefs}/>
				</div>
			</div>
		</div>	
</div>
    </>
  );
};

export default Services;
