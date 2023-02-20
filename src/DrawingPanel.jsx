import { useRef } from "react";
import Row from "./Row";
import "./DrawingPanel.css"

function DrawingPanel ({ width, height, selectedColor }){

    const panelRef = useRef()

    function getRows(){
        let rows = []

        for (let i = 0; i < height; i++) {
            rows.push(<Row key={i} width={width} selectedColor={selectedColor} />);
        }

        return rows;
    }

    return(
        <div className="drawingPanel">
            <div ref={panelRef} className="pixels">
                {getRows()}
            </div>
        </div>
    )
}

export default DrawingPanel;