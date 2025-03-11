document.addEventListener('DOMContentLoaded', () => {
  // Configuration for dynamic content
  const friendName = 'Jayasankar'; // Replace with actual name
  
  // Update page title and headers
  document.title = `Happy Birthday, ${friendName}!`;
  document.querySelectorAll('.highlight').forEach(el => {
    el.textContent = friendName;
  });

  // Audio control
  const birthdaySong = document.getElementById('birthday-song');
  const soundToggle = document.getElementById('sound-toggle');
  
  soundToggle.addEventListener('click', () => {
    if (birthdaySong.paused) {
      birthdaySong.play();
      soundToggle.innerHTML = '🔊 Mute Music';
    } else {
      birthdaySong.pause();
      soundToggle.innerHTML = '🔈 Play Birthday Music';
    }
  });

  // Age Counter Animation
  const ageCounter = document.getElementById('age-counter');
  let age = 0;
  const targetAge = 21; // Update with actual age
  
  const ageInterval = setInterval(() => {
    ageCounter.textContent = age;
    age++;
    
    if (age > targetAge) {
      clearInterval(ageInterval);
    }
  }, 100);

  // Trophy Counter Animation
  const trophyCounter = document.getElementById('trophy-counter');
  let trophies = 0;
  const targetTrophies = 5000; // Update with a funny high number
  
  const trophyInterval = setInterval(() => {
    trophyCounter.textContent = trophies;
    trophies += 50;
    
    if (trophies > targetTrophies) {
      clearInterval(trophyInterval);
    }
  }, 30);

  // Image Gallery Interactions
  const galleryImages = document.querySelectorAll('.gallery-image');
  
  galleryImages.forEach(img => {
    img.addEventListener('click', () => {
      // Add a fun animation when clicked
      gsap.to(img, {
        duration: 0.5,
        rotation: 360,
        scale: 1.2,
        borderColor: '#ffd700',
        boxShadow: '0 0 20px rgba(255, 215, 0, 0.6)',
        onComplete: () => {
          gsap.to(img, {
            duration: 0.5,
            rotation: 0,
            scale: 1,
            delay: 0.5
          });
        }
      });
    });
  });

  // Roast Button Interaction with Custom Roasts
  const roastBtn = document.getElementById('epic-roast-btn');
  const roastReveal = document.getElementById('roast-reveal');
  const customRoastText = document.getElementById('custom-roast-text');
  const anotherRoastBtn = document.getElementById('another-roast-btn');
  
  const roasts = [
    "If sleeping was an Olympic sport, you'd have more gold medals than Michael Phelps! 😴",
    "Your Clash of Clans base is better defended than your excuses for not studying! 🎮",
    "The only thing that loads slower than your assignments is your motivation to do them! 📚",
    "You have two alarms - one for waking up and another for when Clash of Clans events start! 🔔",
    "Scientists study your ability to procrastinate as the 8th wonder of the world! ⏰",
    "Your bed has a permanent imprint of your body at this point! 🛌",
    "If laziness burned calories, you'd be an Olympic athlete by now! 🏆",
    "Your gaming skills are inversely proportional to your studying skills! 📊",
    "You don't chase dreams, you hibernate with them! 💤",
    "Your professors think you're a myth because they've seen you less than Bigfoot! 👣"
  ];
  
  function getRandomRoast() {
    return roasts[Math.floor(Math.random() * roasts.length)];
  }
  
  roastBtn.addEventListener('click', () => {
    // Set a random roast
    customRoastText.textContent = getRandomRoast();
    
    // Roast reveal animation
    roastReveal.classList.remove('hidden');
    gsap.from(roastReveal, {
      duration: 1,
      scale: 0,
      opacity: 0,
      ease: 'elastic.out(1, 0.3)'
    });
    
    // Trigger confetti explosion
    confetti({
      particleCount: 150,
      spread: 180,
      origin: { y: 0.6 }
    });
  });
  
  anotherRoastBtn.addEventListener('click', () => {
    // Change to a new random roast with animation
    gsap.to(customRoastText, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        customRoastText.textContent = getRandomRoast();
        gsap.to(customRoastText, {
          opacity: 1,
          duration: 0.3
        });
      }
    });
    
    // Small confetti burst
    confetti({
      particleCount: 50,
      spread: 90,
      origin: { y: 0.7 }
    });
  });

  // Interactive Quiz
  const quizOptions = document.querySelectorAll('.quiz-option');
  const quizResult = document.querySelector('.quiz-result');
  
  quizOptions.forEach(option => {
    option.addEventListener('click', () => {
      // Clear previous selections
      quizOptions.forEach(opt => {
        opt.classList.remove('correct', 'incorrect');
        opt.disabled = true;
      });
      
      // Mark selected option
      if (option.getAttribute('data-correct') === 'true') {
        option.classList.add('correct');
        
        // Show result
        quizResult.classList.remove('hidden');
        gsap.from(quizResult, {
          y: 20,
          opacity: 0,
          duration: 0.5
        });
        
        // Small confetti burst for correct answer
        confetti({
          particleCount: 30,
          spread: 70,
          origin: { y: 0.6 }
        });
      } else {
        option.classList.add('incorrect');
        
        // Find and highlight correct answer
        quizOptions.forEach(opt => {
          if (opt.getAttribute('data-correct') === 'true') {
            opt.classList.add('correct');
          }
        });
      }
    });
  });

  // Birthday Wishes with Local Storage Implementation
  const addWishBtn = document.getElementById('add-wish-btn');
  const wishForm = document.getElementById('wish-form');
  const submitWishBtn = document.getElementById('submit-wish-btn');
  const wishText = document.getElementById('wish-text');
  const wishAuthor = document.getElementById('wish-author');
  const wishesContainer = document.querySelector('.wishes-container');
  
  // Initialize wishes array from local storage
  let birthdayWishes = [];
  
  // Function to load wishes from local storage
  function loadWishes() {
    const savedWishes = localStorage.getItem('birthdayWishes');
    if (savedWishes) {
      birthdayWishes = JSON.parse(savedWishes);
      
      // Clear existing wishes in the container (except the original ones)
      const originalWishes = Array.from(wishesContainer.querySelectorAll('.wish-card')).slice(0, 3);
      wishesContainer.innerHTML = '';
      
      // Add back the original wishes
      originalWishes.forEach(wish => {
        wishesContainer.appendChild(wish);
      });
      
      // Add saved wishes
      birthdayWishes.forEach(wish => {
        addWishToDOM(wish.text, wish.author);
      });
    }
  }
  
  // Function to save wishes to local storage
  function saveWishes() {
    localStorage.setItem('birthdayWishes', JSON.stringify(birthdayWishes));
  }
  
  // Function to add a wish to the DOM
  function addWishToDOM(text, author) {
    const newWish = document.createElement('div');
    newWish.className = 'wish-card';
    newWish.innerHTML = `
      <p>"${text}"</p>
      <span class="wish-author">- ${author || 'Anonymous'}</span>
    `;
    
    // Add to container with animation
    wishesContainer.appendChild(newWish);
    gsap.from(newWish, {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      ease: 'back.out(1.7)'
    });
  }
  
  // Load wishes when page loads
  loadWishes();
  
  addWishBtn.addEventListener('click', () => {
    wishForm.classList.toggle('hidden');
    if (!wishForm.classList.contains('hidden')) {
      gsap.from(wishForm, {
        height: 0,
        opacity: 0,
        duration: 0.5
      });
      wishText.focus();
    }
  });
  
  submitWishBtn.addEventListener('click', () => {
    if (wishText.value.trim() === '') {
      alert('Please write a wish!');
      return;
    }
    
    const text = wishText.value;
    const author = wishAuthor.value || 'Anonymous';
    
    // Add to DOM
    addWishToDOM(text, author);
    
    // Save to array and local storage
    birthdayWishes.push({ text, author });
    saveWishes();
    
    // Reset form
    wishText.value = '';
    wishAuthor.value = '';
    wishForm.classList.add('hidden');
    
    // Small confetti burst
    confetti({
      particleCount: 20,
      spread: 50,
      origin: { y: 0.7 }
    });
  });

  // Floating Gift Interaction
  const floatingGift = document.getElementById('floating-gift');
  
  floatingGift.addEventListener('click', () => {
    // Explosion animation
    gsap.to(floatingGift, {
      scale: 2,
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        // Reset and restart animation
        gsap.set(floatingGift, {
          scale: 1,
          opacity: 1,
          bottom: -50,
          right: Math.random() * (window.innerWidth - 100) + 50
        });
      }
    });
    
    // Massive confetti explosion
    confetti({
      particleCount: 200,
      spread: 160,
      origin: { 
        x: floatingGift.getBoundingClientRect().left / window.innerWidth,
        y: floatingGift.getBoundingClientRect().top / window.innerHeight
      }
    });
    
    // Display a random special message
    const specialMessages = [
      "Extra birthday power unlocked! 🎂",
      "You found a secret gift! 🎁",
      "Special birthday bonus activated! 🎉",
      "Achievement unlocked: Gift Finder! 🏆"
    ];
    
    const message = specialMessages[Math.floor(Math.random() * specialMessages.length)];
    
    // Create floating message
    const floatingMessage = document.createElement('div');
    floatingMessage.textContent = message;
    floatingMessage.style.position = 'fixed';
    floatingMessage.style.left = `${floatingGift.getBoundingClientRect().left}px`;
    floatingMessage.style.top = `${floatingGift.getBoundingClientRect().top - 50}px`;
    floatingMessage.style.background = 'rgba(255, 215, 0, 0.9)';
    floatingMessage.style.color = 'black';
    floatingMessage.style.padding = '10px 15px';
    floatingMessage.style.borderRadius = '5px';
    floatingMessage.style.fontWeight = 'bold';
    floatingMessage.style.zIndex = '100';
    document.body.appendChild(floatingMessage);
    
    // Animate and remove message
    gsap.to(floatingMessage, {
      y: -100,
      opacity: 0,
      duration: 2,
      onComplete: () => floatingMessage.remove()
    });
  });

  // Playful Animations for Roast Cards
  gsap.from('.roast-card', {
    duration: 1,
    y: 100,
    opacity: 0,
    stagger: 0.2,
    ease: 'back.out(1.7)'
  });

  // Advanced Particle Background System
  class AdvancedParticleSystem {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.particles = [];
      this.setupCanvas();
      this.createParticles();
      this.animate();
    }

    setupCanvas() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      
      // Responsive canvas resizing
      window.addEventListener('resize', () => {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
      });
    }

    createParticles() {
      const particleCount = window.innerWidth > 768 ? 150 : 80;
      
      for (let i = 0; i < particleCount; i++) {
        this.particles.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          radius: Math.random() * 2 + 1,
          color: this.generateParticleColor(),
          speedX: (Math.random() - 0.5) * 1,
          speedY: (Math.random() - 0.5) * 1,
          alpha: Math.random() * 0.8 + 0.2
        });
      }
    }

    generateParticleColor() {
      const colors = [
        `rgba(255, 111, 97, ${Math.random() * 0.7 + 0.3})`,  // Red/Salmon
        `rgba(255, 197, 61, ${Math.random() * 0.7 + 0.3})`,  // Yellow
        `rgba(79, 121, 239, ${Math.random() * 0.7 + 0.3})`,  // Blue
        `rgba(233, 69, 96, ${Math.random() * 0.7 + 0.3})`    // Pink
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    }

    animate() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around screen edges
        p.x = (p.x + this.canvas.width) % this.canvas.width;
        p.y = (p.y + this.canvas.height) % this.canvas.height;

        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = p.color;
        this.ctx.fill();
      });

      requestAnimationFrame(this.animate.bind(this));
    }
  }

  // Initialize Particle Background
  const particleCanvas = document.getElementById('particle-canvas');
  if (particleCanvas) {
    new AdvancedParticleSystem(particleCanvas);
  }

  // Add Parallax Effect
  const parallaxBg = document.querySelector('.background-parallax');
  
  window.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    parallaxBg.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
  });

  // Easter Egg Console Message
  console.log(`
  🎉 Happy Birthday, ${friendName}! 🎂
  Coded with ❤️ and way too much caffeine
  `);
});