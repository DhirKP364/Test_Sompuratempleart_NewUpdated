// ================= LOAD HEADER & FOOTER =================
async function loadComponent(id, file) {
    const res = await fetch(file);
    const data = await res.text();
    document.getElementById(id).innerHTML = data;
}

// ================= INIT =================
async function init() {

    // LOAD HEADER FIRST (IMPORTANT)
    await loadComponent("header", "header.html");
    await loadComponent("footer", "footer.html");

    // ✅ DARK MODE SETUP (AFTER HEADER LOAD)
    setupTheme();

    // ================= SCROLL NAVBAR =================
    window.addEventListener("scroll", function () {
        let navbar = document.querySelector(".custom-navbar");
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        }
    });

    // ================= ACTIVE MENU =================
    const links = document.querySelectorAll(".nav-link");
    const current = window.location.pathname.split("/").pop();

    links.forEach(link => {
        if (link.getAttribute("href") === current) {
            link.classList.add("active");
        }
    });

}

// ================= DARK MODE =================
function setupTheme() {

    const toggleBtn = document.getElementById("theme-toggle");
    if (!toggleBtn) return;

    // LOAD SAVED THEME
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        toggleBtn.innerText = "☀️";
    }

    // CLICK EVENT
    toggleBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            toggleBtn.innerText = "☀️";
        } else {
            localStorage.setItem("theme", "light");
            toggleBtn.innerText = "🌙";
        }

    });
}

// ================= DEFAULT IMAGE =================
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("img").forEach(img => {
        img.onerror = function () {
            this.src = "images/default.png";
        };
    });
});

// ================= GALLERY =================
const galleries = {

    design: ["images/design1.jpg","images/design2.jpg","images/design3.jpg"],
    carving: ["images/carving1.jpg","images/carving2.jpg"],
    construction: ["images/construction1.jpg","images/construction2.jpg"],

    jain: ["images/jain1.jpg","images/jain2.jpg","images/jain3.jpg"],
    sundha: ["images/sundha1.jpg","images/sundha2.jpg"],
    bhatiyani: ["images/bhatiyani1.jpg","images/bhatiyani2.jpg"],
    bhatiji: ["images/bhatiji1.jpg","images/bhatiji2.jpg"]
};

function showGallery(type) {
    const container = document.getElementById("gallery-container");
    const section = document.getElementById("gallery-section");

    if (!container || !section) return;

    container.innerHTML = "";

    galleries[type].forEach(img => {
        container.innerHTML += `
            <div class="col-lg-4">
                <img src="${img}" class="img-fluid rounded">
            </div>
        `;
    });

    section.style.display = "block";

    window.scrollTo({
        top: section.offsetTop - 80,
        behavior: "smooth"
    });
}

function hideGallery() {
    document.getElementById("gallery-section").style.display = "none";
}

// ================= INIT CALL =================
init();




let link = document.createElement('link');
link.rel = 'icon';
link.href = 'Images/favicon.ico';
document.head.appendChild(link);
