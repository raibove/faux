import { useState } from "react";
import {CirclePicker} from "react-color";
import DrawingPanel from "./DrawingPanel";
function Editor(){
    const [panelWidth, setPanelWidth] = useState(16);
    const [panelHeight, setPanelHeight] = useState(16);
    
    const [selectedColor, setColor] = useState("#f44336");

    function changeColor(color) {
        setColor(color.hex);
    }

    return(
        <div>
            <CirclePicker color={selectedColor} onChangeComplete={changeColor} />
            <DrawingPanel
                width={panelWidth}
                height={panelHeight}
                selectedColor={selectedColor}
            />
        </div>
    )
}

export default Editor;
