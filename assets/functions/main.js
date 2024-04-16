document.addEventListener('DOMContentLoaded', function () {
    const circle = document.getElementById('circle');
  
    document.addEventListener('mousemove', function (e) {
        const x = e.clientX;
        const y = e.clientY;
  
        const circleSize = parseInt(window.getComputedStyle(circle).getPropertyValue('width'), 10);
        const halfCircleSize = circleSize / 2;
  
        circle.style.left = x - halfCircleSize + 'px'; 
        circle.style.top = y - halfCircleSize + 'px'; 
    });
  });