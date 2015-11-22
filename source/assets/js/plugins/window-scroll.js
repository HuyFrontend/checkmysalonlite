
// item.addEventListener('click', function(){
//   smoothScrollTo(document.getElementById('Sau_chi.E1.BA.BFn_tranh'), 10000);
// });

window.smoothScrollTo = ( function () {
  var timer, start, factor;
  
  return function (targetElement, duration) {

    var target = targetElement.offsetTop,
        offset = window.pageYOffset,
        delta  = target - offset; // Y-offset difference
    duration = duration || 1000;              // default 1 sec animation
    start = Date.now();                       // get start time
    factor = 0;
    
    if( timer ) {
      clearInterval( timer ); // stop any running animations
    }
    
    function step() {
      var y;
      factor = ( Date.now() - start ) / duration; // get interpolation factor
      if( factor >= 1 ) {
        clearInterval( timer ); // stop animation
        factor = 1;           // clip to max 1.0
      } 
      y = factor * delta + offset;
      window.scrollBy( 0, y - window.pageYOffset );
    }
    
    timer = setInterval( step, 10 );
    return timer;
  };
}());
