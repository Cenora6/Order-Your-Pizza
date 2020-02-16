$(function () {

    const sizeForm = $('.size');
    const sizeChoose = sizeForm.find('.choose');
    const small = sizeForm.find('input#small');
    const medium = sizeForm.find('input#medium');
    const large = sizeForm.find('input#large');
    const extraLarge = sizeForm.find('input#extra');
    const image = sizeForm.find('img');

    sizeChoose.css({
        top: "0.4rem",
        left: "0.2rem",
        width: "1.5rem",
        height: "1.5rem",
    });

    image.css({
        width: "5rem",
    });

    small.on('click', function () {
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

    medium.on('click', function () {
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

    large.on('click', function () {
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

    extraLarge.on('click', function () {
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

    const crustLabel = $('.crust label');
    crustLabel.on('click', function (e) {
        crustLabel.css({
            filter: "grayscale(100%)",
        });
        $(this).css({
            filter: "grayscale(0%)",
        })
    });

    const pizzaType = $('.pizza-type label');
    pizzaType.on('mouseover', function () {
        $(this).addClass('hover');
    });

    pizzaType.on('mouseout', function () {
        $(this).removeClass('hover');

    });

    pizzaType.on('click change', function () {
        pizzaType.removeClass('chosen');
        $(this).addClass('chosen');
    });

    const confirm = $('.confirm');

    confirm.on('click', $('i'), function (e) {
        const quantityButton = $(e.target);
        const quantityNumber = $(e.target).parent().find('span');
        let number = quantityNumber.text();
        const className = quantityButton.attr('class');

        if (className === 'fas fa-plus-circle' || className === 'fas fa-plus-circle rotate') {
            quantityButton.toggleClass("rotate");
            quantityNumber.text(parseInt(number) + 1);

        } else if (className === 'fas fa-minus-circle' || className === 'fas fa-minus-circle rotate') {
            quantityButton.toggleClass("rotate");
            if(number > 0) {
                quantityNumber.text(parseInt(number) - 1);
            }
        }
    });

    const pizzaSizeStep = $('.pizza-size');
    const pizzaCrustStep = $('.pizza-crust');
    const pizzaTypeStep = $('.pizza-type');
    const pizzaIngredientsStep = $('.pizza-ingredients');
    const pizzaConfirmStep = $('.pizza-confirm');

    const sizeButtons = $('.pizza-size button');
    const crustButtons = $('.pizza-crust button');
    const typeButtons = $('.pizza-type button');
    const ingredientsButtons = $('.pizza-ingredients button');
    const confirmButtons = $('.pizza-confirm button');
    const errorSpanCrust = pizzaCrustStep.find('.error');
    const errorSpanType = pizzaTypeStep.find('.error');
    const errorSpanIngredients = pizzaIngredientsStep.find('.error');

    let pizzaSizeValue;
    let pizzaCrustValue;
    let pizzaTypeValue;
    let pizzaTypeImage;
    let pizzaIngredientsValue = [];

    sizeButtons.on('click', function () {

        pizzaSizeValue = $('input[name="size"]:checked').val();
        pizzaSizeStep.fadeOut(100);
        pizzaCrustStep.fadeIn(2000);
        setTimeout(
            pizzaCrustStep.css({
                display: "flex",
                alignItems: "center",
            }), 600)
    });

    crustButtons.on('click', function () {
        if($(this).text() === "Previous") {
            pizzaCrustStep.fadeOut(100);
            pizzaSizeStep.fadeIn(2000);
            setTimeout(
                pizzaSizeStep.css({
                    display: "flex",
                }), 600)
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
                setTimeout(
                    pizzaTypeStep.css({
                        display: "flex",
                        alignItems: "center",
                    }), 600);
            }
        }
    });

    typeButtons.on('click', function () {
        if($(this).text() === "Previous") {
            pizzaTypeStep.fadeOut(100);
            pizzaCrustStep.fadeIn(2000);
            setTimeout(
                pizzaCrustStep.css({
                    display: "flex",
                    alignItems: "center",
                }), 600)
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
                setTimeout(
                    pizzaIngredientsStep.css({
                        display: "flex",
                        alignItems: "center",
                    }), 600)
            }
        }
    });

    ingredientsButtons.on('click', function () {

        if($(this).text() === "Previous") {
            pizzaIngredientsStep.fadeOut(100);
            pizzaTypeStep.fadeIn(2000);
            setTimeout(
                pizzaTypeStep.css({
                    display: "flex",
                    alignItems: "center",
                }), 600)
        } else {
            pizzaIngredientsValue = [];
            const ingredients = $('input[name="ingredients"]:checked');
            ingredients.each(function () {
                pizzaIngredientsValue.push($(this).val())
            });

            pizzaIngredientsStep.fadeOut(100);
            pizzaConfirmStep.fadeIn(2000);
            setTimeout(
                pizzaConfirmStep.css({
                    display: "flex",
                    alignItems: "center",
                }), 600);

            addPizza();
        }
    });

    confirmButtons.on('click', function () {
        if($(this).text() === "Previous") {
            deletePizza();

            pizzaConfirmStep.fadeOut(100);
            pizzaIngredientsStep.fadeIn(2000);
            setTimeout(
                pizzaIngredientsStep.css({
                    display: "flex",
                    alignItems: "center",
                }), 600)
        } else {

        }
        // else {
        //     confirmButtons.fadeOut(100);
        //     pizzaConfirmStep.fadeIn(2000);
        //     setTimeout(
        //         pizzaConfirmStep.css({
        //             display: "flex",
        //             alignItems: "center",
        //         }), 600)
        // }
    });


    function addPizza () {
        const confirm = $('.confirm');

        const newSingle = $('<div class="single">');

        const pizzaPhoto = $('<img alt="pizza">');
        pizzaPhoto.attr('src', 'images/' + pizzaTypeImage + '.png');

        const descriptionDiv = $('<div class="description">');

        const pizzaTypeConfirm = $('<h3>');
        pizzaTypeConfirm.text(pizzaTypeValue);

        const extraIngredientsConfirm = $('<p>');
        extraIngredientsConfirm.text('Extra ingredients: ' + pizzaIngredientsValue.join(", "));

        const pizzaSizeConfirm = $('<span class="size-confirmation">');
        pizzaSizeConfirm.text('Size: ' + pizzaSizeValue);

        const pizzaCrustConfirm = $('<span class="crust-confirmation">');
        pizzaCrustConfirm.text('Crust: ' + pizzaCrustValue);

        const quantityDiv = $('<div class="quantity">');
        const minusButton = $('<i class="fas fa-minus-circle">');
        const pizzaQuantity = $('<span>');
        pizzaQuantity.text('1');
        const plusButton = $('<i class="fas fa-plus-circle">');

        quantityDiv.append(minusButton);
        quantityDiv.append(pizzaQuantity);
        quantityDiv.append(plusButton);

        descriptionDiv.append(pizzaTypeConfirm);
        descriptionDiv.append(extraIngredientsConfirm);
        descriptionDiv.append(pizzaSizeConfirm);
        descriptionDiv.append(pizzaCrustConfirm);
        descriptionDiv.append(quantityDiv);

        newSingle.append(pizzaPhoto);
        newSingle.append(descriptionDiv);

        confirm.append(newSingle);
    }

    function deletePizza() {
        $('.confirm .single').remove();
    }


    //<div class="single">
    //                         <img src="images/pepperoni.png" alt="pizza"/>
    //                         <div class="description">
    //                             <h3>Pepperoni</h3>
    //                             <p>Extra ingredients: tomato, egg, cheese</p>
    //                             <span class="size-confirmation">Size: Large</span>
    //                             <div class="quantity">
    //                                 <i class="fas fa-minus-circle"></i>
    //                                 <span>1</span>
    //                                 <i class="fas fa-plus-circle"></i>
    //                             </div>
    //                         </div>
    //                     </div>

});