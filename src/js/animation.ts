// importations nécessaires pour pouvoir utiliser les classes et objets d'autres fichiers
import {IAnimate} from "./Interfaces/IAnimate";
import {Canvas} from "./Drawable/Canvas";
import {Tree} from "./Drawable/Tree";

export class Animation {
    // creation des variables avec leur type et leur mode
    private canvas: Canvas;
    private animated: IAnimate[];

    constructor(canvas: Canvas) {
        this.canvas = canvas;
        this.animated = [];
        this.loadAnimated();
    }

    loadAnimated() {
        // @ts-ignore
        this.canvas.trees.forEach((tree: Tree) => {
            this.animated.push(tree);
        });
    }

    animate() {
        this.animated.forEach((animate: IAnimate) => {
            animate.animate();
        });
        this.canvas.draw();
        requestAnimationFrame(() => {
            this.animate();
        });
    }
}