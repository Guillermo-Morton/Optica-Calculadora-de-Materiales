import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable, { createTheme } from 'react-data-table-component'

function App() {
  const [esferico, setEsferico]= useState('')
  const [cilindrico, setCilindrico]= useState('')
  const [esfericoValor, setEsfericoValor]= useState(true)
  const [cilindricoValor, setCilindricoValor]= useState(true)
  const [resultado, setResultado]= useState(0)
  const [filtrados, setFiltrados]= useState([])
  const columnas= [
    {
      name: 'NOMBRE',
      selector: 'nombre',
      sortable: true,
      width: '24%'
    },
    {
      name: 'PRECIO',
      selector: 'precio',
      sortable: true,
      width: '24%'
    },
    {
      name: 'ESFERICO',
      selector: 'esferico',
      sortable: true,
      width: '24%'
    },
    {
      name: 'CILINDRICO',
      selector: 'cilindrico',
      sortable: true,
      width: '24%'
    }
  ]
  const materiales= [
    {
      nombre: 'ORGANICO BLANCO',
      precio: '$1200 /$1500',
      esferico: -6,
      cilindrico: 2 ,
      maxDioptrias:6
    },
    {
      nombre: 'ORGANICO ANTIRREFLEJO',
      precio: '$1600 / $1800',
      esferico: -6,
      cilindrico: 2 ,
      maxDioptrias:6
    },
    {
      nombre: 'ORGANICO CONTROL BLUE',
      precio: '$1800 / $2200',
      esferico: -6,
      cilindrico: 2 ,
      maxDioptrias:6
    },
    {
      nombre: 'POLICARBONATO BLANCO',
      precio: '$1800',
      esferico: -6,
      cilindrico: 2 ,
      maxDioptrias:6
    },
    {
      nombre: 'POLICARBONATO CONTROL BLUE',
      precio: '$5000',
      esferico: -6,
      cilindrico: 2 ,
      maxDioptrias:6
    },
    {
      nombre: 'POLICARBONATO CON ANTIRREFLEJO',
      precio: '$1800 / $2200',
      esferico: -6,
      cilindrico: 2 ,
      maxDioptrias:6
    },
    {
      nombre: 'AMPLITUD HD',
      precio: '$3500 / $4000',
      esferico: -6,
      cilindrico: 2 ,
      maxDioptrias:6
    },
    {
      nombre: 'AMPLITUDE HD BLUE',
      precio: '$4500 / $5000',
      esferico: -6,
      cilindrico: 2 ,
      maxDioptrias:6
    },
    {
      nombre: 'AMPLITIDE HD DUAL BLUE',
      precio: '$6000 / $5500',
      esferico: -6,
      cilindrico: 2 ,
      maxDioptrias:6
    },
    {
      nombre: 'FOTOCROMATICO CON ANTIRREFLEJO',
      precio: '$4500 / $5000',
      esferico: -4,
      cilindrico: 2 ,
      maxDioptrias:6
    },
    {
      nombre: 'MINERAL BLANCO',
      precio: '$1500 / $1800',
      esferico: -6,
      cilindrico: 2 ,
      maxDioptrias:6
    },
    {
      nombre: 'MINERAL FOTOCROMATICO',
      precio: '$5000',
      esferico: -6,
      cilindrico: 2 ,
      maxDioptrias:6
    },
  ]
  const handleFilter = (esferico, cilindrico) =>{
    setFiltrados(materiales.filter(material=> (esferico>=material.esferico && esferico <= 4 ? true : false) && (cilindrico <= material.cilindrico && cilindrico >= -2 ? true : false))) 
  }
  const handleSubmit = (e,esferico, cilindrico)=>{
    e.preventDefault()
    setResultado(`ESF ${esferico + cilindrico} con CIL ${-cilindrico> 0 ? '+'+-cilindrico: -cilindrico }`)
    handleFilter(esferico + cilindrico, -cilindrico> 0 ? +-cilindrico : -cilindrico )
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
      <DataTable
            noHeader
            pagination
            selectableRows
            columns={columnas}
            className='react-dataTable'
            // sortIcon={<ChevronDown size={10} />}
            // paginationDefaultPage={currentPage + 1}
            // paginationComponent={CustomPagination}
            paginationPerPage={4}
            data={filtrados}
            // selectableRowsComponent={BootstrapCheckbox}
            // theme="solarized"
            // customStyles={customStyles}
            // onSelectedRowsChange={handleChange}
            // clearSelectedRows={checked}
          />
    </div>
  );
}

export default App;
