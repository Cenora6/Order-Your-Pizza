$(function () {

    const sizeForm = $('.size');
    const sizeChoose = sizeForm.find('.choose');
    const small = sizeForm.find('input#small');
    const medium = sizeForm.find('input#medium');
    const large = sizeForm.find('input#large');
    const extraLarge = sizeForm.find('[id="extra large"]');
    const image = sizeForm.find('img');
    const confirm = $('.confirm');

    sizeChoose.css({
        top: "0.4rem",
        left: "0.2rem",
        width: "1.5rem",
        height: "1.5rem",
    });

    image.css({
        width: "5rem",
    });

    small.on('change', function () {
        sizeChoose.css({
            top: "0.4rem",
            left: "0.2rem",
            width: "1.5rem",
            height: "1.5rem",
        });
        image.css({
            width: "5rem",
        });
    });

    medium.on('change', function () {
        sizeChoose.css({
            top: "-0.3rem",
            left: "6rem",
            width: "2rem",
            height: "2.5rem",
        });
        image.css({
            width: "6rem",
        });
    });

    large.on('change', function () {
        sizeChoose.css({
            top: "-1rem",
            left: "13rem",
            width: "2.5rem",
            height: "3.8rem",
        });
        image.css({
            width: "7rem",
        });
    });

    extraLarge.on('change', function () {
        sizeChoose.css({
            top: "-1.5rem",
            left: "20rem",
            width: "3rem",
            height: "5rem",
        });
        image.css({
            width: "8rem",
        });
    });

    const crustInput = $(".crust input");
    const crustLabel = $(".crust label");
    crustInput.on('change', function () {
        crustLabel.css({
            filter: "grayscale(100%)",
        });
        const inputId = $(this).siblings();
        inputId.css({
            filter: "grayscale(0%)",
        })
    });

    const pizzaType = $(".pizza-type input");
    const pizzaTypeLabel = $(".pizza-type label");
    pizzaTypeLabel.on('mouseover', function () {
        $(this).addClass('hover');
    });

    pizzaTypeLabel.on('mouseout', function () {
        $(this).removeClass('hover');
    });

    pizzaType.on('change', function () {
        pizzaTypeLabel.removeClass('chosen');
        $(this).siblings().addClass('chosen');
    });

    const pizzaSizeStep = $('.pizza-size');
    const pizzaCrustStep = $('.pizza-crust');
    const pizzaTypeStep = $('.pizza-type');
    const pizzaIngredientsStep = $('.pizza-ingredients');
    const pizzaConfirmStep = $('.pizza-confirm');
    const windowPopOut = $('.window-popup');
    const cartStep = $('.cart-panel');
    const finishStep = $('.end-popup');

    const sizeButtons = $('.pizza-size button');
    const crustButtons = $('.pizza-crust button');
    const typeButtons = $('.pizza-type button');
    const ingredientsButtons = $('.pizza-ingredients button');
    const confirmButtons = $('.pizza-confirm button');
    const errorSpanCrust = pizzaCrustStep.find('.error');
    const errorSpanType = pizzaTypeStep.find('.error');

    let pizzaSizeValue;
    let pizzaSizePrice;

    let pizzaCrustValue;
    let pizzaTypeValue;
    let pizzaTypeImage;

    let pizzaIngredientsValue = [];
    let pizzaIngredientsPrice;

    function showSizeStep () {
        pizzaSizeStep.css({
            display: "flex",
        })
    }

    function showCrustStep () {
        pizzaCrustStep.css({
            display: "flex",
        })
    }

    function showTypeStep () {
        pizzaTypeStep.css({
            display: "flex",
        })
    }

    function showIngredientsStep () {
        pizzaIngredientsStep.css({
            display: "flex",
        })
    }

    function showConfirmStep () {
        pizzaConfirmStep.css({
            display: "flex",
        })
    }

    function showCartStep () {
        cartStep.css({
            display: "flex",
        })
    }

    sizeButtons.on('click', function () {
        pizzaSizePrice = $('input[name="size"]:checked').val();
        pizzaSizeValue = $('input[name="size"]:checked').attr('id');
        pizzaSizeStep.fadeOut(100);
        pizzaCrustStep.fadeIn(2000);
        showCrustStep();
    });

    crustButtons.on('click', function () {
        if($(this).text() === "Previous") {
            pizzaCrustStep.fadeOut(100);
            pizzaSizeStep.fadeIn(2000);
            showSizeStep();
        } else {
            pizzaCrustValue = $('input[name="crust"]:checked').val();
            if(pizzaCrustValue === undefined) {
                errorSpanCrust.fadeIn(1000);
                errorSpanCrust.css({
                    display: "flex",
                });
                errorSpanCrust.text("You need to choose the pizza's crust!");
                errorSpanCrust.delay(3000).fadeOut(1000)
            } else {
                pizzaCrustStep.fadeOut(100);
                pizzaTypeStep.fadeIn(2000);
                showTypeStep();
            }
        }
    });

    typeButtons.on('click', function () {
        if($(this).text() === "Previous") {
            pizzaTypeStep.fadeOut(100);
            pizzaCrustStep.fadeIn(2000);
            showCrustStep();
        } else {
            const pizzaType = $('input[name="type"]:checked');
            pizzaTypeValue = pizzaType.val();
            if(pizzaTypeValue === undefined) {
                errorSpanType.fadeIn(1000);
                errorSpanType.css({
                    display: "flex",
                });
                errorSpanType.text("You need to choose the pizza's type!");
                errorSpanType.delay(3000).fadeOut(1000)
            } else {
                pizzaTypeImage = pizzaType.attr('id');
                pizzaTypeStep.fadeOut(100);
                pizzaIngredientsStep.fadeIn(2000);
                showIngredientsStep();
            }
        }
    });

    ingredientsButtons.on('click', function () {

        if($(this).text() === "Previous") {
            pizzaIngredientsStep.fadeOut(100);
            pizzaTypeStep.fadeIn(2000);
            showTypeStep();
        } else {
            pizzaIngredientsValue = [];
            let ingredientsPrice = [];

            const ingredients = $('input[name="ingredients"]:checked');
            ingredients.each(function () {
                pizzaIngredientsValue.push($(this).attr('id'));
                ingredientsPrice.push($(this).val());
            });

            if(pizzaIngredientsValue.length > 0) {
                pizzaIngredientsPrice = ingredientsPrice.reduce(function (a, b) {
                    return parseInt(a, 10) + parseInt(b, 10);
                });
            } else {
                pizzaIngredientsPrice = "0"
            }

            pizzaIngredientsStep.fadeOut(100);
            pizzaConfirmStep.fadeIn(2000);
            showConfirmStep();
            addPizza();
        }
    });

    confirmButtons.on('click', function () {
        if($(this).text() === "Previous") {
            deletePizza();

            pizzaConfirmStep.fadeOut(100);
            pizzaIngredientsStep.fadeIn(2000);
            showIngredientsStep();
        } else {
            console.log($('input:checked'))
            windowPopOut.animate({"right": '+=290'}, 1000);

            const pizzaType = pizzaTypeValue;
            const pizzaSize = pizzaSizeValue;
            const pizzaIngredients = pizzaIngredientsValue;
            const pizzaQuantity = $('.description .quantity span').text();
            const pizzaCrust = pizzaCrustValue;
            const pizzaTotal = (parseInt(pizzaSizePrice) + parseInt(pizzaIngredientsPrice)) * pizzaQuantity;

            let cart = JSON.parse(sessionStorage.getItem("pizza"));
            const pizza = {
                type: pizzaType,
                size: pizzaSize,
                ingredients: pizzaIngredients,
                quantity: pizzaQuantity,
                crust: pizzaCrust,
                price: pizzaTotal,
            };

            if(cart === null) {
                sessionStorage.setItem("pizza", JSON.stringify([pizza]));
            } else {
                cart = [...cart, pizza];
                sessionStorage.setItem("pizza", JSON.stringify(cart));
            }

            function clearForms()
            {
                sizeChoose.css({
                    top: "0.4rem",
                    left: "0.2rem",
                    width: "1.5rem",
                    height: "1.5rem",
                });
                image.css({
                    width: "5rem",
                });

                crustLabel.css({
                    filter: "grayscale(100%)",
                });

                pizzaTypeLabel.removeClass('chosen');

                $('input:checked').prop('checked', false);
                small.prop('checked', true);
            }

            clearForms();

            const addMore = $('.window-popup .add');
            addMore.on('click', function () {
                windowPopOut.animate({"right": '-320'}, 1000);
                pizzaConfirmStep.fadeOut(100);
                pizzaSizeStep.fadeIn(2000);
                showSizeStep();
                confirm.empty();
            });

            const cartButton = $('.window-popup .cart');
            cartButton.on('click', function () {
                windowPopOut.animate({"right": '-320'}, 1000);
                pizzaConfirmStep.fadeOut(100);
                cartStep.fadeIn(2000);
                showCartStep();
                showCart();
            })
        }
    });

    confirm.on('click', $('i'), function (e) {
        const basicPrice = parseInt(pizzaSizePrice) + parseInt(pizzaIngredientsPrice);

        const quantityButton = $(e.target);
        const quantityNumber = $(e.target).parent().find('span');
        const number = quantityNumber.text();

        const className = quantityButton.attr('class');
        const total = $(e.target).parent().parent().find('.total-price');

        if (className === 'fas fa-plus-circle' || className === 'fas fa-plus-circle rotate') {
            quantityButton.toggleClass("rotate");
            quantityNumber.text(parseInt(number) + 1);
            total.text('Total: ' + basicPrice * (parseInt(number) + 1) + ' €');

        } else if (className === 'fas fa-minus-circle' || className === 'fas fa-minus-circle rotate') {
            quantityButton.toggleClass("rotate");
            if (number > 0) {
                quantityNumber.text(parseInt(number) - 1);
                total.text('Total: ' + basicPrice * (parseInt(number) - 1) + ' €');
            }
        }
    });

    function addPizza () {

        const newSingle = $('<div class="single">');
        const pizzaPhoto = $('<img alt="pizza">');
        pizzaPhoto.attr('src', 'images/' + pizzaTypeValue + '.png');

        const descriptionDiv = $('<div class="description">');

        const pizzaTypeConfirm = $('<h3>');
        pizzaTypeConfirm.text(pizzaTypeValue);

        const ingredients = $('<div class="ingredients">');
        const ingredientsPrice = $('<span class="ingredients-price">');
        ingredientsPrice.text(pizzaIngredientsPrice + ' €');

        const extraIngredientsConfirm = $('<p>');
        if(pizzaIngredientsValue.length === 0) {
            extraIngredientsConfirm.text('Extra ingredients: - ');
        } else {
            extraIngredientsConfirm.text('Extra ingredients: ' + pizzaIngredientsValue.join(", "));
        }

        ingredients.append(extraIngredientsConfirm);
        ingredients.append(ingredientsPrice);

        const line = $('<div class="line">');

        const pizzaSize = $('<div class="pizza-size-confirmation">');

        const pizzaSizeConfirm = $('<span class="size-confirmation">');
        pizzaSizeConfirm.text('Size: ' + pizzaSizeValue);

        const sizePrice = $('<span class="size-price">');
        sizePrice.text(pizzaSizePrice + ' €');

        pizzaSize.append(pizzaSizeConfirm);
        pizzaSize.append(sizePrice);

        const pizzaCrustConfirm = $('<span class="crust-confirmation">');
        pizzaCrustConfirm.text('Crust: ' + pizzaCrustValue);

        const summary = $('<div class="summary">');
        const totalPrice = $('<span class="total-price">');
        const basicPrice = parseInt(pizzaSizePrice) + parseInt(pizzaIngredientsPrice);
        totalPrice.text('Total: ' + basicPrice + ' €');

        const quantityDiv = $('<div class="quantity">');
        const minusButton = $('<i class="fas fa-minus-circle">');
        const pizzaQuantity = $('<span>');
        pizzaQuantity.text(1);
        const plusButton = $('<i class="fas fa-plus-circle">');

        quantityDiv.append(minusButton);
        quantityDiv.append(pizzaQuantity);
        quantityDiv.append(plusButton);

        summary.append(quantityDiv);
        summary.append(totalPrice);

        descriptionDiv.append(pizzaTypeConfirm);
        descriptionDiv.append(ingredients);
        descriptionDiv.append(line);
        descriptionDiv.append(pizzaSize);
        descriptionDiv.append(pizzaCrustConfirm);
        descriptionDiv.append(summary);

        newSingle.append(pizzaPhoto);
        newSingle.append(descriptionDiv);

        confirm.append(newSingle);

    }

    function deletePizza() {
        $('.confirm .single').remove();
    }


    function showCart() {
        console.log(localStorage.getItem("pizza"));
        const pizzaCart = $('.pizza-cart');
        pizzaCart.empty();

        const allPizza = JSON.parse(sessionStorage.getItem("pizza"));
        console.log(allPizza);

        let totalPrice = [];
        let price;
        for (let i = 0; i < allPizza.length; i++) {

            const pizzaList = $('<li></li>');
            const pizzaName = $('<h3>');
            const pizzaIngredients = $('<p>');
            const pizzaCrust = $('<span>');
            const pizzaDetails = $('<div class="pizza-details">');
            const deletePizza = $('<button class="delete">');

            totalPrice = [...totalPrice, allPizza[i].price];
            price = totalPrice.reduce(function (a, b) {
                return parseInt(a, 10) + parseInt(b, 10);
            });

            pizzaName.text(allPizza[i].quantity + " x " + allPizza[i].type);
            pizzaIngredients.text("Ingredients: " + allPizza[i].ingredients.join(', '));
            pizzaCrust.text("Crust: " + allPizza[i].crust);

            const buttonText = $('<span>');
            buttonText.text("Delete");
            deletePizza.append(buttonText);

            pizzaDetails.append(pizzaIngredients);
            pizzaDetails.append(pizzaCrust);

            pizzaList.append(pizzaName);
            pizzaList.append(pizzaDetails);
            pizzaList.append(deletePizza);
            pizzaCart.append(pizzaList);

        }
        const priceDiv = $('<div class="total-price">');
        const pizzaPrice = $('<h4>');
        pizzaPrice.text("Total: " + price + " €");

        priceDiv.append(pizzaPrice);
        cartStep.append(priceDiv);
    }

    const deleteButton = $('.delete');
    cartStep.on('click', deleteButton, function (e) {
        if($(e.target).parent().prop('tagName') === "LI") {
            $(e.target).parent().remove();
        } else {
            $(e.target).parent().parent().remove();
        }
    });


    const btnCancel = $('.btn-cancel');
    const btnConfirm = $('.btn-confirm');

    btnCancel.on('click', function () {
        confirm.empty();
        $('.pizza-cart').empty();
        sessionStorage.clear();
        pizzaCrustStep.fadeOut(100);
        pizzaSizeStep.fadeIn(2000);
        showSizeStep();
    });

    btnConfirm.on('click', function () {
        confirm.empty();
        $('.pizza-cart').empty();
        sessionStorage.clear();
        finishStep.fadeIn(2000);
    });
});