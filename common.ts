import * as b from "bobril";
import * as m from "bobril-m";
import { observable, reactiveScope } from "bobx";

export function image(url: string) {
    return b.styledDiv({ tag: "img", attrs: { src: url }, style: { width: "50%" } }, { padding: "8px 0" });
}

const flexContainerStyle = b.styleDef({ display: "flex" });

const vflexContainerStyle = b.styleDef({ flexDirection: "column" });

export function flex(data: { flexes?: (number | string)[] }, children: b.IBobrilChildren) {
    const ch = b.flatten(children);
    const flexes = data.flexes;
    if (flexes) {
        const chs = ch.length;
        for (let i = 0; i < chs; i++) {
            let f = flexes[i % flexes.length];
            ch[i] = b.styledDiv(ch[i], { flex: f });
        }
    }
    return b.styledDiv(ch, flexContainerStyle);
}

export function vflex(data: { flexes?: (number | string)[] }, children: b.IBobrilChildren) {
    return b.style(flex(data, children), vflexContainerStyle);
}

export interface ICounterDisplay {
    (): void;
    view(): b.IBobrilNode;
}

export function counterDisplay() {
    let counter = observable(0);
    let res = (() => {
        reactiveScope(() => counter.set(counter.get() + 1));
    }) as ICounterDisplay;
    res.view = () =>
        m.Button(
            {
                type: m.ButtonType.Raised,
                action: () => counter.set(0)
            },
            counter.get()
        );
    return res;
}
