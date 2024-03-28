import React, { useRef, useEffect ,useState} from 'react';
import Quagga from 'quagga';
import { useNavigate } from 'react-router-dom';

const QRCodeScanner = ({scanned,setscanned}) => {
  const videoRef = useRef(null);
  const [hi,sethi]=useState([])
  const navigate=useNavigate()

  useEffect(() => {
    Quagga.init({
      inputStream : {
          name : "Live",
          type : "LiveStream",
          constraints: {
            width:  600,
            height: 600,
            facingMode: "environment"
          },
          area: {
             top: "0%",
             right: "0%",
             left: "0%",
             bottom: "0%"
         },
        target: document.querySelector('#scanner')
      },
      locator: {
        patchSize: "medium",
        halfSample: true
      },
      numOfWorkers: (navigator.hardwareConcurrency ? navigator.hardwareConcurrency : 4),
      decoder : {
       readers: [ "code_128_reader",
                  "ean_reader",
                  "ean_8_reader",
                  "code_39_reader",
                  "code_39_vin_reader",
                  "codabar_reader",
                  "upc_reader",
                  "upc_e_reader",
                  "i2of5_reader" ],
      },
      locate: true
    }, function(err) {
        if (err) {
            console.error("ERRORINFO: SetUp von QuaggaJS");
            console.error(err);
            return
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start();
    });
  }, []);

   Quagga.onDetected((data) => {
    //data.codeResult.code
      const codes=["IGT 34","IGT 33","IGT 32","IGT 31","IGT 12","IGT 11","IGT 10","IGT 08","IGT 07","IGT 06","IGT 04","IGT 03","IGT 02","IGT 01"]
   console.log(data)
      for(let i=0;i<codes.length;i++){
    if(data.codeResult.code===codes[i]){
      setscanned([data.codeResult.code])
      Quagga.stop();
    }
   }
    });


  return (
    <div>
      <div id="interactive" className="viewport" ref={videoRef}></div>
    </div>
  );
};

export default QRCodeScanner;