let fetchData = [];

const loadData = () => {
    fetch('https://openapi.programming-hero.com/api/ai/tools')
        .then(res => res.json())
        .then(data => {
            fetchData = data.data.tools;
            displayCards(fetchData.slice(0, 6));
        })
}

const displayCards = data => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';

    data.forEach(card => {
        const { id, name, image, published_in, features } = card;

        cardContainer.innerHTML +=
            `
            <div class="card card-compact bg-base-100 border">
                <figure class="px-4 pt-4">
                    <img src="${image}" alt="Shoes" class="rounded-xl h-52 w-full" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">Features</h2>
                    <ol class="list-decimal list-inside text-gray-500">
                        ${features.map(feature => `<li>${feature}</li>`).join('')} 
                    </ol >
                    <hr class="my-2">
                    <div class="flex items-center justify-between">
                        <div>
                            <h2 class="text-xl font-semibold">${name}</h2>
                            <div class="text-gray-500 flex gap-2 mt-1">
                                <i class="bi bi-calendar4-week"></i>
                                <p>${published_in}</p>
                            </div>
                        </div>
                        <div class="rounded-full bg-red-100 p-2">
                            <label onclick="loadCardDetails('${id}')" for="show-details-modal">
                                <i class="bi bi-arrow-right font-bold text-red-500 px-1 py-2"></i>
                            </label>
                        </div>
                    </div>
                </div>
            </div >
            `;
    });

}

const loadCardDetails = id => {
    fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
        .then(res => res.json())
        .then(data => displayCardDetails(data.data))
}

const displayCardDetails = data => {
    const { description, image_link, pricing, features, integrations, input_output_examples, accuracy } = data;
    
    const cardDetails = document.getElementById('card-details');
    cardDetails.innerHTML = '';
    cardDetails.innerHTML =
        ` 
        <div class="card card-compact bg-base-100 border border-red-600 bg-red-50">
            <div class="card-body">
                <h2 class="card-title">${description}</h2>
                <div class="grid md:grid-cols-3 justify-between gap-3 text-center my-2">
                    <div class="p-2 bg-white text-green-700 rounded-xl font-bold">${pricing ? pricing[0].price : "Free of Cost/"} Basic</div>
                    <p class="p-2 bg-white text-orange-600 rounded-xl font-bold">${pricing ? pricing[1].price : "Free of Cost/"} Pro</p>
                    <p class="p-2 bg-white text-red-700 rounded-xl font-bold">${pricing ? pricing[2].price : "Free of Cost/"} Enterprise</p>
                </div>
                <div class="grid md:grid-cols-2 justify-between gap-3">
                    <div>
                        <h2 class="text-xl font-semibold">Features</h2>
                        <ul class="text-gray-500 list-inside list-disc">
                            ${Object.values(features).map(feature => `<li>${feature.feature_name}</li>`).join('')}                            
                        </ul>
                    </div>
                    <div>
                        <h2 class="text-xl font-semibold">Integrations</h2>
                        <ul class="text-gray-500 list-inside list-disc">
                            ${integrations ? integrations.map(integration => `<li>${integration}</li>`).join('') : "<li>No data Found</li>"}                             
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="card card-compact bg-base-100 border relative">
            <figure class="px-4 pt-4">
                <img src="${image_link[0]}" alt="Shoes"
                    class="rounded-xl w-full h-52" />
            </figure>
            <div class="card-body text-center">
                <h2 class="card-title text-center block">${input_output_examples ? input_output_examples[0].input : 'Can you give any example?'}</h2>
                <p class="text-gray-500">${input_output_examples ? input_output_examples[0].output : 'No! Not Yet! Take a break!!!'}</p>
            </div>

            <div class="absolute right-4 top-6">
                <span class="p-2 text-white rounded-xl bg-red-500">${accuracy.score? accuracy.score * 100 + "% accuracy" : ''}</span>
            </div>
        </div>
        `;

}