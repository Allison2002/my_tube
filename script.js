
document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Optimized script with caching, CLS improvements, CTA fix, and Biography fix!");

    // ✅ Get Base Path Dynamically Based on the Page Location
    const basePath = window.location.pathname.includes("/pages/") || window.location.pathname.includes("/videos/") ? "../../" : "./";

    function loadComponent(url, elementId, callback) {
        fetch(basePath + url, { cache: "no-store" })
            .then(response => response.ok ? response.text() : Promise.reject(`HTTP error! Status: ${response.status}`))
            .then(data => {
                document.getElementById(elementId).innerHTML = data;
                if (callback) callback();
            })
            .catch(error => console.error(`❌ Error loading ${elementId}:`, error));
    }

    // ✅ Load Navigation and Footer with proper initialization
    loadComponent("nav.html", "nav", setupNavbar);
    loadComponent("footer.html", "footer");

    // ✅ Navbar Behavior - Fix: Ensure Navbar Turns Solid Red on Scroll
    function setupNavbar() {
        const navbar = document.querySelector("nav");
        const hamburgerIcon = document.getElementById("menu-toggle");
        const navMenu = document.getElementById("nav-menu");

        if (!navbar) {
            console.error("❌ Navbar element not found.");
            return;
        }

        function handleScroll() {
            navbar.classList.toggle("scrolled", window.scrollY > 0);
            navbar.style.backgroundColor = window.scrollY > 0 ? "red" : "transparent";
        }

        document.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", updateHamburgerVisibility);

        function updateHamburgerVisibility() {
            if (hamburgerIcon && navMenu) {
                hamburgerIcon.style.display = window.innerWidth > 768 || navMenu.classList.contains("active") ? "none" : "flex";
            }
        }

        if (hamburgerIcon && navMenu) {
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
        }

        handleScroll(); // Apply initial navbar state
        updateHamburgerVisibility();
    }

    console.log("✅ Using Correct Cloudinary AVIF Thumbnails with caching!");

    // ✅ Fix: Ensure all videos in `video-week-container` work and thumbnails load correctly
    function setupYouTubePlayers() {
        const cloudinaryThumbnails = {
            "9n0T6cQ7zbM": "youtube_thumbnails_9n0T6cQ7zbM_example",
            "7Oj7IAJ7B_0": "youtube_thumbnails_7Oj7IAJ7B_0_example",
            "lRTUIBVfLP4": "youtube_thumbnails_lRTUIBVfLP4_cxmbtp",
            "UMp4IiiYgJ8": "youtube_thumbnails_UMp4IiiYgJ8_n7pup4",
            "l2rzjHtgoNc": "youtube_thumbnails_l2rzjHtgoNc_l0fvoh",
            "HpzCtxzq-vo": "youtube_thumbnails_HpzCtxzq-vo_jnzxf8",
            "i6AmT1cpKtI": "youtube_thumbnails_i6AmT1cpKtI_twvqf0",
            "L9RX4mji2DY": "youtube_thumbnails_L9RX4mji2DY_wpbl7w",
            "UKFCwrFe88Y": "youtube_thumbnails_UKFCwrFe88Y_zjmfky",
            "pTkMh9FziC8": "youtube_thumbnails_pTkMh9FziC8_rm8kic",
            "tDIJI9nE_ak": "youtube_thumbnails_tDIJI9nE_ak_smni6t",
            "cGoeRZSfVyA": "youtube_thumbnails_cGoeRZSfVyA_gfwo3m",
            "JfPXrfdYtSA": "youtube_thumbnails_JfPXrfdYtSA_llr8xx",
            "UwIOARh1NTU": "youtube_thumbnails_UwIOARh1NTU_kd4cwj",
            "mcqnBMMiNj4": "youtube_thumbnails_mcqnBMMiNj4_ch1plz",
            "cfzjYJoBSTI": "youtube_thumbnails_cfzjYJoBSTI_c57f5e",
            "jW8HAlAHRXU": "youtube_thumbnails_jW8HAlAHRXU_tqqmj3",
            "vAC2almlat4": "youtube_thumbnails_vAC2almlat4_sgpmla",
            "SQmh-KG7HqA": "youtube_thumbnails_SQmh-KG7HqA_hnvlu5",
            "AQ2z_ujhhVs": "youtube_thumbnails_AQ2z_ujhhVs_vsrzkh"
        };

        document.querySelectorAll(".youtube-facade, .youtube-facade-all").forEach((facade) => {
            const videoId = facade.dataset.videoId || facade.dataset.id;
            if (!videoId || !cloudinaryThumbnails[videoId]) return;

            let optimizedThumbnailUrl = `https://res.cloudinary.com/dnptzisuf/image/upload/f_avif,q_auto,w_400,h_338,c_fill/v1739982747/${cloudinaryThumbnails[videoId]}.avif`;

            if (!facade.querySelector("img")) {
                let placeholder = document.createElement("img");
                placeholder.src = optimizedThumbnailUrl;
                placeholder.alt = "YouTube video thumbnail";
                placeholder.classList.add("video-thumbnail");
                placeholder.style.width = "100%";
                placeholder.style.height = "auto";
                placeholder.style.objectFit = "cover";
                placeholder.loading = "lazy";

                facade.appendChild(placeholder);
            }

            facade.addEventListener("click", function () {
                console.log(`▶️ Playing Video: ${videoId}`);

                const width = facade.clientWidth;
                const height = facade.clientHeight;

                let iframe = document.createElement("iframe");
                iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&showinfo=0`;
                iframe.width = width + "px";
                iframe.height = height + "px";
                iframe.frameBorder = "0";
                iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
                iframe.allowFullscreen = true;
                iframe.style.objectFit = "cover";

                facade.innerHTML = "";
                facade.appendChild(iframe);
            });
        });
    }

    function setupCallToActionVideo() {
        const ctaVideo = document.querySelector(".call2action-video .youtube-facade");
        if (!ctaVideo) return;

        const videoId = ctaVideo.dataset.videoId;
        if (!videoId) {
            console.warn("⚠️ No video ID found for Call-to-Action video.");
            return;
        }

        ctaVideo.addEventListener("click", function () {
            console.log(`▶️ Playing CTA Video: ${videoId}`);

            const width = ctaVideo.clientWidth;
            const height = ctaVideo.clientHeight;

            let iframe = document.createElement("iframe");
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&showinfo=0`;
            iframe.width = width + "px";
            iframe.height = height + "px";
            iframe.frameBorder = "0";
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            iframe.allowFullscreen = true;
            iframe.style.objectFit = "cover";

            ctaVideo.innerHTML = "";
            ctaVideo.appendChild(iframe);
        });
    }

            // ✅ Fix: Ensure biography section expands correctly
            function setupBiographySection() {
            document.querySelectorAll(".toggle-btn").forEach(btn => {
                btn.addEventListener("click", function () {
                    const bio = btn.closest(".biography");
                    if (!bio) return;

                    const button = bio.querySelector(".toggle-btn img");
                    const content = bio.querySelector(".bio-content");

                    bio.classList.toggle("expanded");

                    if (bio.classList.contains("expanded")) {
                        button.src = "https://res.cloudinary.com/dnptzisuf/image/upload/v1739375139/white-minus-sign_ptxfgg.webp";
                        content.style.maxHeight = "1000px";
                        content.style.opacity = "1";
                    } else {
                        button.src = "https://res.cloudinary.com/dnptzisuf/image/upload/v1739375139/white-plus-sign_av8usw.webp";
                        content.style.maxHeight = "0";
                        content.style.opacity = "0";
                    }
                });
            });
        }


    // ✅ Ensure all functions run properly
    setupYouTubePlayers();
    setupCallToActionVideo();
    setupBiographySection();
    console.log("✅ All Scripts Loaded Successfully!");
});
