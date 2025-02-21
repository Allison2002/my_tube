document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Optimized script loaded!");

    // ✅ Get Base Path Dynamically Based on the Page Location
    const basePath = window.location.pathname.includes("/pages/") || window.location.pathname.includes("/videos/") ? "../../" : "./";

    function loadComponent(url, elementId) {
        fetch(basePath + url, { cache: "no-store" })
            .then(response => response.ok ? response.text() : Promise.reject(`HTTP error! Status: ${response.status}`))
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

        function handleScroll() {
            if (window.scrollY > 0) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        }

        document.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", updateHamburgerVisibility);

        function updateHamburgerVisibility() {
            hamburgerIcon.style.display = window.innerWidth > 768 || navMenu.classList.contains("active") ? "none" : "flex";
        }

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

        handleScroll();
        updateHamburgerVisibility();
    }

    console.log("✅ Using Correct Cloudinary AVIF Thumbnails!");

    function setupYouTubePlayers() {
        const cloudinaryThumbnails = {
            "UMp4IiiYgJ8": "youtube_thumbnails_UMp4IiiYgJ8_n7pup4",
            "lRTUIBVfLP4": "youtube_thumbnails_lRTUIBVfLP4_cxmbtp",
            "l2rzjHtgoNc": "youtube_thumbnails_l2rzjHtgoNc_l0fvoh",
            "HpzCtxzq-vo": "youtube_thumbnails_HpzCtxzq-vo_jnzxf8",
            "i6AmT1cpKtI": "youtube_thumbnails_i6AmT1cpKtI_twvqf0",
            "L9RX4mji2DY": "youtube_thumbnails_L9RX4mji2DY_wpbl7w",
            "UKFCwrFe88Y": "youtube_thumbnails_UKFCwrFe88Y_zjmfky"
        };

        document.querySelectorAll(".youtube-facade, .youtube-facade-all").forEach((facade) => {
            const videoId = facade.dataset.videoId || facade.dataset.id;
            if (!videoId || !cloudinaryThumbnails[videoId]) {
                console.warn(`⚠️ No Cloudinary thumbnail found for ${videoId}. Using fallback.`);
                return;
            }

            let optimizedThumbnailUrl = `https://res.cloudinary.com/dnptzisuf/image/upload/f_avif,q_auto,w_400,h_338,c_fill/v1739982747/${cloudinaryThumbnails[videoId]}.avif`;

            console.log(`🔗 Loading AVIF thumbnail for ${videoId}: ${optimizedThumbnailUrl}`);

            // Prevent duplicate images
            if (facade.querySelector("img")) {
                console.warn(`⚠️ Thumbnail already exists for ${videoId}, skipping duplicate.`);
                return;
            }

            let placeholder = document.createElement("img");
            placeholder.src = optimizedThumbnailUrl;
            placeholder.alt = "YouTube video thumbnail";
            placeholder.classList.add("video-thumbnail");
            placeholder.style.width = "100%";
            placeholder.style.height = "auto";
            placeholder.style.objectFit = "cover";
            placeholder.loading = "lazy";

            facade.appendChild(placeholder);
        });
    }

    setupNavbar();
    setupYouTubePlayers();
    console.log("✅ All Scripts Loaded Successfully!");
});
