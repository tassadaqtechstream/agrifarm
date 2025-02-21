"use client";
import { TypeAnimation } from 'react-type-animation';

const Type = () => {
  return (
    <TypeAnimation
      sequence={[
        
'Seamless Farm-to-Market Access – Farmers list their produce effortlessly while businesses source high-quality agri-products with real-time data.',
1000, 
'Smart Farming, Smarter Trading – Integrated with our ERP, ensuring transparency in quality, quantity, and harvest timelines.',
1000,
'Custom Contracts & Direct Deals – Secure long-term partnerships with verified farms through personalized agreements.',
1000,
        
      ]}
      wrapper="span"
      speed={50}
      style={{ display: 'inline-block' }}
      repeat={Infinity}
    />
  );
};
export default Type;