document.addEventListener('DOMContentLoaded', () => {
    // Custom cursor
    const cursor = document.querySelector('.cursor');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.pageX + 'px';
        cursor.style.top = e.pageY + 'px';
    });

    // Mobile menu toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
    }

    // Sticky navbar and active nav link highlighting
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('section');
    const navLis = navLinks ? navLinks.querySelectorAll('li a') : [];

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - header.offsetHeight;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLis.forEach(li => {
            li.classList.remove('active');
            if (li.getAttribute('href').includes(current)) {
                li.classList.add('active');
            }
        });
    });

    // Initialize active link
    if (window.location.hash) {
        const initialSection = window.location.hash.substring(1);
        navLis.forEach(li => {
            if (li.getAttribute('href').includes(initialSection)) {
                li.classList.add('active');
            }
        });
    } else {
        const homeLink = document.querySelector('.nav-links li a[href="#home"]');
        if (homeLink) {
            homeLink.classList.add('active');
        }
    }

    // Fade-in sections on scroll
    const fadeInSections = document.querySelectorAll('.fade-in');

    const checkFadeIn = () => {
        fadeInSections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const triggerPoint = window.innerHeight * 0.8;

            if (sectionTop < triggerPoint) {
                section.classList.add('active');
            }
        });
    };

    checkFadeIn();
    window.addEventListener('scroll', checkFadeIn);

    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filter = button.dataset.filter;

                projectCards.forEach(card => {
                    const category = card.dataset.category;
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                        setTimeout(() => card.style.opacity = '1', 10);
                    } else {
                        card.style.opacity = '0';
                        setTimeout(() => card.style.display = 'none', 300);
                    }
                });
            });
        });
    }

    // Project lightbox/modal
    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    const lightbox = document.getElementById('project-lightbox');
    const closeBtn = document.querySelector('.lightbox .close-btn');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxTools = document.getElementById('lightbox-tools');
    const lightboxDescription = document.getElementById('lightbox-description');
    const lightboxImages = document.getElementById('lightbox-images');

    const projectsData = {
    'car-theft': {
        title: 'Car Theft Analysis Dashboard',
        tools: 'Tools: Excel',
        description: 'This project involved creating an interactive dashboard using advanced Excel features such as Pivot Tables, Pivot Charts, and Slicers. The goal was to visualize and analyze car theft trends, identify high-risk areas, and understand patterns over time. Key insights included peak theft hours, popular vehicle types targeted, and geographical hotspots.'
    },
    'blinkit-sales': {
        title: 'Blinkit Sales & Operations Dashboard',
        tools: 'Tools: Power BI',
        description: 'Developed a comprehensive Power BI dashboard to provide real-time insights into Blinkit\'s sales and operational efficiency. The dashboard covers key performance indicators (KPIs) such as sales volume, revenue, customer order patterns, delivery times, and inventory turnover. It helps in identifying bottlenecks, optimizing delivery routes, and enhancing overall business decision-making. Utilized DAX for complex calculations and various Power BI visualizations for clarity.'
    },
    'data-cleaning': {
        title: 'Data Cleaning & Preprocessing with Python',
        tools: 'Tools: Python, Pandas, NumPy',
        description: 'A robust project focusing on the crucial data cleaning and preprocessing phase of data analysis. This involved handling missing values, identifying and treating outliers, standardizing formats, and transforming raw data into a clean, usable dataset ready for analysis. Utilized Pandas for data manipulation and NumPy for numerical operations, ensuring data quality and consistency for subsequent machine learning or visualization tasks.'
    }

};
    readMoreBtns.forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.dataset.project;
            const project = projectsData[projectId];

            if (project) {
                lightboxTitle.textContent = project.title;
                lightboxTools.textContent = project.tools;
                lightboxDescription.textContent = project.description;

                lightboxImages.innerHTML = '';
                project.images.forEach(imgSrc => {
                    const img = document.createElement('img');
                    img.src = imgSrc;
                    img.alt = project.title;
                    lightboxImages.appendChild(img);
                });

                lightbox.classList.add('open');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            lightbox.classList.remove('open');
            document.body.style.overflow = 'auto';
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('open');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (name === '' || email === '' || message === '') {
                alert('Please fill in all fields.');
                return;
            }

            // In a real implementation, you would send this data to a server
            console.log('Form submitted:', { name, email, message });
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
            
        });
    }
});