import Head from 'next/head';
import useSWR from 'swr'
import dayjs from 'dayjs'
import TodoForm from 'components/TodoForm';



const fetcher = (url) => fetch(url).then((res) => res.json())

const tableRowItem = function (item) {
  return (
    <tr>
      <td>{item.id}</td>
      <td>{item.title}</td>
      <td>{item.description}</td>
      <td>{dayjs(item.createdAt).format('DD/MM/YYYY HH:mm')}</td>
      <td>{item.done ? 'Sim' : 'Não'}</td>
      <td>{item.finishedAt}</td>
    </tr>
  )
}

export default function Home() {

  const { data, error } = useSWR('/api/todos', fetcher, { refreshInterval: 1000 })

  if (error) return <div>Failed to Load</div>
  if (!data) return <div>Loading...</div>


  return (
    <div>
      <Head>
        <title>To-Do</title>
        <meta name="description" content="To-Do NextJS" />
      </Head>

      <TodoForm />

      <table>
        <thead>

          <tr>
            <th>Id</th>
            <th>Título</th>
            <th>Descrição</th>
            <th>Criado em</th>
            <th>Finalizado</th>
            <th>Finalizado em</th>
          </tr>

        </thead>

        <tbody>
          {data.map((item) => tableRowItem(item))}
        </tbody>
      </table>
    </div>
  )
}
