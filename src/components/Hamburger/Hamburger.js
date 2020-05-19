import React from 'react';
import "./styles.css";

const Hamburger = (props) => {

    function invertColor(hex) {
        if (hex.indexOf('#') === 0) {
            hex = hex.slice(1);
        }
        let r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
            g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
            b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
        return '#' + padZero(r) + padZero(g) + padZero(b);
    }
    function padZero(str, len) {
        len = len || 2;
        var zeros = new Array(len).join('0');
        return (zeros + str).slice(-len);
    }
    return (
        <>
            <div>
                <div className="BreadTop" style={{
                    height: "100px"
                }} />
                {
                    props.secilenMalzemeler.map((malzeme) => {
                        const elements = [];
                        const malzemeDivi = <div
                            key={malzeme.id}
                            style={{
                                height: "20px",
                                backgroundColor: malzeme.color, //malzeme rengi
                               
                                width: "30%",
                                position: "relative",
                                margin: "0px auto",
                                marginTop : "1px",
                                borderRadius:"20px",
                                color: invertColor(malzeme.color), //malzeme yazısı
                                fontFamily: "Times New Roman",
                                fontWeight : "bold",
                                textAlign: "center"
                            }}
                            
                        >
                            {malzeme.name}
                          
                        </div>;
                        for(let i=0; i< malzeme.count;i++){
                            elements.push(malzemeDivi);
                        }
                        return elements;
                    })
                }
                <div className="BreadBottom" style={{
                    height: "75px"
                }}/>
            </div>
        </>
    );
};

export default Hamburger;