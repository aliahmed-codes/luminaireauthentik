import Page from "../../components/Page";
import Hero from "../../sections/Hero"
import LeftContentRightImage from "../../sections/LeftContentRightImage";
import MediasComposition from "../../sections/MediasComposition";
import ProductsSelection from "../../sections/ProductsSelection";
import QuoteImagesTrail from "../../sections/QuoteImagesTrail";
import SliderText from "../../sections/SliderText";
import TextMediaV2 from "../../sections/TextMediaV2";

export default class Home extends Page {

    constructor() {
        super({
            id: "home",
            element: ".home",
        })


        console.log("Home load");

    }

    create() {

        new Hero()

        new LeftContentRightImage()

        new QuoteImagesTrail()

        new MediasComposition()

        new ProductsSelection()

        new TextMediaV2()

        new SliderText()

    }

    addEventListeners() { }

}

