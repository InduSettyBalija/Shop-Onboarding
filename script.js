//THEME PAGE

function selectTheme(theme) {
    localStorage.setItem("selectedTheme", theme);

    // Remove selection from all cards
    document.querySelectorAll(".theme-card").forEach(card => {
        card.classList.remove("selected");
        let btn = card.querySelector("button");
        btn.innerHTML = "Apply";
        btn.classList.remove("selected-btn");
    });

    // Highlight the selected card
    let selectedCard = [...document.querySelectorAll(".theme-card")]
        .find(c => c.querySelector(".card-title").innerText.toLowerCase().includes(theme.toLowerCase()));
    if (selectedCard) {
        selectedCard.classList.add("selected");
        let btn = selectedCard.querySelector("button");
        btn.innerHTML = `<span class="checkmark">✔</span>`;
        btn.classList.add("selected-btn");
    }
}

function goNext() {
    if (!localStorage.getItem("selectedTheme")) {
        alert("Please select a theme before continuing.");
        return;
    }
    window.location.href = "product.html";
}

//PRODUCT PAGE

function saveProductDetails() {
    let type = document.getElementById("productType").value;
    let category = document.getElementById("productCategory").value;
    let subCategory = document.getElementById("productSubCategory").value || "";

    if (!type || !category) {
        alert("Please fill in Product Type and Category.");
        return;
    }

    localStorage.setItem("productType", type);
    localStorage.setItem("productCategory", category);
    localStorage.setItem("productSubCategory", subCategory);

    window.location.href = "price.html";
}

// PRICE PAGE


// Live Preview Function
function previewImages() {
    let previewContainer = document.getElementById("imagePreview");
    previewContainer.innerHTML = ""; // Clear previous previews
    let files = document.getElementById("productImages").files;

    for (let file of files) {
        if (file.type.startsWith("image/")) {
            let reader = new FileReader();
            reader.onload = function(e) {
                let img = document.createElement("img");
                img.src = e.target.result;
                img.style.maxWidth = "120px";
                img.style.margin = "5px";
                img.style.border = "1px solid #ddd";
                img.style.borderRadius = "4px";
                previewContainer.appendChild(img);
            };
            reader.readAsDataURL(file);
        }
    }
}

// Save Pricing Details with Images (Fixed Version)
function savePricingDetails() {
    let files = document.getElementById("productImages").files;
    let imageArray = [];

    // Store other pricing details and redirect
    function saveAndRedirect() {
        localStorage.setItem("productName", document.getElementById("productName").value);
        localStorage.setItem("productDescription", document.getElementById("productDescription").value);
        localStorage.setItem("hasSKU", document.getElementById("hasSKU").checked);
        localStorage.setItem("skuCode", document.getElementById("skuCode").value);
        localStorage.setItem("hasHSN", document.getElementById("hasHSN").checked);
        localStorage.setItem("gstInclusive", document.getElementById("gstInclusive").checked);
        localStorage.setItem("netPrice", document.getElementById("netPrice").value);
        localStorage.setItem("listPrice", document.getElementById("listPrice").value);
        localStorage.setItem("discount", document.getElementById("discount").value);
        localStorage.setItem("gstRate", document.getElementById("gstRate").value);
        localStorage.setItem("shipping", document.getElementById("shipping").value);
        localStorage.setItem("stock", document.getElementById("stock").value);

        window.location.href = "completion.html";
    }

    if (files.length > 0) {
        let totalFiles = files.length;
        let filesProcessed = 0;

        for (let file of files) {
            let reader = new FileReader();
            reader.onload = function (e) {
                imageArray.push(e.target.result);
                filesProcessed++;
                if (filesProcessed === totalFiles) {
                    localStorage.setItem("productImages", JSON.stringify(imageArray));
                    saveAndRedirect(); // Redirect only after images saved
                }
            };
            reader.readAsDataURL(file);
        }
    } else {
        localStorage.setItem("productImages", "[]");
        saveAndRedirect();
    }
}

//COMPLETION PAGE
   
function loadCompletionData() {
    // Theme & Product Info
    document.getElementById("showTheme").innerText = localStorage.getItem("selectedTheme") || "Not set";
    document.getElementById("showType").innerText = localStorage.getItem("productType") || "Not set";
    document.getElementById("showCategory").innerText = localStorage.getItem("productCategory") || "Not set";
    document.getElementById("showSubCategory").innerText = localStorage.getItem("productSubCategory") || "Not set";

    // Basic Details
    document.getElementById("showProductName").innerText = localStorage.getItem("productName") || "Not set";
    document.getElementById("showProductDescription").innerText = localStorage.getItem("productDescription") || "Not set";
    document.getElementById("showSKU").innerText = localStorage.getItem("skuCode") || "Not set";
    document.getElementById("showHSN").innerText = localStorage.getItem("hasHSN") === "true" ? "Yes" : "No";
    document.getElementById("showGSTInclusive").innerText = localStorage.getItem("gstInclusive") === "true" ? "Yes" : "No";

    // Pricing Details
    document.getElementById("showNetPrice").innerText = localStorage.getItem("netPrice") || "Not set";
    document.getElementById("showListPrice").innerText = localStorage.getItem("listPrice") || "Not set";
    document.getElementById("showDiscount").innerText = localStorage.getItem("discount") || "Not set";
    document.getElementById("showGSTRate").innerText = localStorage.getItem("gstRate") || "Not set";
    document.getElementById("showShipping").innerText = localStorage.getItem("shipping") || "Not set";
    document.getElementById("showStock").innerText = localStorage.getItem("stock") || "Not set";

    // Uploaded Images
    let images = JSON.parse(localStorage.getItem("productImages") || "[]");
    let imgContainer = document.getElementById("uploadedImages");
    images.forEach(imgSrc => {
        let img = document.createElement("img");
        img.src = imgSrc;
        img.style.maxWidth = "120px";
        img.style.margin = "5px";
        img.style.border = "1px solid #ddd";
        img.style.borderRadius = "4px";
        imgContainer.appendChild(img);
    });
}
