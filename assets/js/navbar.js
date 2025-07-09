
document.addEventListener('DOMContentLoaded', () => {
  //Start homepage Slideshow script
  const homeSlides = document.querySelectorAll('.home_slide');
  const homeDots = document.querySelectorAll('.home_dot');
  let currentHome = 0;
  let homeTimer;
  const homeDelay = 5000;

  const showHomeSlide = index =>{
    homeSlides.forEach((slide, i) => {
    slide.style.opacity = i === index ? '1':'0';
    homeDots[i].classList.toggle('opacity-100', i === index);
    homeDots[i].classList.toggle('opacity-60', i !== index);
    });
    currentHome = index
  };
      
  const nextHomeSlide = () => showHomeSlide((currentHome + 1) % homeSlides.length);
  const prevHomeSlide = () => showHomeSlide((currentHome - 1 + homeSlides.length) % homeSlides.length);

  document.getElementById('homeNextBtn').onclick = nextHomeSlide;
  document.getElementById('homePrevBtn').onclick = prevHomeSlide;
  homeDots.forEach((dot, i) => dot.addEventListener('click', () => showHomeSlide(i)));

  const startHomeTimer = () => homeTimer = setInterval(nextHomeSlide, homeDelay);
  const stopHomeTimer = () => clearInterval(homeTimer);

  const homeSlideshow = document.getElementById('home_slideshow');
  homeSlideshow.addEventListener('mouseenter', stopHomeTimer);
  homeSlideshow.addEventListener('mouseleave', startHomeTimer);

  showHomeSlide(0);
  startHomeTimer();
  //end homepage slideshow script
  //start dropdown slide show script
  const dropdownSlides = document.querySelectorAll('.dropdown-slide');
  let currentDropdown = 0;
  const dropdownDelay = 4000;

  function showDropdownSlide(index) {
    dropdownSlides.forEach((slide, i) => {
      slide.style.opacity = i === index ? '1' : '0';
    });
    currentDropdown = index;
  }

  function nextDropdownSlide() {
    showDropdownSlide((currentDropdown + 1) % dropdownSlides.length);
  }

  function startDropdownTimer() {
    return setInterval(nextDropdownSlide, dropdownDelay);
  }

  showDropdownSlide(0);
  const dropdownTimer = startDropdownTimer();
  //end dropdwown slideshow menu
  //start dynamic padding
  const nav = document.getElementById('nav');
  const contentPadding = document.getElementById('content-padding');
  let lastScrollY = window.scrollY;

  // Function to update top padding dynamically based on nav height
  function updateContentPadding() {
    const navHeight = nav.offsetHeight;
    contentPadding.style.height = navHeight + 'px';
  }
  // Call once on load
  updateContentPadding();
  // Also update on resize in case nav size changes
  window.addEventListener('resize', updateContentPadding);
  //end dynamic padding
  //start nav bar scroll
  let lastScroll = 0;

  const hideShowNav = () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    const threshold = window.innerHeight * 0.5;

    console.log({ currentScroll, lastScroll, threshold }); // Debug: check scroll values

    if (currentScroll > threshold) {
      if (currentScroll > lastScroll) {
        // scrolling down
        nav.style.transform = 'translateY(-100%)';
      } else {
        // scrolling up
        nav.style.transform = 'translateY(0)';
      }
    } else {
      nav.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll <= 0 ? 0 : currentScroll;
  };

  window.addEventListener('scroll', hideShowNav);
  //end nav bar scroll
  //start destinations mega menu
  const group = document.querySelector('.group'); // Destinations nav item
  const dropdown = document.getElementById('destinations-dropdown');

  let isInNav = false;
  let isInDropdown = false;

  // When mouse enters anywhere in nav, flag true and show submenu if over Destinations
  nav.addEventListener('mouseenter', () => {
    isInNav = true;
    // Optionally show submenu only if mouse is currently on Destinations
    // But since user wants it open on nav hover, we can keep it open if hovered Destinations
  });

  // When mouse leaves nav, flag false and hide submenu if not in dropdown
  nav.addEventListener('mouseleave', () => {
    isInNav = false;
    if (!isInDropdown) {
      dropdown.classList.add('hidden');
    }
  });

  // When mouse enters Destinations group, show submenu
  group.addEventListener('mouseenter', () => {
    dropdown.classList.remove('hidden');
  });

  // When mouse leaves Destinations group, check if still in nav or dropdown
  group.addEventListener('mouseleave', () => {
    if (!isInDropdown && !isInNav) {
      dropdown.classList.add('hidden');
    }
  });

  // When mouse enters dropdown, flag true and keep submenu visible
  dropdown.addEventListener('mouseenter', () => {
    isInDropdown = true;
    dropdown.classList.remove('hidden');
  });

  // When mouse leaves dropdown, flag false and hide submenu if not in nav
  dropdown.addEventListener('mouseleave', () => {
    isInDropdown = false;
    if (!isInNav) {
      dropdown.classList.add('hidden');
    }
  });

  const navLinks = nav.querySelectorAll('#nav-links > a:not(.group)');

  navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      dropdown.classList.add('hidden');
    });
  });
  //end destinations mega menu
  //start mobile menu toggle
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  hamburgerBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
  //end mobile menu toggle
  //start mobile destinations dropdown toggle
  const mobileDestBtn = document.getElementById('mobile-destinations-btn');
  const mobileDestDropdown = document.getElementById('mobile-destinations-dropdown');
  const mobileDestIcon = document.getElementById('mobile-destinations-icon');

  mobileDestBtn.addEventListener('click', () => {
    const isHidden = mobileDestDropdown.classList.contains('hidden');
    if (isHidden) {
      mobileDestDropdown.classList.remove('hidden');
      mobileDestIcon.style.transform = 'rotate(180deg)'; // flip arrow up
    } else {
      mobileDestDropdown.classList.add('hidden');
      mobileDestIcon.style.transform = 'rotate(0deg)'; // arrow down
    }
  });
  //end mobile destinations dropdown toggle
})