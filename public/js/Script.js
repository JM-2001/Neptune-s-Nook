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

    if (createProductBoolean === true) {
        addProductForm.classList.remove("product-listing-add-hidden");
        addProductForm.classList.add("product-listing-add-show");
        createProductBoolean = false;
    } else {
        addProductForm.classList.add("product-listing-add-hidden");
        addProductForm.classList.remove("product-listing-add-show");
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

function makeProductEdit() {
    const productDiv = document.getElementById('product-listing-1');
    const productSaveBtn = document.querySelector('#product-listing-1 .listing-btn-div .save-btn');
    const productGenBtn = document.querySelector('#product-listing-1 .listing-btn-div .edit-btn');
    const productInputs = document.querySelectorAll('#product-listing-1 .listing-div input');
    const productInputId = document.getElementById('product-id');
    const productTextarea = document.getElementById('product-desc');

    if (editProductBoolean === true) {
        productSaveBtn.classList.remove('hidden');
        productGenBtn.textContent = "Cancel";
        for (let i = 0; i < productInputs.length; i++) {
            let element = productInputs[i];
            element.removeAttribute('readonly');
        }
        productTextarea.removeAttribute('readonly');
        productInputId.removeAttribute('readonly');
        editProductBoolean = false;
    } else {
        for (let i = 0; i < productInputs.length; i++) {
            let element = productInputs[i];
            element.setAttribute('readonly', 'readonly');
        }
        productTextarea.setAttribute('readonly', 'readonly');
        productInputId.setAttribute('readonly', 'readonly');
        productSaveBtn.classList.add('hidden');
        productGenBtn.textContent = "Edit";
        editProductBoolean = true;
    }
}

const dropDownNav = document.getElementById('drop-down-nav-div');

dropDownNav.addEventListener('click', function() {
    const dropDownMenu = document.querySelector('.dropdown-div');

    if (dropDownMenu.style.display == 'none') {
        dropDownMenu.style.display = 'block';
    } else {
        dropDownMenu.style.display = 'none';
    }
});

document.getElementById('register-form').addEventListener('submit', function(event) {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        event.preventDefault();
        alert('Passwords do not match.');
    }
});