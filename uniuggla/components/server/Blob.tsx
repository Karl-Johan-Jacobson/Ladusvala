import React from "react";

  const blobVariations: React.ReactNode[] = [
    <svg preserveAspectRatio="none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="">
      <path fill="#9ECB98" d="M51.3,-58.6C66.3,-48.4,78.4,-32.2,81.6,-14.3C84.8,3.5,79.2,23,69.7,40.8C60.1,58.7,46.6,74.8,29,82.5C11.3,90.1,-10.4,89.3,-26.2,80.1C-42,70.9,-51.8,53.2,-61.7,35.8C-71.7,18.3,-81.7,1.1,-80.9,-16.2C-80.2,-33.4,-68.6,-50.7,-53.3,-60.8C-38,-70.9,-19,-74,-0.4,-73.5C18.1,-72.9,36.2,-68.8,51.3,-58.6Z" transform="translate(100 100)"/>
    </svg>,
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path fill="#9ECB98" d="M48.4,-76.5C61.9,-66.7,71.3,-51.8,77.6,-36C83.9,-20.3,86.9,-3.7,84.5,12C82,27.7,73.9,42.4,63.6,56C53.2,69.7,40.5,82.2,25.2,87.6C9.8,92.9,-8.2,91.1,-23.7,84.7C-39.2,78.3,-52.2,67.4,-64.3,54.9C-76.4,42.4,-87.5,28.3,-90.6,12.5C-93.7,-3.3,-88.9,-20.9,-79.5,-34.2C-70.1,-47.5,-56.2,-56.6,-42.2,-66.2C-28.2,-75.8,-14.1,-85.9,1.7,-88.5C17.5,-91.1,35,-86.4,48.4,-76.5Z" transform="translate(100 100)" />
    </svg>,
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path fill="#9ECB98" d="M41.9,-66.3C53.7,-57.6,62.2,-45,70.2,-31C78.1,-17.1,85.4,-1.9,84.8,13.3C84.3,28.4,75.9,43.5,64.2,53.9C52.5,64.4,37.4,70.3,21.6,76.2C5.7,82.1,-10.9,88,-24.1,83.5C-37.3,79,-47,64.1,-57.9,50.7C-68.8,37.2,-80.9,25.3,-86.1,10.4C-91.2,-4.5,-89.5,-22.3,-80.8,-35.1C-72.2,-47.9,-56.5,-55.7,-41.8,-63.1C-27.2,-70.5,-13.6,-77.5,0.7,-78.7C15,-79.8,30.1,-75,41.9,-66.3Z" transform="translate(100 100)" />
    </svg>,
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path fill="#9ECB98" d="M44.1,-63.9C58.3,-59.4,72,-49.2,77.1,-35.8C82.3,-22.4,79.1,-5.8,76.4,10.8C73.7,27.3,71.4,43.6,62,52.9C52.6,62.1,36.1,64.3,20.3,68.8C4.6,73.2,-10.4,79.9,-23.3,77.1C-36.2,74.4,-47,62.2,-54.2,49.4C-61.5,36.7,-65.2,23.3,-69.7,8.5C-74.2,-6.3,-79.6,-22.6,-76.6,-37.5C-73.7,-52.4,-62.4,-66,-48.3,-70.5C-34.1,-75,-17.1,-70.4,-1.1,-68.7C14.9,-67,29.8,-68.3,44.1,-63.9Z" transform="translate(100 100)" />
    </svg>,
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path fill="#9ECB98" d="M42.9,-65.1C53.9,-59.7,60,-44.9,67.7,-30.3C75.3,-15.6,84.4,-1.1,82,11.3C79.5,23.8,65.4,34.1,53.1,43.2C40.8,52.3,30.4,60.2,17.8,66.5C5.3,72.9,-9.5,77.6,-22.9,75C-36.4,72.4,-48.6,62.5,-59.8,51C-71.1,39.5,-81.5,26.4,-84.8,11.4C-88.2,-3.5,-84.6,-20.2,-76.8,-34.2C-69,-48.1,-57.1,-59.3,-43.6,-63.5C-30.2,-67.8,-15.1,-65.2,0.4,-65.9C16,-66.6,31.9,-70.5,42.9,-65.1Z" transform="translate(100 100)" />
    </svg>,
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path fill="#9ECB98" d="M37.1,-55.4C50.6,-49,66,-43.1,70.5,-32.4C75,-21.8,68.6,-6.4,65.9,9.1C63.1,24.7,63.9,40.4,57.1,51C50.3,61.7,35.8,67.2,21.9,68.6C7.9,70.1,-5.6,67.5,-19.2,64.1C-32.9,60.7,-46.8,56.6,-56.6,47.7C-66.4,38.8,-72.1,25,-76.5,9.6C-81,-5.9,-84.3,-22.9,-77.2,-34C-70.2,-45.1,-52.8,-50.2,-38.3,-56.1C-23.7,-62,-11.8,-68.7,0,-68.6C11.8,-68.6,23.5,-61.7,37.1,-55.4Z" transform="translate(100 100)" />
    </svg>,
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path fill="#9ECB98" d="M38,-59.8C49.6,-51.6,59.7,-41.8,69.3,-29.2C78.9,-16.6,88,-1.3,85.3,11.8C82.6,24.9,68.3,35.8,56.3,47.8C44.4,59.8,34.8,72.9,21.7,79.4C8.5,85.8,-8.3,85.6,-24.5,81.6C-40.6,77.6,-56.2,69.9,-62.4,57.1C-68.6,44.4,-65.5,26.7,-63.4,11.9C-61.2,-3,-60,-14.9,-58.5,-30.3C-57.1,-45.7,-55.3,-64.5,-45.5,-73.5C-35.7,-82.6,-17.8,-81.9,-2.3,-78.2C13.2,-74.6,26.3,-68,38,-59.8Z" transform="translate(100 100)" />
    </svg>,
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path fill="#9ECB98" d="M41.8,-65.6C52.2,-58.4,57.2,-43.4,63.2,-29.2C69.3,-14.9,76.3,-1.5,77.7,13.5C79.1,28.4,74.9,44.8,65.5,58.2C56.2,71.7,41.7,82.2,25.9,85.7C10.1,89.3,-7.1,85.9,-21.1,78.6C-35,71.4,-45.8,60.2,-52.1,47.9C-58.5,35.7,-60.4,22.3,-64.8,7.8C-69.3,-6.7,-76.4,-22.4,-71.7,-32.7C-67,-43,-50.5,-47.9,-36.5,-53.5C-22.6,-59,-11.3,-65.2,2.2,-68.7C15.7,-72.1,31.5,-72.7,41.8,-65.6Z" transform="translate(100 100)" />
    </svg>,
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path fill="#9ECB98" d="M34.9,-55.1C44.6,-48.1,51.4,-37.3,60.3,-25.3C69.2,-13.4,80.1,-0.1,79.5,12.2C78.9,24.5,66.8,36,55.4,46.5C43.9,56.9,33.1,66.5,20.5,70.6C7.8,74.7,-6.7,73.4,-18.7,67.9C-30.7,62.4,-40.2,52.7,-51.8,42.9C-63.3,33.1,-77,23,-82.3,9.6C-87.7,-3.8,-84.9,-20.6,-76.7,-33.6C-68.6,-46.6,-55.1,-55.7,-41.5,-60.9C-27.8,-66.1,-13.9,-67.3,-0.6,-66.3C12.6,-65.3,25.2,-62.1,34.9,-55.1Z" transform="translate(100 100)" />
    </svg>,
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path fill="#9ECB98" d="M44.8,-68C58.1,-61.1,69,-48.8,76.3,-34.4C83.6,-20,87.4,-3.4,83.4,10.7C79.4,24.9,67.6,36.7,55.4,44.6C43.2,52.6,30.5,56.7,16.8,63.6C3.1,70.5,-11.6,80.2,-23.6,77.8C-35.6,75.5,-44.9,61.2,-56.4,48.6C-67.9,35.9,-81.6,24.8,-86.7,10.5C-91.7,-3.8,-88.2,-21.2,-79.3,-34.3C-70.4,-47.4,-56,-56.1,-41.9,-62.7C-27.8,-69.2,-13.9,-73.5,0.9,-75C15.7,-76.4,31.4,-74.9,44.8,-68Z" transform="translate(100 100)" />
    </svg>,
  ];

  /*const selectedBlobVariations: React.ReactNode[] = [
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="">
      <path fill="#4F1EB0" d="M51.3,-58.6C66.3,-48.4,78.4,-32.2,81.6,-14.3C84.8,3.5,79.2,23,69.7,40.8C60.1,58.7,46.6,74.8,29,82.5C11.3,90.1,-10.4,89.3,-26.2,80.1C-42,70.9,-51.8,53.2,-61.7,35.8C-71.7,18.3,-81.7,1.1,-80.9,-16.2C-80.2,-33.4,-68.6,-50.7,-53.3,-60.8C-38,-70.9,-19,-74,-0.4,-73.5C18.1,-72.9,36.2,-68.8,51.3,-58.6Z" transform="translate(100 100)"/>
    </svg>,
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path fill="#4F1EB0" d="M48.4,-76.5C61.9,-66.7,71.3,-51.8,77.6,-36C83.9,-20.3,86.9,-3.7,84.5,12C82,27.7,73.9,42.4,63.6,56C53.2,69.7,40.5,82.2,25.2,87.6C9.8,92.9,-8.2,91.1,-23.7,84.7C-39.2,78.3,-52.2,67.4,-64.3,54.9C-76.4,42.4,-87.5,28.3,-90.6,12.5C-93.7,-3.3,-88.9,-20.9,-79.5,-34.2C-70.1,-47.5,-56.2,-56.6,-42.2,-66.2C-28.2,-75.8,-14.1,-85.9,1.7,-88.5C17.5,-91.1,35,-86.4,48.4,-76.5Z" transform="translate(100 100)" />
    </svg>,
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path fill="#4F1EB0" d="M41.9,-66.3C53.7,-57.6,62.2,-45,70.2,-31C78.1,-17.1,85.4,-1.9,84.8,13.3C84.3,28.4,75.9,43.5,64.2,53.9C52.5,64.4,37.4,70.3,21.6,76.2C5.7,82.1,-10.9,88,-24.1,83.5C-37.3,79,-47,64.1,-57.9,50.7C-68.8,37.2,-80.9,25.3,-86.1,10.4C-91.2,-4.5,-89.5,-22.3,-80.8,-35.1C-72.2,-47.9,-56.5,-55.7,-41.8,-63.1C-27.2,-70.5,-13.6,-77.5,0.7,-78.7C15,-79.8,30.1,-75,41.9,-66.3Z" transform="translate(100 100)" />
    </svg>,
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path fill="#4F1EB0" d="M44.1,-63.9C58.3,-59.4,72,-49.2,77.1,-35.8C82.3,-22.4,79.1,-5.8,76.4,10.8C73.7,27.3,71.4,43.6,62,52.9C52.6,62.1,36.1,64.3,20.3,68.8C4.6,73.2,-10.4,79.9,-23.3,77.1C-36.2,74.4,-47,62.2,-54.2,49.4C-61.5,36.7,-65.2,23.3,-69.7,8.5C-74.2,-6.3,-79.6,-22.6,-76.6,-37.5C-73.7,-52.4,-62.4,-66,-48.3,-70.5C-34.1,-75,-17.1,-70.4,-1.1,-68.7C14.9,-67,29.8,-68.3,44.1,-63.9Z" transform="translate(100 100)" />
    </svg>,
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path fill="#4F1EB0" d="M42.9,-65.1C53.9,-59.7,60,-44.9,67.7,-30.3C75.3,-15.6,84.4,-1.1,82,11.3C79.5,23.8,65.4,34.1,53.1,43.2C40.8,52.3,30.4,60.2,17.8,66.5C5.3,72.9,-9.5,77.6,-22.9,75C-36.4,72.4,-48.6,62.5,-59.8,51C-71.1,39.5,-81.5,26.4,-84.8,11.4C-88.2,-3.5,-84.6,-20.2,-76.8,-34.2C-69,-48.1,-57.1,-59.3,-43.6,-63.5C-30.2,-67.8,-15.1,-65.2,0.4,-65.9C16,-66.6,31.9,-70.5,42.9,-65.1Z" transform="translate(100 100)" />
    </svg>,
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path fill="#4F1EB0" d="M37.1,-55.4C50.6,-49,66,-43.1,70.5,-32.4C75,-21.8,68.6,-6.4,65.9,9.1C63.1,24.7,63.9,40.4,57.1,51C50.3,61.7,35.8,67.2,21.9,68.6C7.9,70.1,-5.6,67.5,-19.2,64.1C-32.9,60.7,-46.8,56.6,-56.6,47.7C-66.4,38.8,-72.1,25,-76.5,9.6C-81,-5.9,-84.3,-22.9,-77.2,-34C-70.2,-45.1,-52.8,-50.2,-38.3,-56.1C-23.7,-62,-11.8,-68.7,0,-68.6C11.8,-68.6,23.5,-61.7,37.1,-55.4Z" transform="translate(100 100)" />
    </svg>,
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path fill="#4F1EB0" d="M38,-59.8C49.6,-51.6,59.7,-41.8,69.3,-29.2C78.9,-16.6,88,-1.3,85.3,11.8C82.6,24.9,68.3,35.8,56.3,47.8C44.4,59.8,34.8,72.9,21.7,79.4C8.5,85.8,-8.3,85.6,-24.5,81.6C-40.6,77.6,-56.2,69.9,-62.4,57.1C-68.6,44.4,-65.5,26.7,-63.4,11.9C-61.2,-3,-60,-14.9,-58.5,-30.3C-57.1,-45.7,-55.3,-64.5,-45.5,-73.5C-35.7,-82.6,-17.8,-81.9,-2.3,-78.2C13.2,-74.6,26.3,-68,38,-59.8Z" transform="translate(100 100)" />
    </svg>,
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path fill="#4F1EB0" d="M41.8,-65.6C52.2,-58.4,57.2,-43.4,63.2,-29.2C69.3,-14.9,76.3,-1.5,77.7,13.5C79.1,28.4,74.9,44.8,65.5,58.2C56.2,71.7,41.7,82.2,25.9,85.7C10.1,89.3,-7.1,85.9,-21.1,78.6C-35,71.4,-45.8,60.2,-52.1,47.9C-58.5,35.7,-60.4,22.3,-64.8,7.8C-69.3,-6.7,-76.4,-22.4,-71.7,-32.7C-67,-43,-50.5,-47.9,-36.5,-53.5C-22.6,-59,-11.3,-65.2,2.2,-68.7C15.7,-72.1,31.5,-72.7,41.8,-65.6Z" transform="translate(100 100)" />
    </svg>,
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path fill="#4F1EB0" d="M34.9,-55.1C44.6,-48.1,51.4,-37.3,60.3,-25.3C69.2,-13.4,80.1,-0.1,79.5,12.2C78.9,24.5,66.8,36,55.4,46.5C43.9,56.9,33.1,66.5,20.5,70.6C7.8,74.7,-6.7,73.4,-18.7,67.9C-30.7,62.4,-40.2,52.7,-51.8,42.9C-63.3,33.1,-77,23,-82.3,9.6C-87.7,-3.8,-84.9,-20.6,-76.7,-33.6C-68.6,-46.6,-55.1,-55.7,-41.5,-60.9C-27.8,-66.1,-13.9,-67.3,-0.6,-66.3C12.6,-65.3,25.2,-62.1,34.9,-55.1Z" transform="translate(100 100)" />
    </svg>,
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path fill="#4F1EB0" d="M44.8,-68C58.1,-61.1,69,-48.8,76.3,-34.4C83.6,-20,87.4,-3.4,83.4,10.7C79.4,24.9,67.6,36.7,55.4,44.6C43.2,52.6,30.5,56.7,16.8,63.6C3.1,70.5,-11.6,80.2,-23.6,77.8C-35.6,75.5,-44.9,61.2,-56.4,48.6C-67.9,35.9,-81.6,24.8,-86.7,10.5C-91.7,-3.8,-88.2,-21.2,-79.3,-34.3C-70.4,-47.4,-56,-56.1,-41.9,-62.7C-27.8,-69.2,-13.9,-73.5,0.9,-75C15.7,-76.4,31.4,-74.9,44.8,-68Z" transform="translate(100 100)" />
    </svg>,
  ];*/

  const animatedBlobVariations: React.ReactNode[] = [
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="">
    <defs>
      <linearGradient id="iconGradient" gradientTransform="rotate(90)">
        <stop offset="0%" stop-color="#9ECB98" />
        <stop offset="100%" stop-color="#7DA577" />
      </linearGradient>
    </defs>
    <path fill="#9ECB98" transform="translate(100 100)">
    <animate attributeName="d"
        dur="10000ms"
        repeatCount="indefinite"
        values="
        M34.9,-55.1C44.6,-48.1,51.4,-37.3,60.3,-25.3C69.2,-13.4,80.1,-0.1,79.5,12.2C78.9,24.5,66.8,36,55.4,46.5C43.9,56.9,33.1,66.5,20.5,70.6C7.8,74.7,-6.7,73.4,-18.7,67.9C-30.7,62.4,-40.2,52.7,-51.8,42.9C-63.3,33.1,-77,23,-82.3,9.6C-87.7,-3.8,-84.9,-20.6,-76.7,-33.6C-68.6,-46.6,-55.1,-55.7,-41.5,-60.9C-27.8,-66.1,-13.9,-67.3,-0.6,-66.3C12.6,-65.3,25.2,-62.1,34.9,-55.1Z;
          M48.4,-76.5C61.9,-66.7,71.3,-51.8,77.6,-36C83.9,-20.3,86.9,-3.7,84.5,12C82,27.7,73.9,42.4,63.6,56C53.2,69.7,40.5,82.2,25.2,87.6C9.8,92.9,-8.2,91.1,-23.7,84.7C-39.2,78.3,-52.2,67.4,-64.3,54.9C-76.4,42.4,-87.5,28.3,-90.6,12.5C-93.7,-3.3,-88.9,-20.9,-79.5,-34.2C-70.1,-47.5,-56.2,-56.6,-42.2,-66.2C-28.2,-75.8,-14.1,-85.9,1.7,-88.5C17.5,-91.1,35,-86.4,48.4,-76.5Z;
          M41.9,-66.3C53.7,-57.6,62.2,-45,70.2,-31C78.1,-17.1,85.4,-1.9,84.8,13.3C84.3,28.4,75.9,43.5,64.2,53.9C52.5,64.4,37.4,70.3,21.6,76.2C5.7,82.1,-10.9,88,-24.1,83.5C-37.3,79,-47,64.1,-57.9,50.7C-68.8,37.2,-80.9,25.3,-86.1,10.4C-91.2,-4.5,-89.5,-22.3,-80.8,-35.1C-72.2,-47.9,-56.5,-55.7,-41.8,-63.1C-27.2,-70.5,-13.6,-77.5,0.7,-78.7C15,-79.8,30.1,-75,41.9,-66.3Z;
          M37.1,-55.4C50.6,-49,66,-43.1,70.5,-32.4C75,-21.8,68.6,-6.4,65.9,9.1C63.1,24.7,63.9,40.4,57.1,51C50.3,61.7,35.8,67.2,21.9,68.6C7.9,70.1,-5.6,67.5,-19.2,64.1C-32.9,60.7,-46.8,56.6,-56.6,47.7C-66.4,38.8,-72.1,25,-76.5,9.6C-81,-5.9,-84.3,-22.9,-77.2,-34C-70.2,-45.1,-52.8,-50.2,-38.3,-56.1C-23.7,-62,-11.8,-68.7,0,-68.6C11.8,-68.6,23.5,-61.7,37.1,-55.4Z;
          M44.8,-68C58.1,-61.1,69,-48.8,76.3,-34.4C83.6,-20,87.4,-3.4,83.4,10.7C79.4,24.9,67.6,36.7,55.4,44.6C43.2,52.6,30.5,56.7,16.8,63.6C3.1,70.5,-11.6,80.2,-23.6,77.8C-35.6,75.5,-44.9,61.2,-56.4,48.6C-67.9,35.9,-81.6,24.8,-86.7,10.5C-91.7,-3.8,-88.2,-21.2,-79.3,-34.3C-70.4,-47.4,-56,-56.1,-41.9,-62.7C-27.8,-69.2,-13.9,-73.5,0.9,-75C15.7,-76.4,31.4,-74.9,44.8,-68Z;
          M34.9,-55.1C44.6,-48.1,51.4,-37.3,60.3,-25.3C69.2,-13.4,80.1,-0.1,79.5,12.2C78.9,24.5,66.8,36,55.4,46.5C43.9,56.9,33.1,66.5,20.5,70.6C7.8,74.7,-6.7,73.4,-18.7,67.9C-30.7,62.4,-40.2,52.7,-51.8,42.9C-63.3,33.1,-77,23,-82.3,9.6C-87.7,-3.8,-84.9,-20.6,-76.7,-33.6C-68.6,-46.6,-55.1,-55.7,-41.5,-60.9C-27.8,-66.1,-13.9,-67.3,-0.6,-66.3C12.6,-65.3,25.2,-62.1,34.9,-55.1Z;
          "
        >
      </animate>
    </path>
  </svg>,
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="">
      <defs>
        <linearGradient id="iconGradient" gradientTransform="rotate(90)">
          <stop offset="0%" stop-color="#9ECB98" />
          <stop offset="100%" stop-color="#7DA577" />
        </linearGradient>
      </defs>
      <path fill="#9ECB98" transform="translate(100 100)">
      <animate attributeName="d"
          dur="10000ms"
          repeatCount="indefinite"
          values="
          M44.8,-68C58.1,-61.1,69,-48.8,76.3,-34.4C83.6,-20,87.4,-3.4,83.4,10.7C79.4,24.9,67.6,36.7,55.4,44.6C43.2,52.6,30.5,56.7,16.8,63.6C3.1,70.5,-11.6,80.2,-23.6,77.8C-35.6,75.5,-44.9,61.2,-56.4,48.6C-67.9,35.9,-81.6,24.8,-86.7,10.5C-91.7,-3.8,-88.2,-21.2,-79.3,-34.3C-70.4,-47.4,-56,-56.1,-41.9,-62.7C-27.8,-69.2,-13.9,-73.5,0.9,-75C15.7,-76.4,31.4,-74.9,44.8,-68Z;
          M34.9,-55.1C44.6,-48.1,51.4,-37.3,60.3,-25.3C69.2,-13.4,80.1,-0.1,79.5,12.2C78.9,24.5,66.8,36,55.4,46.5C43.9,56.9,33.1,66.5,20.5,70.6C7.8,74.7,-6.7,73.4,-18.7,67.9C-30.7,62.4,-40.2,52.7,-51.8,42.9C-63.3,33.1,-77,23,-82.3,9.6C-87.7,-3.8,-84.9,-20.6,-76.7,-33.6C-68.6,-46.6,-55.1,-55.7,-41.5,-60.9C-27.8,-66.1,-13.9,-67.3,-0.6,-66.3C12.6,-65.3,25.2,-62.1,34.9,-55.1Z;
            M48.4,-76.5C61.9,-66.7,71.3,-51.8,77.6,-36C83.9,-20.3,86.9,-3.7,84.5,12C82,27.7,73.9,42.4,63.6,56C53.2,69.7,40.5,82.2,25.2,87.6C9.8,92.9,-8.2,91.1,-23.7,84.7C-39.2,78.3,-52.2,67.4,-64.3,54.9C-76.4,42.4,-87.5,28.3,-90.6,12.5C-93.7,-3.3,-88.9,-20.9,-79.5,-34.2C-70.1,-47.5,-56.2,-56.6,-42.2,-66.2C-28.2,-75.8,-14.1,-85.9,1.7,-88.5C17.5,-91.1,35,-86.4,48.4,-76.5Z;
            M41.9,-66.3C53.7,-57.6,62.2,-45,70.2,-31C78.1,-17.1,85.4,-1.9,84.8,13.3C84.3,28.4,75.9,43.5,64.2,53.9C52.5,64.4,37.4,70.3,21.6,76.2C5.7,82.1,-10.9,88,-24.1,83.5C-37.3,79,-47,64.1,-57.9,50.7C-68.8,37.2,-80.9,25.3,-86.1,10.4C-91.2,-4.5,-89.5,-22.3,-80.8,-35.1C-72.2,-47.9,-56.5,-55.7,-41.8,-63.1C-27.2,-70.5,-13.6,-77.5,0.7,-78.7C15,-79.8,30.1,-75,41.9,-66.3Z;
            M37.1,-55.4C50.6,-49,66,-43.1,70.5,-32.4C75,-21.8,68.6,-6.4,65.9,9.1C63.1,24.7,63.9,40.4,57.1,51C50.3,61.7,35.8,67.2,21.9,68.6C7.9,70.1,-5.6,67.5,-19.2,64.1C-32.9,60.7,-46.8,56.6,-56.6,47.7C-66.4,38.8,-72.1,25,-76.5,9.6C-81,-5.9,-84.3,-22.9,-77.2,-34C-70.2,-45.1,-52.8,-50.2,-38.3,-56.1C-23.7,-62,-11.8,-68.7,0,-68.6C11.8,-68.6,23.5,-61.7,37.1,-55.4Z;
            M44.8,-68C58.1,-61.1,69,-48.8,76.3,-34.4C83.6,-20,87.4,-3.4,83.4,10.7C79.4,24.9,67.6,36.7,55.4,44.6C43.2,52.6,30.5,56.7,16.8,63.6C3.1,70.5,-11.6,80.2,-23.6,77.8C-35.6,75.5,-44.9,61.2,-56.4,48.6C-67.9,35.9,-81.6,24.8,-86.7,10.5C-91.7,-3.8,-88.2,-21.2,-79.3,-34.3C-70.4,-47.4,-56,-56.1,-41.9,-62.7C-27.8,-69.2,-13.9,-73.5,0.9,-75C15.7,-76.4,31.4,-74.9,44.8,-68Z;
            "
          >
        </animate>
      </path>
    </svg>,
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="">
        <defs>
          <linearGradient id="iconGradient" gradientTransform="rotate(90)">
            <stop offset="0%" stop-color="#9ECB98" />
            <stop offset="100%" stop-color="#7DA577" />
          </linearGradient>
        </defs>
        <path fill="#9ECB98" transform="translate(100 100)">
        <animate attributeName="d"
            dur="10000ms"
            repeatCount="indefinite"
            values="
            M37.1,-55.4C50.6,-49,66,-43.1,70.5,-32.4C75,-21.8,68.6,-6.4,65.9,9.1C63.1,24.7,63.9,40.4,57.1,51C50.3,61.7,35.8,67.2,21.9,68.6C7.9,70.1,-5.6,67.5,-19.2,64.1C-32.9,60.7,-46.8,56.6,-56.6,47.7C-66.4,38.8,-72.1,25,-76.5,9.6C-81,-5.9,-84.3,-22.9,-77.2,-34C-70.2,-45.1,-52.8,-50.2,-38.3,-56.1C-23.7,-62,-11.8,-68.7,0,-68.6C11.8,-68.6,23.5,-61.7,37.1,-55.4Z;
            M34.9,-55.1C44.6,-48.1,51.4,-37.3,60.3,-25.3C69.2,-13.4,80.1,-0.1,79.5,12.2C78.9,24.5,66.8,36,55.4,46.5C43.9,56.9,33.1,66.5,20.5,70.6C7.8,74.7,-6.7,73.4,-18.7,67.9C-30.7,62.4,-40.2,52.7,-51.8,42.9C-63.3,33.1,-77,23,-82.3,9.6C-87.7,-3.8,-84.9,-20.6,-76.7,-33.6C-68.6,-46.6,-55.1,-55.7,-41.5,-60.9C-27.8,-66.1,-13.9,-67.3,-0.6,-66.3C12.6,-65.3,25.2,-62.1,34.9,-55.1Z;
              M48.4,-76.5C61.9,-66.7,71.3,-51.8,77.6,-36C83.9,-20.3,86.9,-3.7,84.5,12C82,27.7,73.9,42.4,63.6,56C53.2,69.7,40.5,82.2,25.2,87.6C9.8,92.9,-8.2,91.1,-23.7,84.7C-39.2,78.3,-52.2,67.4,-64.3,54.9C-76.4,42.4,-87.5,28.3,-90.6,12.5C-93.7,-3.3,-88.9,-20.9,-79.5,-34.2C-70.1,-47.5,-56.2,-56.6,-42.2,-66.2C-28.2,-75.8,-14.1,-85.9,1.7,-88.5C17.5,-91.1,35,-86.4,48.4,-76.5Z;
              M41.9,-66.3C53.7,-57.6,62.2,-45,70.2,-31C78.1,-17.1,85.4,-1.9,84.8,13.3C84.3,28.4,75.9,43.5,64.2,53.9C52.5,64.4,37.4,70.3,21.6,76.2C5.7,82.1,-10.9,88,-24.1,83.5C-37.3,79,-47,64.1,-57.9,50.7C-68.8,37.2,-80.9,25.3,-86.1,10.4C-91.2,-4.5,-89.5,-22.3,-80.8,-35.1C-72.2,-47.9,-56.5,-55.7,-41.8,-63.1C-27.2,-70.5,-13.6,-77.5,0.7,-78.7C15,-79.8,30.1,-75,41.9,-66.3Z;
              M44.8,-68C58.1,-61.1,69,-48.8,76.3,-34.4C83.6,-20,87.4,-3.4,83.4,10.7C79.4,24.9,67.6,36.7,55.4,44.6C43.2,52.6,30.5,56.7,16.8,63.6C3.1,70.5,-11.6,80.2,-23.6,77.8C-35.6,75.5,-44.9,61.2,-56.4,48.6C-67.9,35.9,-81.6,24.8,-86.7,10.5C-91.7,-3.8,-88.2,-21.2,-79.3,-34.3C-70.4,-47.4,-56,-56.1,-41.9,-62.7C-27.8,-69.2,-13.9,-73.5,0.9,-75C15.7,-76.4,31.4,-74.9,44.8,-68Z;
              M37.1,-55.4C50.6,-49,66,-43.1,70.5,-32.4C75,-21.8,68.6,-6.4,65.9,9.1C63.1,24.7,63.9,40.4,57.1,51C50.3,61.7,35.8,67.2,21.9,68.6C7.9,70.1,-5.6,67.5,-19.2,64.1C-32.9,60.7,-46.8,56.6,-56.6,47.7C-66.4,38.8,-72.1,25,-76.5,9.6C-81,-5.9,-84.3,-22.9,-77.2,-34C-70.2,-45.1,-52.8,-50.2,-38.3,-56.1C-23.7,-62,-11.8,-68.7,0,-68.6C11.8,-68.6,23.5,-61.7,37.1,-55.4Z;

              "
            >
          </animate>
        </path>
      </svg>,
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="">
          <defs>
            <linearGradient id="iconGradient" gradientTransform="rotate(90)">
              <stop offset="0%" stop-color="#9ECB98" />
              <stop offset="100%" stop-color="#7DA577" />
            </linearGradient>
          </defs>
          <path fill="#9ECB98" transform="translate(100 100)">
          <animate attributeName="d"
              dur="10000ms"
              repeatCount="indefinite"
              values="
              M48.4,-76.5C61.9,-66.7,71.3,-51.8,77.6,-36C83.9,-20.3,86.9,-3.7,84.5,12C82,27.7,73.9,42.4,63.6,56C53.2,69.7,40.5,82.2,25.2,87.6C9.8,92.9,-8.2,91.1,-23.7,84.7C-39.2,78.3,-52.2,67.4,-64.3,54.9C-76.4,42.4,-87.5,28.3,-90.6,12.5C-93.7,-3.3,-88.9,-20.9,-79.5,-34.2C-70.1,-47.5,-56.2,-56.6,-42.2,-66.2C-28.2,-75.8,-14.1,-85.9,1.7,-88.5C17.5,-91.1,35,-86.4,48.4,-76.5Z;
              M34.9,-55.1C44.6,-48.1,51.4,-37.3,60.3,-25.3C69.2,-13.4,80.1,-0.1,79.5,12.2C78.9,24.5,66.8,36,55.4,46.5C43.9,56.9,33.1,66.5,20.5,70.6C7.8,74.7,-6.7,73.4,-18.7,67.9C-30.7,62.4,-40.2,52.7,-51.8,42.9C-63.3,33.1,-77,23,-82.3,9.6C-87.7,-3.8,-84.9,-20.6,-76.7,-33.6C-68.6,-46.6,-55.1,-55.7,-41.5,-60.9C-27.8,-66.1,-13.9,-67.3,-0.6,-66.3C12.6,-65.3,25.2,-62.1,34.9,-55.1Z;
                M41.9,-66.3C53.7,-57.6,62.2,-45,70.2,-31C78.1,-17.1,85.4,-1.9,84.8,13.3C84.3,28.4,75.9,43.5,64.2,53.9C52.5,64.4,37.4,70.3,21.6,76.2C5.7,82.1,-10.9,88,-24.1,83.5C-37.3,79,-47,64.1,-57.9,50.7C-68.8,37.2,-80.9,25.3,-86.1,10.4C-91.2,-4.5,-89.5,-22.3,-80.8,-35.1C-72.2,-47.9,-56.5,-55.7,-41.8,-63.1C-27.2,-70.5,-13.6,-77.5,0.7,-78.7C15,-79.8,30.1,-75,41.9,-66.3Z;
                M37.1,-55.4C50.6,-49,66,-43.1,70.5,-32.4C75,-21.8,68.6,-6.4,65.9,9.1C63.1,24.7,63.9,40.4,57.1,51C50.3,61.7,35.8,67.2,21.9,68.6C7.9,70.1,-5.6,67.5,-19.2,64.1C-32.9,60.7,-46.8,56.6,-56.6,47.7C-66.4,38.8,-72.1,25,-76.5,9.6C-81,-5.9,-84.3,-22.9,-77.2,-34C-70.2,-45.1,-52.8,-50.2,-38.3,-56.1C-23.7,-62,-11.8,-68.7,0,-68.6C11.8,-68.6,23.5,-61.7,37.1,-55.4Z;
                M44.8,-68C58.1,-61.1,69,-48.8,76.3,-34.4C83.6,-20,87.4,-3.4,83.4,10.7C79.4,24.9,67.6,36.7,55.4,44.6C43.2,52.6,30.5,56.7,16.8,63.6C3.1,70.5,-11.6,80.2,-23.6,77.8C-35.6,75.5,-44.9,61.2,-56.4,48.6C-67.9,35.9,-81.6,24.8,-86.7,10.5C-91.7,-3.8,-88.2,-21.2,-79.3,-34.3C-70.4,-47.4,-56,-56.1,-41.9,-62.7C-27.8,-69.2,-13.9,-73.5,0.9,-75C15.7,-76.4,31.4,-74.9,44.8,-68Z;
                M48.4,-76.5C61.9,-66.7,71.3,-51.8,77.6,-36C83.9,-20.3,86.9,-3.7,84.5,12C82,27.7,73.9,42.4,63.6,56C53.2,69.7,40.5,82.2,25.2,87.6C9.8,92.9,-8.2,91.1,-23.7,84.7C-39.2,78.3,-52.2,67.4,-64.3,54.9C-76.4,42.4,-87.5,28.3,-90.6,12.5C-93.7,-3.3,-88.9,-20.9,-79.5,-34.2C-70.1,-47.5,-56.2,-56.6,-42.2,-66.2C-28.2,-75.8,-14.1,-85.9,1.7,-88.5C17.5,-91.1,35,-86.4,48.4,-76.5Z;
                "
              >
            </animate>
          </path>
        </svg>,
  ];

  const animatedSelectedBlobVariations: React.ReactNode[] = [
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="">
    <defs>
      <linearGradient id="iconGradient" gradientTransform="rotate(90)">
        <stop offset="0%" stop-color="#9ECB98" />
        <stop offset="100%" stop-color="#7DA577" />
      </linearGradient>
    </defs>
    <path fill="#4F1EB0" transform="translate(100 100)">
    <animate attributeName="d"
        dur="10000ms"
        repeatCount="indefinite"
        values="
        M34.9,-55.1C44.6,-48.1,51.4,-37.3,60.3,-25.3C69.2,-13.4,80.1,-0.1,79.5,12.2C78.9,24.5,66.8,36,55.4,46.5C43.9,56.9,33.1,66.5,20.5,70.6C7.8,74.7,-6.7,73.4,-18.7,67.9C-30.7,62.4,-40.2,52.7,-51.8,42.9C-63.3,33.1,-77,23,-82.3,9.6C-87.7,-3.8,-84.9,-20.6,-76.7,-33.6C-68.6,-46.6,-55.1,-55.7,-41.5,-60.9C-27.8,-66.1,-13.9,-67.3,-0.6,-66.3C12.6,-65.3,25.2,-62.1,34.9,-55.1Z;
          M48.4,-76.5C61.9,-66.7,71.3,-51.8,77.6,-36C83.9,-20.3,86.9,-3.7,84.5,12C82,27.7,73.9,42.4,63.6,56C53.2,69.7,40.5,82.2,25.2,87.6C9.8,92.9,-8.2,91.1,-23.7,84.7C-39.2,78.3,-52.2,67.4,-64.3,54.9C-76.4,42.4,-87.5,28.3,-90.6,12.5C-93.7,-3.3,-88.9,-20.9,-79.5,-34.2C-70.1,-47.5,-56.2,-56.6,-42.2,-66.2C-28.2,-75.8,-14.1,-85.9,1.7,-88.5C17.5,-91.1,35,-86.4,48.4,-76.5Z;
          M41.9,-66.3C53.7,-57.6,62.2,-45,70.2,-31C78.1,-17.1,85.4,-1.9,84.8,13.3C84.3,28.4,75.9,43.5,64.2,53.9C52.5,64.4,37.4,70.3,21.6,76.2C5.7,82.1,-10.9,88,-24.1,83.5C-37.3,79,-47,64.1,-57.9,50.7C-68.8,37.2,-80.9,25.3,-86.1,10.4C-91.2,-4.5,-89.5,-22.3,-80.8,-35.1C-72.2,-47.9,-56.5,-55.7,-41.8,-63.1C-27.2,-70.5,-13.6,-77.5,0.7,-78.7C15,-79.8,30.1,-75,41.9,-66.3Z;
          M37.1,-55.4C50.6,-49,66,-43.1,70.5,-32.4C75,-21.8,68.6,-6.4,65.9,9.1C63.1,24.7,63.9,40.4,57.1,51C50.3,61.7,35.8,67.2,21.9,68.6C7.9,70.1,-5.6,67.5,-19.2,64.1C-32.9,60.7,-46.8,56.6,-56.6,47.7C-66.4,38.8,-72.1,25,-76.5,9.6C-81,-5.9,-84.3,-22.9,-77.2,-34C-70.2,-45.1,-52.8,-50.2,-38.3,-56.1C-23.7,-62,-11.8,-68.7,0,-68.6C11.8,-68.6,23.5,-61.7,37.1,-55.4Z;
          M44.8,-68C58.1,-61.1,69,-48.8,76.3,-34.4C83.6,-20,87.4,-3.4,83.4,10.7C79.4,24.9,67.6,36.7,55.4,44.6C43.2,52.6,30.5,56.7,16.8,63.6C3.1,70.5,-11.6,80.2,-23.6,77.8C-35.6,75.5,-44.9,61.2,-56.4,48.6C-67.9,35.9,-81.6,24.8,-86.7,10.5C-91.7,-3.8,-88.2,-21.2,-79.3,-34.3C-70.4,-47.4,-56,-56.1,-41.9,-62.7C-27.8,-69.2,-13.9,-73.5,0.9,-75C15.7,-76.4,31.4,-74.9,44.8,-68Z;
          M34.9,-55.1C44.6,-48.1,51.4,-37.3,60.3,-25.3C69.2,-13.4,80.1,-0.1,79.5,12.2C78.9,24.5,66.8,36,55.4,46.5C43.9,56.9,33.1,66.5,20.5,70.6C7.8,74.7,-6.7,73.4,-18.7,67.9C-30.7,62.4,-40.2,52.7,-51.8,42.9C-63.3,33.1,-77,23,-82.3,9.6C-87.7,-3.8,-84.9,-20.6,-76.7,-33.6C-68.6,-46.6,-55.1,-55.7,-41.5,-60.9C-27.8,-66.1,-13.9,-67.3,-0.6,-66.3C12.6,-65.3,25.2,-62.1,34.9,-55.1Z;
          "
        >
      </animate>
    </path>
  </svg>,
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="">
      <defs>
        <linearGradient id="iconGradient" gradientTransform="rotate(90)">
          <stop offset="0%" stop-color="#9ECB98" />
          <stop offset="100%" stop-color="#7DA577" />
        </linearGradient>
      </defs>
      <path fill="#4F1EB0" transform="translate(100 100)">
      <animate attributeName="d"
          dur="10000ms"
          repeatCount="indefinite"
          values="
          M44.8,-68C58.1,-61.1,69,-48.8,76.3,-34.4C83.6,-20,87.4,-3.4,83.4,10.7C79.4,24.9,67.6,36.7,55.4,44.6C43.2,52.6,30.5,56.7,16.8,63.6C3.1,70.5,-11.6,80.2,-23.6,77.8C-35.6,75.5,-44.9,61.2,-56.4,48.6C-67.9,35.9,-81.6,24.8,-86.7,10.5C-91.7,-3.8,-88.2,-21.2,-79.3,-34.3C-70.4,-47.4,-56,-56.1,-41.9,-62.7C-27.8,-69.2,-13.9,-73.5,0.9,-75C15.7,-76.4,31.4,-74.9,44.8,-68Z;
          M34.9,-55.1C44.6,-48.1,51.4,-37.3,60.3,-25.3C69.2,-13.4,80.1,-0.1,79.5,12.2C78.9,24.5,66.8,36,55.4,46.5C43.9,56.9,33.1,66.5,20.5,70.6C7.8,74.7,-6.7,73.4,-18.7,67.9C-30.7,62.4,-40.2,52.7,-51.8,42.9C-63.3,33.1,-77,23,-82.3,9.6C-87.7,-3.8,-84.9,-20.6,-76.7,-33.6C-68.6,-46.6,-55.1,-55.7,-41.5,-60.9C-27.8,-66.1,-13.9,-67.3,-0.6,-66.3C12.6,-65.3,25.2,-62.1,34.9,-55.1Z;
            M48.4,-76.5C61.9,-66.7,71.3,-51.8,77.6,-36C83.9,-20.3,86.9,-3.7,84.5,12C82,27.7,73.9,42.4,63.6,56C53.2,69.7,40.5,82.2,25.2,87.6C9.8,92.9,-8.2,91.1,-23.7,84.7C-39.2,78.3,-52.2,67.4,-64.3,54.9C-76.4,42.4,-87.5,28.3,-90.6,12.5C-93.7,-3.3,-88.9,-20.9,-79.5,-34.2C-70.1,-47.5,-56.2,-56.6,-42.2,-66.2C-28.2,-75.8,-14.1,-85.9,1.7,-88.5C17.5,-91.1,35,-86.4,48.4,-76.5Z;
            M41.9,-66.3C53.7,-57.6,62.2,-45,70.2,-31C78.1,-17.1,85.4,-1.9,84.8,13.3C84.3,28.4,75.9,43.5,64.2,53.9C52.5,64.4,37.4,70.3,21.6,76.2C5.7,82.1,-10.9,88,-24.1,83.5C-37.3,79,-47,64.1,-57.9,50.7C-68.8,37.2,-80.9,25.3,-86.1,10.4C-91.2,-4.5,-89.5,-22.3,-80.8,-35.1C-72.2,-47.9,-56.5,-55.7,-41.8,-63.1C-27.2,-70.5,-13.6,-77.5,0.7,-78.7C15,-79.8,30.1,-75,41.9,-66.3Z;
            M37.1,-55.4C50.6,-49,66,-43.1,70.5,-32.4C75,-21.8,68.6,-6.4,65.9,9.1C63.1,24.7,63.9,40.4,57.1,51C50.3,61.7,35.8,67.2,21.9,68.6C7.9,70.1,-5.6,67.5,-19.2,64.1C-32.9,60.7,-46.8,56.6,-56.6,47.7C-66.4,38.8,-72.1,25,-76.5,9.6C-81,-5.9,-84.3,-22.9,-77.2,-34C-70.2,-45.1,-52.8,-50.2,-38.3,-56.1C-23.7,-62,-11.8,-68.7,0,-68.6C11.8,-68.6,23.5,-61.7,37.1,-55.4Z;
            M44.8,-68C58.1,-61.1,69,-48.8,76.3,-34.4C83.6,-20,87.4,-3.4,83.4,10.7C79.4,24.9,67.6,36.7,55.4,44.6C43.2,52.6,30.5,56.7,16.8,63.6C3.1,70.5,-11.6,80.2,-23.6,77.8C-35.6,75.5,-44.9,61.2,-56.4,48.6C-67.9,35.9,-81.6,24.8,-86.7,10.5C-91.7,-3.8,-88.2,-21.2,-79.3,-34.3C-70.4,-47.4,-56,-56.1,-41.9,-62.7C-27.8,-69.2,-13.9,-73.5,0.9,-75C15.7,-76.4,31.4,-74.9,44.8,-68Z;
            "
          >
        </animate>
      </path>
    </svg>,
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="">
        <defs>
          <linearGradient id="iconGradient" gradientTransform="rotate(90)">
            <stop offset="0%" stop-color="#9ECB98" />
            <stop offset="100%" stop-color="#7DA577" />
          </linearGradient>
        </defs>
        <path fill="#4F1EB0" transform="translate(100 100)">
        <animate attributeName="d"
            dur="10000ms"
            repeatCount="indefinite"
            values="
            M37.1,-55.4C50.6,-49,66,-43.1,70.5,-32.4C75,-21.8,68.6,-6.4,65.9,9.1C63.1,24.7,63.9,40.4,57.1,51C50.3,61.7,35.8,67.2,21.9,68.6C7.9,70.1,-5.6,67.5,-19.2,64.1C-32.9,60.7,-46.8,56.6,-56.6,47.7C-66.4,38.8,-72.1,25,-76.5,9.6C-81,-5.9,-84.3,-22.9,-77.2,-34C-70.2,-45.1,-52.8,-50.2,-38.3,-56.1C-23.7,-62,-11.8,-68.7,0,-68.6C11.8,-68.6,23.5,-61.7,37.1,-55.4Z;
            M34.9,-55.1C44.6,-48.1,51.4,-37.3,60.3,-25.3C69.2,-13.4,80.1,-0.1,79.5,12.2C78.9,24.5,66.8,36,55.4,46.5C43.9,56.9,33.1,66.5,20.5,70.6C7.8,74.7,-6.7,73.4,-18.7,67.9C-30.7,62.4,-40.2,52.7,-51.8,42.9C-63.3,33.1,-77,23,-82.3,9.6C-87.7,-3.8,-84.9,-20.6,-76.7,-33.6C-68.6,-46.6,-55.1,-55.7,-41.5,-60.9C-27.8,-66.1,-13.9,-67.3,-0.6,-66.3C12.6,-65.3,25.2,-62.1,34.9,-55.1Z;
              M48.4,-76.5C61.9,-66.7,71.3,-51.8,77.6,-36C83.9,-20.3,86.9,-3.7,84.5,12C82,27.7,73.9,42.4,63.6,56C53.2,69.7,40.5,82.2,25.2,87.6C9.8,92.9,-8.2,91.1,-23.7,84.7C-39.2,78.3,-52.2,67.4,-64.3,54.9C-76.4,42.4,-87.5,28.3,-90.6,12.5C-93.7,-3.3,-88.9,-20.9,-79.5,-34.2C-70.1,-47.5,-56.2,-56.6,-42.2,-66.2C-28.2,-75.8,-14.1,-85.9,1.7,-88.5C17.5,-91.1,35,-86.4,48.4,-76.5Z;
              M41.9,-66.3C53.7,-57.6,62.2,-45,70.2,-31C78.1,-17.1,85.4,-1.9,84.8,13.3C84.3,28.4,75.9,43.5,64.2,53.9C52.5,64.4,37.4,70.3,21.6,76.2C5.7,82.1,-10.9,88,-24.1,83.5C-37.3,79,-47,64.1,-57.9,50.7C-68.8,37.2,-80.9,25.3,-86.1,10.4C-91.2,-4.5,-89.5,-22.3,-80.8,-35.1C-72.2,-47.9,-56.5,-55.7,-41.8,-63.1C-27.2,-70.5,-13.6,-77.5,0.7,-78.7C15,-79.8,30.1,-75,41.9,-66.3Z;
              M44.8,-68C58.1,-61.1,69,-48.8,76.3,-34.4C83.6,-20,87.4,-3.4,83.4,10.7C79.4,24.9,67.6,36.7,55.4,44.6C43.2,52.6,30.5,56.7,16.8,63.6C3.1,70.5,-11.6,80.2,-23.6,77.8C-35.6,75.5,-44.9,61.2,-56.4,48.6C-67.9,35.9,-81.6,24.8,-86.7,10.5C-91.7,-3.8,-88.2,-21.2,-79.3,-34.3C-70.4,-47.4,-56,-56.1,-41.9,-62.7C-27.8,-69.2,-13.9,-73.5,0.9,-75C15.7,-76.4,31.4,-74.9,44.8,-68Z;
              M37.1,-55.4C50.6,-49,66,-43.1,70.5,-32.4C75,-21.8,68.6,-6.4,65.9,9.1C63.1,24.7,63.9,40.4,57.1,51C50.3,61.7,35.8,67.2,21.9,68.6C7.9,70.1,-5.6,67.5,-19.2,64.1C-32.9,60.7,-46.8,56.6,-56.6,47.7C-66.4,38.8,-72.1,25,-76.5,9.6C-81,-5.9,-84.3,-22.9,-77.2,-34C-70.2,-45.1,-52.8,-50.2,-38.3,-56.1C-23.7,-62,-11.8,-68.7,0,-68.6C11.8,-68.6,23.5,-61.7,37.1,-55.4Z;
              "
            >
          </animate>
        </path>
      </svg>,
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="">
          <defs>
            <linearGradient id="iconGradient" gradientTransform="rotate(90)">
              <stop offset="0%" stop-color="#9ECB98" />
              <stop offset="100%" stop-color="#7DA577" />
            </linearGradient>
          </defs>
          <path fill="#4F1EB0" transform="translate(100 100)">
          <animate attributeName="d"
              dur="10000ms"
              repeatCount="indefinite"
              values="
              M48.4,-76.5C61.9,-66.7,71.3,-51.8,77.6,-36C83.9,-20.3,86.9,-3.7,84.5,12C82,27.7,73.9,42.4,63.6,56C53.2,69.7,40.5,82.2,25.2,87.6C9.8,92.9,-8.2,91.1,-23.7,84.7C-39.2,78.3,-52.2,67.4,-64.3,54.9C-76.4,42.4,-87.5,28.3,-90.6,12.5C-93.7,-3.3,-88.9,-20.9,-79.5,-34.2C-70.1,-47.5,-56.2,-56.6,-42.2,-66.2C-28.2,-75.8,-14.1,-85.9,1.7,-88.5C17.5,-91.1,35,-86.4,48.4,-76.5Z;
              M34.9,-55.1C44.6,-48.1,51.4,-37.3,60.3,-25.3C69.2,-13.4,80.1,-0.1,79.5,12.2C78.9,24.5,66.8,36,55.4,46.5C43.9,56.9,33.1,66.5,20.5,70.6C7.8,74.7,-6.7,73.4,-18.7,67.9C-30.7,62.4,-40.2,52.7,-51.8,42.9C-63.3,33.1,-77,23,-82.3,9.6C-87.7,-3.8,-84.9,-20.6,-76.7,-33.6C-68.6,-46.6,-55.1,-55.7,-41.5,-60.9C-27.8,-66.1,-13.9,-67.3,-0.6,-66.3C12.6,-65.3,25.2,-62.1,34.9,-55.1Z;
                M41.9,-66.3C53.7,-57.6,62.2,-45,70.2,-31C78.1,-17.1,85.4,-1.9,84.8,13.3C84.3,28.4,75.9,43.5,64.2,53.9C52.5,64.4,37.4,70.3,21.6,76.2C5.7,82.1,-10.9,88,-24.1,83.5C-37.3,79,-47,64.1,-57.9,50.7C-68.8,37.2,-80.9,25.3,-86.1,10.4C-91.2,-4.5,-89.5,-22.3,-80.8,-35.1C-72.2,-47.9,-56.5,-55.7,-41.8,-63.1C-27.2,-70.5,-13.6,-77.5,0.7,-78.7C15,-79.8,30.1,-75,41.9,-66.3Z;
                M37.1,-55.4C50.6,-49,66,-43.1,70.5,-32.4C75,-21.8,68.6,-6.4,65.9,9.1C63.1,24.7,63.9,40.4,57.1,51C50.3,61.7,35.8,67.2,21.9,68.6C7.9,70.1,-5.6,67.5,-19.2,64.1C-32.9,60.7,-46.8,56.6,-56.6,47.7C-66.4,38.8,-72.1,25,-76.5,9.6C-81,-5.9,-84.3,-22.9,-77.2,-34C-70.2,-45.1,-52.8,-50.2,-38.3,-56.1C-23.7,-62,-11.8,-68.7,0,-68.6C11.8,-68.6,23.5,-61.7,37.1,-55.4Z;
                M44.8,-68C58.1,-61.1,69,-48.8,76.3,-34.4C83.6,-20,87.4,-3.4,83.4,10.7C79.4,24.9,67.6,36.7,55.4,44.6C43.2,52.6,30.5,56.7,16.8,63.6C3.1,70.5,-11.6,80.2,-23.6,77.8C-35.6,75.5,-44.9,61.2,-56.4,48.6C-67.9,35.9,-81.6,24.8,-86.7,10.5C-91.7,-3.8,-88.2,-21.2,-79.3,-34.3C-70.4,-47.4,-56,-56.1,-41.9,-62.7C-27.8,-69.2,-13.9,-73.5,0.9,-75C15.7,-76.4,31.4,-74.9,44.8,-68Z;
                M48.4,-76.5C61.9,-66.7,71.3,-51.8,77.6,-36C83.9,-20.3,86.9,-3.7,84.5,12C82,27.7,73.9,42.4,63.6,56C53.2,69.7,40.5,82.2,25.2,87.6C9.8,92.9,-8.2,91.1,-23.7,84.7C-39.2,78.3,-52.2,67.4,-64.3,54.9C-76.4,42.4,-87.5,28.3,-90.6,12.5C-93.7,-3.3,-88.9,-20.9,-79.5,-34.2C-70.1,-47.5,-56.2,-56.6,-42.2,-66.2C-28.2,-75.8,-14.1,-85.9,1.7,-88.5C17.5,-91.1,35,-86.4,48.4,-76.5Z;
                "
              >
            </animate>
          </path>
        </svg>,
  ];

  let prevSelectedIndex: number | null = null;

  /*const RandomSelectedBlob = React.memo(() => {
    let randomBlobIndex = Math.floor(Math.random() * selectedBlobVariations.length);
  
    while (randomBlobIndex === prevSelectedIndex) {
      randomBlobIndex = Math.floor(Math.random() * selectedBlobVariations.length);
    }

    prevSelectedIndex = randomBlobIndex;
  
    return selectedBlobVariations[randomBlobIndex];
  });*/
  
  const RandomBlob = React.memo(() => {
    const randomBlobIndex = Math.floor(Math.random() * blobVariations.length);
    return blobVariations[randomBlobIndex];
  });
  const RandomAnimatedBlob = React.memo(() => {
    const randomBlobIndex = Math.floor(Math.random() * animatedBlobVariations.length);
    return animatedBlobVariations[randomBlobIndex];
  });


  const RandomAnimatedSelectedBlob = React.memo(() => {
    const randomBlobIndex = Math.floor(Math.random() * animatedSelectedBlobVariations.length);
    return animatedSelectedBlobVariations[randomBlobIndex];
  });



    
  
  
  export { RandomBlob, RandomAnimatedSelectedBlob, RandomAnimatedBlob};
