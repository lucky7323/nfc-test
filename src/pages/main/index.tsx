import { useState } from "react";
import tw from "twin.macro";

const MainPage = () => {
  const [result, setResult] = useState("");

  const handleNfcReading = async () => {
    if (typeof NDEFReader === "undefined") {
      alert("NFC is not supported in this browser.");
      return;
    }

    try {
      console.log("start");
      const ndef = new NDEFReader();
      await ndef.scan();
      console.log("------");

      ndef.addEventListener("readingerror", () => {
        console.log(
          "Argh! Cannot read data from the NFC tag. Try another one?"
        );
        setResult("error");
      });

      ndef.addEventListener("reading", (event: any) => {
        const { message, serialNumber } = event;
        console.log(`> Serial Number: ${serialNumber}`);
        console.log(`> Records: (${message.records.length})`);

        setResult(serialNumber);
      });
    } catch (error) {
      console.error("Error while scanning NFC:", error);
    }
  };

  return (
    <Wrapper>
      <Nfc onClick={handleNfcReading}>'NFC'</Nfc>
      <Result>{result}</Result>
    </Wrapper>
  );
};

const Wrapper = tw.div``;
const Nfc = tw.button`
`;
const Result = tw.div`
`;

export default MainPage;
