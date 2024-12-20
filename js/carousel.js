// Carousel functionality
document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('.carousel');
  let progress = 50;
  let startX = 0;
  let active = 0;
  let isDown = false;

  // Constants
  const speedWheel = 0.02;
  const speedDrag = -0.1;

  // Initialize carousel items
  function initializeCarousel() {
    carouselData.forEach((item, index) => {
      const carouselItem = document.createElement('div');
      carouselItem.className = 'carousel-item';
      carouselItem.innerHTML = `
        <div class="carousel-box">
          <div class="title">${item.title}</div>
          <div class="num">${item.number}</div>
          <video class="d-block w-100" src="${item.videoUrl}" autoplay loop muted></video>
        </div>
      `;
      carousel.appendChild(carouselItem);
    });
  }

  // Get z-index for items
  function getZindex(array, index) {
    return array.map((_, i) => (index === i) ? array.length : array.length - Math.abs(index - i));
  }

  // Display items with proper positioning
  function displayItems(item, index, active) {
    const items = [...document.querySelectorAll('.carousel-item')];
    const zIndex = getZindex(items, active)[index];
    item.style.setProperty('--zIndex', zIndex);
    item.style.setProperty('--active', (index-active)/items.length);
  }

  // Animate carousel
  function animate() {
    const items = document.querySelectorAll('.carousel-item');
    progress = Math.max(0, Math.min(progress, 100));
    active = Math.floor(progress/100*(items.length-1));
    
    items.forEach((item, index) => displayItems(item, index, active));
  }

  // Event handlers
  function handleWheel(e) {
    const wheelProgress = e.deltaY * speedWheel;
    progress = progress + wheelProgress;
    animate();
  }

  function handleMouseDown(e) {
    isDown = true;
    startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
  }

  function handleMouseUp() {
    isDown = false;
  }

  function handleMouseMove(e) {
    if (!isDown) return;
    const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const mouseProgress = (x - startX) * speedDrag;
    progress = progress + mouseProgress;
    startX = x;
    animate();
  }

  // Initialize and set up event listeners
  initializeCarousel();
  animate();

  // Add event listeners
  document.addEventListener('mousewheel', handleWheel);
  document.addEventListener('mousedown', handleMouseDown);
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
  document.addEventListener('touchstart', handleMouseDown);
  document.addEventListener('touchmove', handleMouseMove);
  document.addEventListener('touchend', handleMouseUp);

  // Click handler for items
  const items = document.querySelectorAll('.carousel-item');
  items.forEach((item, i) => {
    item.addEventListener('click', () => {
      progress = (i/items.length) * 100 + 10;
      animate();
    });
  });
});