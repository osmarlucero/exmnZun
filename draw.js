function draw(){
  drawPizza();
  drawDDA();
}
function drawPizza() {
        const canvas = document.getElementById("myCanvas");
        const ctx = canvas.getContext("2d");

        const numParts = document.getElementById("partes").value;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(centerX, centerY) - 5;

        // Dibujar el círculo de la pizza con el algoritmo punto y medio
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.stroke();

        // Calcular el ángulo entre cada parte de la pizza
        const angle = (2 * Math.PI) / numParts;

        // Dibujar las partes de la pizza con el algoritmo de la ecuación punto pendiente
        for (let i = 0; i < numParts; i++) {
          const startAngle = i * angle;
          const endAngle = (i + 1) * angle;

          const startX = centerX + radius * Math.cos(startAngle);
          const startY = centerY + radius * Math.sin(startAngle);
          const endX = centerX + radius * Math.cos(endAngle);
          const endY = centerY + radius * Math.sin(endAngle);

          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(startX, startY);
          ctx.lineTo(endX, endY);
          ctx.closePath();
          ctx.fillStyle = "white";
          ctx.fill();
          ctx.stroke();
        }
      }

  //DDA Start
// Obtener el canvas y el contexto
function drawDDA() {
  const canvas = document.getElementById("myCanvas2");
  const ctx = canvas.getContext("2d");

  // Definir el tamaño y el centro del círculo
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = Math.min(centerX, centerY) - 5;;

  // Definir el número de partes en que se divide el círculo
  const numParts = document.getElementById("partes").value;;

  // Calcular el ángulo de cada parte
  const angle = (2 * Math.PI) / numParts;

  // Dibujar el círculo con el algoritmo de punto y medio
  for (let i = 0; i <= radius; i++) {
    const x = i;
    const y = Math.round(Math.sqrt(radius ** 2 - x ** 2));
    ctx.fillRect(centerX + x, centerY + y, 1, 1);
    ctx.fillRect(centerX + x, centerY - y, 1, 1);
    ctx.fillRect(centerX - x, centerY + y, 1, 1);
    ctx.fillRect(centerX - x, centerY - y, 1, 1);
  }

  // Dibujar las partes del círculo con el algoritmo DDA
  for (let i = 0; i < numParts; i++) {
    const x1 = centerX;
    const y1 = centerY;
    const x2 = centerX + radius * Math.cos(i * angle);
    const y2 = centerY + radius * Math.sin(i * angle);
    drawLineDDA(x1, y1, x2, y2, ctx);
  }
}
// Función para dibujar una línea con el algoritmo DDA
function drawLineDDA(x1, y1, x2, y2, ctx) {
  // Calcular la distancia en x y en y entre los dos puntos
  const dx = x2 - x1;
  const dy = y2 - y1;

  // Calcular el número de pasos necesarios para dibujar la línea
  const steps = Math.max(Math.abs(dx), Math.abs(dy));

  // Calcular el incremento para cada paso
  const xIncrement = dx / steps;
  const yIncrement = dy / steps;

  // Dibujar los píxeles en la línea
  let x = x1;
  let y = y1;
  for (let i = 0; i <= steps; i++) {
    ctx.fillRect(x, y, 1, 1); // Dibujar el píxel

    // Actualizar las coordenadas del siguiente punto
    x += xIncrement;
    y += yIncrement;
  }
}
 //DDA end