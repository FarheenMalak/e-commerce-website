document.querySelectorAll('nav ul li.btn span').forEach(function(element) {
    element.addEventListener('click', function() {
        document.querySelectorAll('nav ul div.items').forEach(function(item) {
            item.classList.toggle('show');
        });
        document.querySelectorAll('nav ul li.btn span').forEach(function(btn) {
            btn.classList.toggle('show');
        });
    });
});

function login_signup() {
    const login_name = document.getElementById("login-name").value;
    const login_email = document.getElementById("login-email").value;
    const login_password = document.getElementById("login-password").value;


    let formdata;
    if (!login_name && !login_email && !login_password) {
        Swal.fire({
            icon: "error",
            title: "Please fill out the form!! ",
          });
    } else {
        !login_name
            ?Swal.fire({
              icon: "error",
              title: "Name is required!!",
            })
            : !login_email
                ? Swal.fire({
              icon: "error",
              title: "Email is required!!",
            })
                : !login_password
                    ? Swal.fire({
              icon: "error",
              title: "Password is required!!",
            })
                    : (formdata = { login_name, login_email, login_password });
        console.log(formdata);
        resetdata();
        //   Show success message
        if (login_name && login_email && login_password) {
            Swal.fire({
                title: "Your Account Has Been Logged In!",
                icon: "success"
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "home.html";
                }
            })
        }
    };
}
function resetdata() {
    document.getElementById('login-name').value = "";
    document.getElementById('login-email').value = "";
    document.getElementById('login-password').value = "";
}
function signup() {
    const signup_name = document.getElementById("signup-name").value;
    const signup_email = document.getElementById("signup-email").value;
    const signup_password = document.getElementById("signup-password").value;
    let formdata2;
    if (!signup_name && !signup_email && !signup_password) {
        Swal.fire({
            icon: "error",
            title: "Please fill out the form!! ",
          });
    } else {
        !signup_name
            ? Swal.fire({
                icon: "error",
                title: "Name is required!! ",
              })
            : !signup_email
                ? Swal.fire({
                    icon: "error",
                    title: "Email is required!! ",
                  })
                : !signup_password
                    ? Swal.fire({
                        icon: "error",
                        title: "Password is required!! ",
                      })
                    : (formdata2 = { signup_name, signup_email, signup_password });
        console.log(formdata2);
    }
    //   Show success message
    if (signup_name && signup_email && signup_password) {
        Swal.fire({
            title: "Your Account Has Been Created!",
            icon: "success"
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "home.html";
            }
        })
    };
    resetdata1();
}
function resetdata1() {
    document.getElementById('signup-name').value = "";
    document.getElementById('signup-email').value = "";
    document.getElementById('signup-password').value = "";
}
// form validation ends
// Get all product cards on the page
const productCards = document.querySelectorAll(".product-card");

// Iterate over each product card
productCards.forEach(productCard => {
  // Find color options and main images for the current card
  const colorOptions = productCard.querySelector(".color-option");
  const mainImages = productCard.querySelector(".main-images");

  // Add click event listener to the color options of the current card
  colorOptions.addEventListener("click", (e) => {
    let target = e.target;

    // Check if the clicked element has the "circle" class
    if (target.classList.contains("circle")) {
      // Remove the "active" class from the currently active circle
      colorOptions.querySelector(".active").classList.remove("active");
      // Add the "active" class to the clicked circle
      target.classList.add("active");

      // Remove the "active" class from the currently active main image
      mainImages.querySelector(".active").classList.remove("active");
      // Add the "active" class to the main image corresponding to the clicked circle
      mainImages.querySelector(`.${target.id}`).classList.add("active");
    }
  });
});
//search filter

document.addEventListener('DOMContentLoaded', function () {
    // Get the input element and attach an input event listener
    var searchInput = document.getElementById('productSearch');
    searchInput.addEventListener('input', filterProducts);

    // Function to filter products based on the search input
    function filterProducts() {
        var searchTerm = searchInput.value.toLowerCase();
        var productCards = document.querySelectorAll('.product-card');

        productCards.forEach(function (productCard) {
            var productName = productCard.querySelector('.productname').innerText.toLowerCase();
            var productDescription = productCard.querySelector('.shoe-details p').innerText.toLowerCase();

            // Check if the product name or description contains the search term
            if (productName.includes(searchTerm) || productDescription.includes(searchTerm)) {
                productCard.style.display = 'block';
            } else {
                productCard.style.display = 'none';
            }
        });
    }
});
// Initialize an array to store cart items
let cartItems = [];

// Function to handle the "Add to Cart" action
function addToCart(button) {
    // Get the product details from the parent element
    const productCard = button.closest('.product');
    const productId = productCard.getAttribute('data-product-id');
    const productName = productCard.querySelector('.productname').textContent;
    const productPrice = productCard.querySelector('.myprice').textContent;

    // Create an object representing the item
    const cartItem = {
        id: productId,
        name: productName,
        price: productPrice,
    };

    // Add the item to the cart array
    cartItems.push(cartItem);

    // Update the cart display
    updateCartDisplay();

    // You can customize this part based on your needs
    // For now, it will show a simple alert
    showAlert(`${productName} added to cart!`);
}

// Function to update the cart display
function updateCartDisplay() {
    // Get the cart container element
    const cartContainer = document.getElementById('cart-container');

    // Clear previous content
    cartContainer.innerHTML = '';

    // Check if the cart is not empty
    if (cartItems.length > 0) {
        // Create a list to display cart items
        const itemList = document.createElement('ul');

        // Add each item to the list
        cartItems.forEach((item) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.name} - ${item.price}`;
            itemList.appendChild(listItem);
        });

        // Add the list to the cart container
        cartContainer.appendChild(itemList);
    } else {
        // Display a message if the cart is empty
        cartContainer.textContent = 'Your cart is empty.';
    }
}

// Function to show a simple alert (you can replace it with your cart logic)
function showAlert(message) {
    Swal.fire({
        icon: 'success',
        title: 'Added to Cart',
        text: message,
        showConfirmButton: false,
        timer: 1500,
    });
}

// Function to empty cart
function emptyCart() {
    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = ''
        location.reload();
}

// Function to checkout
function checkout() {
    Swal.fire({
        title: "Your Order Has been Placed!",
        icon: "success"
    }).then(function() {
        emptyCart(); // Call the function inside the callback
    });
}
//custom slider
const carousel = document.querySelector(".mycarousel"),
firstImg = carousel.querySelectorAll(".slider-image")[0],
arrowIcons = document.querySelectorAll(".slider-wrapper i");

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

const showHideIcons = () => {
    // showing and hiding prev/next icon according to carousel scroll left value
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value
        // if clicked icon is left, reduce width value from the carousel scroll left else add to it
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
    });
});

const autoSlide = () => {
    // if there is no image left to scroll then return from here
    if(carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;

    positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
    let firstImgWidth = firstImg.clientWidth + 14;
    // getting difference value that needs to add or reduce from carousel left to take middle img center
    let valDifference = firstImgWidth - positionDiff;

    if(carousel.scrollLeft > prevScrollLeft) { // if user is scrolling to the right
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    // if user is scrolling to the left
    carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}

const dragStart = (e) => {
    // updatating global variables value on mouse down event
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    // scrolling images/carousel to left according to mouse pointer
    if(!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");

    if(!isDragging) return;
    isDragging = false;
    autoSlide();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);

//contact message
function sendmessage() {
    Swal.fire({
        title: "Your Message has Been Sent!",
        icon: "success"
    }).then(function() {
        location.reload() ; // Call the function inside the callback
    });   
}
function readMore() {
    var moreText = document.getElementById("more");

    if (moreText.style.display === "none" || moreText.style.display === "") {
      moreText.style.display = "block";
      document.getElementById('transparent').innerText="Read Less"
    } else {
      moreText.style.display = "none";
      document.getElementById('transparent').innerText="Read More"
    }
  }