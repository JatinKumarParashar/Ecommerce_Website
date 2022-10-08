const container=document.getElementsByClassName('image-container');
const img=document.querySelector('img');
console.log('123',container);
console.log('456',img);

container.addEventListener('mousemove',(e)=>{
    const x=e.clientX-e.target.offsetLeft;
    const y=e.clientY-e.target.offsetTop;
    img.style.transformOrigin=`${x}px ${y}px`;
    img.style.transform='scale(2)';
});

container.addEventListener('mouseleave',(e)=>{
    img.style.transformOrigin = "center center";
    img.style.transform = "scale(1)";
});

