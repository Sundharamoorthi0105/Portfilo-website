$(window).on('load',function(){
  gsap.to('#loader',1,{y:"-100%"});
  gsap.to('#loader',1,{opacity:0});
  gsap.to('#loader',0,{display:"none",delay:2});
  gsap.to('#header',0,{display:"block",delay:1})
  gsap.to('#navigation-content',0,{display:"none"});
  gsap.to('#navigation-content',0,{display:"flex",delay:1});
})
$(function(){
  $('.color-panel').on("click",function(e) {
    e.preventDefault();
    $('.color-changer').toggleClass('color-changer-active');
});
$('.colors a').on("click",function(e) {
  e.preventDefault();
  var attr = $(this).attr("title");
  console.log(attr);
  $('head').append('<link rel="stylesheet" href="css/'+attr+'.css">');
});
});
$(function(){
     $('.menubar').on('click',function(){
         gsap.to('#navigation-content',.6,{y:0});
     })
     $('.navigation-close').on('click',function(){
        gsap.to('#navigation-content',.6,{y:"-100%"});
    });
   }); 

$(function(){
    var TxtRotate = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
      };
      
      TxtRotate.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];
      
        if (this.isDeleting) {
          this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
          this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
      
        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
      
        var that = this;
        var delta = 200 - Math.random() * 100;
      
        if (this.isDeleting) { delta /= 2; }
      
        if (!this.isDeleting && this.txt === fullTxt) {
          delta = this.period;
          this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
          this.isDeleting = false;
          this.loopNum++;
          delta = 100;
        }
      
        setTimeout(function() {
          that.tick();
        }, delta);
      };
      
      window.onload = function() {
        var elements = document.getElementsByClassName('txt-rotate');
        for (var i=0; i<elements.length; i++) {
          var toRotate = elements[i].getAttribute('data-rotate');
          var period = elements[i].getAttribute('data-period');
          if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
          }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".txt-rotate > .wrap { border-right: 0em solid #666 ; }";
        document.body.appendChild(css);
      };
})




$(function() {
  // Smooth scroll to sections with GSAP
  $('.navigation-links a').on('click', function(e) {
    e.preventDefault(); // Prevent default anchor behavior
    
    var targetId = $(this).attr('href'); // Get the target section ID
    var targetSection = $(targetId); // Get the target section element
    
    // Hide navigation content and display the breaker effect
    gsap.to('#navigation-content', 0.6, { y: '-100%', display: 'none' });
    gsap.to('#breaker', 0, { display: 'block' });
    gsap.to('#breaker-two', 0, { display: 'block', delay: 0.1 });
    
    // Hide the breaker effect after 2 seconds
    gsap.to('#breaker', 0, { display: 'none', delay: 2 });
    gsap.to('#breaker-two', 0, { display: 'none', delay: 2 });
    
    // Scroll to the target section smoothly
    $('html, body').animate({ scrollTop: targetSection.offset().top }, 800, function() {
      // Show navigation content after scrolling
      gsap.to('#navigation-content', 0, { display: 'flex', delay: 2 });
    });
  });


  // $(window).on('load', function() {
  //   // Scroll to the top of the #header when the page is loaded
  //   $('html, body').animate({ scrollTop: $('').offset().top }, 0);
  // });


  

  
  // Cursor effects
  var $cursor = $('.cursor');
  function cursormover(e) {
    gsap.to($cursor, {
      x: e.clientX,
      y: e.clientY,
      stagger: 0.002
    });
  }
  function cursorhover() {
    gsap.to($cursor, {
      scale: 1.4,
      opacity: 1
    });
  }
  function cursor() {
    gsap.to($cursor, {
      scale: 1,
      opacity: 0.6
    });
  }
  $(window).on('mousemove', cursormover);
  $('.menubar').hover(cursorhover, cursor);
  $('a').hover(cursorhover, cursor);
  $('.navigation-close').hover(cursorhover, cursor);
});



// for down arrow
$(document).ready(function () {
  $('#scroll-down-arrow').on('click', function (e) {
      e.preventDefault(); // Prevent the default anchor behavior

      $('html, body').animate({
          scrollTop: $('#about').offset().top
      }, 1000); // Adjust the duration for the scroll effect (in milliseconds)
  });
});


