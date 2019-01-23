import * as b from "bobril";
import * as m from "bobril-m";
import { run as PropBasics } from "./propBasics/demo";
import { run as PropClass } from "./propClass/demo";
import { run as CompBasics } from "./compBasics/demo";
import { run as CompStruct } from "./compStruct/demo";
import { run as Interrupt } from "./interrupt/demo";

import { flex, vflex } from "./common";

m.initRobotoFonts();

let screenIndex = b.propi(0);

let screens: [string, () => b.IBobrilChildren][] = [
    ["Prop basics", PropBasics],
    ["Prop class", PropClass],
    ["Computed", CompBasics],
    ["CompStruct", CompStruct],
    ["Interrupt", Interrupt]
];

b.init(() => {
    return vflex({}, [
        m.Paper(
            { zDepth: 0, style: { padding: 8 } },
            flex({ flexes: [4, 1] }, [
                flex({}, [
                    screens.map((v, i) => [
                        m.Button(
                            {
                                type: m.ButtonType.Raised,
                                feature: screenIndex() == i ? m.Feature.Primary : m.Feature.Default,
                                action: () => screenIndex(i)
                            },
                            v[0]
                        ),
                        m.Spacer()
                    ])
                ]),
                flex({}, [
                    m.Button({ type: m.ButtonType.Raised, action: () => m.lightTheme() }, "Light"),
                    m.Spacer(),
                    m.Button({ type: m.ButtonType.Raised, action: () => m.darkTheme() }, "Dark")
                ])
            ])
        ),
        b.styledDiv(screens[screenIndex()][1](), { padding: 8 })
    ]);
});
