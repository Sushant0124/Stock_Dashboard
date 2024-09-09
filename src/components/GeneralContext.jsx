import React, { useState } from "react";
import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";

const GeneralContext = React.createContext({
  openBuyWindow:(uid) => {},
  closeBuyWindow: () => {},
  openSellWindow:(uid)=>{},
  closeSellWindow: () => {}
});

export const GeneralContextProvider = (props) => {
 
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [isSellWindowOpen, setIsSellWindowOpen] = useState(false);
 // const [selectedStockUID, setSelectedStockUID] = useState("");

  const handleOpenBuyWindow = (uid) => {
    console.log("Opening buy window for:", uid);
    setIsBuyWindowOpen(true);
    setSelectedStockUID(uid);
    console.log("isBuyWindowOpen:", true, "selectedStockUID:", uid);
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
  };
  const handleOpenSellWindow = (uid) => {
    console.log("Opening Sell window for:", uid);
    setIsSellWindowOpen(true);
    setSelectedStockUID(uid);
    console.log("isSellWindowOpen:", true, "selectedStockUID:", uid);
  };
  const handleCloseSellWindow = () => {
    setIsSellWindowOpen(false);
    setSelectedStockUID("");
  };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
        openSellWindow:handleOpenSellWindow,
        closeSellWindow: handleCloseSellWindow
      }}
    >
      {props.children}
      {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUID} />}
      {isSellWindowOpen && <SellActionWindow uid={selectedStockUID} />}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
