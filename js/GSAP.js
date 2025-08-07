/****************Efecto de Quienes somos al hacer scroll a la zona******/

document.addEventListener("DOMContentLoaded", function () {
  // Configuración del Intersection Observer
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px", // Ajustamos el margen
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;

        // Animamos toda la sección superior primero
        if (element.classList.contains("seccion-superior")) {
          // Animación para la imagen
          gsap.fromTo(
            ".imagen-vertical",
            { x: -100, opacity: 0 },
            { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
          );

          // Animación para el texto (con retraso)
          gsap.fromTo(
            ".contenedor-texto",
            { x: 100, opacity: 0 },
            { x: 0, opacity: 1, duration: 1, delay: 0.2, ease: "power3.out" }
          );
        }
        // Animación para las estadísticas
        else if (element.classList.contains("seccion-estadisticas")) {
          gsap.fromTo(
            element,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              onComplete: animarNumeros,
            }
          );
        }

        observer.unobserve(element);
      }
    });
  }, observerOptions);

  // Elementos a observar (AHORA OBSERVAMOS LAS SECCIONES COMPLETAS)
  const elementosParaAnimar = [
    document.querySelector(".seccion-superior"), // ¡Cambio importante!
    document.querySelector(".seccion-estadisticas"),
  ];

  elementosParaAnimar.forEach((el) => {
    if (el) {
      // Aseguramos que los elementos estén ocultos inicialmente
      if (el.classList.contains("seccion-superior")) {
        gsap.set(".imagen-vertical", { x: -100, opacity: 0 });
        gsap.set(".contenedor-texto", { x: 100, opacity: 0 });
      }
      observer.observe(el);
    }
  });

  // Función para animar números (igual que antes)
  function animarNumeros() {
    const contadores = document.querySelectorAll(".numero");
    const velocidad = 2000;

    contadores.forEach((contador) => {
      const objetivo = +contador.getAttribute("data-target");
      const incremento = objetivo / (velocidad / 16);
      let valorActual = 0;

      const animacion = setInterval(() => {
        valorActual += incremento;

        if (valorActual >= objetivo) {
          contador.textContent = "+" + objetivo;
          clearInterval(animacion);
        } else {
          contador.textContent = "+" + Math.floor(valorActual);
        }
      }, 16);
    });
  }
});

/***************Efecto de imagen de Quienes Somos al pasar el Mouse************************* */

// REEMPLAZA TODO EL CÓDIGO DE HOVER POR ESTE:
document.querySelectorAll(".imagen-vertical").forEach((container) => {
  const imgInner = container.querySelector(".imagen-container");
  
  // Guardamos la posición original para resetear correctamente
  let originalX = 0;
  
  container.addEventListener("mouseenter", () => {
    // Detenemos TODAS las animaciones en curso
    gsap.killTweensOf(imgInner);
    
    // Obtenemos la posición actual (por si está en medio de otra animación)
    originalX = gsap.getProperty(imgInner, "x");
    
    // Animación DIRECTA sin delays
    gsap.to(imgInner, {
      x: originalX - 50, // Mueve 50px izquierda desde su posición actual
      duration: 0, // Más rápido
      ease: "linear", // Movimiento constante sin aceleración
      overwrite: "auto" // Sobrescribe cualquier animación conflictiva
    });
    
    gsap.to(container, {
      filter: "brightness(0.8)",
      duration: 0.2
    });
  });

  container.addEventListener("mouseleave", () => {
    gsap.killTweensOf(imgInner);
    gsap.to(imgInner, {
      x: originalX, // Vuelve a la posición guardada
      duration: 0,
      ease: "power1.out"
    });
    gsap.to(container, {
      filter: "brightness(1)",
      duration: 0.25
    });
  });
});


/*************Efecto Carrusel************* */

// Importa Splide (añade esto en tu <head>)
document.addEventListener('DOMContentLoaded', function() {
  // Inicializa el carrusel
  const splide = new Splide('.splide', {
    type: 'loop',
    perPage: 3,
    perMove: 1,
    gap: '20px',
    pagination: false,
    arrows: false,
    breakpoints: {
      768: {
        perPage: 2
      },
      480: {
        perPage: 1
      }
    }
  }).mount();

  // Control personalizado con los puntos
  const puntos = document.querySelectorAll('.punto');
  
  puntos.forEach((punto, index) => {
    punto.addEventListener('click', () => {
      splide.go(index);
    });
  });

  // Actualiza puntos activos
  splide.on('move', newIndex => {
    puntos.forEach(punto => punto.classList.remove('active'));
    puntos[newIndex].classList.add('active');
  });
});