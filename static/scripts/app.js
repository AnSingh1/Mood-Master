//navbar
// When the user scrolls the page, execute myFunction
window.onscroll = function() {addClass()};

// Get the navbar
var navbar = document.getElementById("navbar");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;


// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function addClass() {
  if (window.scrollY >= sticky) {
    navbar.classList.add("sticky");
    
  } else {
    navbar.classList.remove("sticky");
  }
}




const items = []; // Array of class names or selectors
items.push(".scanim")



items.forEach((item) => {
  active(item);
})

window.addEventListener('scroll', function() {
  // Call the active function here with the desired class name
  items.forEach((item) => {
    active(item);
  })
});




function active(className) {

    item = document.querySelectorAll(className);
    const Bottom_Bound = window.innerHeight / 5 * 4;
    item.forEach((box) => {
      let Upper_Bound = box.getBoundingClientRect().top;

      if (box.classList.contains('container')){
        //Upper_Bound += 550;
      }
  
      if (Upper_Bound < Bottom_Bound) {
        box.classList.add('active');

        classList = 'classList' in box;
        for (var i = 0; i < box.children.length; i++) {
            var child = box.children[i];
            child.classList.add('active');
            console.log(child)
        }
      } 
    });
  }
window.addEventListener('scroll', function() {
  
});



var logoText = document.querySelector('.logo-text');
var currentPosition = 100;
var animationDuration = 2000;
var delay = 2000;


time_per_scroll = 1000

// Disable scrolling on the document body
document.body.style.overflowX = 'hidden';

setTimeout(function() {
  animate();
}, delay);

function animate() {
  currentPosition--;

  logoText.style.transition = 'left ' + time_per_scroll + 'ms cubic-bezier(.32,.88,.61,1)';
  logoText.style.left = currentPosition + '%';

  if (currentPosition > 50) {
    requestAnimationFrame(animate);
  }
}
