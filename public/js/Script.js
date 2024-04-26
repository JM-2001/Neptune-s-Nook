/*
"use strict";
(function () {
    window.addEventListener('load', init);

    function init() {
        const dropDownNav = document.getElementById('drop-down-nav-div');

        if (dropDownNav) {
            dropDownNav.addEventListener('click', displayDropDown);
        }
    }

    
})
*/

const dropDownNav = document.getElementById('drop-down-nav-div');

if (dropDownNav) {
    dropDownNav.addEventListener('click', displayDropDown);
}

function displayDropDown() {
    const dropDownMenu = document.querySelector('.dropdown-div');

    if (dropDownMenu.style.display == 'none') {
        dropDownMenu.style.display = 'block';
    } else {
        dropDownMenu.style.display = 'none';
    }
}


function displayBottomNav() {
    const bottomNavBar = document.getElementById('bottom-nav-bar');
    const hamburgerIcon = document.querySelector('#top-nav-bar-right-ham-div button img');

    if (bottomNavBar.style.display == 'none') {
        bottomNavBar.style.display = 'block';
        hamburgerIcon.src = '/images/menu-open.png'
    } else {
        bottomNavBar.style.display = 'none';
        hamburgerIcon.src = '/images/menu.png'
    }
}

let createProductBoolean = false;

function displayCreateProduct() {
    const addProductForm = document.getElementById('product-listing-add');
    const addProductBtn = document.getElementById('create-product-btn');

    if (createProductBoolean === true) {
        addProductForm.classList.remove("product-listing-add-hidden");
        addProductForm.classList.add("product-listing-add-show");
        addProductBtn.textContent = "Cancel";
        
        createProductBoolean = false;
    } else {
        addProductForm.classList.add("product-listing-add-hidden");
        addProductForm.classList.remove("product-listing-add-show");
        addProductBtn.textContent = "Create Product";
        
        createProductBoolean = true;
    }
}

function hideCreateProduct() {
    const addProductForm = document.getElementById('product-listing-add');
    addProductForm.classList.add("product-listing-add-hidden");
    addProductForm.classList.remove("product-listing-add-show");
    createProductBoolean = true;
}

let editProductBoolean = false;

function makeProductEdit(productId) {
    const productDiv = document.getElementById(`product-listing-${productId}`);
    const productSaveBtn = productDiv.querySelector('.listing-btn-div .save-btn');
    const productGenBtn = productDiv.querySelector('.listing-btn-div .edit-btn');
    const productInputs = productDiv.querySelectorAll('.listing-div input');
    const productTextarea = productDiv.querySelector('.listing-div textarea');
    const productSelect = productDiv.querySelector('.listing-div select'); // New line

    if (editProductBoolean === true) {
        productSaveBtn.classList.remove('hidden');
        productGenBtn.textContent = "Cancel";
        for (let i = 0; i < productInputs.length; i++) {
            let element = productInputs[i];
            // Skip the Product ID input field
            if (element.id !== `product-id-${productId}`) {
                element.removeAttribute('readonly');
            }
        }
        productTextarea.removeAttribute('readonly');
        productSelect.removeAttribute('disabled'); // New line
        editProductBoolean = false;
    } else {
        for (let i = 0; i < productInputs.length; i++) {
            let element = productInputs[i];
            // Skip the Product ID input field
            if (element.id !== `product-id-${productId}`) {
                element.setAttribute('readonly', 'readonly');
            }
        }
        productTextarea.setAttribute('readonly', 'readonly');
        productSelect.setAttribute('disabled', 'disabled'); // New line
        productSaveBtn.classList.add('hidden');
        productGenBtn.textContent = "Edit";
        editProductBoolean = true;
    }
}

