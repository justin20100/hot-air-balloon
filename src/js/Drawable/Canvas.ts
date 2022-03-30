// importations nécessaires pour pouvoir utiliser les classes et objets d'autres fichiers
import {IDrawable} from "../Interfaces/IDrawable";
import {Sky} from "./Sky";
import {settings} from "../settings";
import {Hill} from "./Hill";
import {Tree} from "./Tree";
import {Balloon} from "./Balloon";

export class Canvas {
    // creation des variables avec leur type et leur mode
    private readonly htmlCanvasElement: HTMLCanvasElement;
    private drawables: IDrawable[];
    public trees: Tree[];
    private hills: Hill[];
    private readonly ctx: CanvasRenderingContext2D;
    private readonly startPositionTree: number;
    private readonly sky: Sky;
    public readonly balloon: Balloon;

    constructor() {
        // initialisation des variables
        // recuperer le canvas dans la page Html
        this.htmlCanvasElement = document.getElementById(settings.canvas.id) as HTMLCanvasElement;
        // definir le context (ctx) grace aux settings
        this.ctx = this.htmlCanvasElement.getContext(settings.canvas.CanvasRenderingContext) as CanvasRenderingContext2D;
        // initialisation d'un tableau vide
        this.drawables = [];
        // initialisation d'un tableau vide
        this.trees = [];
        // initialisation d'un tableau vide
        this.hills = [];
        // appeler la function update
        this.update();
        // utilisation de la class sky en passant le canvas et le context
        this.sky = new Sky(this.htmlCanvasElement, this.ctx);
        // initialisation du point de demarrage du dessin de l'arbre
        this.startPositionTree = this.htmlCanvasElement.width * settings.tree.horizontalStart;
        // boucle qui parcours le tableau de données pour les montagnes dans settings
        settings.hill.hills.forEach((hill) => {
            // on ajoute au tableau hills un nouvelle montagne en appellant la class hill en passant les données nécessaires recuperées de settings
            this.hills.push(new Hill(
                this.htmlCanvasElement,
                this.ctx,
                hill.amplitude,
                hill.height,
                settings.hill.startPosition + hill.startPosition,
                hill.color
            ))
        });
        // boucle qui se stop quand on est plus grand que maxcount defini dans les settings
        for (let i = 0; i < settings.tree.maxCount; i++) {
            // ajoute a trees un nouveau tree cree greace a la class tree en passant le canvas le ctx et la position de depart du dessin
            this.trees.push(new Tree(this.htmlCanvasElement, this.ctx, this.startPositionTree))
            // permet d'avoir un position aleatoire horizontalement de la construction des arbres
            const min = this.htmlCanvasElement.width * settings.tree.horizontalGap.min
            const max = this.htmlCanvasElement.width * settings.tree.horizontalGap.max
            this.startPositionTree += min + Math.random() * (max - min);
        }
        // construction du ballon grace a la class ballon
        this.balloon = new Balloon(this.htmlCanvasElement, this.ctx);
        // appeller la function addEventListenners
        this.addEventListeners();
        // appeller la function loadDrawable
        this.loadDrawable();
        // appeller la funcion draw
        this.draw();
    }

    loadDrawable() {
        // ajout dans le tableau drawables de sky
        this.drawables.push(this.sky);
        // ajout dans la tableeau drawables des hills grace a une boucle qui parcoure le tableau hills
        this.hills.forEach((hill: Hill) => {
            this.drawables.push(hill);
        });
        // ajout dans le tableau drawables des arbres grace a une bloucle qui parcoure le tableau trees
        this.trees.forEach((tree: Tree) => {
            this.drawables.push(tree);
        });
        // ajout dans le tableau drawables le ballon
        this.drawables.push(this.balloon);
    }

    update() {
        this.htmlCanvasElement.width = window.innerWidth;
        this.htmlCanvasElement.height = window.innerHeight;
        this.drawables.forEach((drawable: IDrawable) => {
            drawable.update();
            drawable.draw();
        });
    }

    draw() {
        // appeller la function clear
        this.clear();
        this.drawables.forEach((drawable: IDrawable) => {
            drawable.draw();
        });
    }

    addEventListeners() {
        // ecoute du redimentionnement de la fenetre
        window.addEventListener('resize', () => {
            // appeller la function update pour redessiner tout
            this.update();
        });
    }

    clear() {
        // reset du ctx
        this.ctx.clearRect(0, 0, this.htmlCanvasElement.width, this.htmlCanvasElement.height);
    }
}