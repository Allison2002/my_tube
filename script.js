document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Optimized script loaded!");

    // ✅ Get Base Path Dynamically Based on the Page Location
    const basePath = window.location.pathname.includes("/pages/") || window.location.pathname.includes("/videos/") ? "../../" : "./";

    function loadComponent(url, elementId) {
        fetch(basePath + url, { cache: "no-store" })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                document.getElementById(elementId).innerHTML = data;
                if (elementId === "nav") setupNavbar(); // Ensure navbar JS executes
            })
            .catch(error => console.error(`❌ Error loading ${elementId}:`, error));
    }

    // ✅ Load Navigation and Footer for All Pages
    loadComponent("nav.html", "nav");
    loadComponent("footer.html", "footer");

    // ✅ Navbar Behavior (Sticky Navbar, Mobile Menu, Scroll Effects)
    function setupNavbar() {
        const navbar = document.querySelector("nav");
        const hamburgerIcon = document.getElementById("menu-toggle");
        const navMenu = document.getElementById("nav-menu");

        if (!navbar || !hamburgerIcon || !navMenu) return;

        const handleScroll = () => {
            navbar.classList.add("solid");
            navbar.classList.toggle("scrolled", window.scrollY > 0);
        };

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

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", updateHamburgerVisibility);
        updateHamburgerVisibility();
    }

    console.log("✅ Fixing YouTube Video Thumbnails!");

    function setupYouTubePlayers() {
        document.querySelectorAll(".youtube-facade, .youtube-facade-all").forEach((facade) => {
            const videoId = facade.dataset.videoId || facade.dataset.id;
            if (!videoId) {
                console.error("❌ No video ID found.");
                return;
            }

            // ✅ Use Cloudinary to Convert to AVIF
            const cloudinaryBaseUrl = "https://res.cloudinary.com/dnptzisuf/image/fetch/";
            const youtubeThumbnailUrl = encodeURIComponent(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`);

            let optimizedThumbnailUrl = `${cloudinaryBaseUrl}f_avif,q_auto,w_320,h_180/${youtubeThumbnailUrl}`;

            // ✅ Detect container size to serve the optimal image
            let containerWidth = facade.offsetWidth;
            if (containerWidth >= 480) {
                optimizedThumbnailUrl = `${cloudinaryBaseUrl}f_avif,q_auto,w_480,h_270/${youtubeThumbnailUrl}`;
            } else if (containerWidth >= 320) {
                optimizedThumbnailUrl = `${cloudinaryBaseUrl}f_avif,q_auto,w_320,h_180/${youtubeThumbnailUrl}`;
            }

            console.log("✅ Optimized Thumbnail URL:", optimizedThumbnailUrl); // Debugging

            // ✅ Set Placeholder First to Avoid Layout Shift
            let placeholder = document.createElement("img");
            placeholder.src = optimizedThumbnailUrl;
            placeholder.alt = "YouTube video thumbnail";
            placeholder.classList.add("video-thumbnail");
            placeholder.style.width = "100%";
            placeholder.style.height = "auto";
            placeholder.style.objectFit = "cover";

            // ✅ Disable Lazy Loading for Above-the-Fold Images
            const rect = facade.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                placeholder.loading = "eager"; // Loads immediately if above the fold
                console.log(`🔹 Loading ${videoId} eagerly (above the fold)`);
            } else {
                placeholder.loading = "lazy"; // Lazy loading for below-the-fold thumbnails
                console.log(`🔸 Loading ${videoId} lazily (below the fold)`);
            }

            // ✅ Append the optimized thumbnail
            facade.appendChild(placeholder);

            // ✅ Clicking on Thumbnail Loads YouTube iFrame
            facade.addEventListener("click", function () {
                console.log("▶️ Playing Video:", videoId);
                let width = facade.clientWidth;
                let height = facade.clientHeight;

                if (facade.closest(".call2action-video")) {
                    const parent = facade.closest(".call2action-video");
                    if (parent) {
                        width = parent.clientWidth;
                        height = parent.clientHeight;
                    }
                }

                const iframe = document.createElement("iframe");
                iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&showinfo=0`;
                iframe.width = width;
                iframe.height = height;
                iframe.frameBorder = "0";
                iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
                iframe.allowFullscreen = true;
                iframe.style.objectFit = "cover";
                iframe.style.width = `${width}px`;
                iframe.style.height = `${height}px`;

                facade.innerHTML = "";
                facade.appendChild(iframe);
            });
        });
    }

    function setupBiographySection() {
        document.querySelectorAll(".toggle-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                const bioId = btn.closest(".biography").id;
                toggleBio(bioId);
            });
        });
    }

    function toggleBio(bioId) {
        const bio = document.getElementById(bioId);
        if (!bio) return;

        const button = bio.querySelector(".toggle-btn img");
        const name = bio.querySelector(".bio-name");
        const content = bio.querySelector(".bio-content");

        bio.classList.toggle("expanded");

        if (bio.classList.contains("expanded")) {
            button.src = "https://res.cloudinary.com/dnptzisuf/image/upload/v1739375139/white-minus-sign_ptxfgg.webp";
            if (name) name.classList.add("hidden");
            content.style.height = "auto";
        } else {
            button.src = "https://res.cloudinary.com/dnptzisuf/image/fetch/v1738766146/https://res.cloudinary.com/dnptzisuf/image/upload/f_avif,q_auto,w_100,h_100,c_fit/v1737994384/white-plus-sign_av8usw.png";
            if (name) name.classList.remove("hidden");
            content.style.height = "0";
        }
    }

    setupNavbar();
    setupYouTubePlayers();
    setupBiographySection();
    console.log("✅ All Scripts Loaded Successfully!");
});
