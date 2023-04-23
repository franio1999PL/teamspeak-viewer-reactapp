import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient()

export default function App () {
  const [onlineNumber, setOnlineNumber] = useState(0)
  const [data, setData] = useState(null)

  // useEffect(() => {
  //   const fetchData = () => {
  //     axios
  //       .get('https://api.gots.lol/users')
  //       .then(response => {
  //         setData(response.data)
  //         setOnlineNumber(response.data.TeamspeakServer.Online)
  //       })
  //       .catch(error => {
  //         console.log(error)
  //       })
  //   }

  //   // Pobranie danych z API na początku
  //   fetchData()

  //   // Aktualizacja danych co 5 sekund
  //   const intervalId = setInterval(() => {
  //     fetchData()
  //   }, 5000)

  //   // Czyszczenie interwału po zakończeniu efektu
  //   return () => clearInterval(intervalId)
  // }, [])

  // console.log(data)

  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  )
}

function Example () {
  const { isLoading, error, data, isFetching } = useQuery('repoData', () =>
    axios.get('https://api.gots.lol/users').then(res => res.data)
  )

  if (isLoading) return 'Loading...'

  if (error) return `Błąd podczas wczytywania danych! msg: ${error.message}`

  return (
    <>
      <div className='flex justify-center items-center h-screen'>
        <div className='flex-col items-center justify-center justify-items-center bg-red-900 px-8 py-16 rounded-xl shadow-lg'>
          <div className='flex justify-center items-center gap-2 mb-4'>
            <span className='bg-red-400 text-white px-4 py-2 rounded-full font-bold text-center'>
              {data && data.TeamspeakServer.Online}
            </span>
          </div>
          <div className='flex-col justify-center items-center  font-bold text-center'>
            <span className='text-yellow-200 uppercase text-xl'>
              Użytkownicy online:
            </span>
            <div>{isFetching ? 'Updating...' : ''}</div>
            {data &&
              data.TeamspeakServer &&
              data.TeamspeakServer.clientNicknames.map(user => (
                <p className='text-white text-md' key={user}>
                  {user}
                </p>
              ))}
            <ReactQueryDevtools initialIsOpen />
          </div>
        </div>
      </div>
    </>
  )
}
