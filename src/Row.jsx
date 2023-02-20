import "./Row.css"
import Pixel from "./Pixel"
function Row({ width, selectedColor }){

    function getPixel(){
        let pixels = [];
        for (let i = 0; i < width; i++) {
            pixels.push(<Pixel key={i} selectedColor={selectedColor} />);
        }
        return pixels;
    }

    return(
        <div className="row">
            {getPixel()}
        </div>
    )
}

export default Row;