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
                { autoWidth: true, id: "age", type:"number", header: [{ text: "Age"}] },
                {
                    id: "delete", width: 50, header: [{ text: "", align: "center" }],
                    htmlEnable: true,
                    align: "center",
                    editable: false,
                    template: function () {
                        return "<i class='dxi dxi-delete remove-button'>"
                    }
                }  
            ],
            editable: true,
            selection: "complex",
            keyNavigation: true,
            eventHandlers: {
                onclick: {
                    "remove-button": function (e, data) {
                        grid.data.remove(data.row.id);
                    }
                }
            }
        });
        grid.data.load("http://127.0.0.1:3000/api/users/")

        const toolbar = new Toolbar(tNode.current, {
            css: "dhx_widget--bordered",
            data: [
                {
                    "id": "add",
                    "type": "button",
                    "value": "new record",
                    "color": "secondary",
                    "icon": "dxi dxi-plus"
                },
                {
                    "type": "spacer"
                },
                {
                    "id": "save",
                    "type": "button",
                    "value": "save changes",
                    "view": "link",
                    "icon": "dxi dxi-content-save"
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