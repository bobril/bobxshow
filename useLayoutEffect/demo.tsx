import * as b from "bobril";
import * as m from "bobril-m";

function OscillatingHeightShape(data: { frequency: number; color: string }) {
    const height = Math.round(30 + 25 * Math.sin(b.uptime() * data.frequency * 0.001));
    return <div style={{ backgroundColor: data.color, width: 200, height }}> </div>;
}

function DemoUseLayoutEffect(_data: {}) {
    const first = b.useRef<b.IBobrilCacheNode>();
    const firstHeight = b.useState(0);
    const animate = b.useState(false);
    const glitchFree = b.useState(1);
    animate(!animate());
    b.useEffect(() => {
        if (glitchFree() == 1) return;
        firstHeight((b.getDomNode(first.current) as HTMLElement).offsetHeight);
    });
    b.useLayoutEffect(() => {
        if (glitchFree() == 0) return;
        firstHeight((b.getDomNode(first.current) as HTMLElement).offsetHeight);
    });
    return (
        <m.Paper>
            <div style={{ position: "relative", height: 120 }}>
                <OscillatingHeightShape ref={first} frequency={5} color="red" />
                <div style={{ position: "absolute", left: 50, top: firstHeight() }}>
                    <OscillatingHeightShape frequency={1} color="green" />
                </div>
            </div>
            <div>Bobril frame number: {b.frame()}</div>
            <m.RadioButtonGroup value={glitchFree}>
                <m.RadioButton value={1}>useLayoutEffect</m.RadioButton>
                <m.RadioButton value={0}>useEffect</m.RadioButton>
            </m.RadioButtonGroup>
        </m.Paper>
    );
}

export function run() {
    return <DemoUseLayoutEffect />;
}
