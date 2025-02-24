import { Injectable } from '@angular/core';

// Definir un tipo para las claves de los patrones.
type PatternKey = 'default' | 'amplitud' | 'triangulo' | 'trianguloInvertido' | 'filaIndia' | 'patronT' | 'patronLaser' | 'sistema121' | 'sistema22' | 'sistema40';

@Injectable({
  providedIn: 'root'
})
export class PositionsService {


  constructor() { }

  // Definimos el objeto Positions como propiedad de la clase, y especificamos que las claves son de tipo PatternKey.
  Positions: Record<PatternKey, (canvasWidth: number, canvasHeight: number, diameter: number, altitudB: number) => { x: number; y: number }[]> = {
    
    default: (canvasWidth, canvasHeight, diameter, altitudB) => {
      
      const positions = [];
      const spacingX = canvasWidth / 6;
      const spacingY = canvasHeight / 6;


      positions[0] = { x: canvasWidth / 2, y: diameter / 2 };
      positions[5] = { x: canvasWidth / 2, y: canvasHeight - diameter / 2 };
      positions[6] = { x: spacingX * 2, y: altitudB + spacingY * 2 };
      positions[7] = { x: spacingX * 3, y: altitudB + spacingY * 2 };
      positions[8] = { x: spacingX * 4, y: altitudB + spacingY * 2 };
      positions[1] = { x: spacingX * 5, y: altitudB + spacingY * 1 };
      positions[2] = { x: spacingX * 2, y: altitudB + spacingY * 1 };
      positions[3] = { x: spacingX * 3, y: altitudB + spacingY * 1 };
      positions[4] = { x: spacingX * 4, y: altitudB + spacingY * 1 };
      positions[9] = { x: spacingX * 5, y: altitudB + spacingY * 2 };
      positions[10] = { x: spacingX * 1, y: altitudB + spacingY * 1.5 };

      return positions;
    },
    
    amplitud: (canvasWidth, canvasHeight, diameter, altitudB) => {
      
      const positions = [];
      const spacingX = canvasWidth / 6;
      const spacingY = canvasHeight / 6;


      positions[0] = { x: canvasWidth / 2, y: diameter / 2 };
      positions[5] = { x: canvasWidth / 2, y: canvasHeight - diameter / 2 };
      positions[6] = { x: spacingX * 2, y: altitudB + spacingY * 1.5 };
      positions[7] = { x: spacingX * 3, y: altitudB + spacingY * 1.5 };
      positions[8] = { x: spacingX * 4, y: altitudB + spacingY * 1.5 };
      positions[1] = { x: spacingX * 2, y: altitudB + spacingY * 1.05 };
      positions[2] = { x: spacingX * 3, y: altitudB + spacingY * 1.05 };
      positions[3] = { x: spacingX * 4, y: altitudB + spacingY * 1.05 };
      positions[4] = { x: spacingX * 4.5, y: altitudB + spacingY * 0.5 };
      positions[9] = { x: spacingX * 5.9, y: altitudB + spacingY * 0.15 };
      positions[10] = { x: spacingX * 5.5, y: altitudB + spacingY * 0.20 };

      return positions;
    },
    triangulo: (canvasWidth, canvasHeight, diameter, altitudB) => {
      const positions = [];
      const spacingX = canvasWidth / 6;
      const spacingY = canvasHeight / 6;

      positions[0] = { x: canvasWidth / 2, y: diameter / 2 };
      positions[5] = { x: canvasWidth / 2, y: canvasHeight - diameter / 2 };
      positions[6] = { x: spacingX * 2, y: altitudB + spacingY * 1.5 };
      positions[7] = { x: spacingX * 3, y: altitudB + spacingY * 2.45 };
      positions[8] = { x: spacingX * 4, y: altitudB + spacingY * 1.5 };
      positions[1] = { x: spacingX * 2, y: altitudB + spacingY * 1.05 };
      positions[2] = { x: spacingX * 3, y: altitudB + spacingY * 2.00 };
      positions[3] = { x: spacingX * 4, y: altitudB + spacingY * 1.05 };
      positions[4] = { x: spacingX * 4.5, y: altitudB + spacingY * 0.5 };
      positions[9] = { x: spacingX * 5.9, y: altitudB + spacingY * 0.15 };
      positions[10] = { x: spacingX * 5.5, y: altitudB + spacingY * 0.20 };

      return positions;
    },
    trianguloInvertido: (canvasWidth, canvasHeight, diameter, altitudB) => {
      const positions = [];
      const spacingX = canvasWidth / 6;
      const spacingY = canvasHeight / 6;

      positions[0] = { x: canvasWidth / 2, y: diameter / 2 };
      positions[5] = { x: canvasWidth / 2, y: canvasHeight - diameter / 2 };
      positions[6] = { x: spacingX * 2, y: altitudB + spacingY * 2.15 };
      positions[7] = { x: spacingX * 3, y: altitudB + spacingY * 1.15 };
      positions[8] = { x: spacingX * 4, y: altitudB + spacingY * 2.15};
      positions[1] = { x: spacingX * 2, y: altitudB + spacingY * 1.70 };
      positions[2] = { x: spacingX * 3, y: altitudB + spacingY * 0.70 };
      positions[3] = { x: spacingX * 4, y: altitudB + spacingY * 1.70 };
      positions[4] = { x: spacingX * 4.5, y: altitudB + spacingY * 0.5 };
      positions[9] = { x: spacingX * 5.9, y: altitudB + spacingY * 0.15 };
      positions[10] = { x: spacingX * 5.5, y: altitudB + spacingY * 0.20 };

      return positions;
    },
    filaIndia: (canvasWidth, canvasHeight, diameter, altitudB) => {
      const positions = [];
      const spacingX = canvasWidth / 6;
      const spacingY = canvasHeight / 6;

      positions[0] = { x: canvasWidth / 2, y: diameter / 2 };
      positions[5] = { x: canvasWidth / 2, y: canvasHeight - diameter / 2 };
      positions[6] = { x: spacingX * 3, y: altitudB + spacingY * 1.00 };
      positions[7] = { x: spacingX * 3, y: altitudB + spacingY * 1.60 };
      positions[8] = { x: spacingX * 3, y: altitudB + spacingY * 2.20 };
      positions[1] = { x: spacingX * 3, y: altitudB + spacingY * 0.70 };
      positions[2] = { x: spacingX * 3, y: altitudB + spacingY * 1.30 };
      positions[3] = { x: spacingX * 3, y: altitudB + spacingY * 1.90 };
      positions[4] = { x: spacingX * 4.5, y: altitudB + spacingY * 0.5 };
      positions[9] = { x: spacingX * 5.9, y: altitudB + spacingY * 0.15 };
      positions[10] = { x: spacingX * 5.5, y: altitudB + spacingY * 0.20 };

      return positions;
    },
    patronT: (canvasWidth, canvasHeight, diameter, altitudB) => {
      const positions = [];
      const spacingX = canvasWidth / 6;
      const spacingY = canvasHeight / 6;

      positions[0] = { x: canvasWidth / 2, y: diameter / 2 };
      positions[5] = { x: canvasWidth / 2, y: canvasHeight - diameter / 2 };
      positions[6] = { x: spacingX * 2, y: altitudB + spacingY * 1.00 };
      positions[7] = { x: spacingX * 3, y: altitudB + spacingY * 1.45 };
      positions[8] = { x: spacingX * 4, y: altitudB + spacingY * 1.90 };
      positions[1] = { x: spacingX * 2, y: altitudB + spacingY * 0.60 };
      positions[2] = { x: spacingX * 3, y: altitudB + spacingY * 1.00 };
      positions[3] = { x: spacingX * 4, y: altitudB + spacingY * 1.45 };
      positions[4] = { x: spacingX * 4.5, y: altitudB + spacingY * 0.5 };
      positions[9] = { x: spacingX * 5.9, y: altitudB + spacingY * 0.15 };
      positions[10] = { x: spacingX * 5.5, y: altitudB + spacingY * 0.20 };

      return positions;
    },

    patronLaser: (canvasWidth, canvasHeight, diameter, altitudB) => {
      const positions = [];
      const spacingX = canvasWidth / 6;
      const spacingY = canvasHeight / 6;

      positions[0] = { x:canvasWidth / 2, y: diameter / 2 };
      positions[5] = { x:canvasWidth / 2, y: canvasHeight - diameter / 2 };
      positions[6] = { x: spacingX * 2, y: altitudB + spacingY * 1.90 }; // Círculo 7
      positions[7] = { x: spacingX * 3, y: altitudB + spacingY * 1.45 }; // Círculo 8
      positions[8] = { x: spacingX * 4, y: altitudB + spacingY * 1.00 }; // Círculo 9
      positions[1] = { x: spacingX * 2, y: altitudB + spacingY * 1.45 }; // Círculo 2
      positions[2] = { x: spacingX * 3, y: altitudB + spacingY * 1.00 }; // Círculo 3
      positions[3] = { x: spacingX * 4, y: altitudB + spacingY * 0.55 }; // Círculo 4
      positions[4] = { x: spacingX * 4.5, y: altitudB + spacingY * 0.5 }; // Círculo 5
      positions[9] = { x: spacingX * 5.9, y: altitudB + spacingY * 0.15 }; // Círculo 10
      positions[10] = { x: spacingX * 5.5, y: altitudB + spacingY * 0.20 }; // Círculo 10

      return positions;
    },

    sistema40: (canvasWidth, canvasHeight, diameter, altitudB) => {
      const positions = [];
      const spacingX = canvasWidth / 6;
      const spacingY = canvasHeight / 6;

      positions[0] = { x: canvasWidth / 2, y: diameter / 2 };

      // Círculo 6 centrado en la parte inferior
      positions[5] = { x: canvasWidth / 2, y: canvasHeight - diameter / 2 };

      // Círculos 7, 8, 9 con posiciones fijas
      positions[6] = { x: spacingX * 0.5, y: altitudB + spacingY * 2 }; // Círculo 7
      positions[7] = { x: spacingX * 2, y: altitudB + spacingY * 3 }; // Círculo 8
      positions[8] = { x: spacingX * 4, y: altitudB + spacingY * 3 }; // Círculo 9

      // Círculos 2, 3, 4 cesados (con posiciones iniciales fijas también)
      positions[1] = { x: spacingX * 1, y: altitudB + spacingY * 1.5 }; // Círculo 2
      positions[2] = { x: spacingX * 2, y: altitudB + spacingY * 2.5 }; // Círculo 3
      positions[3] = { x: spacingX * 4, y: altitudB + spacingY * 2.5 }; // Círculo 4


      // Los demás círculos (0, 4, 10) pueden moverse normalmente
      positions[4] = { x: spacingX * 5.0, y: altitudB + spacingY * 1.5 }; // Círculo 5
      positions[9] = { x: spacingX * 5.5, y: altitudB + spacingY * 2 }; // Círculo 10

      positions[10] = { x: canvasWidth / 2, y: canvasHeight - diameter *2 };


      return positions;
    },

    sistema121: (canvasWidth, canvasHeight, diameter, altitudB) => {
      const positions = [];
      const spacingX = canvasWidth / 6;
      const spacingY = canvasHeight / 6;

      positions[0] = { x: canvasWidth / 2, y: diameter / 2 };

      // Círculo 6 centrado en la parte inferior
      positions[5] = { x: canvasWidth / 2, y: canvasHeight - diameter / 2 };

      // Círculos 7, 8, 9 con posiciones fijas
      positions[6] = { x: spacingX * 0.5, y: altitudB + spacingY * 2 }; // Círculo 7
      positions[7] = { x: canvasWidth / 2, y: altitudB + spacingY * 1 }; // Círculo 8
      positions[8] = { x: canvasWidth / 2, y: altitudB + spacingY * 3 }; // Círculo 9

      // Círculos 2, 3, 4 cesados (con posiciones iniciales fijas también)
      positions[1] = { x: spacingX * 1, y: altitudB + spacingY * 1.5 }; // Círculo 2
      positions[2] = { x: canvasWidth / 2, y: altitudB + spacingY * 0.65 }; // Círculo 3
      positions[3] = { x: canvasWidth / 2, y: altitudB + spacingY * 2.5 }; // Círculo 4


      // Los demás círculos (0, 4, 10) pueden moverse normalmente
      positions[4] = { x: spacingX * 5.0, y: altitudB + spacingY * 1.5 }; // Círculo 5
      positions[9] = { x: spacingX * 5.5, y: altitudB + spacingY * 2 }; // Círculo 10

      positions[10] = { x: canvasWidth / 2, y: canvasHeight - diameter * 2 };


      return positions;
    },

    sistema22: (canvasWidth, canvasHeight, diameter, altitudB) => {
      const positions = [];
      const spacingX = canvasWidth / 6;
      const spacingY = canvasHeight / 6;

      positions[0] = { x: canvasWidth / 2, y: diameter / 2 };

      // Círculo 6 centrado en la parte inferior
      positions[5] = { x: canvasWidth / 2, y: canvasHeight - diameter / 2 };

      // Círculos 7, 8, 9 con posiciones fijas
      positions[6] = { x: spacingX * 0.5, y: altitudB + spacingY * 1 }; // Círculo 7
      positions[7] = { x: spacingX * 0.4, y: altitudB + spacingY * 3 }; // Círculo 8
      positions[8] = { x: spacingX * 5.5, y: altitudB + spacingY * 3 }; // Círculo 9

      // Círculos 2, 3, 4 cesados (con posiciones iniciales fijas también)
      positions[1] = { x: spacingX * 1.5, y: altitudB + spacingY * 0.75 }; // Círculo 2
      positions[2] = { x: spacingX * 2, y: altitudB + spacingY * 2.5 }; // Círculo 3
      positions[3] = { x: spacingX * 4, y: altitudB + spacingY * 2.5 }; // Círculo 4


      // Los demás círculos (0, 4, 10) pueden moverse normalmente
      positions[4] = { x: spacingX * 4.5, y: altitudB + spacingY * 0.75 }; // Círculo 5
      positions[9] = { x: spacingX * 5.5, y: altitudB + spacingY * 1 }; // Círculo 10

      positions[10] = { x: canvasWidth / 2, y: canvasHeight - diameter * 2 };

      return positions;
    }





  };

  getPattern(pattern: PatternKey, canvasWidth: number, canvasHeight: number, diameter: number = 50 , alturaC: number = 0 ){
    // Asegúrate de que diameter tiene un valor numérico
    if (diameter === undefined) {
      diameter = 50;  // Valor por defecto
    }
    return this.Positions[pattern](canvasWidth, canvasHeight, diameter, alturaC);
  }
  
}
