let products = [];

// Ürün Ekleme Formu Gönderildiğinde
document.getElementById("productForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("productName").value.trim();
  const price = document.getElementById("productPrice").value;
  const quantity = document.getElementById("productQuantity").value;

  if (name && price && quantity) {
    // Yeni ürünü diziye ekle
    products.push({ name, price, quantity });
    updateTable();

    // Formu temizle
    document.getElementById("productForm").reset();
  }
});

// Tabloyu Güncelleme Fonksiyonu
function updateTable() {
  const table = document.getElementById("productTable");
  table.innerHTML = "";

  products.forEach((product, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${product.name}</td>
      <td>${product.price} TL</td>
      <td>${product.quantity}</td>
      <td>
        <button class="edit-btn" onclick="editProduct(${index})">Düzenle</button>
        <button class="delete-btn" onclick="deleteProduct(${index})">Sil</button>
      </td>
    `;

    table.appendChild(row);
  });
}

// Ürün Silme Fonksiyonu
function deleteProduct(index) {
  products.splice(index, 1);
  updateTable();
}

// Ürün Düzenleme Fonksiyonu
function editProduct(index) {
  const product = products[index];

  document.getElementById("productName").value = product.name;
  document.getElementById("productPrice").value = product.price;
  document.getElementById("productQuantity").value = product.quantity;

  // Güncellemek için submit olayını ayarla
  document.getElementById("productForm").onsubmit = function (e) {
    e.preventDefault();

    product.name = document.getElementById("productName").value.trim();
    product.price = document.getElementById("productPrice").value;
    product.quantity = document.getElementById("productQuantity").value;

    updateTable();

    // Formu eski haline döndür
    document.getElementById("productForm").reset();
    document.getElementById("productForm").onsubmit = null;
  };
}
