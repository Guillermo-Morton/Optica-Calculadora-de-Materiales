import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [esferico, setEsferico]= useState('')
  const [cilindrico, setCilindrico]= useState('')
  const [esfericoValor, setEsfericoValor]= useState(true)
  const [cilindricoValor, setCilindricoValor]= useState(true)
  const [resultado, setResultado]= useState(0)

  const handleSubmit = (e,esferico, cilindrico)=>{
    e.preventDefault()
    setResultado(`ESF ${esferico + cilindrico} con CIL ${-cilindrico> 0 ? '+'+-cilindrico: -cilindrico }`)
  }
  const handleChange = (value, state, valor) => {
    state(!valor ? (value<0 ? value : -value ): value)
  }
  useEffect(()=>{
    setEsferico(!esfericoValor ? (esferico<0 ? esferico : -esferico ) : esfericoValor ? (esferico>0 ? esferico : -esferico) : null)
  },[esfericoValor])
  useEffect(()=>{
    setCilindrico(!cilindricoValor ? (cilindrico<0 ? cilindrico : -cilindrico ) : cilindricoValor ? (cilindrico>0 ? cilindrico : -cilindrico) : null)
  },[cilindricoValor])
  return (
    <div className='container my-4 d-flex justify-content-center align-items-center flex-column'>
      <form onSubmit={(e)=>handleSubmit(e,esferico, cilindrico)}>
        <div className='my-2'>
          <div>
            <button onClick={()=> setEsfericoValor(true)} className={`btn btn-success py-1 ${esfericoValor ? 'disabled':''}`}>Positivo</button>
            <button onClick={()=> setEsfericoValor(false)} className={`btn btn-danger py-1 ${esfericoValor ? '':'disabled'}`}>Negativo</button>
          </div>
          <div className='d-flex flex-column'>
          <label>Esferico</label>
          <input className='' type="number" placeholder='Ingresa una graduacion' onChange={e=> handleChange(parseFloat(e.target.value),setEsferico, esfericoValor)} value={esferico} name="" id="" />
          </div>
        </div>
        <span>+</span>
        <div className='my-2'>
          <div>
            <button onClick={()=> setCilindricoValor(true)} className={`btn btn-success py-1 ${cilindricoValor ? 'disabled':''}`}>Positivo</button>
            <button onClick={()=> setCilindricoValor(false)} className={`btn btn-danger py-1 ${cilindricoValor ? '':'disabled'}`}>Negativo</button>
          </div>
          <div className='d-flex flex-column'>
          <label>Cilindrico</label>
          <input className='' type="number" placeholder='Ingresa una graduacion' onChange={e=> handleChange(parseFloat(e.target.value),setCilindrico, cilindricoValor)} value={cilindrico} name="" id="" />
          </div>
        </div>
      <button className='btn btn-primary mt-3'>Operar</button>
      </form>
      <p>{`Resultado: ${resultado}`}</p>
    </div>
  );
}

export default App;
