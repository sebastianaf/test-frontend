import './App.css';
import { useEffect, useState, useMemo } from 'react';
import DataTable from 'react-data-table-component';



function App() {

  const [tableData, setTableData] = useState()
  const [tableFields, setTableFields] = useState([])
  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  useEffect(() => {
    const contry = async () => {
      try {
        var req = {
          //headers,
          method: 'GET'
        }
        const res = await (await fetch(`localhost:4000/country`, req)).json()
        //console.log(res)
        return res
      } catch (error) {
        return { error: "Connection error" }
      }
    }
    const data = contry()
    setTableData(data.data[0])
    setTableFields(data.fields[0])
  }, [])

  const filteredItems = tableData ? tableData.filter(item =>
    (item.name && item.name.toLowerCase().includes(filterText.toLowerCase()))
  ) : []


  const subHeaderComponentMemo = useMemo(() => {

    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle)
        setFilterText('')
      }
    }
    return (
      <>


      </>
    )
  }, [filterText, tableFields]);

  return (
    <>
      <DataTable
        title="Control de ingreso"
        columns={tableFields.map(valor => {
          return {
            name: valor.name,
            selector: valor.name,
            sortable: true,
            minWidth: "200px"
          }
        })}
        data={filteredItems}
        paginationResetDefaultPage={resetPaginationToggle}
        subHeaderComponent={subHeaderComponentMemo}

        defaultSortField={'id'}
        defaultSortAsc={false}

        pagination
        subHeader


        dense

        selectableRowsHighlight
        persistTableHead
        striped
        highlightOnHover
        noDataComponent="No hay registros para mostrar"
        responsive

        paginationComponentOptions={{
          rowsPerPageText: 'Registros por página:',
          rangeSeparatorText: 'de',
          noRowsPerPage: false,
          selectAllRowsItem: false,
          selectAllRowsItemText: 'Todas'
        }}
        contextMessage={{
          singular: '',
          plural: '',
          message: 'seleccionado(s)'
        }}
      />

    </>
  )




}

export default App;
