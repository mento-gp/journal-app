import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import JournalContainer from "./components/JournalContainer";

export default function App() {
    return (
        <div>
            <Header />
            <JournalContainer />
            <Footer />
        </div>
    );
}
