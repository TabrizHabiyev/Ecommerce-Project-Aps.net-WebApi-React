import React from 'react';

function GoogleMap() {
    return (
        <>
            <div className="contact__map--area section--padding pt-0">
                <iframe className="contact__map--iframe"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7887.465355142307!2d-0.13384360843222626!3d51.4876034467734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48760532743b90e1%3A0x790260718555a20c!2sU.S.%20Embassy%2C%20London!5e0!3m2!1sen!2sbd!4v1632035375945!5m2!1sen!2sbd"
                        style={{border:0}} loading="lazy"></iframe>
            </div>
        </>
    );
}

export default GoogleMap;