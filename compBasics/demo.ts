import * as b from "bobril";
import { observable, observableProp, computed } from "bobx";
import * as m from "bobril-m";
import { image, counterDisplay } from "../common";

const counterUpper = counterDisplay();
const counterCountA = counterDisplay();

class Demo {
    @observable
    text = "";

    @computed
    upper(): string {
        //debugRunWhenInvalidated(() => console.log(new Error().stack));
        counterUpper();
        return this.text.toUpperCase();
    }

    @computed
    countA(): number {
        counterCountA();
        return (this.upper().match(/A/g) || []).length;
    }
}

const demo = new Demo();

export function run() {
    return m.Paper({ zDepth: 1, style: { padding: 8 } }, [
        m.TextField({ labelText: "Enter some text", value: observableProp(demo, "text") }),
        b.styledDiv([counterUpper.view(), " Upper: ", demo.upper()], { padding: 8 }),
        b.styledDiv([counterCountA.view(), " Count of A: ", demo.countA()], { padding: 8 }),
        m.Button(
            {
                type: m.ButtonType.Raised,
                action: () => {
                    demo.text = demo.text.toUpperCase();
                    demo.text = demo.text.toLowerCase();
                    demo.text = demo.text.toUpperCase();
                }
            },
            "Make Upper"
        ),
        image(b.asset("src.png"))
    ]);
}
