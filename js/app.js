$(function () {

    let cart = JSON.parse(sessionStorage.getItem("pizza"));
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
    const finishStep = $('.confirmation');

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

    function showFinishStep () {
        finishStep.css({
            display: "flex",
        })
    }

    sizeButtons.on('click', function () {
        pizzaSizePrice = $('input[name="size"]:checked').val();
        pizzaSizeValue = $('input[name="size"]:checked').attr('id');
        pizzaSizeStep.fadeOut(300);
        showCrustStep();
        pizzaCrustStep.fadeIn(2000);
    });

    crustButtons.on('click', function () {
        if($(this).text() === "Previous") {
            showSizeStep();
            pizzaCrustStep.fadeOut(1000);
            pizzaSizeStep.fadeIn(1000);
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
                showTypeStep();
                pizzaCrustStep.fadeOut(1000);
                pizzaTypeStep.fadeIn(1000);
            }
        }
    });

    typeButtons.on('click', function () {
        if($(this).text() === "Previous") {
            showCrustStep();
            pizzaTypeStep.fadeOut(1000);
            pizzaCrustStep.fadeIn(1000);
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
                showIngredientsStep();
                pizzaTypeImage = pizzaType.attr('id');
                pizzaTypeStep.fadeOut(1000);
                pizzaIngredientsStep.fadeIn(1000);
            }
        }
    });

    ingredientsButtons.on('click', function () {

        if($(this).text() === "Previous") {
            showTypeStep();
            pizzaIngredientsStep.fadeOut(1000);
            pizzaTypeStep.fadeIn(1000);
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

            showConfirmStep();
            pizzaIngredientsStep.fadeOut(1000);
            pizzaConfirmStep.fadeIn(1000);
            addPizza();
        }
    });

    confirmButtons.on('click', function () {
        if($(this).text() === "Previous") {
            showIngredientsStep();
            windowPopOut.animate({"right": '-20rem'}, 1000);
            confirm.empty();
            pizzaConfirmStep.fadeOut(1000);
            pizzaIngredientsStep.fadeIn(1000);
        } else {
            windowPopOut.css({
                display: "block",
            });
            windowPopOut.animate({"right": '-1.875rem'}, 1000);

            const pizzaType = pizzaTypeValue;
            const pizzaSize = pizzaSizeValue;
            const pizzaIngredients = pizzaIngredientsValue;
            const pizzaQuantity = $('.description .quantity span').text();
            const pizzaCrust = pizzaCrustValue;
            const pizzaTotal = (parseInt(pizzaSizePrice) + parseInt(pizzaIngredientsPrice)) * pizzaQuantity;

            const pizza = {
                type: pizzaType,
                size: pizzaSize,
                ingredients: pizzaIngredients,
                quantity: pizzaQuantity,
                crust: pizzaCrust,
                price: pizzaTotal,
            };
            cart = JSON.parse(sessionStorage.getItem("pizza"));
            sessionStorage.setItem("pizza", JSON.stringify([pizza]));

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
                showSizeStep();
                windowPopOut.animate({"right": '-20rem'}, 1000);
                pizzaConfirmStep.fadeOut(1000);
                pizzaSizeStep.fadeIn(1000);
                confirm.empty();
            });

            const cartButton = $('.window-popup .cart');
            cartButton.on('click', function () {
                showCartStep();
                windowPopOut.animate({"right": '-20rem'}, 1000);
                pizzaConfirmStep.fadeOut(1000);
                windowPopOut.css({
                    display: "none"
                });
                cartStep.fadeIn(1000);
                showCart();
            })
        }
    });

    confirm.on('click', $('i'), function (e) {
        const basicPrice = parseInt(pizzaSizePrice) + parseInt(pizzaIngredientsPrice);
        const quantityButton = $(e.target);
        const quantityNumber = $(e.target).parent().find('span');
        const number = parseInt(quantityNumber.text());

        const className = quantityButton.attr('class');
        const total = $(e.target).parent().parent().find('.total-price');

        if (className === 'fas fa-plus-circle' || className === 'fas fa-plus-circle rotate') {
            quantityButton.toggleClass("rotate");
            quantityNumber.text(number);
            total.text('Total: ' + basicPrice * number + ' €');

        } else if (className === 'fas fa-minus-circle' || className === 'fas fa-minus-circle rotate') {
            quantityButton.toggleClass("rotate");
            if (number > 0) {
                quantityNumber.text(number);
                total.text('Total: ' + basicPrice * number + ' €');
            }
        }
    });

    function addPizza () {
        confirm.empty();

        const newSingle = $('<div class="single">');
        const pizzaPhoto = $('<img alt="pizza">');
        pizzaPhoto.attr('src', './images/' + pizzaTypeValue + '.png');

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

    function showCart() {
        const pizzaCart = $('.pizza-cart');
        const pricePizza = $('.total-price');
        pizzaCart.empty();
        pricePizza.remove();

        let totalPrice = [];
        let price;

        for (let i = 0; i < cart.length; i++) {
            const pizzaList = $('<li></li>');
            const pizzaName = $('<h3>');
            const pizzaIngredients = $('<p>');
            const pizzaCrust = $('<span>');
            const pizzaDetails = $('<div class="pizza-details">');
            const deletePizza = $('<button class="delete">');

            totalPrice = [...totalPrice, cart[i].price];
            price = totalPrice.reduce(function (a, b) {
                return parseInt(a, 10) + parseInt(b, 10);
            });

            pizzaName.text(cart[i].quantity + " x " + cart[i].type);
            pizzaIngredients.text("Ingredients: " + cart[i].ingredients.join(', '));
            pizzaCrust.text("Crust: " + cart[i].crust);

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

        if (price === undefined) {
            pizzaPrice.text("Total: " + 0 + " €");
        } else {
            pizzaPrice.text("Total: " + price + " €");
        }

        priceDiv.append(pizzaPrice);
        cartStep.append(priceDiv);
    }

    const deleteButton = $('.delete');
    cartStep.on('click', deleteButton, function (e) {

        let index;
        if($(e.target).parent().prop('tagName') === "LI") {
            index = $(e.target).parent().index();
        } else {
            index = $(e.target).parent().parent().index();
        }

        cart.splice(index);
        sessionStorage.setItem("pizza", JSON.stringify(cart));
        showCart();
    });


    const btnCancel = $('.cancel-btn');
    const btnConfirm = $('.confirm-btn');

    btnCancel.on('click', function () {
        confirm.empty();
        $('.pizza-cart').empty();
        sessionStorage.clear();
        finishStep.fadeOut(1000);
        pizzaSizeStep.fadeIn(1000);
        showSizeStep();
    });

    btnConfirm.on('click', function () {
        sessionStorage.clear();
        cartStep.fadeOut(1000);
        finishStep.fadeIn(1000);
        showFinishStep();

        const date = new Date();

        const day = date.getDate();
        let properDay;
        if (day.length === 0) {
            properDay = "0" + day;
        } else {
            properDay = day;
        }

        const month = date.getMonth();
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
            "October", "November", "December"];

        const year = date.getFullYear();

        const hour = date.getHours();
        const minutes = date.getMinutes();

        const orderDate = properDay + ' ' +  monthNames[month] + ' ' +  year + ' ' + hour + ':' +  minutes;

        const dateOrder = $('.placed-on span');
        dateOrder.text(orderDate);

        let start = "50:00";
        const interval = setInterval(function() {

            const timer = start.split(':');

            let minutes = parseInt(timer[0], 10);
            let seconds = parseInt(timer[1], 10);

            --seconds;

            minutes = (seconds < 0) ? --minutes : minutes;
            seconds = (seconds < 0) ? 59 : seconds;
            seconds = (seconds < 10) ? '0' + seconds : seconds;

            $('.timer').html(minutes + ':' + seconds);

            if (minutes < 0) clearInterval(interval);
            if ((seconds <= 0) && (minutes <= 0)) clearInterval(interval);
            start = minutes + ':' + seconds;
        }, 1000);

        const number = $('.number');
        number.text(Math.floor(Math.random() * 99999) + 1  )
    });
});