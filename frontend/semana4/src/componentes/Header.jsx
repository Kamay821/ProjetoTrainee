import logo from '/icone.png'

export default function Header() {
    return (
        <header className='bg-orange-500 px-4 py-3 flex items-center gap-4'>
            <img src={logo} alt="Logo" className='w-20 h-20' />
            <h1 className='text-white text-4xl font-bold'>Equipe Serra Jr</h1>
        </header>
    )
}