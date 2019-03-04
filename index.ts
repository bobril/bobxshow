import * as b from "bobril";
import * as m from "bobril-m";
import { run as UseState } from "./useState/demo";
import { run as Component } from "./component/demo";
import { run as PropBasics } from "./propBasics/demo";
import { run as PropClass } from "./propClass/demo";
import { run as CompBasics } from "./compBasics/demo";
import { run as CompStruct } from "./compStruct/demo";
import { run as Interrupt } from "./interrupt/demo";

import { flex, vflex } from "./common";

m.initRobotoFonts();

let screenIndex = b.propi(0);

let screens: [string, () => b.IBobrilChildren][] = [
    ["UseState", UseState],
    ["Component", Component],
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
                    m.Button(
                        {
                            type: m.ButtonType.Raised,
                            disabled: screenIndex() <= 0,
                            action: () => screenIndex(screenIndex() - 1)
                        },
                        "Previous"
                    ),
                    m.Spacer(),
                    b.styledDiv(screens[screenIndex()][0], { alignSelf: "center", textAlign: "center", minWidth: 120 }),
                    m.Spacer(),
                    m.Button(
                        {
                            type: m.ButtonType.Raised,
                            disabled: screenIndex() >= screens.length - 1,
                            action: () => screenIndex(screenIndex() + 1)
                        },
                        "Next"
                    )
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
