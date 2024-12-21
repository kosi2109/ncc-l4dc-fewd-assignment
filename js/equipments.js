const renderItems = () => {
  equipments.forEach((equipment) => {
    $("#coffee-equipments").append(`
            <div class="col-md-6 col-lg-4 mb-2">
                <div class="card text-bg-dark">
                    <img
                        src="${equipment.images[0]}"
                        class="card-img"
                        alt="Coffee Image"
                    />
                    <div class="position-absolute bottom-0 start-0 p-3 bg-opacity-75 bg-dark">
                      <h5 class="card-title">
                        ${equipment.name}
                      </h5>
                      <p class="card-text text-clip-2-lines">
                        ${equipment.description}
                      </p>
                      <a href="${equipment.href}" class="float-end text-white">View</a>
                    </div>
                </div>
             </div>    
        `);
  });
};

$(document).ready(function () {
  renderItems();
});
