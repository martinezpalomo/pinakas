import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-soporte',
  templateUrl: './soporte.page.html',
  styleUrls: ['./soporte.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule] // Importa los módulos necesarios aquí
})
export class SoportePage implements OnInit {

  nombre: string = '';
  email: string = '';
  consulta: string = '';

  constructor() { }

  ngOnInit() {}

  faqItems = [
    {
      pregunta: "¿Cuáles son las principales características y funcionalidades de la app?",
      respuesta: "La app está diseñada específicamente para entrenadores de futsal, ofreciendo herramientas visuales y tácticas para planificar y analizar jugadas. Permite mover a los jugadores sobre el campo, simular movimientos tácticos, modificar posiciones y observar los riesgos y beneficios de una jugada. También permite elegir entre diferentes formaciones y situaciones de jugadas a balón parado, como los saques de esquina.",
      mostrarRespuesta: false
    },
    {
      pregunta: "¿Cómo interactúan los usuarios con la app?",
      respuesta: "Los usuarios pueden arrastrar jugadores y el balón en el campo para representar formaciones y jugadas. La app incluye sistemas de formación como 1-2-1, 2-2 y 4-0, y permite ajustar las posiciones de los jugadores para optimizar ataques o defender jugadas específicas, como un saque de esquina.",
      mostrarRespuesta: false
    },
    {
      pregunta: "¿Cuál es el propósito de esta app?",
      respuesta: "El propósito es proporcionar a los entrenadores de futsal una herramienta digital intuitiva y eficiente para planificar y analizar jugadas tácticas. Sustituye los métodos tradicionales de dibujo y las pizarras físicas, permitiendo simular jugadas en tiempo real y realizar ajustes rápidos y precisos.",
      mostrarRespuesta: false
    },
    {
      pregunta: "¿Qué beneficios específicos obtienen los usuarios con las herramientas de la app?",
      respuesta: "Los usuarios pueden visualizar y analizar jugadas de manera rápida y flexible, lo que mejora la toma de decisiones tácticas durante entrenamientos y partidos. Las herramientas gráficas, como los diagramas de Voronoi y Delaunay, permiten identificar espacios abiertos o bloqueados en el campo, ayudando a optimizar las estrategias.",
      mostrarRespuesta: false
    },
    {
      pregunta: "¿Cómo ayuda la app a mejorar la toma de decisiones tácticas?",
      respuesta: "Al permitir simular jugadas y movimientos de los jugadores en tiempo real, la app proporciona una representación clara de cómo las jugadas pueden desarrollarse en el campo. Esto facilita la identificación de espacios explotables y la planificación de jugadas tanto ofensivas como defensivas, mejorando la toma de decisiones tácticas durante las sesiones de entrenamiento y los partidos.",
      mostrarRespuesta: false
    },
    {
      pregunta: "¿La app permite planificar jugadas a balón parado como los saques de esquina?",
      respuesta: "Sí, la app permite crear y planificar jugadas a balón parado, como los saques de esquina. Los entrenadores pueden posicionar a los jugadores en formaciones estratégicas y ajustar sus movimientos para optimizar la defensa o el ataque en estas situaciones.",
      mostrarRespuesta: false
    },
    {
      pregunta: "¿Es posible modificar las formaciones y estrategias de manera flexible en tiempo real?",
      respuesta: "Sí, los entrenadores pueden modificar las formaciones y los movimientos de los jugadores de manera flexible y en tiempo real. La app permite mover a los jugadores de forma libre sobre el campo, ajustando sus posiciones para experimentar con diversas tácticas y estrategias.",
      mostrarRespuesta: false
    },
    {
      pregunta: "¿Puedo guardar las jugadas o estrategias que diseñe en la app?",
      respuesta: "Las jugadas solamente se guardan en el momento de uso; no se almacenan para más adelante. Esto significa que no podrás acceder a ellas una vez que cierres la app, por lo que es recomendable guardarlas o tomar nota si necesitas reutilizarlas en el futuro.",
      mostrarRespuesta: false
    },
    {
      pregunta: "¿La app es adecuada para entrenadores de diferentes niveles de experiencia?",
      respuesta: "Sí, la app está diseñada para ser fácil de usar tanto para entrenadores novatos como para los más experimentados. Su interfaz intuitiva permite que los entrenadores de cualquier nivel puedan crear y analizar jugadas sin dificultades, mientras que las herramientas gráficas avanzadas ofrecen a los entrenadores más experimentados opciones adicionales para mejorar su estrategia.",
      mostrarRespuesta: false
    }
  ];

  enviarConsulta() {
    if (this.nombre && this.email && this.consulta) {
      console.log('Consulta enviada:', { nombre: this.nombre, email: this.email, consulta: this.consulta });
    }
  }

  toggleFAQ(item: { mostrarRespuesta: boolean; }) {
    item.mostrarRespuesta = !item.mostrarRespuesta;
  }
}
