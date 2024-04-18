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

function makeProductEdit(productId) {
    const productDiv = document.getElementById(`product-listing-${productId}`);
    const productSaveBtn = productDiv.querySelector('.listing-btn-div .save-btn');
    const productGenBtn = productDiv.querySelector('.listing-btn-div .edit-btn');
    const productInputs = productDiv.querySelectorAll('.listing-div input');
    const productTextarea = productDiv.querySelector('.listing-div textarea');

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
        productSaveBtn.classList.add('hidden');
        productGenBtn.textContent = "Edit";
        editProductBoolean = true;
    }
}

const dropDownNav = document.getElementById('drop-down-nav-div');

dropDownNav.addEventListener('click', function () {
    const dropDownMenu = document.querySelector('.dropdown-div');

    if (dropDownMenu.style.display == 'none') {
        dropDownMenu.style.display = 'block';
    } else {
        dropDownMenu.style.display = 'none';
    }
});

document.getElementById('register-form').addEventListener('submit', function (event) {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        event.preventDefault();
        alert('Passwords do not match.');
    }
});

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('json-file-input').addEventListener('change', function () {
        console.log('Starting file read');
        const file = this.files[0];
        const reader = new FileReader();
        reader.onload = function () {
            document.getElementById('json-textarea').value = reader.result;
            console.log(document.getElementById('json-textarea').value);
        };
        reader.onerror = function () {
            console.error('Error reading file:', reader.error);
        };
        reader.readAsText(file);
    });
});

