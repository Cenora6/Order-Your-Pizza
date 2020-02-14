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

    const sizeButton = $('.size-btn');
    const pizzaSizeStep = $('.pizza-size');

    const crustNextButton = $('.crust-next-btn');
    const crustPrevButton = $('.crust-prev-btn');
    const pizzaCrustStep = $('.pizza-crust');

    sizeButton.on('click', function () {
        pizzaSizeStep.fadeOut(500);
        pizzaCrustStep.fadeIn(3000);
        setTimeout(
            pizzaCrustStep.css({
                display: "flex",
                alignItems: "center",
            }), 600)
    });

    crustPrevButton.on('click', function () {
        pizzaCrustStep.fadeOut(200);
        pizzaSizeStep.fadeIn(2000);
        setTimeout(
            pizzaSizeStep.css({
                display: "flex",
            }), 600)
    })

});