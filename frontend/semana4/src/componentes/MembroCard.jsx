import React, {  useState } from "react";
import { motion } from "framer-motion";

export default function MembroCard({ titulo, nome, idade, curso}) {
    const [editando, setEditando] = useState(false);
    const [nomeAtual, setNomeAtual] = useState(nome);
    const [idadeAtual, setIdadeAtual] = useState(idade);
    const [cursoAtual, setCursoAtual] = useState(curso);

    const imagemUrl = `https://picsum.photos/200/150?random=${Math.floor(Math.random() * 1000)}`;

    const handleSalvar = () => {
        setEditando(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSalvar();
        }
    };


    return (
        <motion.div 
            className="bg-[#001830] rounded-2xl w-[336px] h-[309px] text-white p-6 flex flex-col items-center text-center relative shadow-lg"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut"}}
        >
            <div className="absolute w-[187px] h-[64px] -top-7 bg-orange-500 text-white font-bold px-6 py-4 rounded-4xl text-lg shadow-md flex items-center justify-center">
                {titulo}
                <img
        src={imagemUrl}
        alt="Imagem aleatória"
        className="rounded-xl px-2 mt-5 mb-4 w-[100px] h-[50px] object-cover shadow-md"
      />
            </div>

            <div className="mt-15 space-y-3 text-lg">
                {editando ? (
                    <>
                        <div>
                            <label className="block text-sm font-semibold mb-1" htmlFor="nome">
                                Nome:
                            </label>
                            <input
                                id="nome"
                                type="text"
                                value={nomeAtual}
                                onChange={(e) => setNomeAtual(e.target.value)}
                                onKeyDown={handleKeyPress}
                                className="text-white rounded-md px-2 py-1 w-full"
                                autoFocus
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-1" htmlFor="idade">
                                Idade:
                            </label>
                            <input
                                id="idade"
                                type="number"
                                value={idadeAtual}
                                onChange={(e) => setIdadeAtual(e.target.value)}
                                onKeyDown={handleKeyPress}
                                className="text-white rounded-md px-2 py-1 w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-1" htmlFor="curso">
                                Curso:
                            </label>
                            <input
                                id="curso"
                                type="text"
                                value={cursoAtual}
                                onChange={(e) => setCursoAtual(e.target.value)}
                                onKeyDown={handleKeyPress}
                                className="text-white rounded-md px-2 py-1 w-full"
                            />
                        </div>
                        <button
                            onClick={handleSalvar}
                            className="mt-3 text-xs bg-white text-orange-500 px-4 py-2 rounded font-bold hover:bg-orange-100"
                        >
                            Salvar
                        </button>
                    </>
                ) : (
                    <>
                        <p>
                            <strong>Nome:</strong> {nomeAtual}
                        </p>
                        <p>
                            <strong>Idade:</strong> {idadeAtual}
                        </p>
                        <p>
                            <strong>Curso:</strong> {cursoAtual}
                        </p>
                        <button
                            onClick={() => setEditando(true)}
                            className="mt-4 text-xs bg-orange-500 px-4 py-2 rounded font-bold hover:bg-orange-600"
                        >
                            Editar
                        </button>
                    </>
                )}
            </div>

        </motion.div>
    );
}