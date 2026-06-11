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
/* =====================
   NAVIGATION
===================== */
function openModule(module) {
  if (module === "initial") {
    document.getElementById("home").classList.add("hidden");
    document.getElementById("initialReport").classList.remove("hidden");
    showStep(1);
  }
}

function showHome() {
  document.getElementById("home").classList.remove("hidden");
  document.getElementById("initialReport").classList.add("hidden");
}

/* =====================
   STEP CONTROL
===================== */
function showStep(step) {
  currentStep = step;

  for (let i = 1; i <= 5; i++) {
    document.getElementById("step" + i).classList.add("hidden");
  }

  document.getElementById("step" + step).classList.remove("hidden");
  updateProgress(); 
}

function nextStep() {
  if (currentStep < 5) showStep(++currentStep);
}

function prevStep() {
  if (currentStep > 1) showStep(--currentStep);
}

/* =====================
   IMAGE PREVIEW
===================== */
function previewImages() {
  const input = document.querySelector('input[type="file"]');
  const preview = document.getElementById("preview");
  preview.innerHTML = "";

  if (input.files) {
    Array.from(input.files).forEach(file => {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(file);
      img.style.width = "100px";
      img.style.height = "75px";
      img.style.objectFit = "cover";
      img.style.margin = "5px";
      img.style.borderRadius = "4px";
      preview.appendChild(img);
    });
  }
}

/* =====================
   REPORT GENERATION
===================== */
function generateReport() {
  const providedDocs = [];
const requiredDocs = [];

document.querySelectorAll(".provided-document:checked")
.forEach(doc => providedDocs.push(doc.value));

document.querySelectorAll(".required-document:checked")
.forEach(doc => requiredDocs.push(doc.value));

  const userRemarks = document.getElementById("remarks").value.trim();
  const finalRemarks = userRemarks !== "" ? userRemarks : "Pending documents to be produced if required.";

  const report = `
S. SANTHANAM
Surveyor & Loss Assessor

---------------------------------
SURVEY REPORT
---------------------------------
Survey No         : ${document.getElementById("surveyNo").value || 'N/A'}
Insured Name      : ${document.getElementById("insured").value || 'N/A'}
Registration No   : ${document.getElementById("reg").value || 'N/A'}
Date of Loss      : ${document.getElementById("lossDate").value || 'N/A'}

Claim No          : ${document.getElementById("claim").value || 'N/A'}
Policy No         : ${document.getElementById("policy").value || 'N/A'}

Survey Appt Date  : ${document.getElementById("surveyAppt").value || 'N/A'}
Survey Conducted  : ${document.getElementById("surveyConducted").value || 'N/A'}

Garage / Location : ${document.getElementById("garage").value || 'N/A'}

---------------------------------
DAMAGE DETAILS
---------------------------------
${document.getElementById("damage").value || 'No damage details entered.'}

---------------------------------
DOCUMENTS VERIFIED
---------------------------------
${docs.length > 0 ? docs.join("\n") : "No documents selected."}

---------------------------------
REMARKS
---------------------------------
${finalRemarks}

---------------------------------
END OF REPORT
---------------------------------
`;

  document.getElementById("report").innerText = report;
}

/* =====================
   DASHBOARD STATS
===================== */
function loadStats() {
  let total = 12;
  let completed = 7;
  let pending = total - completed;

  document.getElementById("totalVehicles").innerText = total;
  document.getElementById("completedReports").innerText = completed;
  document.getElementById("pendingReports").innerText = pending;
}

window.onload = function () {

  loadStats();
  loadDocumentLists();

};

/* =====================
   PROGRESS BAR (FIXED)
===================== */
function updateProgress() {
  let filled = 0;

  // ✅ These now perfectly match the actual IDs in your index.html
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

  fields.forEach(id => {
    const el = document.getElementById(id);
    // Check if the element exists and has text typed into it
    if (el && el.value.trim() !== "") {
      filled++;
    }
  });

  const total = fields.length;
  const percent = Math.round((filled / total) * 100);

  const progressBar = document.getElementById("progressBar");
  const progressText = document.getElementById("progressText");
  
  if (progressBar && progressText) {
    progressBar.style.width = percent + "%";
    progressText.innerText = `Completion: ${percent}%`;
  }
}

/* LIVE INPUT TRACKING */
document.addEventListener("input", function () {
  const initialReport = document.getElementById("initialReport");
  // Only update if the user is actively filling out the report module
  if (initialReport && !initialReport.classList.contains("hidden")) {
    updateProgress();
  }
});
function loadDocumentLists() {

  const provided = document.getElementById("providedDocs");
  const required = document.getElementById("requiredDocs");

  if (!provided || !required) return;

  provided.innerHTML = "";
  required.innerHTML = "";

  documentList.forEach(doc => {

    provided.innerHTML += `
      <label class="doc-item">
        <input type="checkbox"
               value="${doc}"
               class="provided-document">
        <span>${doc}</span>
      </label>
    `;

    required.innerHTML += `
      <label class="doc-item">
        <input type="checkbox"
               value="${doc}"
               class="required-document">
        <span>${doc}</span>
      </label>
    `;

  });
}
