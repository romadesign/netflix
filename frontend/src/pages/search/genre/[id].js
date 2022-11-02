
import axios from 'axios'

const searchGenre = ({filmsGenre}) => {
    console.log(filmsGenre)
  return (
   <div>sad</div>
  )
}

export const getServerSideProps = async context => {
    const { data: filmsGenre } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/filmsgenre/` + context.query.id,
    )
    return {
      props: {
        filmsGenre,
      },
    }
  }


// export const getServerSideProps = async context => {

//     const { data: filmsGenreandCategory } = await axios.get(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/filmsgenre/` + context.query.id,
//       )
//       return {
//         props: {
//             filmsGenreandCategory,
//         },
//       }
//   }


export default searchGenre
