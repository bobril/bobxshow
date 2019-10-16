import * as b from "bobril";

const draggableStyle = b.styleDef({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    transform: "translate(-20px,-20px)",
    width: 40,
    height: 40,
    borderColor: "#282",
    borderRadius: 3,
    borderWidth: 2,
    borderStyle: "solid",
    backgroundColor: "#5d5",
    fontSize: "16px",
    fontWeight: "bold"
});

const adjustPosX = -20;
const adjustPosY = -20;

declare module "bobril" {
    interface IHookableEvents {
        onWasDropped?(dnd: b.IDndCtx): GenericEventResult;
    }
}

function Dragable(this: b.IBobrilCtx, { sx, sy, name }: { sx: number; sy: number; name: string }) {
    const x = b.useState(sx);
    const y = b.useState(sy);
    const me = this.me;
    b.useEvents({
        onDragStart(dnd: b.IDndStartCtx) {
            dnd.addData("me", me);
            dnd.enabledOperations = b.DndEnabledOps.Move;
            dnd.setDragNodeView(dnd => {
                return (
                    <div style={[draggableStyle, { opacity: 0.5, left: adjustPosX, top: adjustPosY }]}>
                        <div>{name}</div>
                        <div style={{ fontSize: "6px" }}>
                            {dnd.x.toFixed(0)},{dnd.y.toFixed(0)}
                        </div>
                    </div>
                );
            });
            return true;
        },
        onDragOver(dnd: b.IDndOverCtx) {
            if (!dnd.hasData("me")) return b.EventResult.NotHandled;
            if (dnd.getData("me") === me) {
                dnd.setOperation(b.DndOp.Move);
                return b.EventResult.HandledPreventDefault;
            } else {
                return b.EventResult.HandledButRunDefault;
            }
        },
        onWasDropped(dnd: b.IDndCtx) {
            x(dnd.x + adjustPosX);
            y(dnd.y + adjustPosY);
            return true;
        }
    });
    return <div style={[draggableStyle, { left: x(), top: y() }]}>{name}</div>;
}

function Cursor({ sx, sy, w, h }: { sx: number; sy: number; w: number; h: number }) {
    return (
        <div
            onDragOver={() => b.EventResult.HandledButRunDefault}
            style={{
                position: "absolute",
                width: w,
                height: h,
                left: sx,
                top: sy,
                cursor: "help",
                backgroundColor: "rgba(128,128,128,0.2)"
            }}
        ></div>
    );
}

function Canvas({ children }: { children?: b.IBobrilChildren }) {
    b.useEvents({
        onDragOver(dnd: b.IDndOverCtx) {
            if (!dnd.hasData("me")) return false;
            dnd.setOperation(b.DndOp.Move);
            return true;
        },
        onDrop(this: b.IBobrilCtx, dnd: b.IDndCtx) {
            [dnd.x, dnd.y] = b.convertPointFromClientToNode(this.me, dnd.x, dnd.y);
            return b.bubble(dnd.getData("me"), "onWasDropped", dnd) != undefined;
        }
    });
    return (
        <div
            style={{
                touchAction: "none",
                position: "relative",
                width: "100%",
                height: "300px",
                backgroundColor: "rgba(128,128,128,0.2)"
            }}
        >
            {children}
        </div>
    );
}

export function run() {
    return (
        <Canvas>
            <Cursor sx={200} sy={20} w={60} h={100}></Cursor>
            <Dragable sx={60} sy={40} name="A"></Dragable>
            <Dragable sx={120} sy={40} name="B"></Dragable>
            <Dragable sx={60} sy={100} name="C"></Dragable>
            <Dragable sx={120} sy={100} name="D"></Dragable>
        </Canvas>
    );
}
