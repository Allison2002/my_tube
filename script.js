
document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Fully Optimized Script Loaded!");

    const basePath = window.location.pathname.includes("/pages/") || window.location.pathname.includes("/videos/") ? "../../" : "./";

    function loadComponent(url, elementId, callback) {
        const container = document.getElementById(elementId);
        if (!container) return;

        // Display temporary placeholder while fetching
        container.innerHTML = `<div style="min-height: 50px; background: #f0f0f0;"></div>`;

        fetch(url, { cache: "no-store" })
            .then(response => response.ok ? response.text() : Promise.reject(`HTTP error! Status: ${response.status}`))
            .then(data => {
                container.innerHTML = data;
                if (callback) callback();
            })
            .catch(error => console.error(`❌ Error loading ${elementId}:`, error));
    }

    // ✅ Load Navigation and Footer with proper initialization
    loadComponent("nav.html", "nav", setupNavbar);
    loadComponent("footer.html", "footer");

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

        // Prevent Flashback to Index Issue
        document.querySelectorAll("nav a").forEach(link => {
            link.addEventListener("click", function (event) {
                const url = new URL(this.href);
                if (url.origin === window.location.origin) {
                    event.preventDefault();
                    window.location.href = this.href; 
                }
            });
        });

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

        handleScroll(); 
        updateHamburgerVisibility();
    }

    console.log("✅ Navbar Loaded & Scroll Effect Fixed!");
    
    // ✅ Function to Determine if an Element is Above the Fold
    function isAboveFold(element) {
        const rect = element.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom >= 0;
    }

    // ✅ Setup YouTube Thumbnails & Lazy Loading
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

        document.querySelectorAll(".youtube-facade, .youtube-facade-all").forEach(facade => {
            const videoId = facade.dataset.videoId || facade.dataset.id;
            if (!videoId || !cloudinaryThumbnails[videoId]) return;

            let optimizedThumbnailUrl = `https://res.cloudinary.com/dnptzisuf/image/upload/f_avif,q_auto:low,w_400,h_225,c_fill,fl_attachment,fl_lossy/v1739982747/${cloudinaryThumbnails[videoId]}.avif`;

            facade.style.backgroundColor = "transparent"; 
            facade.style.display = "flex"; 
            facade.style.justifyContent = "center"; 
            facade.style.alignItems = "center";
            facade.style.overflow = "hidden"; 
            facade.style.aspectRatio = "16/9"; 
            facade.style.width = "100%"; 
            facade.style.maxWidth = "400px"; 
            facade.style.margin = "0 auto"; 
            facade.style.position = "relative"; 

            if (!facade.querySelector("img")) {
                let placeholder = document.createElement("img");
                placeholder.src = optimizedThumbnailUrl;
                placeholder.alt = "YouTube video thumbnail";
                placeholder.classList.add("video-thumbnail");
                placeholder.style.width = "100%";
                placeholder.style.height = "auto";
                placeholder.style.objectFit = "cover";
                placeholder.style.borderRadius = "10px"; 
                placeholder.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)"; 

                // ✅ Dynamically Set Lazy or Eager Loading
                placeholder.loading = isAboveFold(facade) ? "eager" : "lazy"; 

                let playButton = document.createElement("div");
                playButton.classList.add("play-button-overlay");
                playButton.innerHTML = "▶"; 
                playButton.style.position = "absolute";
                playButton.style.top = "50%";
                playButton.style.left = "50%";
                playButton.style.transform = "translate(-50%, -50%)";
                playButton.style.fontSize = "2rem";
                playButton.style.color = "white";
                playButton.style.background = "rgba(0, 0, 0, 0.6)";
                playButton.style.borderRadius = "50%";
                playButton.style.width = "50px";
                playButton.style.height = "50px";
                playButton.style.display = "flex";
                playButton.style.alignItems = "center";
                playButton.style.justifyContent = "center";
                playButton.style.cursor = "pointer";
                playButton.style.transition = "background 0.3s ease-in-out";

                playButton.addEventListener("mouseenter", () => {
                    playButton.style.background = "rgba(0, 0, 0, 0.8)";
                });
                playButton.addEventListener("mouseleave", () => {
                    playButton.style.background = "rgba(0, 0, 0, 0.6)";
                });

                facade.innerHTML = ""; 
                facade.appendChild(placeholder);
                facade.appendChild(playButton);

                console.log(`✅ Thumbnail added for: ${videoId} (loading: ${placeholder.loading})`);
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
                iframe.style.borderRadius = "10px"; 

                facade.innerHTML = "";
                facade.appendChild(iframe);
            });
        });
    }

    // ✅ Fix Biography Section Toggle
    function setupBiographySection() {
        document.querySelectorAll(".toggle-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                const bio = btn.closest(".biography");
                if (!bio) return;

                const button = bio.querySelector(".toggle-btn img");
                const content = bio.querySelector(".bio-content");

                if (!bio.classList.contains("expanded")) {
                    bio.classList.add("expanded");
                    button.src = "https://res.cloudinary.com/dnptzisuf/image/upload/v1739375139/white-minus-sign_ptxfgg.webp";
                    content.style.maxHeight = content.scrollHeight + "px";
                    content.style.opacity = "1";
                    content.style.transition = "max-height 0.5s ease-in-out, opacity 0.3s ease-in-out";
                } else {
                    bio.classList.remove("expanded");
                    button.src = "https://res.cloudinary.com/dnptzisuf/image/upload/v1739375139/white-plus-sign_av8usw.webp";
                    content.style.maxHeight = content.scrollHeight + "px";

                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            content.style.maxHeight = "0px";
                            content.style.opacity = "0";
                        });
                    });
                }
            });
        });
    }

    // ✅ Run All Functions
    setupYouTubePlayers();
    setupBiographySection();
    console.log("✅ All Scripts Loaded Successfully!");
});
