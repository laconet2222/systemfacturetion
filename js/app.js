
document.getElementById('invoiceForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const cliente = document.getElementById('cliente').value;
  const telefono = document.getElementById('telefono').value;
  const items = document.getElementById('items').value;
  const total = document.getElementById('total').value;

  const mensaje = \`Hola \${cliente}, gracias por visitarnos. Tu factura:\n\${items}\nTotal: RD$\${total}\`;
  const link = \`https://api.whatsapp.com/send?phone=1\${telefono}&text=\${encodeURIComponent(mensaje)}\`;
  window.open(link, '_blank');

  const historial = document.getElementById('historialList');
  const item = document.createElement('li');
  item.textContent = \`Cliente: \${cliente} | Total: RD$\${total}\`;
  historial.appendChild(item);

  document.getElementById('invoiceForm').reset();
});
