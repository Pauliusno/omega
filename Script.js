const serviceWrapper = document.getElementById('services');

const buildServiceWrapper = (omega) => {
    const wrapper = document.createElement("a");
    wrapper.setAttribute('class', 'services-wrapper');


    const imageDiv = document.createElement('div'); // Create a div for the image
    // imageDiv.setAttribute('class', 'omega-image-div'); // You can style this div if needed

    const image = document.createElement('img');
    image.setAttribute('class', 'omega-image');
    image.src = omega.img_url;

    const contentDiv = document.createElement('div'); // Create a div for the content
    // contentDiv.setAttribute('class', 'omega-content-div'); // You can style this div if needed

    wrapper.href = './about.html'
    wrapper.addEventListener('click', ()=>{
        localStorage.setItem('omegaId',omega.id)
    })


    const title = document.createElement("h2");
    title.innerHTML = omega.title;
    const location = document.createElement('p');
    location.innerHTML = omega.location;
    const price = document.createElement('p');
    price.innerHTML = 'Kaina ' + omega.price;

    contentDiv.append(title);
    contentDiv.append(location);
    contentDiv.append(price);
    imageDiv.append(image);

    wrapper.append(imageDiv);
    wrapper.append(contentDiv);

    return wrapper;
}

const getAllServices = async () => {
    const response = await fetch('https://64edd0bb1f8721827141cb01.mockapi.io/omega');
    const services = await response.json();
    
    services.sort((a, b) => a.price - b.price);
    services.forEach(omega => {
        const wrapper = buildServiceWrapper(omega);
        serviceWrapper.append(wrapper);
    });
}

getAllServices();
