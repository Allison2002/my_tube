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

        updateHamburgerVisibility();
    }

    console.log("✅ Using Correct Cloudinary AVIF Thumbnails with caching!");

    console.log("✅ Optimized script with improved video containment!");
    document.addEventListener("DOMContentLoaded", function () {
        const img = document.querySelector(".hero-img img");

        if (img) {
            console.log("✅ Hero image found, applying optimizations.");
            img.src = img.getAttribute("data-src"); // Assign new source
        } else {
            console.warn("⚠️ Hero image not found in DOM. Check class name or image load timing.");
        }
    });

        function setupVideoContainers() {
            const isSportsHub = window.location.pathname.includes("sports_hub.html");
            const isAllVideos = window.location.pathname.includes("all-videos.html");
            const isCategoryPage = document.getElementById("single-video-page") !== null;

            if (isSportsHub) {
                console.log("✅ Applying Sports Hub video grid fix");
                document.querySelectorAll(".video-grid-collections").forEach(grid => {
                    grid.style.display = "grid";
                    grid.style.gridTemplateColumns = "repeat(auto-fit, minmax(200px, 1fr))";
                    grid.style.gap = "20px";
                    grid.style.justifyContent = "center";
                });

                document.querySelectorAll(".collections-box").forEach(box => {
                    box.style.display = "flex";
                    box.style.flexDirection = "column";
                    box.style.alignItems = "center";
                    box.style.overflow = "hidden";
                    box.style.width = "100%";
                    box.style.maxWidth = "350px";
                });
                

                document.querySelectorAll(".collections-box img").forEach(img => {
                    img.style.width = "100%";
                    img.style.height = "auto";
                    img.style.objectFit = "cover";
                    img.style.borderRadius = "10px";
                    img.style.maxHeight = "200px";
                });
            }

            if (isAllVideos) {
                console.log("✅ Applying All Videos page fix");
                document.querySelectorAll(".video-grid-collections").forEach(grid => {
                    grid.style.display = "box";
                    grid.style.gridTemplateColumns = "repeat(3, 1fr)";
                    grid.style.gap = "20px";
                });

                document.querySelectorAll(".collections-box").forEach(box => {
                    box.style.display = "block";
                    box.style.textAlign = "center";
                    box.style.width = "250px";
                });

                document.querySelectorAll(".youtube-facade-all").forEach(thumb => {
                    thumb.style.width = "100%";
                    thumb.style.maxWidth = "250px";
                    thumb.style.height = "auto";
                });
            }

            if (isCategoryPage) {
                console.log("✅ Applying category page grid fix");
                document.querySelectorAll(".collections-box").forEach(box => {
                    box.style.display = "box";
                    box.style.gridTemplateColumns = "repeat(3, 1fr)";
                    box.style.gap = "20px";
                });

                document.querySelectorAll(".youtube-facade-single").forEach(thumb => {
                    thumb.style.width = "100%";
                    thumb.style.maxWidth = "900px";
                    thumb.style.height = "auto";
                });

                document.querySelectorAll(".play-button-overlay").forEach(button => {
                    button.style.width = "60px";
                    button.style.height = "60px";
                });
            }
        }

        // Ensure it runs on the correct pages
        setupVideoContainers();
        window.addEventListener("resize", setupVideoContainers);


        console.log("✅ Video containment fixed!");

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

            let optimizedThumbnailUrl = `https://res.cloudinary.com/dnptzisuf/image/upload/f_avif,q_auto,w_250,h_140,c_fill,fl_attachment,fl_lossy/v1739982747/${cloudinaryThumbnails[videoId]}.avif`;


            // ✅ Apply same overlay logic to `.youtube-facade-all`
            if (!facade.querySelector("img")) {
                let placeholder = document.createElement("img");
                placeholder.src = optimizedThumbnailUrl;
                placeholder.alt = "YouTube video thumbnail";
                placeholder.classList.add("video-thumbnail");
                placeholder.style.width = "100%";
                placeholder.style.height = "auto";
                placeholder.style.objectFit = "cover";
                placeholder.loading = "lazy";
                

                // ✅ Create play button overlay
                let playButton = document.createElement("div");
                playButton.classList.add("play-button-overlay");

                // ✅ Append elements properly
                facade.appendChild(placeholder);
                facade.appendChild(playButton);

                console.log(`✅ Thumbnail & overlay added for video: ${videoId}`);
            }

            // ✅ Ensure clicking replaces thumbnail with iframe
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

                // ✅ Ensure only the facade content is replaced
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

    function setupBiographySection() {
        document.querySelectorAll(".toggle-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                const bio = btn.closest(".biography");
                if (!bio) return;

                const button = bio.querySelector(".toggle-btn img");
                const content = bio.querySelector(".bio-content");

                if (!bio.classList.contains("expanded")) {
                    // Expanding
                    bio.classList.add("expanded");
                    button.src = "https://res.cloudinary.com/dnptzisuf/image/upload/v1739375139/white-minus-sign_ptxfgg.webp";
                    content.style.maxHeight = content.scrollHeight + "px"; // Dynamic height
                    content.style.opacity = "1";
                    content.style.overflow = "hidden";
                    content.style.transition = "max-height 0.5s ease-in-out, opacity 0.3s ease-in-out";
                } else {
                    // Collapsing with proper reset
                    bio.classList.remove("expanded");
                    button.src = "https://res.cloudinary.com/dnptzisuf/image/upload/v1739375139/white-plus-sign_av8usw.webp";
                    content.style.maxHeight = content.scrollHeight + "px"; // Set height before collapse

                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            content.style.maxHeight = "0px"; // Collapse properly
                            content.style.opacity = "0";
                        });
                    });
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
