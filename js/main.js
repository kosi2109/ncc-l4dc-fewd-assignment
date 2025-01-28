const getFromStorage = (key) => {
  return JSON.parse(localStorage.getItem(key)) || [];
};

const setToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// start scroll reveal
var slideUp = {
  distance: "150%",
  origin: "bottom",
  opacity: 0,
  delay: 700,
};

ScrollReveal().reveal(".slide-up", slideUp);

// start scroll reveal
var slideUp = {
  distance: "150%",
  origin: "bottom",
  opacity: 0,
  delay: 700,
};

ScrollReveal().reveal(".hero-text", {
  opacity: 0,
  delay: 200,
});

ScrollReveal().reveal(".hero-img", {
  distance: "50%",
  origin: "right",
  opacity: 0,
  delay: 400,
});

$(document).ready(function () {
  // Check if the user has visited before
  const hasVisited = localStorage.getItem("hasVisited");

  // If not, show the modal and set the flag in localStorage
  if (!hasVisited) {
    localStorage.setItem("hasVisited", "true");
    $("#welcomeModal").modal("show");
  }

  $("#emailForm").on("submit", function (e) {
    e.preventDefault();

    const emailFrom = $("#email").val();

    const body = encodeURIComponent($("#message").val());
    const first_name = encodeURIComponent($("#first_name").val());
    const last_name = encodeURIComponent($("#last_name").val());

    if (emailFrom) {
      const mailtoLink = `mailto:sithuhtet.kosi21@gmail.com?subject=Subscription&body=${first_name} ${last_name} ${emailFrom} ${body}`;
      window.location.href = mailtoLink;
    } else {
      alert("Please enter a recipient email address.");
    }
  });

  $("#emailModal").on("click", function (e) {
    const mailtoLink = `mailto:sithuhtet.kosi21@gmail.com?subject=Subscription`;
    window.location.href = mailtoLink;
  });

  // filter products

  // Function to filter products
  const filterProducts = () => {
    const searchInput = $("#search-input").val().toLowerCase();
    let foundCount = 0; // Track the number of products found

    $(".product").each(function () {
      const productName = $(this).find("p:first").text().toLowerCase();
      const productDescription = $(this)
        .find("p:nth-of-type(2)")
        .text()
        .toLowerCase();

      const regex = new RegExp(searchInput, "i");

      const isMatch =
        searchInput.length === 0 ||
        regex.test(productName) ||
        regex.test(productDescription);

      if (isMatch) {
        $(this).removeClass("hidden");
        foundCount++; // Increment the match count
      } else {
        $(this).addClass("hidden");
      }

      // Show or hide the "No results found" message
      if (foundCount === 0 && searchInput.length > 0) {
        $("#no-results-message").show(); // Show message if no results
      } else {
        $("#no-results-message").hide(); // Hide message if results found
      }
    });
  };

  // Add event listener to the search input
  $("#search-input").on("input", function () {
    filterProducts();
  });

  // Re-bind event listeners after rendering
  const renderProducts = () => {
    filterProducts(); // Apply filtering logic
  };

  renderProducts(); // Initial render
});
