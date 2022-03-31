// importations nécessaires pour pouvoir utiliser les classes et objets d'autres fichiers
import {settings} from "../settings";
import {IDrawable} from "../Interfaces/IDrawable";

export class Sky implements IDrawable {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private gradient: CanvasGradient;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        // recuperation du canvas grace aux parametres
        this.canvas = canvas;
        // recuperation du context grace aux parametres
        this.ctx = ctx;
        // appeller la fonction update
        this.update();
    }

    generateGradient() {
        // initialisation du degrade
        this.gradient = this.ctx.createLinearGradient(this.canvas.width / 2, 0, this.canvas.width / 2, this.canvas.height);
        // boucle jusqu'a la fin du tableau gradient dans les settings
        for (let i = 0; i < settings.sky.gradient.length; i++) {
            this.gradient.addColorStop(i * (1 / (settings.sky.gradient.length - 1)), settings.sky.gradient[i])
        }
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.closePath();
    }

    update() {
        // appeller la fonction generateGradient
        this.generateGradient();
    }

}