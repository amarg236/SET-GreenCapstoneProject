// import React, { Component } from "react";

// export default class ViewGame extends Component {
//   state = {
//     loading: true,
//     game: []
//   };
//   async componentDidMount() {
//     const url = "http://localhost:8080/api/auth/viewgame";
//     const response = await fetch(url);
//     const data = await response.json();
//     this.setState({ game: data, loading: false });
//   }
//   render() {
//     const { loading, game } = this.state;
//     return (
//       <div>
//         {this.state.loading ? (
//           <div>loading..</div>
//         ) : (
//           <div>
//             <ul>
//               {game.map(display => {
//                 console.log(display);
//                 const { id, name, location, details } = display;
//                 return (
//                   <div key={id}>
//                     <p>Game Name: {name}</p>
//                     <p>Location {location}</p>
//                     <p>Details: {details}</p>
//                     <hr />
//                   </div>
//                 );
//               })}
//             </ul>
//           </div>
//         )}
//       </div>
//     );
//   }
// }
