import { Grid, Toolbar } from '@dhx/trial-suite';
import '@dhx/trial-suite/codebase/suite.min.css';
import { useEffect, useRef, useState } from "react";

// eslint-disable-next-line react/prop-types
const GridComponent = () => {
    const gNode = useRef(null);
    let [grid, setGrid] = useState(null);
    
    const tNode = useRef(null);
    let [toolbar, setToolbar] = useState(null);

    useEffect(() => {

        const grid = new Grid(gNode.current, {
            columns: [
                { width: 250, id: "name", header: [{ text: "Name" }] },
                { autoWidth: true, id: "age", header: [{ text: "Age" }] }
            ],
            editable: true,
            selection: "complex",
            keyNavigation: true
        });
        grid.data.load("http://127.0.0.1:3000/api/users/")

        const toolbar = new Toolbar(tNode.current, {
            css: "dhx_widget--bordered",
            data: [
                {
                    "id": "add",
                    "type": "button",
                    "value": "add record",
                    "color": "secondary",
                },
                {
                    "id": "remove",
                    "type": "button",
                    "value": "remove record",
                    "color": "secondary",
                },
                {
                    "id": "save",
                    "type": "button",
                    "value": "save data",
                    "view": "link",
                }
            ]
        });
        toolbar.events.on("click", (id) => {
            switch (id) {
                case "save":
                    grid.data.save("http://127.0.0.1:3000/api/users/")
                    break;
                case "add":
                    grid.data.add({})
                    break;
                case "remove":
                    let cell = grid.selection.getCell()
                    if (cell) grid.data.remove(cell.row.id)
                    break;
            }
        })

        setToolbar(toolbar);
        setGrid(grid);

        return () => {
            grid.destructor();
            toolbar.destructor();
        }
    }, []);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <div ref={tNode} style={{ width: "400px" }}></div>
            <div ref={gNode} style={{ width: "400px", height: "400px", }}></div>
        </div>

    );
};

export default GridComponent;