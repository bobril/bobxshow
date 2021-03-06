import * as b from "bobril";
import * as m from "bobril-m";

import { run as UseComputed } from "./useComputed/demo";
import { run as UseLayoutEffect } from "./useLayoutEffect/demo";
import { run as UseEffect } from "./useEffect/demo";
import { run as UseState } from "./useState/demo";
import { run as Component } from "./component/demo";
import { run as PropBasics } from "./propBasics/demo";
import { run as PropClass } from "./propClass/demo";
import { run as CompBasics } from "./compBasics/demo";
import { run as CompStruct } from "./compStruct/demo";
import { run as Interrupt } from "./interrupt/demo";
import { run as UseEvents } from "./useEvents/demo";

import { flex, vflex } from "./common";

m.initRobotoFonts();

let screenIndex = b.propi(0);

let screens: [string, () => b.IBobrilChildren][] = [
    ["UseEvents", UseEvents],
    ["UseComputed", UseComputed],
    ["UseLayoutEffect", UseLayoutEffect],
    ["UseEffect", UseEffect],
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
        b.styledDiv(b.withKey(screens[screenIndex()][1](), "" + screenIndex()), { padding: 8 })
    ]);
});
