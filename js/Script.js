function displayBottomNav() {
    const bottomNavBar = document.getElementById('bottom-nav-bar');
    const hamburgerIcon = document.querySelector('#top-nav-bar-right-ham-div button img');

    if (bottomNavBar.style.display == 'none') {
        bottomNavBar.style.display = 'block';
        hamburgerIcon.src = '../images/menu-open.png'
    } else {
        bottomNavBar.style.display = 'none';
        hamburgerIcon.src = '../images/menu.png'
    }
}

