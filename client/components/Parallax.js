

const Parallax = ({url,children = "Family Connect"}) => {
 
    return (
        <div
        style={{backgroundImage: "url("+ url + ")"}}
         className="home-title continer-fluid text-center">
           
                    <h1 className="display-1 font-weight-bold">{children}</h1>
                    

                   
                    
              
                    
      

        </div>
    )
}


export default Parallax;