import React from 'react';
import "./featuredInfo.css"
function FeaturedInfo() {
    return (
        <div className="featured">
            <div className="featuredItem">
                <span className="featuredTitle">Revanue</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">$2,415</span>
                    <span className="featuredMoneyRate">$2,415</span>
                    <span className="featuredMoney"></span>
                </div>
            </div>
        </div>
    );
}

export default FeaturedInfo;