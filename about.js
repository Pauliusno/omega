

const omegaId = localStorage.getItem('omegaId');
console.log(omegaId);

const addServiceToScreen = (omega) => {
    const title = document.getElementById('about-title');
    title.innerHTML = omega.title;

    const location = document.getElementById('about-location');
    location.innerHTML = omega.location;

    const description = document.getElementById('about-description');
    description.innerHTML = omega.description;
    const price = document.getElementById('about-price');
    price.innerHTML = 'Kaina ' + omega.price; // Changed "ration" to "price"
    const image = document.getElementById('about-image');
    image.src = omega.img_url;
}


    const getOneService = async () => {
        if (omegaId) {
            try {
                const response = await fetch('https://64edd0bb1f8721827141cb01.mockapi.io/omega/' + omegaId);
                if (response.ok) {
                    const omega = await response.json();
                    console.log('Omega data from API:', omega); 
                    addServiceToScreen(omega);
                } else {
                    console.error('Error fetching data:', response.status);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            console.error('omegaId is not defined');
        }
    }
    


getOneService();

const deleteButton = document.getElementById('delete-button')
deleteButton.addEventListener('click',async()=>{
    try{
    const response = await fetch('https://64edd0bb1f8721827141cb01.mockapi.io/omega/' + omegaId,{
        method: 'DELETE',        
    })
    const data = await response.json()
    if(data){
        const infomsg = document.getElementById('info')
        infomsg.innerHTML = 'Service was deleted!!!!'
        setTimeout(()=>{
            window.location.replace("./index.html")
        },3000)
    }
} catch(err){
    const infomsg = document.getElementById('infomsg')
        infomsg.innerHTML = 'Service was not deleted!!!!'
}
})
