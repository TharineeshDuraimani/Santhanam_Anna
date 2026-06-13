let currentStep = 1;

const documentList = [
    "Intimation Letter",
    "Claim Form",
    "Estimate",
    "Supplementary Estimate",
    "Insurance Policy",
    "RC Copy",
    "DL Copy",
    "Driver Statement",
    "Owner Statement",
    "Spot Photos",
    "FIR / GD Entry",
    "CFX / MVI Report",
    "Repair Bills & Receipts",
    "Towing Bill",
    "Discharge / Satisfaction Voucher",
    "Cancelled Cheque Leaf",
    "Insured KYC",
    "Spot Report",
    "Tax Card",
    "Permit",
    "Fitness Certificate",
    "Trip Sheet / Load Challan",
    "RC Extract",
    "DL Extract",
    "Permit Extract",
    "Purchase Invoice",
    "Today's Invoice",
    "Consent Letter",
    "Section 64 VB Compliance",
    "Investigation Report",
    "Affidavit",
    "NOC from Financier"
];

/* =========================
   MOBILE SIDEBAR
========================= */

function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("active");
    document.getElementById("sidebarOverlay").classList.toggle("active");
}

function closeSidebar() {
    document.getElementById("sidebar").classList.remove("active");
    document.getElementById("sidebarOverlay").classList.remove("active");
}

/* =========================
   NAVIGATION
========================= */

function openModule(module) {

    if (module === "initial") {

        document.getElementById("home").classList.add("hidden");
        document.getElementById("initialReport").classList.remove("hidden");

        showStep(1);
        closeSidebar();
    }
}

function showHome() {

    document.getElementById("home").classList.remove("hidden");
    document.getElementById("initialReport").classList.add("hidden");

    closeSidebar();
}

/* =========================
   STEP CONTROL
========================= */

function showStep(step) {

    currentStep = step;

    for (let i = 1; i <= 5; i++) {
        document.getElementById("step" + i).classList.add("hidden");
    }

    document.getElementById("step" + step).classList.remove("hidden");

    updateProgress();
}

function nextStep() {

    if (currentStep < 5) {
        showStep(currentStep + 1);
    }
}

function prevStep() {

    if (currentStep > 1) {
        showStep(currentStep - 1);
    }
}

/* =========================
   IMAGE PREVIEW
========================= */

function previewImages() {

    const input = document.querySelector('input[type="file"]');
    const preview = document.getElementById("preview");

    preview.innerHTML = "";

    if (input.files) {

        Array.from(input.files).forEach(file => {

            const img = document.createElement("img");

            img.src = URL.createObjectURL(file);

            img.style.width = "120px";
            img.style.height = "90px";
            img.style.objectFit = "cover";
            img.style.borderRadius = "8px";

            preview.appendChild(img);
        });
    }
}

/* =========================
   REPORT GENERATION
========================= */

function generateReport() {

    const providedDocs = [];
    const requiredDocs = [];

    document
        .querySelectorAll(".provided-document:checked")
        .forEach(doc => providedDocs.push(doc.value));

    document
        .querySelectorAll(".required-document:checked")
        .forEach(doc => requiredDocs.push(doc.value));

    const allDocs = [...providedDocs, ...requiredDocs];

    const finalRemarks =
        document.getElementById("remarks").value.trim() ||
        "Pending documents to be produced if required.";

    const report = `
S. SANTHANAM
Surveyor & Loss Assessor

---------------------------------
SURVEY REPORT
---------------------------------

Survey No         : ${document.getElementById("surveyNo").value || "N/A"}
Insured Name      : ${document.getElementById("insured").value || "N/A"}
Registration No   : ${document.getElementById("reg").value || "N/A"}
Date of Loss      : ${document.getElementById("lossDate").value || "N/A"}

Claim No          : ${document.getElementById("claim").value || "N/A"}
Policy No         : ${document.getElementById("policy").value || "N/A"}

Survey Appt Date  : ${document.getElementById("surveyAppt").value || "N/A"}
Survey Conducted  : ${document.getElementById("surveyConducted").value || "N/A"}

Garage / Location : ${document.getElementById("garage").value || "N/A"}

---------------------------------
DAMAGE DETAILS
---------------------------------

${document.getElementById("damage").value || "No damage details entered."}

---------------------------------
DOCUMENTS VERIFIED
---------------------------------

${allDocs.length > 0
        ? allDocs.join("\n")
        : "No documents selected."}

---------------------------------
REMARKS
---------------------------------

${finalRemarks}

---------------------------------
END OF REPORT
---------------------------------
`;

    document.getElementById("report").textContent = report;
}

/* =========================
   DASHBOARD STATS
========================= */

function loadStats() {

    const total = 12;
    const completed = 7;
    const pending = total - completed;

    document.getElementById("totalVehicles").textContent = total;
    document.getElementById("completedReports").textContent = completed;
    document.getElementById("pendingReports").textContent = pending;
}

/* =========================
   PROGRESS BAR
========================= */

function updateProgress() {

    const fields = [
        "surveyNo",
        "insured",
        "reg",
        "lossDate",
        "claim",
        "policy",
        "surveyAppt",
        "surveyConducted",
        "garage",
        "damage",
        "reportDate",
        "insuranceCompany",
        "insuredAddress",
        "vehicleLocation",
        "workshopAddress",
        "vehicleMakeModel",
        "contactPerson",
        "contactNumber",
        "surveyObservation",
        "pendingDocuments"
    ];

    let filled = 0;

    fields.forEach(id => {

        const el = document.getElementById(id);

        if (el && el.value.trim() !== "") {
            filled++;
        }
    });

    const percent = Math.round(
        (filled / fields.length) * 100
    );

    const progressBar =
        document.getElementById("progressBar");

    const progressText =
        document.getElementById("progressText");

    if (progressBar) {
        progressBar.style.width = percent + "%";
    }

    if (progressText) {
        progressText.textContent =
            `Completion: ${percent}%`;
    }
}

/* =========================
   DOCUMENT LISTS
========================= */

function loadDocumentLists() {

    const provided =
        document.getElementById("providedDocs");

    const required =
        document.getElementById("requiredDocs");

    if (!provided || !required) return;

    provided.innerHTML = "";
    required.innerHTML = "";

    documentList.forEach(doc => {

        provided.innerHTML += `
            <label class="doc-item">
                <input
                    type="checkbox"
                    value="${doc}"
                    class="provided-document">
                <span>${doc}</span>
            </label>
        `;

        required.innerHTML += `
            <label class="doc-item">
                <input
                    type="checkbox"
                    value="${doc}"
                    class="required-document">
                <span>${doc}</span>
            </label>
        `;
    });
}

/* =========================
   LIVE PROGRESS TRACKING
========================= */

document.addEventListener("input", function () {

    const reportSection =
        document.getElementById("initialReport");

    if (
        reportSection &&
        !reportSection.classList.contains("hidden")
    ) {
        updateProgress();
    }
});

/* =========================
   PAGE LOAD
========================= */

window.onload = function () {

    loadStats();

    loadDocumentLists();

    updateProgress();

    console.log("Insurance Dashboard Loaded");
};
