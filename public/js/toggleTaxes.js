document.addEventListener("DOMContentLoaded", () => { 
    const taxToggleEls = document.querySelectorAll(".form-check-input");
    
    taxToggleEls.forEach((taxToggleEl) => {
        taxToggleEl.addEventListener("click", () => {
            const allListingsPrices = document.querySelectorAll(".listings .card .price");
            
            allListingsPrices.forEach((priceEl) => {
                let actualPrice = priceEl.actualPrice ? priceEl.actualPrice : Number(priceEl.textContent.split(',').join('')); // excl. 18% GST
                
                if(taxToggleEl.checked === true) { // show price with tax
                    let totalPrice = priceEl.totalPrice ? priceEl.totalPrice : (actualPrice * 0.18) + actualPrice; // incl. 18% GST
                    priceEl.textContent = totalPrice.toLocaleString("en-IN");
                    if (!priceEl.actualPrice && !priceEl.totalPrice) {
                        priceEl.actualPrice = actualPrice;
                        priceEl.totalPrice = totalPrice;
                    }
                }
                else { // show price without tax
                    priceEl.textContent = actualPrice.toLocaleString("en-IN");
                }
            });
        });
    }); 
});