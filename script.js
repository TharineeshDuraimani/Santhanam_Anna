let currentStep = 1;

/* =====================
   NAVIGATION
===================== */

function openModule(module) {
  if (module === "initial") {
    document.getElementById("home").classList.add("hidden");
    document.getElementById("initialReport").classList.remove("hidden");
    showStep(1);

    updateProgress(); // ✅ FIX: initialize progress
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

  updateProgress(); // ✅ keep progress synced
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

  Array.from(input.files).forEach(file => {
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    img.style.width = "100px";
    img.style.margin = "5px";
    preview.appendChild(img);
  });
}

/* =====================
   REPORT
===================== */

function generateReport() {

  const docs = [];
  document.querySelectorAll("#step3 input:checked")
    .forEach(c => docs.push(c.value));

  const report = `
S. SANTHANAM
Surveyor & Loss Assessor

---------------------------------
SURVEY REPORT
---------------------------------

Survey No: ${document.getElementById("surveyNo").value}
Insured: ${document.getElementById("insured").value}
Registration No: ${document.getElementById("reg").value}
Date of Loss: ${document.getElementById("lossDate").value}

Claim No: ${document.getElementById("claim").value}
Policy No: ${document.getElementById("policy").value}

Survey Appointment: ${document.getElementById("surveyAppt").value}
Survey Conducted: ${document.getElementById("surveyConducted").value}

Garage: ${document.getElementById("garage").value}

---------------------------------
DAMAGE DETAILS
---------------------------------
${document.getElementById("damage").value}

---------------------------------
DOCUMENTS VERIFIED
---------------------------------
${docs.join("\n")}

---------------------------------
REMARKS
---------------------------------
Pending documents to be produced if required.

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

window.onload = loadStats;

/* =====================
   PROGRESS BAR
===================== */

function updateProgress() {

  let filled = 0;
  let total = 10;

  const fields = [
    "make",
    "model",
    "year",
    "reg",
    "damage",
    "remarks",
    "insured",
    "policy",
    "claim",
    "location"
  ];

  fields.forEach(id => {
    const el = document.getElementById(id);
    if (el && el.value.trim() !== "") {
      filled++;
    }
  });

  const percent = Math.round((filled / total) * 100);

  document.getElementById("progressBar").style.width = percent + "%";
  document.getElementById("progressText").innerText =
    `Completion: ${percent}%`;
}

/* LIVE INPUT TRACKING */
document.addEventListener("input", function () {
  if (!document.getElementById("initialReport").classList.contains("hidden")) {
    updateProgress();
  }
});