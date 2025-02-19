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

    // ✅ Navbar Behavior (Sticky Navbar, Mobile Menu, Scroll Effects)
    function setupNavbar() {
        const navbar = document.querySelector("nav");
        const hamburgerIcon = document.getElementById("menu-toggle");
        const navMenu = document.getElementById("nav-menu");

        if (!navbar || !hamburgerIcon || !navMenu) return;

        const handleScroll = () => navbar.classList.toggle("scrolled", window.scrollY > 0);
        const updateHamburgerVisibility = () => {
            hamburgerIcon.style.display = window.innerWidth > 768 || navMenu.classList.contains("active") ? "none" : "flex";
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

    console.log("✅ Using Correct Cloudinary AVIF Thumbnails!");

    function setupYouTubePlayers() {
        const cloudinaryThumbnails = {
            "UMp4IiiYgJ8": "https://res.cloudinary.com/dnptzisuf/image/upload/v1739982747/youtube_thumbnails_UMp4IiiYgJ8_n7pup4.jpg",
            "lRTUIBVfLP4": "https://res.cloudinary.com/dnptzisuf/image/upload/v1739982747/youtube_thumbnails_lRTUIBVfLP4_cxmbtp.jpg",
            "l2rzjHtgoNc": "https://res.cloudinary.com/dnptzisuf/image/upload/v1739982747/youtube_thumbnails_l2rzjHtgoNc_l0fvoh.jpg",
            "HpzCtxzq-vo": "https://res.cloudinary.com/dnptzisuf/image/upload/v1739982747/youtube_thumbnails_HpzCtxzq-vo_jnzxf8.jpg",
            "i6AmT1cpKtI": "https://res.cloudinary.com/dnptzisuf/image/upload/v1739982746/youtube_thumbnails_i6AmT1cpKtI_twvqf0.jpg",
            "L9RX4mji2DY": "https://res.cloudinary.com/dnptzisuf/image/upload/v1739982746/youtube_thumbnails_L9RX4mji2DY_wpbl7w.jpg",
            "UKFCwrFe88Y": "https://res.cloudinary.com/dnptzisuf/image/upload/v1739982746/youtube_thumbnails_UKFCwrFe88Y_zjmfky.jpg",
            "pTkMh9FziC8": "https://res.cloudinary.com/dnptzisuf/image/upload/v1739982746/youtube_thumbnails_pTkMh9FziC8_rm8kic.jpg",
            "tDIJI9nE_ak": "https://res.cloudinary.com/dnptzisuf/image/upload/v1739982746/youtube_thumbnails_tDIJI9nE_ak_smni6t.jpg"
        };

        document.querySelectorAll(".youtube-facade, .youtube-facade-all").forEach((facade) => {
            const videoId = facade.dataset.videoId || facade.dataset.id;
            if (!videoId || !cloudinaryThumbnails[videoId]) {
                console.error(`❌ No Cloudinary thumbnail found for ${videoId}`);
                return;
            }

            const optimizedThumbnailUrl = cloudinaryThumbnails[videoId].replace(".jpg", ".avif"); // Convert to AVIF format

            console.log(`🔗 Loading AVIF thumbnail for ${videoId}: ${optimizedThumbnailUrl}`);

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
                placeholder.loading = "eager";
            } else {
                placeholder.loading = "lazy";
            }

            facade.appendChild(placeholder);

            // ✅ Clicking on Thumbnail Loads YouTube iFrame
            facade.addEventListener("click", function () {
                console.log(`▶️ Playing Video: ${videoId}`);
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
            button.src = "https://res.cloudinary.com/dnptzisuf/image/upload/v1739375139/white-plus-sign_av8usw.webp";
            if (name) name.classList.remove("hidden");
            content.style.height = "0";
        }
    }

    setupNavbar();
    setupYouTubePlayers();
    setupBiographySection();
    console.log("✅ All Scripts Loaded Successfully!");
});
