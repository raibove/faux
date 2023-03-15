import { useRef } from "react";
import Row from "./Row";
import "./DrawingPanel.css";
import axios from "axios";
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import { Buffer } from 'buffer';
// import AWS from 'aws-sdk';

// const s3 = new AWS.S3({
//     credentials: new AWS.Credentials({
//         accessKeyId: process.env.LINODE_OBJECT_STORAGE_ACCESS_KEY_ID,
//         secretAccessKey: process.env.LINODE_OBJECT_STORAGE_SECRET_ACCESS_KEY,
//     }),
//     endpoint: process.env.LINODE_OBJECT_STORAGE_ENDPOINT,
//     region:'us-southeast-1',
//     sslEnabled: true,
//     s3ForcePathStyle: false,
// });

function saveAsImage(bucketName, dataUrl, fileName) {
    const data = dataUrl.split(',')[1];
    const buffer = Buffer.from(data, 'base64');
  
    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: buffer,
      ContentType: 'image/png', // or the appropriate content type for your file
      ACL: 'public-read',
    };
  
    return s3.upload(params).promise();
}

function DrawingPanel ({ width, height, selectedColor }){

    const panelRef = useRef()

    function getRows(){
        let rows = []

        for (let i = 0; i < height; i++) {
            rows.push(<Row key={i} width={width} selectedColor={selectedColor} />);
        }

        return rows;
    }

    
    function handleSaveAsImage() {
            console.log("in")

            htmlToImage.toCanvas(panelRef.current).then((canvas) => {
            console.log("in")

            const dataUrl = canvas.toDataURL('image/png');
            const fileName = 'my-image.png';
            const bucketName = 'faux';
            const data = dataUrl.split(',')[1];
            console.log(dataUrl)
            console.log(data)
            const buffer = Buffer.from(data, 'base64');
            console.log("in")
            axios.post("http://localhost:3000/api/upload-image", {
                fileName:'abcde.png',
                buffer: data
            })
            // saveAsImage(bucketName, dataUrl, fileName)
            //     .then((data) => console.log('Object uploaded:', data.Location))
            //     .catch((err) => console.error('Error uploading object:', err));
            });
    }

    return(
        <div className="drawingPanel">
            <div ref={panelRef} className="pixels">
                {getRows()}
            </div>
            <div>
                <button className="button" onClick={handleSaveAsImage}>
                    Save
                </button>
            </div>
        </div>
    )
}

export default DrawingPanel;