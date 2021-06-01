import React from 'react'

const Footer=(price)=> {

    if (price!=="0.00"){
        return<div className="footer">Designed and Developed by © Nishant Mishra 
        <div  >
            <span className="links" >
              <a
                href="https://www.linkedin.com/in/nishant-kumar-mishra-8503a9122/"
                target="_blank"
                rel="noreferrer"
              >
                <span>LinkedIn
                </span>
              </a>
            </span>
            <span className="links" >
              <a
                href="https://twitter.com/nishantmishra19"
                target="_blank"
                rel="noreferrer"
              >
                <span > Twitter
                </span>
              </a>
            </span>

            <span className="links">
              <a
                href="https://github.com/nishant1120"
                target="_blank"
                rel="noreferrer"
              >
                <span >GitHub
                </span>
              </a>
            </span>

            <span className="links">
              <a
                href="https://portfolio-nishant.vercel.app/"
                target="_blank"
                rel="noreferrer"
              >
                <span >Portfolio
                </span>
              </a>
            </span>
          </div>
</div>    
    }
}

export default Footer
