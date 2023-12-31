import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { GET_ORGANIZATIONS } from "../utils/queries";
import { useQuery } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import '../components/styles/home.css'
const styles = {
    styles: {
        backgroundColor: "rgba(0, 0, 0, 0.6)",
      

    },
    background: {
        backgroundImage: "url('https://mdbcdn.b-cdn.net/img/new/slides/041.webp')",
    height: "60vh",
    backgroundSize: "cover", 
    backgroundRepeat: "no-repeat",
    },
    Carouselconatiner: {
      width: '70%',
    
    },
    dasha: {
      display: 'flex',
      marginTop: "2%",
      marginBottom: "2%",
      flexDirection: 'column',
      alignItems: 'center'
    },
    dasha2: {
      display: 'flex',
      
      flexDirection: 'column',
      alignItems: 'flex-end'
    },
    divdetails: {
      background: 'rgba(0, 0, 0, 0.6)'
    }
}

const Home = () => {
  let navigate = useNavigate();
  const buttonclick = (orgid) => {
    //console.log(orgid,"kaikane")
    navigate(`/singleorg/${orgid}`)
    window.scrollTo(0, 0)
    }
  const { loading, data, error } = useQuery(GET_ORGANIZATIONS)
  if(error){
console.log(error)
  }
  let top3DonatedOrganizations = 0;
  let lastthreenewlyaddedorgs = 0;
  if(!loading){
    let organizations = [...data.organizations]; // Create a copy of the array
 //console.log(organizations)
 
 lastthreenewlyaddedorgs = organizations.slice(-3);
//  console.log(lastthreenewlyaddedorgs,"hererere")
    const sortedOrganizations = organizations.sort((a, b) => b.donationsmade - a.donationsmade);
    top3DonatedOrganizations = sortedOrganizations.slice(0, 3);

    
   
  }
return(
  <div >
    <div className="p-5 text-center bg-image rounded-3" style={styles.background}>
  <div className="mask" style={styles.styles}>
    <div className="d-flex justify-content-center align-items-center h-100">
      <div className="text-white herotext">
        <h1 className ="mb-3 heroh1">Join Us in Making a Difference Through Compassionate Giving</h1>
        <h4 className="mb-3 heroh4">Find and support a charity that aligns with your passions.</h4>
        <a className="btn btn-outline-light btn-lg" href="/donate" role="button">GiveNow</a>
      </div>
    </div>
  </div>
</div>
{/* TODO Make responsive */}
<div style={styles.dasha}>
  newly Added
  {loading? <p>loading newly added charitys...</p> :
 
  <div style={styles.Carouselconatiner}>
   <Carousel>
              {lastthreenewlyaddedorgs.map((org, idx) => (
                <Carousel.Item key={idx}>
                
                    <img className="d-block w-100" src={org.image} alt={`Slide ${idx + 1}`} />
                  
                  <Carousel.Caption>
                    <div style={styles.divdetails}>
                    <h3 >{org.name}</h3>
                    <p>{org.shortdescription}</p>
                    </div>
                    <button className="button2" onClick={() => buttonclick(org._id)}>GiveNow</button>
                  </Carousel.Caption>
            
                
                </Carousel.Item>
              ))}
            </Carousel>
    </div>
}
</div>
{/* TODO Make responsive */}
<div style={styles.dasha}>
  Popular charitys
  {loading? <p>loading popular charitys...</p> :
 
  <div style={styles.Carouselconatiner}>
   <Carousel>
              {top3DonatedOrganizations.map((org, idx) => (
                <Carousel.Item key={idx}>
                  
                    <img className="d-block w-100" src={org.image} alt={`Slide ${idx + 1}`} />
                
                  <Carousel.Caption>
                    <div style={styles.divdetails}>
                    <h3>{org.name}</h3>
                    <p>{org.shortdescription}</p>
                    </div>
                    <button className="button2" onClick={() => buttonclick(org._id)}>GiveNow</button>
                    
                  </Carousel.Caption>
            
                
                </Carousel.Item>
              ))}
            </Carousel>
    </div>
}
</div>
</div>

)
  





}
export default Home;