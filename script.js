document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Optimized script loaded!");

    // ✅ Get Base Path Dynamically for Different Pages
    const basePath = window.location.pathname.includes("/pages/") || window.location.pathname.includes("/videos/") ? "../../" : "./";

    function loadComponent(url, elementId) {
        fetch(basePath + url, { cache: "no-store" })
            .then(response => response.text())
            .then(data => {
                document.getElementById(elementId).innerHTML = data;
                if (elementId === "nav") setupNavbar(); // Ensure navbar JS executes
            })
            .catch(error => console.error(`❌ Error loading ${elementId}:`, error));
    }

    // ✅ Load Navigation and Footer
    loadComponent("nav.html", "nav");
    loadComponent("footer.html", "footer");

    // ✅ Ensure Hero Image Optimization & Fix CLS (Cumulative Layout Shift)
    const heroImage = document.querySelector(".hero img");
    if (heroImage) {
        heroImage.loading = "eager";
        heroImage.fetchpriority = "high";
        heroImage.decoding = "async";
        heroImage.style.willChange = "opacity, transform";
        heroImage.style.contentVisibility = "auto";

        function adjustHeroHeight() {
            heroImage.style.height = window.innerWidth > 768 ? "100vh" : "45vh";
        }
        adjustHeroHeight();
        window.addEventListener("resize", adjustHeroHeight);
    }

    // ✅ Navbar Behavior (Sticky Navbar, Mobile Menu, Scroll Effects)
    function setupNavbar() {
        const navbar = document.querySelector("nav");
        const hamburgerIcon = document.getElementById("menu-toggle");
        const navMenu = document.getElementById("nav-menu");

        if (!hamburgerIcon || !navMenu) return;

        const handleScroll = () => navbar.classList.toggle("scrolled", window.scrollY > 50);

        const updateHamburgerVisibility = () => {
            hamburgerIcon.style.display =
                window.innerWidth > 768 || navMenu.classList.contains("active") ? "none" : "flex";
        };

        hamburgerIcon.addEventListener("click", (e) => {
            e.stopPropagation();
            navMenu.classList.toggle("active");
            updateHamburgerVisibility();
        });

        window.addEventListener("click", (e) => {
            if (!navMenu.contains(e.target) && !hamburgerIcon.contains(e.target)) {
                navMenu.classList.remove("active");
                updateHamburgerVisibility();
            }
        });

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", updateHamburgerVisibility);
        updateHamburgerVisibility();
    }

    // ✅ Lazy Load YouTube Videos Efficiently
    document.querySelectorAll(".youtube-facade").forEach((facade) => {
        facade.addEventListener("click", function () {
            const videoId = this.dataset.videoId;
            if (!videoId) {
                console.error("❌ No video ID found.");
                return;
            }

            const container = this.closest(".video-box") || this.closest(".video-wrapper");
            if (!container) return;

            // Replace with embedded YouTube iframe
            const iframe = document.createElement("iframe");
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&mute=0`;
            iframe.width = "100%";
            iframe.height = "100%";
            iframe.frameBorder = "0";
            iframe.allow =
                "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            iframe.allowFullscreen = true;
            iframe.style.objectFit = "cover";

            container.innerHTML = "";
            container.appendChild(iframe);
        });
    });

    // ✅ Preload YouTube Thumbnails for Faster Loading
    document.querySelectorAll(".youtube-facade img").forEach((img) => {
        img.loading = "eager";
    });

    // ✅ Biography Section Expand/Collapse
    document.querySelectorAll(".toggle-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
            const bioId = btn.closest(".biography").id;
            toggleBio(bioId);
        });
    });

    function toggleBio(bioId) {
        const bio = document.getElementById(bioId);
        if (!bio) return;

        const button = bio.querySelector(".toggle-btn img");
        const name = bio.querySelector(".bio-name");
        const content = bio.querySelector(".bio-content");

        bio.classList.toggle("expanded");

        if (bio.classList.contains("expanded")) {
            button.src =
                "https://res.cloudinary.com/dnptzisuf/image/upload/v1739375139/white-minus-sign_ptxfgg.webp";
            if (name) name.classList.add("hidden");
            content.style.height = "auto";
        } else {
            button.src =
                "https://res.cloudinary.com/dnptzisuf/image/fetch/v1738766146/https://res.cloudinary.com/dnptzisuf/image/upload/f_avif%2Cq_auto%2Cw_100%2Ch_100%2Cc_fit/v1737994384/white-plus-sign_av8usw.png%3Fv%3D1";
            if (name) name.classList.remove("hidden");
            content.style.height = "0";
        }
    }

    console.log("✅ YouTube Video Click Handling Fixed!");

    // ✅ Lazy Loading YouTube Thumbnails
    document.querySelectorAll(".youtube-facade").forEach((facade) => {
        const videoId = facade.getAttribute("data-id");
        const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

        // Create an image element for the thumbnail
        const thumbnail = document.createElement("img");
        thumbnail.src = thumbnailUrl;
        thumbnail.alt = "YouTube video thumbnail";
        thumbnail.loading = "lazy";
        thumbnail.style.width = "100%";
        thumbnail.style.cursor = "pointer";

        // Append thumbnail to the facade
        facade.appendChild(thumbnail);

        // On click, replace with the actual YouTube iframe
        facade.addEventListener("click", function () {
            const iframe = document.createElement("iframe");
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&showinfo=0`;
            iframe.frameBorder = "0";
            iframe.allow =
                "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
            iframe.allowFullscreen = true;
            iframe.style.width = "100%";
            iframe.style.height = "100%";

            facade.innerHTML = ""; // Remove the thumbnail
            facade.appendChild(iframe);
        });
    });
});
