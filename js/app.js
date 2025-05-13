document.getElementById('invoiceForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const cliente = document.getElementById('cliente').value;
  const telefono = document.getElementById('telefono').value;
  const items = document.getElementById('items').value;
  const total = document.getElementById('total').value;

  // Crear el PDF con la librería jsPDF
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Agregar el contenido de la factura al PDF
  doc.setFontSize(18);
  doc.text("Factura Electrónica", 20, 20);
  doc.setFontSize(14);
  doc.text(`Nombre del Cliente: ${cliente}`, 20, 30);
  doc.text(`Teléfono: ${telefono}`, 20, 40);
  doc.text(`Detalles de la Factura:`, 20, 50);
  doc.text(items, 20, 60);
  doc.text(`Total: RD$ ${total}`, 20, 70);
  doc.text("Jireh Beauty Salón Nails Bar", 20, 80); // Nombre del salón
  doc.text("www.jirehbeautysalon.com", 20, 90); // Página web del salón o cualquier información adicional

  // Generar el PDF y guardarlo en una variable
  const pdfData = doc.output('blob');

  // Crear un enlace para descargar el PDF (también lo guardamos para WhatsApp)
  const link = document.createElement('a');
  link.href = URL.createObjectURL(pdfData);
  link.download = `Factura_${cliente}_${new Date().toISOString()}.pdf`; // Nombre del archivo PDF

  // Al hacer clic en este enlace, descargará el PDF automáticamente
  link.click();

  // También podemos abrir WhatsApp con el mensaje de la factura
  const mensaje = `Factura enviada a ${cliente}\nDetalles: ${items}\nTotal: RD$ ${total}\nJireh Beauty Salón Nails Bar`;
  const whatsappURL = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

  // Abrir WhatsApp para enviar el mensaje (no el PDF)
  window.open(whatsappURL, '_blank');

  // Guardar la factura en el historial (como lo hacíamos antes)
  const factura = {
    cliente,
    telefono,
    items,
    total,
    mensaje: `Factura enviada a ${cliente}`,
    fecha: new Date().toLocaleString(),
    pdfData
  };

  let historial = JSON.parse(localStorage.getItem('historial')) || [];
  historial.push(factura);
  localStorage.setItem('historial', JSON.stringify(historial));

  // Mostrar el historial
  mostrarHistorial();

  // Resetear el formulario
  document.getElementById('invoiceForm').reset();
});

// Función para mostrar el historial de facturas
function mostrarHistorial() {
  const historial = JSON.parse(localStorage.getItem('historial')) || [];
  const historialList = document.getElementById('historialList');
  historialList.innerHTML = '';

  historial.forEach(factura => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${factura.cliente}</strong> - RD$${factura.total} 
      <br><em>${factura.fecha}</em>
      <br><button onclick="descargarFactura(${factura.pdfData})">Descargar PDF</button>
    `;
    historialList.appendChild(li);
  });
}

// Función para descargar PDF desde el historial
function descargarFactura(pdfData) {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(pdfData);
  link.download = `Factura_${new Date().toISOString()}.pdf`;
  link.click();
}
