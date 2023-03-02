let fetchData = [];

const loadData = () => {
    fetch('https://openapi.programming-hero.com/api/ai/tools')
        .then(res => res.json())
        .then(data => {
            fetchData = data.data.tools;
            displayCards(fetchData.slice(0, 6));
        })
}

const displayCards = (data) => {
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

