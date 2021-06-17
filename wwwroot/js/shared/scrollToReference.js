export default function scrollToReference(pageReferncePoint){
    window.scrollTo({
        top: pageReferncePoint.current.offsetTop,
        left: 0,
        behavior: 'smooth'
    });
}