// importations nécessaires pour pouvoir utiliser les classes et objets d'autres fichiers
import {Canvas} from "./Drawable/Canvas";
import {Animation} from "./Animation";

class Main {
    // creation des variables avec leur type et leur mode
    private readonly canvas: Canvas;
    private animation: Animation;

    constructor() {
        // initialisation de canvas grace a l'execution de la class Canvas
        this.canvas = new Canvas();
        // initialisation de animation grace a l'execution de la class Animation
        this.animation = new Animation(this.canvas);
    }
}
// execution de la class Main
new Main();