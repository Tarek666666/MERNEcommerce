// add product form validation to prevent user typing wrong input

const addProductBtn = document.querySelector(".add-product-btn");
const productName = document.querySelector(".user-input");
const productImg = document.querySelector(".user-img");
const productPrice = document.querySelector(".user-price");
const titleError = document.querySelector(".form-error-title");
const fromHeader = document.querySelector(".form-header");
const emptyError = document.querySelector(".form-error-empty");
const addedSuccess = document.querySelector(".form-added-success");

document.addEventListener("DOMContentLoaded", () => {
    addProductBtn.addEventListener("click", (e) => {
        //title , img , price field cant be empty
        if (productName.value !== "" && productImg.value !== "" && productPrice.value !== "") {
            //title should at least has one letter
            if (/([a-z])/.test(productName.value)) {
                titleError.classList.remove("show-error");
                fromHeader.classList.add("hide-error");
                emptyError.classList.remove("show-error");
                addedSuccess.classList.add("show-error");
            } else {
                e.preventDefault();
                titleError.classList.add("show-error");
                fromHeader.classList.add("hide-error");
                emptyError.classList.remove("show-error");
            }
        } else {
            e.preventDefault();
            emptyError.classList.add("show-error");
            fromHeader.classList.add("hide-error");
            titleError.classList.remove("show-error");
        }
    });
});
