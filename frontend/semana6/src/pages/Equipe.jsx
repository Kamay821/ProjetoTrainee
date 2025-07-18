import React from "react";
import Header from '../components/Header'
import MembroCard from '../components/MembroCard'
import Footer from '../components/Footer'

export default function App() {
    return (
        <div className="min-h-screen flex flex-col justify-between">
            <Header />
            <main className="flex flex-col items-center gap-8 py-12 md:flex-row md:justify-center">
                <MembroCard titulo="Membro 1" nome="Carlos" idade="21" curso="Eng. de Computação" />
                <MembroCard titulo="Membro 2" nome="Fulano" idade="20" curso="Eng. de Computação" />
                <MembroCard titulo="Membro 3" nome="Ciclano" idade="19" curso="Eng. Mecânica" />
            </main>
            <Footer />
        </div>
    )
}