import React,{useState,useRef, useEffect} from 'react';
import styled, { css } from 'styled-components/macro';
const HeroSection = styled.section`
margin-bottom:0px;
height:100vh;
max-height:1100px;
position:relative;
overflow:hidden;
`;

const HeroWrapper =styled.div`
position:relative;
margin-left:110px;
border-radius:2px;
width:240px;
height:430px;
display:flex;
justify-content:center;
align-items:center;
overflow:hidden;

`;

const HeroSlide = styled.div`
z-index:1;
width:100%;
height:100%;
`;

const HeroSlider = styled.div`
position:absolute;
top:0;
left:0;
width:100%;
height:100%;
display:flex;

}
`;

const HeroImage = styled.img`
position:absolute;
top:0;
left:0;
/* width:290px;
height:480px; */
width:100%;
height:100%;
object-fit:cover;

`;




function Hearo({slides}) {

    const [current,setCurrent]=useState(0);
    const length=slides.length;
    const timeout=useRef(null);
    useEffect(()=>{
        const nextSlide = () =>{
            setCurrent(current=>(current===length -1 ? 0 :current + 1))
        }
        timeout.current = setTimeout(nextSlide,2000)

        return function(){
            if(timeout.current){
                clearTimeout(timeout.current)
            }
        }

    },[current,length])
    const nextSlide =()=>{
        if(timeout.current){
            clearTimeout(timeout.current)
        }
        setCurrent(current === length -1 ? 0 :current +1)
        // console.log(current) 
    }
    const prevSlide=()=>{
        if(timeout.current){
            clearTimeout(timeout.current)
        }
        setCurrent(current===0 ? length -1 :current -1)
        // console.log(current);
    }
    if(!Array.isArray(slides)||slides.length<=0)
    {
        return null;
    }
    return (
        <HeroSection>
        <HeroWrapper>
            
            {slides.map((slide,index)=>{
                return(
                    <HeroSlide key={index}>
                      {index === current && (
                        <HeroSlider>
                            <HeroImage src={slide.image} alt={slide.alt}/>
                            

                            
                        </HeroSlider>
                      )};
                        
                    </HeroSlide>
                );

            })}
            
        </HeroWrapper>
        </HeroSection>
    );
};
export default Hearo;
