import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import AssetTable from "./AssetTable";
import StockChart from "./StockChart";
import { DotIcon, MessageCircle } from "lucide-react";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { getAllCoinsList, getTop50CoinsList } from "../State/CoinList/CoinAction";
import store from "../State/Store";

const Home = () => {
  const [category, setCategory] = useState("All");
  const [isBotOpen, setIsBotOpen] = useState(false);
  const [prompt, setPrompt] = useState("");

  const {coin}=useSelector(store=>store)

  const dispatch=useDispatch();
  
  // Array to determine number of question-answer pairs
  const chatMessages = [1, 1, 1, 1]; // This will create 4 question-answer pairs
  
  // Sample questions and answers
  const questions = [
    "Hello, who are you?",
    "What's the current market trend?",
    "Which stocks should I invest in?",
    "How do I analyze financial data??"
  ];

  
  
  const answers = [
    "I am an AI assistant here to help you with trading and financial questions.",
    "The market is showing mixed signals with some sectors performing well.",
    "Consider diversifying your portfolio with blue-chip stocks and growth stocks.",
    "You can use technical indicators, fundamental analysis, and market research."
  ];

  const handleCategory = (category) => {
    setCategory(category);
  };

  const handleBotOpen = () => {
    setIsBotOpen(!isBotOpen);
  }

  const handlePrompt = (e) => {
    setPrompt(e.target.value);
  }

  const handleSend = (e) => {
    console.log(prompt);
    setPrompt("");
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      console.log(prompt);
      setPrompt("");
    }
  }

  useEffect(()=>{
      dispatch(getTop50CoinsList());
  },[category])

  useEffect(()=>{
    dispatch(getAllCoinsList(1))
  },[])

  return (
    <div className="relative">
      <div className="lg:flex">
        <div className="lg:w-[55%] lg:border-r border-gray-800">
          <div className="p-2 border-b flex items-center gap-2">
            <Button
              onClick={() => handleCategory("All")}
              variant={category == "All" ? "default" : "outline"}
              className="px-3 py-2 rounded-full"
            >
              All
            </Button>

            <Button
              onClick={() => handleCategory("Top 50")}
              variant={category == "Top 50" ? "default" : "outline"}
              className="px-3 py-2 rounded-full"
            >
              Top 50
            </Button>

            <Button
              onClick={() => handleCategory("Top Gainers")}
              variant={category == "Top Gainers" ? "default" : "outline"}
              className="px-3 py-2 rounded-full"
            >
              Top Gainers
            </Button>

            <Button
              onClick={() => handleCategory("Top Losers")}
              variant={category == "Top Losers" ? "default" : "outline"}
              className="px-3 py-2 rounded-full"
            >
              Top Losers
            </Button>
          </div>
      <AssetTable coin={category==="All"? coin.coinsList : coin.top50Coins} category={category} ></AssetTable>

        </div>
        <div className="lg:w-[45%] lg:block hidden">
          <div className="p-4 ">
            <StockChart coinId="bitcoin"></StockChart>
            <div className="flex items-center gap-2 mt-4">
              <div>
                <Avatar>
                  <AvatarImage src="https://m.media-amazon.com/images/I/61Iw4aixZ1L._SX300_SY300_QL70_FMwebp_.jpg"></AvatarImage>
                </Avatar>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p>BTC</p>
                  <DotIcon className="text-gray-500"></DotIcon>
                  <p className="text-gray-500">Bitcoin</p>
                </div>
                <div className="flex items-end gap-2">
                  <p className="text-xl font-bold">5465</p>
                  <p className="text-red-600">
                    <span>-105835.641</span>
                    <span>(-1.23%)</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Chat Bot Section */}
      <section className="fixed bottom-4 right-4 flex flex-col items-end gap-2 z-50">
        {isBotOpen && (
          <div className="rounded-md bg-slate-900 w-[20rem] h-[70vh] flex flex-col">
              <div className="flex items-center justify-between p-3 border-b border-slate-700">
                <p className="text-white font-semibold">Chat Bot</p>
                <Button onClick={handleBotOpen} size="icon" variant="ghost" className="hover:bg-slate-800">
                  <Cross1Icon className="text-white"></Cross1Icon>
                </Button>
              </div>
              <div className="flex-1 p-3 overflow-y-auto flex flex-col gap-3">
                {/* Chat messages generated from array */}
                {chatMessages.map((_, index) => (
                  <React.Fragment key={index}>
                    {/* Bot message (question) */}
                    <div className="flex justify-end">
                      <div className="max-w-[75%] px-3 py-2 rounded-lg bg-slate-800">
                        <p className="text-white text-sm">{questions[index]}</p>
                      </div>
                    </div>
                    
                    {/* User message (answer) */}
                    <div className="flex justify-start">
                      <div className="max-w-[75%] px-3 py-2 rounded-lg bg-blue-600">
                        <p className="text-white text-sm">{answers[index]}</p>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
              <div className="p-3 border-t border-slate-700">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={prompt}
                    onChange={handlePrompt}
                    onKeyDown={handleKeyPress}
                    placeholder="Type message..."
                    className="flex-1 bg-slate-800 text-white placeholder-slate-400 border border-slate-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={handleSend}>
                    Send
                  </Button>
                </div>
              </div>
             
          </div>
          )}

          <Button onClick={handleBotOpen} className="flex items-center gap-2 w-[8rem] h-[3rem] cursor-pointer group">
            <MessageCircle className="fill-[#1e293b] -rotate-90 group-hover:fill-[#1a1a1a]"></MessageCircle>
            <span className="text-xl">Chat Bot</span>
          </Button>
      </section>
    </div>
  );
};

export default Home;
