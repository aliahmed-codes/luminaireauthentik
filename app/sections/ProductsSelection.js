import Component from "../classes/Component";
import { split, calculate } from "../utils/text";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import each from "lodash/each";

gsap.registerPlugin(ScrollTrigger);

export default class ProductsSelection extends Component {
    constructor() {
        super({
            element: '.products__selection',
            elements: {
                title: '.products__selection__title',
            }
        });

        this.init();
    }

    init() {
        if (!this.element) return;

        this.splitText();
        this.setupAnimations(); // Add this line!
    }

    splitText() {
        // Split title into spans
        split({ element: this.elements.title, append: true });

        // Calculate title lines based on position
        const titleSpans = this.elements.title.querySelectorAll('span');
        this.titleLines = calculate(titleSpans);

        // Wrap title lines
        this.wrapTitleLines();
    }

    wrapTitleLines() {
        // Wrap title lines
        this.elements.title.innerHTML = '';
        this.titleLinesWrapped = [];

        each(this.titleLines, (words) => {
            const lineDiv = document.createElement('div');
            lineDiv.classList.add('line');
            lineDiv.style.overflow = 'hidden';

            const lineInner = document.createElement('div');
            lineInner.classList.add('line__inner');

            // Build HTML string to preserve spaces
            let lineHTML = '';
            each(words, (word, index) => {
                lineHTML += word.outerHTML;
                // Add space after each word except the last one
                if (index < words.length - 1) {
                    lineHTML += ' ';
                }
            });
            lineInner.innerHTML = lineHTML;

            lineDiv.appendChild(lineInner);
            this.elements.title.appendChild(lineDiv);
            this.titleLinesWrapped.push(lineInner);
        });
    }

    setupAnimations() {
        // Set initial state - hide text below
        gsap.set(this.titleLinesWrapped, { y: '100%' });

        // Create timeline with ScrollTrigger
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: this.element,
                start: 'top center',
                end: 'top 20%',
                toggleActions: 'play none none none',
                // markers: true, // Uncomment to debug
            }
        });

        // Animate each line with stagger
        each(this.titleLinesWrapped, (line, index) => {
            tl.to(line, {
                y: '0%',
                duration: 1.2,
                ease: 'expo.out'
            }, index * 0.08); // Stagger by 0.08s per line
        });
    }

    destroy() {
        // Kill GSAP animations
        if (this.titleLinesWrapped) {
            gsap.killTweensOf(this.titleLinesWrapped);
        }

        // Kill ScrollTrigger instance
        ScrollTrigger.getAll().forEach(trigger => {
            if (trigger.trigger === this.element) {
                trigger.kill();
            }
        });
    }
}