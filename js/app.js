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

    sizeButtons.on('click', function () {
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
            pizzaCrustStep.fadeOut(100);
            pizzaTypeStep.fadeIn(2000);
            setTimeout(
                pizzaTypeStep.css({
                    display: "flex",
                    alignItems: "center",
                }), 600)
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
            pizzaTypeStep.fadeOut(100);
            pizzaIngredientsStep.fadeIn(2000);
            setTimeout(
                pizzaIngredientsStep.css({
                    display: "flex",
                    alignItems: "center",
                }), 600)
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
            pizzaIngredientsStep.fadeOut(100);
            pizzaConfirmStep.fadeIn(2000);
            setTimeout(
                pizzaConfirmStep.css({
                    display: "flex",
                    alignItems: "center",
                }), 600)
        }
    });

});