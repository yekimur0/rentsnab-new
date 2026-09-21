document.addEventListener("DOMContentLoaded", () => {
  const switchButtons = document.querySelectorAll(".catalog__switch-btn");

  switchButtons.forEach((button) => {
    button.addEventListener("click", () => {
      switchButtons.forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
    });
  });

  const typeButtons = document.querySelectorAll(".calculator__type");
  const areaInput = document.getElementById("calc-area");
  const termInput = document.getElementById("calc-term");
  const priceNode = document.getElementById("calc-price");
  const hintNode = document.getElementById("calc-hint");
  const rates = {
    walls: 180,
    slabs: 90,
    columns: 180,
  };
  const typeNames = {
    walls: "стен",
    slabs: "перекрытий",
    columns: "колонн",
  };
  let currentType = "walls";

  const formatNumber = (value) =>
    new Intl.NumberFormat("ru-RU").format(Math.max(0, Math.round(value)));

  const getDiscount = (term) => {
    if (term >= 6) return 0.85;
    if (term >= 3) return 1;
    return 1.1;
  };

  const updateCalculator = () => {
    if (!areaInput || !termInput || !priceNode || !hintNode) return;

    const area = Math.max(1, Number(areaInput.value) || 1);
    const term = Math.max(1, Number(termInput.value) || 1);
    const monthly = area * rates[currentType] * getDiscount(term);

    areaInput.value = area;
    termInput.value = term;
    priceNode.textContent = formatNumber(monthly);
    hintNode.textContent = `за комплект опалубки ${typeNames[currentType]} ~${formatNumber(area)} м² на ${term} месяца. Чем дольше срок, тем ниже ставка.`;
  };

  typeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      typeButtons.forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
      currentType = button.dataset.type || "walls";
      updateCalculator();
    });
  });

  document.querySelectorAll(".calculator__step").forEach((button) => {
    button.addEventListener("click", () => {
      const input = document.getElementById(button.dataset.target);
      if (!input) return;

      const step = Number(button.dataset.step) || 0;
      const nextValue = Math.max(1, (Number(input.value) || 1) + step);
      input.value = nextValue;
      updateCalculator();
    });
  });

  [areaInput, termInput].forEach((input) => {
    if (!input) return;
    input.addEventListener("input", updateCalculator);
  });

  updateCalculator();

  const faqItems = document.querySelectorAll(".faq__item");

  faqItems.forEach((item) => {
    const button = item.querySelector(".faq__question");
    if (!button) return;

    button.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");
      faqItems.forEach((faqItem) => faqItem.classList.remove("is-open"));
      if (!isOpen) item.classList.add("is-open");
    });
  });

  const rentType = document.getElementById("rent-type");
  const rentArea = document.getElementById("rent-area");
  const rentTerm = document.getElementById("rent-term");
  const rentPrice = document.getElementById("rent-price");
  const rentRates = {
    walls: 180,
    slabs: 90,
    columns: 180,
    large: 180,
    small: 90,
    beam: 40,
    radius: 50,
    "one-side": 60,
    climbing: 80,
  };

  const updateRentCalculator = () => {
    if (!rentType || !rentArea || !rentTerm || !rentPrice) return;

    const area = Math.max(1, Number(rentArea.value) || 1);
    const term = Math.max(1, Number(rentTerm.value) || 1);
    const monthly = area * (rentRates[rentType.value] || 180);

    rentArea.value = area;
    rentPrice.textContent = formatNumber(monthly * term);
  };

  [rentType, rentArea, rentTerm].forEach((field) => {
    if (!field) return;
    field.addEventListener("input", updateRentCalculator);
    field.addEventListener("change", updateRentCalculator);
  });

  updateRentCalculator();

  const sortButtons = document.querySelectorAll(".rent-catalog__sort-btn");

  sortButtons.forEach((button) => {
    button.addEventListener("click", () => {
      sortButtons.forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
    });
  });

  const estimateType = document.getElementById("estimate-type");
  const estimateArea = document.getElementById("estimate-area");
  const estimateTerm = document.getElementById("estimate-term");
  const estimatePrice = document.getElementById("estimate-price");
  const estimateHint = document.getElementById("estimate-hint");
  const estimateNames = {
    walls: "стен",
    slabs: "перекрытий",
    columns: "колонн",
  };

  const updateEstimate = () => {
    if (!estimateType || !estimateArea || !estimateTerm || !estimatePrice)
      return;

    const area = Math.max(1, Number(estimateArea.value) || 1);
    const term = Math.max(1, Number(estimateTerm.value) || 1);
    const monthly = area * (rentRates[estimateType.value] || 180);

    estimatePrice.textContent = formatNumber(monthly);
    if (estimateHint) {
      estimateHint.textContent = `за комплект опалубки ${estimateNames[estimateType.value] || "стен"} ≈ ${formatNumber(area)} м² на срок ${term} месяц`;
    }
  };

  [estimateType, estimateArea, estimateTerm].forEach((field) => {
    if (!field) return;
    field.addEventListener("input", updateEstimate);
    field.addEventListener("change", updateEstimate);
  });

  updateEstimate();

  const filterButtons = document.querySelectorAll(".obj-filters__btn");
  const objectCards = document.querySelectorAll(".obj-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((item) =>
        item.classList.remove("obj-filters__btn--active"),
      );
      button.classList.add("obj-filters__btn--active");

      const filter = button.dataset.filter || "all";
      objectCards.forEach((card) => {
        const match = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("is-hidden", !match);
      });
    });
  });
});
