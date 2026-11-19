document.addEventListener("DOMContentLoaded", () => {
  const services = {
    cooking: {
      category: "LEARN THE BASICS",
      title: "Cooking <em>Classes</em>",
      description: "Build kitchen confidence, discover essential techniques and learn to prepare delicious dishes.",
      overview: "Develop practical cooking skills in a welcoming space where learning and creativity come together.",
      image: "Images/hero1.jfif",
      learningImage: "Images/contact6.jfif",
      learningText: "Explore ingredients, improve your kitchen skills and enjoy creating dishes from scratch.",
      benefits: [
        ["fa-solid fa-kitchen-set", "Practical Skills", "Learn food preparation and essential cooking techniques."],
        ["fa-solid fa-book-open", "Recipe Discovery", "Explore recipes and understand the steps behind each dish."],
        ["fa-solid fa-star", "Build Confidence", "Practise your skills and become more comfortable in the kitchen."]
      ],
      learning: ["Essential food preparation techniques", "Ingredient selection and flavour combinations", "Hands-on recipe practice"]
    },

    baking: {
      category: "BAKE SOMETHING SPECIAL",
      title: "Baking <em>Classes</em>",
      description: "Discover the joy of baking and learn to create breads, cakes and delicious desserts.",
      overview: "Explore baking fundamentals, understand ingredients and develop your own creative style.",
      image: "Images/contact4.jfif",
      learningImage: "Images/contact8.jfif",
      learningText: "Discover how ingredients, measurements and techniques work together to create wonderful baked treats.",
      benefits: [
        ["fa-solid fa-cake-candles", "Sweet Creations", "Explore cakes, pastries and dessert ideas."],
        ["fa-solid fa-scale-balanced", "Baking Basics", "Understand measurements and preparation methods."],
        ["fa-solid fa-wand-magic-sparkles", "Creative Finishing", "Discover decorating and presentation techniques."]
      ],
      learning: ["Ingredient measurements and preparation", "Baking and dessert techniques", "Creative decorating and presentation"]
    },

    weekend: {
      category: "LEARN TOGETHER",
      title: "Weekend <em>Workshops</em>",
      description: "Make your weekends more inspiring with hands-on culinary activities and exciting recipes.",
      overview: "Discover new cooking ideas, practise practical skills and enjoy a shared food experience.",
      image: "Images/contact2.jfif",
      learningImage: "Images/hero1.jfif",
      learningText: "Enjoy a creative learning experience designed around cooking, discovery and sharing good food.",
      benefits: [
        ["fa-solid fa-people-group", "Shared Learning", "Enjoy culinary activities in a welcoming group setting."],
        ["fa-solid fa-lightbulb", "New Ideas", "Explore recipes and techniques you may not have tried before."],
        ["fa-solid fa-utensils", "Hands-on Practice", "Take part in practical food preparation activities."]
      ],
      learning: ["Explore new recipes and flavours", "Practise cooking techniques", "Share ideas and culinary experiences"]
    },

    "chef-demo": {
      category: "INSPIRE YOUR CREATIVITY",
      title: "Chef <em>Demonstrations</em>",
      description: "Discover professional cooking techniques and gain inspiration through guided culinary demonstrations.",
      overview: "Observe cooking methods, explore presentation ideas and discover the thinking behind culinary creations.",
      image: "Images/contact6.jfif",
      learningImage: "Images/contact11.jfif",
      learningText: "Learn by observing preparation methods, ingredient combinations and the details that shape a finished dish.",
      benefits: [
        ["fa-solid fa-user-chef", "Expert Techniques", "Explore professional approaches to food preparation."],
        ["fa-solid fa-eye", "Watch and Discover", "Observe cooking methods and useful kitchen practices."],
        ["fa-solid fa-plate-wheat", "Presentation Ideas", "Discover ways to present dishes beautifully."]
      ],
      learning: ["Food preparation demonstrations", "Cooking methods and flavour combinations", "Plating and presentation inspiration"]
    }
  };

  const params = new URLSearchParams(window.location.search);
  const key = params.get("service") || "cooking";
  const service = services[key] || services.cooking;

  document.title = service.category + " | Savor & Sage";

  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };
  const setHTML = (id, html) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  };
  const setSrc = (id, src) => {
    const el = document.getElementById(id);
    if (el) el.src = src;
  };

  setText("serviceCategory", service.category);
  setHTML("serviceTitle", service.title);
  setText("serviceDescription", service.description);
  setText("serviceOverview", service.overview);
  setSrc("serviceImage", service.image);
  setSrc("learningImage", service.learningImage);
  setText("serviceLearningText", service.learningText);

  const benefitsContainer = document.getElementById("serviceBenefits");
  if (benefitsContainer) {
    benefitsContainer.replaceChildren();

    service.benefits.forEach(([icon, title, description]) => {
      const card = document.createElement("article");
      card.className = "details-benefit-card";

      const iconElement = document.createElement("i");
      iconElement.className = icon;
      iconElement.setAttribute("aria-hidden", "true");

      const heading = document.createElement("h3");
      heading.textContent = title;

      const paragraph = document.createElement("p");
      paragraph.textContent = description;

      card.append(iconElement, heading, paragraph);
      benefitsContainer.appendChild(card);
    });
  }

  const learningList = document.getElementById("serviceLearningList");
  if (learningList) {
    learningList.replaceChildren();

    service.learning.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      learningList.appendChild(li);
    });
  }
});