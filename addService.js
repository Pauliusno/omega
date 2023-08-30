const serviceFormButton = document.getElementById("submit");

const errorWrapper = document.getElementById("error-wrapper");
const messageWrapper = document.getElementById("message");

const clearErrors = () => {
    errorWrapper.innerHTML = "";
};

const displayError = (errorMessage) => {
    const error = document.createElement("div");
    error.innerHTML = errorMessage;
    errorWrapper.append(error);
};

const validateService = (service) => {
    clearErrors();

    if (service.title.length < 1) {
        displayError("Input should contain at least one symbol in title");
    }

    if (service.description.length < 8) {
        displayError("Description should contain at least 8 characters");
    }

    if (!/^\d+$/.test(service.price)) {
        displayError("Price should contain only numbers");
    }

    return errorWrapper.innerHTML === "";
};

const areAllInputsFilled = () => {
    const inputs = [
        document.getElementById('add-title').value,
        document.getElementById('add-description').value,
        document.getElementById('add-location').value,
        document.getElementById('add-price').value,
        document.getElementById('add-image').value
    ];

    return inputs.every(input => input.trim() !== "");
};

const getServiceObject = () => {
    const serviceTitle = document.getElementById('add-title').value;
    const serviceDescription = document.getElementById('add-description').value;
    const serviceLocation = document.getElementById('add-location').value;
    const servicePrice = document.getElementById('add-price').value;
    const serviceImage = document.getElementById('add-image').value;
    const service = {
        title: serviceTitle,
        description: serviceDescription,
        location: serviceLocation,
        price: servicePrice,
        img_url: serviceImage,
    };
    return service;
};

const addService = async (service) => {
    try {
        const response = await fetch('https://64edd0bb1f8721827141cb01.mockapi.io/omega', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(service),
        });
        const data = await response.json();
        if (data) {
            messageWrapper.innerHTML = 'Service was added successfully';

            setTimeout(() => {
                messageWrapper.innerHTML = ''; // Clear the success message
                window.location.replace('./index.html');
            }, 3000);
        }
    } catch (err) {
        messageWrapper.innerHTML = 'Service was not added, an error occurred';
        console.log("err", err);
    }
};

serviceFormButton.addEventListener("click", async () => {
    errorWrapper.innerHTML = "";
    if (!areAllInputsFilled()) {
        displayError("Please fill all the inputs");
        return;
    }

    const service = getServiceObject();
    if (validateService(service)) {
        addService(service);
    }
});
