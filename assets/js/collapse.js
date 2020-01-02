// Button tags must contain a unique ID,
// with the div immediately following the button
// containing the same ID plus "-data" appended to it
//
// Example:
//
// <button class="collapsible" id="BUTTON">Button Text</button>
// <div class="content" id="BUTTON-data" markdown="1">
// CONTENT
// </div>

// var coll = document.getElementsByClassName("collapsible");
var coll = document.querySelectorAll(".collapsible, .collapsible-small")
var i;
for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = document.getElementById(this.id+"-data");
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
