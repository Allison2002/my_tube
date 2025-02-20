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
                if (elementId === "nav") setupNavbar();
            })
            .catch(error => console.error(`❌ Error loading ${elementId}:`, error));
    }

    // ✅ Load Navigation and Footer
    loadComponent("nav.html", "nav");
    loadComponent("footer.html", "footer");

    // ✅ Navbar Behavior
    function setupNavbar() {
        const navbar = document.querySelector("nav");
        const hamburgerIcon = document.getElementById("menu-toggle");
        const navMenu = document.getElementById("nav-menu");

        if (!navbar || !hamburgerIcon || !navMenu) return;

        const handleScroll = () => {
            navbar.classList.add("solid");
            navbar.classList.toggle("scrolled", window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

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

        window.addEventListener("resize", updateHamburgerVisibility);
        updateHamburgerVisibility();
    }

    console.log("✅ Using Cloudinary AVIF for YouTube Thumbnails!");

    function setupYouTubePlayers() {
        const cloudinaryThumbnails = {
            "7Oj7IAJ7B_0": "youtube_thumbnails_7Oj7IAJ7B_0_n7pup4",
            "9n0T6cQ7zbM": "youtube_thumbnails_9n0T6cQ7zbM_twvqf0",
            "lRTUIBVfLP4": "youtube_thumbnails_lRTUIBVfLP4_cxmbtp",
            // Ensure all thumbnails exist in Cloudinary
        };

        document.querySelectorAll(".youtube-facade, .youtube-facade-all").forEach((facade) => {
            const videoId = facade.dataset.videoId || facade.dataset.id;
            if (!videoId || !cloudinaryThumbnails[videoId]) {
                console.warn(`⚠️ No Cloudinary thumbnail found for ${videoId}. Using fallback image.`);

                facade.innerHTML = `<img src="https://via.placeholder.com/560x315/000000/ffffff?text=Video" 
                                    alt="YouTube Video Placeholder" class="video-thumbnail"
                                    style="width: 100%; height: 100%; object-fit: cover;">`;
                return;
            }

            let optimalWidth = 320, optimalHeight = 180;
            const containerWidth = facade.offsetWidth;

            if (containerWidth >= 640) {
                optimalWidth = 640;
                optimalHeight = 360;
            } else if (containerWidth >= 480) {
                optimalWidth = 480;
                optimalHeight = 270;
            }

            // ✅ Corrected Cloudinary AVIF URL
            const optimizedThumbnailUrl = `https://res.cloudinary.com/dnptzisuf/image/upload/f_avif,q_auto,w_${optimalWidth},h_${optimalHeight},c_fill/v1739982747/${cloudinaryThumbnails[videoId]}.avif`;

            console.log(`🔗 Loading AVIF thumbnail for ${videoId}: ${optimizedThumbnailUrl}`);

            let placeholder = document.createElement("img");
            placeholder.src = optimizedThumbnailUrl;
            placeholder.alt = "YouTube video thumbnail";
            placeholder.classList.add("video-thumbnail");
            placeholder.width = optimalWidth;
            placeholder.height = optimalHeight;
            placeholder.style.objectFit = "cover";
            placeholder.loading = "lazy";

            facade.appendChild(placeholder);

            // ✅ Clicking loads the YouTube video
            facade.addEventListener("click", function () {
                console.log(`▶️ Playing Video: ${videoId}`);
                let width = facade.clientWidth;
                let height = facade.clientHeight;

                const iframe = document.createElement("iframe");
                iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&showinfo=0`;
                iframe.width = width;
                iframe.height = height;
                iframe.frameBorder = "0";
                iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
                iframe.allowFullscreen = true;
                iframe.style.objectFit = "cover";

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
            button.src = "https://res.cloudinary.com/dnptzisuf/image/fetch/v1738766146/https://res.cloudinary.com/dnptzisuf/image/upload/f_avif%2Cq_auto%2Cw_100%2Ch_100%2Cc_fit/v1737994384/white-plus-sign_av8usw.png%3Fv%3D1";
            if (name) name.classList.remove("hidden");
            content.style.height = "0";
        }
    }

    setupNavbar();
    setupYouTubePlayers();
    setupBiographySection();
    console.log("✅ All Scripts Loaded Successfully!");
});
