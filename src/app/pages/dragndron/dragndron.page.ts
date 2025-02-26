import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ElementRef,
  ViewChild,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
// import * as d3 from 'd3';
// import { voronoi } from 'd3-voronoi';
import { voronoi } from 'd3-voronoi';

// const voronoi = require('d3-voronoi');


import { PositionsService } from './positions.service';

type PatternKey = 'default' | 'amplitud' | 'triangulo' | 'trianguloInvertido' | 'filaIndia' | 'patronT' | 'patronLaser' | 'sistema121' | 'sistema22' | 'sistema40';

@Component({
  selector: 'app-dragndron',
  templateUrl: './dragndron.page.html',
  styleUrls: ['./dragndron.page.scss'],
  standalone: true,  // El componente es standalone
  imports: [IonicModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class DragndronPage implements OnInit, OnDestroy {
  // @ViewChild('canvas', { static: true }) canvasRef: ElementRef<HTMLCanvasElement>;
  // @ViewChild('canvas', { static: true }) canvasRef: ElementRef<HTMLCanvasElement> | undefined;
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;



  colors: string[] = ['#FF8000', '#0000FF', '#000000'];
  positions: { x: number; y: number }[] = [];
  draggingIndex: number | null = null;
  offsetX = 0;
  offsetY = 0;

  private canvas!: HTMLCanvasElement;
  private context!: CanvasRenderingContext2D | null;

  private lastUpdateTime = 0;
  private updateInterval = 33; // 33 ms ~ 30 FPS

  private savedPositions: { x: number; y: number }[] | null = null;

  isButtonClicked: boolean = false;

  private numbers: (number | null)[] = []; // Almacena los números en los círculos

  private withNumber: boolean = true;

  public isNumberVisible: boolean = false;
  public mostarToolbarPatrones: boolean = true;

  private alturaFichas: number = 0.00;

  // Límite máximo y mínimo
  private minValue: number = 0.00;
  private maxValue: number = 0.50;

  private sPatronAcutal: any = '';

  private isFlipped: boolean = false;

  private moveY: string = ''

  // Bandera para controlar si es necesario voltear las posiciones
  flipPending: boolean = false;

  private moveX: string = '';  // 'izquierda' o 'derecha'
  private minXValue: number = 0.00;
  private maxXValue: number = 0.50;


  private isDragging = false;
  private startX = 0;
  private startY = 0;
  private currentX = 0;
  private currentY = 0;

  showDelaunay: boolean = false;

  private animationFrames: { x: number; y: number }[][] = [];
  private currentFrameIndex: number = -1;

  animationSpeed: number = 0.5; // Velocidad inicial
  actualizarIntervalo: number = 500; //
  animationInterval: any;
  isAnimating = false;

  draggedElementId: string | null = null;

  isCollapsed = false;
  isCollapsed2 = false;


  animationValues: number[] = [0.30, 0.50, 0.70];
  currentIndex: number = 1;
  

  constructor(
    private router: Router,
    private menuController: MenuController,
    private positionsService: PositionsService,
  ) { }


  ngOnInit() {
    this.canvas = this.canvasRef.nativeElement;
    this.context = this.canvas.getContext('2d');
    this.initializeCanvas();
    this.resetPositions();
    this.calculateCirclePositions('default');
    this.addGlobalListeners();
    this.mostrarToolbarPatrones();

    const movableDiv = document.getElementById("movableDiv");
    if (movableDiv) {
      movableDiv.addEventListener("mousedown", (event) => this.onMouseDown(event, "movableDiv"));
      movableDiv.addEventListener("mousemove", (event) => this.onMouseMove(event));
      movableDiv.addEventListener("mouseup", (event) => this.onMouseUp(event));
      movableDiv.addEventListener("mouseleave", (event) => this.onMouseUp(event));
      movableDiv.addEventListener("touchstart", (event) => this.onMouseDown(event, "movableDiv"), { passive: false });
      movableDiv.addEventListener("touchmove", (event) => this.onMouseMove(event), { passive: false });
      movableDiv.addEventListener("touchend", (event) => this.onMouseUp(event));
    }
    const movableDiv2 = document.getElementById("movableDiv2");
    if (movableDiv2) {
      movableDiv2.addEventListener("mousedown", (event) => this.onMouseDown(event, "movableDiv2"));
      movableDiv2.addEventListener("mousemove", (event) => this.onMouseMove(event));
      movableDiv2.addEventListener("mouseup", (event) => this.onMouseUp(event));
      movableDiv2.addEventListener("mouseleave", (event) => this.onMouseUp(event));
      movableDiv2.addEventListener("touchstart", (event) => this.onTouchStart(event, "movableDiv2"), { passive: false });
      movableDiv2.addEventListener("touchmove", (event) => this.onTouchMove(event), { passive: false });
      movableDiv2.addEventListener("touchend", () => this.onTouchEnd());

    }
    
    

    window.addEventListener('resize', this.onResize.bind(this));
  }

  // ngOnDestroy() {
  //   this.removeGlobalListeners();
  // }

  ngOnDestroy() {
    this.removeGlobalListeners();
    window.removeEventListener('resize', this.onResize.bind(this));
  }

  onResize() {
    this.initializeCanvas();
    this.resetPositions();
    this.drawVoronoi();
  }

  initializeCanvas() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.drawVoronoi();
  }

  private mostrarToolbarPatrones() {
    if (
      window.innerWidth <= 480 || window.innerHeight <= 480
    ) {
      this.mostarToolbarPatrones = false;
    } else {
      this.mostarToolbarPatrones = true;
    }
  }

  private NumbersVisible() {
    this.isNumberVisible = !this.isNumberVisible;
  }

  resetPositions() {
    // const diameter = this.circleDiameter;
    const cols = 5; // Número de columnas
    const rows = 3; // Número de filas

    const spacingX = this.canvas.width / (cols + 1);
    const spacingY = this.canvas.height / (rows + 1);

    this.positions = [];
    for (let i = 0; i < 11; i++) {
      const x = (i % cols) * spacingX + spacingX;
      const y = Math.floor(i / cols) * spacingY + spacingY;
      this.positions.push({ x, y });
    }

    this.colors = [
      '#FF8000', '#FF8000', '#FF8000', '#FF8000', '#FF8000', // 5 círculos primer color
      '#0000FF', '#0000FF', '#0000FF', '#0000FF', '#0000FF', // 5 círculos segundo color
      '#000000', // 1 círculo negro
    ];

    this.numbers = Array(11).fill(null); // Inicializar números en null

    this.drawVoronoi();

    if (this.withNumber) {
      this.assignUniqueNumbers();
    } else {
      this.removeNumberFromAllCircles();
    };
    this.closeMenu();
  }



  calculateCirclePositions(pattern: PatternKey) {
    const diameter = 50; // Ajusta el diámetro de los círculos según lo necesites
    this.sPatronAcutal = pattern;

    // Llama a la función adecuada de PositionsService para calcular las posiciones según el patrón
    this.positions = this.positionsService.getPattern(pattern, this.canvas.width, this.canvas.height, diameter, Math.round(this.canvas.height * this.alturaFichas));


    if (this.isFlipped) {
      this.flipCirclesHorizontally();
      this.isFlipped = !this.isFlipped;
    }

    this.colors = ['#FF8000', '#FF8000', '#FF8000', '#FF8000', '#FF8000', '#0000FF', '#0000FF', '#0000FF', '#0000FF', '#0000FF', '#000000'];

    this.closeMenu();
    // Si necesitas asignar los colores, puedes hacerlo aquí
    // if (pattern === 'amplitud') {
    //   this.colors = ['#FF8000', '#FF8000', '#FF8000', '#FF8000', '#FF8000', '#0000FF', '#0000FF', '#0000FF', '#0000FF', '#0000FF', '#000000'];
    // } else if (pattern === 'triangulo') {
    //   this.colors = ['#FF8000', '#FF8000', '#FF8000', '#FF8000', '#FF8000', '#0000FF', '#0000FF', '#0000FF', '#0000FF', '#0000FF', '#000000'];
    // }

    // Redibujar la Voronoi o cualquier otra cosa que dependa de las nuevas posiciones
    this.drawVoronoi();
  }


  get circleDiameter() {
    if (this.canvas.height <= 480 || this.canvas.width <= 480) {
      return Math.min(this.canvas.height, this.canvas.width) * 0.16;
    } else {
      return Math.min(this.canvas.height, this.canvas.width) * 0.12;
    }
  }

  onPointerDown(event: PointerEvent) {

    event.preventDefault();

    const { x, y } = this.getCanvasCoordinates(event);
    const tolerance = this.circleDiameter / 2;

    this.draggingIndex = this.positions.findIndex((pos) => {
      const distance = Math.hypot(pos.x - x, pos.y - y);
      return distance <= tolerance;
    });

    if (this.draggingIndex !== -1) {
      this.offsetX = x - this.positions[this.draggingIndex].x;
      this.offsetY = y - this.positions[this.draggingIndex].y;
    }
  }

  onPointerMove(event: PointerEvent) {
    if (this.draggingIndex === null) return;

    const now = performance.now();
    if (now - this.lastUpdateTime < this.updateInterval) return;
    this.lastUpdateTime = now;

    const { x, y } = this.getCanvasCoordinates(event);
    this.positions[this.draggingIndex] = { x: x - this.offsetX, y: y - this.offsetY };

    requestAnimationFrame(() => {
      this.drawVoronoi();
    });
  }

  onPointerUp() {
    this.draggingIndex = null;
  }

  getCanvasCoordinates(event: PointerEvent) {
    if (!this.context) return { x: 0, y: 0 };

    const rect = this.context.canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) * (this.context.canvas.width / rect.width);
    const y = (event.clientY - rect.top) * (this.context.canvas.height / rect.height);
    return { x, y };
  }


  private drawVoronoi() {
    if (!this.context) return;

    const { width, height } = this.canvas;
    const diameter = this.circleDiameter;

    // Obtener el segundo lienzo y su contexto
    // const extraCanvas = document.getElementById('extraCanvas');





    // Calcular el diámetro del círculo central como el 30% del ancho o el 30% del alto, el menor de los dos
    const centralCircleDiameter = Math.min(width, height) * 0.3;
    const centralCircleRadius = centralCircleDiameter / 2;

    // Excluimos el último punto para el cálculo de Voronoi
    const points: [number, number][] = this.positions.map((pos) => [pos.x, pos.y]);
    const pointsWithoutLast = points.slice(0, points.length - 1); // Excluir el último punto

    // Generamos el Voronoi solo con los puntos excluyendo el último
    const voronoiGenerator = voronoi().extent([[0, 0], [width, height]]);
    const polygons = voronoiGenerator.polygons(pointsWithoutLast);

    // Limpiar el canvas
    this.context.clearRect(0, 0, width, height);

    // Dibujar el borde negro de 10px de ancho
    this.context.beginPath();
    this.context.rect(0, 0, width, height); // Rectángulo cubriendo todo el canvas
    this.context.lineWidth = 10; // Ancho del borde
    this.context.strokeStyle = 'black'; // Color del borde
    this.context.stroke(); // Dibujar el borde

    // Dibujar la línea horizontal en el medio del canvas
    const midY = height / 2; // La posición Y en el centro del canvas
    this.context.beginPath();
    this.context.moveTo(0, midY); // Empezamos desde el borde izquierdo
    this.context.lineTo(width, midY); // Terminamos en el borde derecho
    this.context.strokeStyle = 'black'; // Color de la línea
    this.context.lineWidth = 5; // Grosor de la línea
    this.context.stroke(); // Dibujar la línea

    // Dibujar el círculo central
    const centerX = width / 2;
    const centerY = height / 2;

    this.context.beginPath();
    this.context.arc(centerX, centerY, centralCircleRadius, 0, Math.PI * 2);
    this.context.fillStyle = 'transparent'; // Fondo transparente
    this.context.lineWidth = 5; // Grosor del borde
    this.context.strokeStyle = 'black'; // Color del borde negro
    this.context.stroke(); // Borde negro
    this.context.fill(); // Fondo transparente

    // Dibujar el punto central
    this.context.beginPath();
    this.context.arc(centerX, centerY, centralCircleRadius * 0.05, 0, Math.PI * 2);
    this.context.fillStyle = 'black'; // Fondo transparente
    this.context.lineWidth = 5; // Grosor del borde
    this.context.strokeStyle = 'black'; // Color del borde negro
    this.context.stroke(); // Borde negro
    this.context.fill(); // Fondo transparente

    // Dibujar el punto penal superior
    this.context.beginPath();
    this.context.arc(centerX, centralCircleDiameter, centralCircleRadius * 0.05, 0, Math.PI * 2);
    this.context.fillStyle = 'black'; // Fondo transparente
    this.context.lineWidth = 5; // Grosor del borde
    this.context.strokeStyle = 'black'; // Color del borde negro
    this.context.stroke(); // Borde negro
    this.context.fill(); // Fondo transparente

    // Dibujar el punto penal inferior
    this.context.beginPath();
    this.context.arc(centerX, height - centralCircleDiameter, centralCircleRadius * 0.05, 0, Math.PI * 2);
    this.context.fillStyle = 'black'; // Fondo transparente
    this.context.lineWidth = 5; // Grosor del borde
    this.context.strokeStyle = 'black'; // Color del borde negro
    this.context.stroke(); // Borde negro
    this.context.fill(); // Fondo transparente

    // Dibujar el punto castigo superior
    this.context.beginPath();
    this.context.arc(centerX, centralCircleDiameter / 0.6, centralCircleRadius * 0.05, 0, Math.PI * 2);
    this.context.fillStyle = 'black'; // Fondo transparente
    this.context.lineWidth = 5; // Grosor del borde
    this.context.strokeStyle = 'black'; // Color del borde negro
    this.context.stroke(); // Borde negro
    this.context.fill(); // Fondo transparente

    // Dibujar el punto castigo inferior
    this.context.beginPath();
    this.context.arc(centerX, height - centralCircleDiameter / 0.6, centralCircleRadius * 0.05, 0, Math.PI * 2);
    this.context.fillStyle = 'black'; // Fondo transparente
    this.context.lineWidth = 5; // Grosor del borde
    this.context.strokeStyle = 'black'; // Color del borde negro
    this.context.stroke(); // Borde negro
    this.context.fill(); // Fondo transparente

    // Dibujar la línea horizontal centrada con longitud igual a la mitad del diámetro
    const horizontalLineLength = centralCircleRadius; // Longitud de la línea: la mitad del diámetro
    const lineYPosition = centralCircleDiameter; // Distancia desde el borde superior del canvas, igual al diámetro del círculo

    // Dibujo de la línea horizontal
    const lineXPositionStart = (width - horizontalLineLength) / 2; // Para centrarla horizontalmente
    const lineXPositionEnd = lineXPositionStart + horizontalLineLength;

    this.context.beginPath();
    this.context.moveTo(lineXPositionStart, lineYPosition); // Empezamos desde el punto de inicio
    this.context.lineTo(lineXPositionEnd, lineYPosition); // Terminamos en el punto final
    this.context.strokeStyle = 'black'; // Color de la línea
    this.context.lineWidth = 5; // Grosor de la línea
    this.context.stroke(); // Dibujar la línea

    // Dibujar el arco que conecta el extremo de la línea con el borde superior
    const arcRadius = lineYPosition; // Radio del arco (distancia desde el extremo de la línea hasta el borde superior)


    // Dibujar el arco de 90 grados, desde la línea horizontal hacia la parte superior del canvas
    this.context.beginPath();
    this.context.arc(lineXPositionStart, 0, arcRadius, Math.PI, Math.PI / 2, true); // Arco de 90 grados
    this.context.strokeStyle = 'black'; // Color del arco
    this.context.lineWidth = 5; // Grosor del arco
    this.context.stroke(); // Dibujar el arco

    // Dibujar el arco de 90 grados, desde la línea horizontal hacia la parte superior del canvas
    this.context.beginPath();
    this.context.arc(lineXPositionEnd, 0, arcRadius, Math.PI / 2, Math.PI, true); // Arco de 90 grados
    this.context.strokeStyle = 'black'; // Color del arco
    this.context.lineWidth = 5; // Grosor del arco
    this.context.stroke(); // Dibujar el arco

    // Dibujar la línea horizontal centrada con longitud igual a la mitad del diámetro
    // const horizontalLineLength = centralCircleRadius; // Longitud de la línea: la mitad del diámetro
    const lineYPosition2 = height - centralCircleDiameter;

    // Dibujo de la línea horizontal
    // const lineXPositionStart = (width - horizontalLineLength) / 2; // Para centrarla horizontalmente
    // const lineXPositionEnd = lineXPositionStart + horizontalLineLength;

    this.context.beginPath();
    this.context.moveTo(lineXPositionStart, lineYPosition2); // Empezamos desde el punto de inicio
    this.context.lineTo(lineXPositionEnd, lineYPosition2); // Terminamos en el punto final
    this.context.strokeStyle = 'black'; // Color de la línea
    this.context.lineWidth = 5; // Grosor de la línea
    this.context.stroke(); // Dibujar la línea


    // Dibujar el arco de 90 grados, desde la línea horizontal hacia la parte inferior del canvas
    this.context.beginPath();
    this.context.arc(lineXPositionEnd, height, arcRadius, 2 * Math.PI, 1.5 * Math.PI, true); // Arco de 90 grados
    this.context.strokeStyle = 'black'; // Color del arco
    this.context.lineWidth = 5; // Grosor del arco
    this.context.stroke(); // Dibujar el arco


    // Dibujar el arco de 90 grados, desde la línea horizontal hacia la parte inferior del canvas
    this.context.beginPath();
    this.context.arc(lineXPositionStart, height, arcRadius, 1.5 * Math.PI, 1 * Math.PI, true); // Arco de 90 grados
    this.context.strokeStyle = 'black'; // Color del arco
    this.context.lineWidth = 5; // Grosor del arco
    this.context.stroke(); // Dibujar el arco

    // Establecer el color y grosor de la línea
    this.context.strokeStyle = 'black'; // Color de la línea
    this.context.lineWidth = 5; // Grosor de la línea
    const espaciado = height / 7;

    // Dibujo de las 6 líneas horizontales izquierda
    for (let i = 1; i < 7; i++) {
      this.context.beginPath();
      this.context.moveTo(0, i * espaciado); // Cada línea separada por 30 píxeles
      this.context.lineTo(centralCircleRadius * 0.20, i * espaciado); // Línea termina en el punto final
      this.context.stroke(); // Dibujar la línea
    }

    // Dibujo de las 6 líneas horizontales derecha
    for (let i = 1; i < 7; i++) {
      this.context.beginPath();
      this.context.moveTo(width - centralCircleRadius * 0.20, i * espaciado); // Cada línea separada por 30 píxeles
      this.context.lineTo(width, i * espaciado); // Línea termina en el punto final
      this.context.stroke(); // Dibujar la línea
    }


    // Obtener el canvas y asegurarse de que es un HTMLCanvasElement
    const extraCanvas = document.getElementById('extraCanvas') as HTMLCanvasElement;

    if (extraCanvas) {
      // Establecer el tamaño del canvas (si es necesario)
      extraCanvas.width = width;
      extraCanvas.height = height;  // Altura del canvas (ajústalo según lo que necesites)
    
      const extraContext = extraCanvas.getContext('2d');
      if (extraContext) {
        // Establecer el color del borde
        extraContext.strokeStyle = 'black';  // Color del borde
        extraContext.lineWidth = 5;  // Grosor del borde
    
        // Establecer el color de relleno transparente (opcional, ya que es transparente por defecto)
        extraContext.fillStyle = 'transparent';  // Fondo transparente
    
        // Dibujar el rectángulo con borde rojo y fondo transparente
        const rectX = (width / 2) - (centralCircleRadius / 2);  // Posición X para centrarlo
        const rectY = 4;  // Posición Y del rectángulo
        extraContext.strokeRect(rectX, rectY, centralCircleRadius, 16);  // (x, y, ancho, alto)
        extraContext.strokeRect(rectX, height - 16 - 4, centralCircleRadius, 16);  // (x, y, ancho, alto)
      } else {
        console.error('No se pudo obtener el contexto del canvas.');
      }
    } else {
      console.error('El canvas "extraCanvas" no se ha encontrado.');
    }



    // Si showDelaunay es true, dibujamos las áreas de Voronoi
    if (!this.showDelaunay) {
      polygons.forEach((polygon, i) => {
        if (polygon) {
          this.context!.beginPath();
          this.context!.moveTo(polygon[0][0], polygon[0][1]);
          polygon.forEach(([x, y]) => this.context!.lineTo(x, y));
          this.context!.closePath();

          this.context!.fillStyle = `rgba(${parseInt(this.colors[i % this.colors.length].slice(1, 3), 16)}, 
                                         ${parseInt(this.colors[i % this.colors.length].slice(3, 5), 16)}, 
                                         ${parseInt(this.colors[i % this.colors.length].slice(5, 7), 16)}, 
                                         0.3)`;
          this.context!.fill();

          this.context!.strokeStyle = 'gray';
          this.context!.lineWidth = 2;
          this.context!.stroke();
        }
      });
    }

    // Dibujar las conexiones Delaunay si showDelaunay es verdadero
    if (this.showDelaunay) {
      // Conectar los puntos Naranjas
      const pointsToConnect = [1, 2, 3, 4];
      for (let i = 0; i < pointsToConnect.length; i++) {
        for (let j = i + 1; j < pointsToConnect.length; j++) {
          const startPoint = this.positions[pointsToConnect[i]];
          const endPoint = this.positions[pointsToConnect[j]];
          if (startPoint && endPoint) {
            this.context!.beginPath();
            this.context!.moveTo(startPoint.x, startPoint.y);
            this.context!.lineTo(endPoint.x, endPoint.y);
            this.context!.strokeStyle = '#FF8000';
            this.context!.lineWidth = 4;
            this.context!.stroke();
          }
        }
      }

      // Conectar los puntos Azules
      const pointsToConnect2 = [6, 7, 8, 9];
      for (let i = 0; i < pointsToConnect2.length; i++) {
        for (let j = i + 1; j < pointsToConnect2.length; j++) {
          const startPoint = this.positions[pointsToConnect2[i]];
          const endPoint = this.positions[pointsToConnect2[j]];
          if (startPoint && endPoint) {
            this.context!.beginPath();
            this.context!.moveTo(startPoint.x, startPoint.y);
            this.context!.lineTo(endPoint.x, endPoint.y);
            this.context!.strokeStyle = '#0000FF';
            this.context!.lineWidth = 4;
            this.context!.stroke();
          }
        }
      }
    }

    // Dibujar los círculos y los números (incluso el último)
    this.positions.forEach((pos, i) => {
      const color = this.colors[i % this.colors.length];
      this.context!.fillStyle = color;

      // Si es el último círculo, usar la mitad del tamaño
      const currentDiameter = (i === this.positions.length - 1) ? (diameter / 2) : diameter;

      // Siempre dibujamos los círculos y los números
      this.context!.beginPath();
      this.context!.arc(pos.x, pos.y, currentDiameter / 2, 0, Math.PI * 2);
      this.context!.fill();

      // Evitar que el círculo negro tenga número
      if (color !== '#000000' && this.numbers[i] !== null) {
        this.context!.fillStyle = 'white';

        // Calcular tamaño de la fuente
        const fontSize = currentDiameter * 0.7;
        this.context!.font = `${fontSize}px Arial`;
        this.context!.textAlign = 'center';
        this.context!.textBaseline = 'middle';
        this.context!.fillText(this.numbers[i]!.toString(), pos.x, pos.y);
      }
    });
  }


  // Método para asignar números únicos a todos los círculos, excepto al círculo negro
  assignUniqueNumbers() {

    // Generamos una lista de números únicos del 1 al 10 (no incluimos el círculo negro)
    const uniqueNumbers = Array.from({ length: this.numbers.length - 1 }, (_, index) => index + 1);

    // Asignamos estos números a los círculos, sin asignar al círculo negro
    this.numbers = [...uniqueNumbers, null];  // El último círculo (negro) no tendrá número

    // Redibujamos el canvas con los nuevos números
    this.drawVoronoi();
    this.withNumber = true;
    this.isNumberVisible = false;
  }

  // Método para quitar los números de todos los círculos
  removeNumberFromAllCircles() {
    this.numbers = Array(this.numbers.length).fill(null); // Eliminar todos los números
    this.drawVoronoi(); // Redibujar el canvas con los números eliminados
    this.withNumber = false;
    this.isNumberVisible = true;


  }

  back() {
    this.router.navigate(['/menu']);
  }

  savePositions() {
    this.isButtonClicked = !this.isButtonClicked;
    this.savedPositions = [...this.positions];
  }

  loadPositions() {
    if (this.savedPositions) {
      this.positions = [...this.savedPositions];
      this.drawVoronoi();
    }
  }



  addGlobalListeners() {
    window.addEventListener('resize', this.onWindowResize.bind(this));
    this.canvas.addEventListener('pointerdown', this.onPointerDown.bind(this));
    document.addEventListener('pointermove', this.onPointerMove.bind(this));
    document.addEventListener('pointerup', this.onPointerUp.bind(this));
  }

  removeGlobalListeners() {
    window.removeEventListener('resize', this.onWindowResize.bind(this));
    this.canvas.removeEventListener('pointerdown', this.onPointerDown.bind(this));
    document.removeEventListener('pointermove', this.onPointerMove.bind(this));
    document.removeEventListener('pointerup', this.onPointerUp.bind(this));
  }

  onWindowResize() {
    this.ngOnInit(); // Llama al método ngOnInit() al cambiar el tamaño de la ventana
  }

  closeMenu() {
    this.menuController.close();  // Cerrar el menú
  }



  flipCirclesHorizontally() {
    // Actualizamos el estado de isFlipped
    this.isFlipped = !this.isFlipped;

    // Comprobamos que haya posiciones definidas
    if (!this.positions || this.positions.length === 0) {
      console.warn('No hay posiciones definidas para los círculos.');
      return;
    }

    const canvasWidth = this.canvas.width;

    // Reflejar las posiciones horizontalmente
    this.positions = this.positions.map((position) => ({
      x: canvasWidth - position.x,  // Invertimos la posición en el eje X
      y: position.y,                 // Mantenemos la misma posición en el eje Y
    }));

    // Redibujamos las celdas de Voronoi después de la inversión
    this.drawVoronoi();
    this.closeMenu();
  }


  // Método para disminuir el valor de alturaFichas
  decreaseValue() {
    if (this.alturaFichas > this.minValue) {
      this.alturaFichas -= 0.05;
      // this.calculateCirclePositions(this.sPatronAcutal); // Actualizamos las posiciones
      this.moveY = 'arriba'
      this.updateCirclePositions();
    }
  }

  // Método para aumentar el valor de alturaFichas
  increaseValue() {
    if (this.alturaFichas < this.maxValue) {
      this.alturaFichas += 0.05;
      this.moveY = 'abajo'
      // this.calculateCirclePositions(this.sPatronAcutal); // Actualizamos las posiciones
      this.updateCirclePositions();
    }
  }


  // Método para aumentar el valor de la posición X
  increaseXValue() {
    if (this.alturaFichas < this.maxXValue) {
      this.alturaFichas += 0.05;
      this.moveX = 'derecha';
      this.updateCirclePositionsX();
    }
  }

  // Método para disminuir el valor de la posición X
  decreaseXValue() {
    if (this.alturaFichas > this.minXValue) {
      this.alturaFichas -= 0.05;
      this.moveX = 'izquierda';
      this.updateCirclePositionsX();
    }
  }

  updateCirclePositions() {
    const ajusteY = this.canvas.height / 10;
    const radioCírculo = 10; // Asumimos que el radio del círculo es de 10px, ajusta según sea necesario

    // Ajustamos las posiciones Y de los círculos según el valor de alturaFichas
    const adjustment = this.moveY == 'arriba' ? -ajusteY : ajusteY;

    // Verificamos la condición del patrón solo una vez
    const isPatternSist = this.sPatronAcutal.slice(0, 4).toLowerCase() === 'sist';

    // Primero verificamos si al menos uno de los círculos desborda los límites
    let shouldStop = false;
    this.positions.forEach((position, index) => {
      // Solo procesamos los círculos que no están excluidos
      if (!(index === 0 || index === 5 || (isPatternSist && index === 10))) {
        let nuevaY = position.y + adjustment;

        // Aseguramos que el círculo no se salga del canvas en el eje Y
        if (nuevaY - radioCírculo < 0 || nuevaY + radioCírculo > this.canvas.height) {
          shouldStop = true;  // Si hay un desbordamiento, marcamos que debemos detener la modificación
        }
      }
    });

    // Si se detectó que algún círculo desborda, no realizamos ninguna modificación
    if (shouldStop) {
      // console.log("Desbordamiento detectado. No se aplicaron cambios.");
      return; // Detener la ejecución y no realizar modificaciones
    }

    // Si no hay desbordamientos, procedemos con la modificación de las posiciones
    this.positions = this.positions.map((position, index) => {
      // Condición para los índices que no deben cambiar
      const shouldNotModify = (index === 0 || index === 5 || (isPatternSist && index === 10));

      if (shouldNotModify) {
        return position;
      } else {
        // Nueva posición Y ajustada
        let nuevaY = position.y + adjustment;

        // Aseguramos que el círculo no se salga del canvas en el eje Y
        if (nuevaY - radioCírculo < 0) {
          nuevaY = radioCírculo;  // Si el círculo intenta salir por arriba, lo ponemos en el borde superior
        } else if (nuevaY + radioCírculo > this.canvas.height) {
          nuevaY = this.canvas.height - radioCírculo;  // Si el círculo intenta salir por abajo, lo ponemos en el borde inferior
        }

        return {
          x: position.x,
          y: nuevaY  // Usamos la nueva posición Y ajustada
        };
      }
    });

    // Redibujamos las celdas de Voronoi después de ajustar las posiciones
    this.drawVoronoi();
  }


  updateCirclePositionsX() {
    const ajusteX = this.canvas.width / 10; // Ajuste de movimiento horizontal
    const radioCírculo = 10; // Asumimos que el radio del círculo es de 10px, ajusta según sea necesario

    // Ajustamos las posiciones X de los círculos según el valor de alturaFichas
    const adjustment = this.moveX == 'derecha' ? ajusteX : -ajusteX;

    // Verificamos la condición del patrón solo una vez
    const isPatternSist = this.sPatronAcutal.slice(0, 4).toLowerCase() === 'sist';

    // Primero verificamos si al menos uno de los círculos desborda los límites
    let shouldStop = false;
    this.positions.forEach((position, index) => {
      // Solo procesamos los círculos que no están excluidos
      if (!(index === 0 || index === 5 || (isPatternSist && index === 10))) {
        let nuevaX = position.x + adjustment;

        // Aseguramos que el círculo no se salga del canvas en el eje X
        if (nuevaX - radioCírculo < 0 || nuevaX + radioCírculo > this.canvas.width) {
          shouldStop = true;  // Si hay un desbordamiento, marcamos que debemos detener la modificación
        }
      }
    });

    // Si se detectó que algún círculo desborda, no realizamos ninguna modificación
    if (shouldStop) {
      // console.log("Desbordamiento detectado. No se aplicaron cambios.");
      return; // Detener la ejecución y no realizar modificaciones
    }

    // Si no hay desbordamientos, procedemos con la modificación de las posiciones
    this.positions = this.positions.map((position, index) => {
      // Condición para los índices que no deben cambiar
      const shouldNotModify = (index === 0 || index === 5 || (isPatternSist && index === 10));

      if (shouldNotModify) {
        return position;
      } else {
        // Nueva posición X ajustada
        let nuevaX = position.x + adjustment;

        // Aseguramos que el círculo no se salga del canvas en el eje X
        if (nuevaX - radioCírculo < 0) {
          nuevaX = radioCírculo;  // Si el círculo intenta salir por la izquierda, lo ponemos en el borde izquierdo
        } else if (nuevaX + radioCírculo > this.canvas.width) {
          nuevaX = this.canvas.width - radioCírculo;  // Si el círculo intenta salir por la derecha, lo ponemos en el borde derecho
        }

        return {
          x: nuevaX,  // Usamos la nueva posición X ajustada
          y: position.y
        };
      }
    });

    // Redibujamos las celdas de Voronoi después de ajustar las posiciones
    this.drawVoronoi();
  }

  // Mouse events
  onMouseDown(event: MouseEvent | TouchEvent, elementId: string) {
    this.isDragging = true;
    this.draggedElementId = elementId;
    this.startX = (event as MouseEvent).clientX || (event as TouchEvent).touches[0].clientX;
    this.startY = (event as MouseEvent).clientY || (event as TouchEvent).touches[0].clientY;
  }
  

  onMouseMove(event: MouseEvent | TouchEvent) {
    if (!this.isDragging || !this.draggedElementId) return;
    const element = document.getElementById(this.draggedElementId);
    if (element) {
      const clientX = (event as MouseEvent).clientX || (event as TouchEvent).touches[0].clientX;
      const clientY = (event as MouseEvent).clientY || (event as TouchEvent).touches[0].clientY;
  
      this.currentX += clientX - this.startX;
      this.currentY += clientY - this.startY;
      this.setPosition(this.draggedElementId);
      
      this.startX = clientX;
      this.startY = clientY;
    }
  }
  
  
  onMouseUp(event: MouseEvent | TouchEvent) {
    this.isDragging = false;
    this.draggedElementId = null;
  }
  
  
  // Touch events
  onTouchStart(event: TouchEvent, elementId: string) {
    this.isDragging = true;
    this.draggedElementId = elementId;
    const touch = event.touches[0];
    this.startX = touch.clientX;
    this.startY = touch.clientY;
  }
  

  onTouchMove(event: TouchEvent) {
    if (this.isDragging && this.draggedElementId) {
      const touch = event.touches[0];
      this.currentX = touch.clientX - this.startX;
      this.currentY = touch.clientY - this.startY;
      this.setPosition(this.draggedElementId); // Ahora pasamos el ID correcto
    }
  }
  

  onTouchEnd() {
    this.isDragging = false;
  }

  // Establece la posición del div
  setPosition(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      element.style.transform = `translate(${this.currentX}px, ${this.currentY}px)`;
    }
  }
  

  mostrarDelaunay() {
    this.showDelaunay = !this.showDelaunay;
    this.drawVoronoi();
    this.closeMenu();
  }

  saveFrame() {
    // Guardar una copia del estado actual de las posiciones
    this.animationFrames.push(JSON.parse(JSON.stringify(this.positions)));
    this.currentFrameIndex++;
    // console.log('Frame guardado:', this.animationFrames);
  }

  playAnimation() {

    if (this.animationFrames.length === 0 || this.isAnimating) return;
  
    let index = 0;
    const intervalTime = Math.max(50, (this.actualizarIntervalo / this.animationSpeed));
  
    this.isAnimating = true;
  
    const animate = () => {
      if (!this.isAnimating || index >= this.animationFrames.length - 1) {
        this.isAnimating = false;
        return;
      }
  
      this.smoothTransition(this.animationFrames[index], this.animationFrames[index + 1], intervalTime, () => {
        index++;
        if (this.isAnimating) requestAnimationFrame(animate);
      });
    };
  
    animate();
  }
  
  
  stopAnimation() {
    this.isAnimating = false; // Detener la animación
  }
  
  

  resetAnimation() {
    this.animationFrames = [];
    this.currentFrameIndex = -1;
  }

  // updateAnimationSpeed(event: any) {
  
  //   const newValue = parseFloat(event?.detail?.value);
  //   if (!isNaN(newValue)) {
  //     this.animationSpeed = newValue;
  //   } else {
  //     console.warn("Valor no válido recibido:", event.detail.value);
  //   }
  // }
  
  updateAnimationSpeed() {
    // Incrementar el índice y asegurarse de que se reinicie cuando se llegue al final
    this.currentIndex = (this.currentIndex + 1) % this.animationValues.length;
    
    this.animationSpeed = this.animationValues[this.currentIndex];

  }
  

  smoothTransition(startPositions: any[], endPositions: any[], duration: number, onComplete: () => void) {
    const steps = Math.min(60, Math.max(10, duration / 16)); // Máximo 60 FPS
    const stepTime = duration / steps;
    let step = 0;
  
    const interpolateStep = () => {
      if (!this.isAnimating || step >= steps) {
        onComplete();
        return;
      }

      // Hacer la transición aún más lenta multiplicando stepTime por un factor de aceleración
      const adjustedStepTime = stepTime * (1 / this.animationSpeed); // Inversamente proporcional
  
      this.positions = startPositions.map((start, i) => ({
        x: start.x + ((endPositions[i].x - start.x) * (step / steps)),
        y: start.y + ((endPositions[i].y - start.y) * (step / steps))
      }));
  
      this.drawVoronoi();
      step++;
  
      setTimeout(() => requestAnimationFrame(interpolateStep), adjustedStepTime);
    };
  
    interpolateStep();
  }

  interpolatePositions(startPositions: any[], endPositions: any[], duration: number) {
    const steps = 10; // Cantidad de pasos en la interpolación
    const stepTime = duration / steps;
    let step = 0;

    const interpolateStep = () => {
      if (step >= steps) return;

      // Hacer la transición aún más lenta multiplicando stepTime por un factor de aceleración
      const adjustedStepTime = stepTime * (1 / this.animationSpeed); // Inversamente proporcional
  
      this.positions = startPositions.map((start, i) => ({
        x: start.x + ((endPositions[i].x - start.x) * (step / steps)),
        y: start.y + ((endPositions[i].y - start.y) * (step / steps))
      }));
  
      this.drawVoronoi();
      step++;
  
      setTimeout(() => requestAnimationFrame(interpolateStep), adjustedStepTime);
    };
  
    interpolateStep();
  }

  playAnimationWithDelay() {
    if (this.animationFrames.length === 0) return;
  
    this.positions = JSON.parse(JSON.stringify(this.animationFrames[0])); // Ubicar en el primer frame
    this.drawVoronoi(); // Dibujar el primer frame
  
    setTimeout(() => {
      this.playAnimation();
    }, 1000);
  }
  
  toggleMovableDiv() {
    this.isCollapsed = !this.isCollapsed;
  }



toggleMovableDiv2() {
  this.isCollapsed2 = !this.isCollapsed2;
}

}