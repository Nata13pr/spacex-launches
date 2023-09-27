import { IUser } from "../models/models";

interface Props {
  launches:IUser[];
  handlerOnClick:(item:string)=>void;
  toggleModal:()=>void;
}

const LaunchList =({launches,handlerOnClick,toggleModal}:Props)=>{


return (
    <ul>
    {launches.map((launch) => {
            const date = new Date(launch.date_unix);
    
            return (
              <ul key={launch.id}>
                <li onClick={() => handlerOnClick(launch.name)}>
                  <div onClick={toggleModal}>   
                  <img
                    src={launch.links.patch.small}
                    alt={launch.name}
                  />
                  <div>Name: {launch.name}</div>
                  <div>Flight Number: {launch.flight_number}</div>
                  <div>Data: {date.toLocaleDateString()}</div></div>
               
                </li>
              </ul>
            );
          })}
        </ul>
    )

}


export default LaunchList;