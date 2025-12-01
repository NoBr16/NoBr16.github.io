// Submit mygtukas
document.getElementById("submitBtn").addEventListener("click", function() {
  const errorDiv = document.getElementById("form-error");
  errorDiv.textContent = "";

  const vardas = document.querySelector('input[name="vardas"]').value.trim();
  const pavarde = document.querySelector('input[name="pavarde"]').value.trim();
  const email = document.querySelector('input[name="email"]').value.trim();
  const telInput = document.getElementById("tel");
  const adresas = document.querySelector('input[name="adresas"]').value.trim();
  const klausimas1 = Number(document.querySelector('input[name="klausimas1"]').value);
  const klausimas2 = Number(document.querySelector('input[name="klausimas2"]').value);
  const klausimas3 = Number(document.querySelector('input[name="klausimas3"]').value);

  // Validacija
  if (!vardas) return errorDiv.textContent = "Įveskite vardą!";
  if (!/^[A-Za-zĄ-ž\s]+$/.test(vardas)) return errorDiv.textContent = "Vardas gali būti tik raidės!";

  if (!pavarde) return errorDiv.textContent = "Įveskite pavardę!";
  if (!/^[A-Za-zĄ-ž\s]+$/.test(pavarde)) return errorDiv.textContent = "Pavardė gali būti tik raidės!";

  if (!email) return errorDiv.textContent = "Įveskite el. paštą!";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return errorDiv.textContent = "Neteisingas el. pašto formatas!";


  telInput.addEventListener("input", function(e) {
  let numbers = this.value.replace(/\D/g, ""); // Pašalina viską, kas nėra skaičius
  if (numbers.startsWith("8")) {
    numbers = "370" + numbers.slice(1); // Pakeičia 8 į 370
  }
  if (!numbers.startsWith("370")) {
    numbers = "370" + numbers; // Užtikrina, kad visada prasidėtų su 370
  }
  
  // Apribojame iki 12 skaitmenų (370 + 8 skaitmenys)
  numbers = numbers.substring(0, 12);

  // Formatavimas +370 6xx xxxxx
  let formatted = "+";
  formatted += numbers.substring(0, 3); // 370
  if (numbers.length > 3) {
    formatted += " " + numbers.substring(3, 4); // pirmas skaitmuo po 370
  }
  if (numbers.length > 4) {
    formatted += numbers.substring(4, 7); // 3 skaitmenys (6xx)
  }
  if (numbers.length > 7) {
    formatted += " " + numbers.substring(7, 12); // likę 5 skaitmenys
  }

  this.value = formatted;
});

  if (!adresas) return errorDiv.textContent = "Įveskite adresą!";

  // Duomenų objektas
  const data = { vardas, pavarde, email, tel, adresas, klausimas1, klausimas2, klausimas3 };
  console.log(data);

  // Vidurkis
  const vidurkis = ((klausimas1 + klausimas2 + klausimas3)/3).toFixed(1);

  // Rezultatai
  document.getElementById("form-results").innerHTML = `
    <h4>Submitted Form Data:</h4>
    <p><strong>Vardas:</strong> ${vardas}</p>
    <p><strong>Pavardė:</strong> ${pavarde}</p>
    <p><strong>El. paštas:</strong> ${email}</p>
    <p><strong>Telefono numeris:</strong> ${tel}</p>
    <p><strong>Adresas:</strong> ${adresas}</p>
    <p><strong>Paslaugų kokybė:</strong> ${klausimas1}/10</p>
    <p><strong>Rekomendacijų tikimybė:</strong> ${klausimas2}/10</p>
    <p><strong>Bendra patirtis:</strong> ${klausimas3}/10</p>
    <h4>Vidurkis:</h4>
    <p>${vardas} ${pavarde}: ${vidurkis}</p>
  `;

  // Sėkmės popup
  const popup = document.getElementById("success-popup");
  popup.style.display = "block";
  setTimeout(() => { popup.style.display = "none"; }, 3000);
});