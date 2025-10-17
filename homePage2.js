
const apiKey = "6aca1fe370a956a53288b9e4dfc76d9a";
const categories = ["politics", "sports", "entertainment"];


async function fetchNews(category) {
  const url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=us&max=4&token=${apiKey}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    const container = document.querySelector(`.${category} .cards`);
    container.innerHTML = ""; 

    if (!data.articles || data.articles.length === 0) {
      container.innerHTML = `<p style="text-align:center; color:gray;">No news available for ${category}</p>`;
      return;
    }

    data.articles.forEach((article) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img src="${article.image || "./imgs/Selection (1).png"}" class="img-card" alt="news">
        <div class="details">
          <div class="${category}">
            <p>${category.charAt(0).toUpperCase() + category.slice(1)}</p>
          </div>
          <div class="headOfSection">${article.title}</div>
          <p>${article.description || "No description available."}</p>
          <button onclick="window.open('${article.url}', '_blank')">Read More</button>
        </div>
      `;
      container.appendChild(card);
    });

  } catch (error) {
    console.error(`Error fetching ${category} news:`, error);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  categories.forEach((cat) => fetchNews(cat));
});

