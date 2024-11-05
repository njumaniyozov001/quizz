import tg from '/assets/tg.svg'
import insta from '/assets/insta.svg'
import github from '/assets/github.svg'
function Footer() {
  return (
    <div className="absolute bottom-0 z-10 w-full sm:h-[15vh] box-border bg-stone-500 flex items-center justify-around">
        <h1 className='text-center sm:text-[26px] text-[16px] sm:leading-7 leading-5 font-sans'> 
           contact <br /> 8022
        </h1>
        <ul className='flex gap-1'>
            <li><a href="https://t.me/njumaniyozov"><img src={tg} className='sm:w-14 w-9 sm:hover:scale-[1.03] active:sclale-110 transition-transform' /></a></li>
            <li><a href="https://instagram.com/njumaniyozov007"><img src={insta} className='sm:w-14 w-9 sm:hover:scale-[1.03] active:sclale-110 transition-transform '/></a></li>
            <li><a href="https://github.com/njumaniyozov001"><img src={github} className='sm:w-14 w-9 sm:hover:scale-[1.03] active:sclale-110 transition-transform' /></a></li>
        </ul>

    </div>
  )
}

export default Footer